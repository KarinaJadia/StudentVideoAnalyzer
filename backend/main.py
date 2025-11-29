# to test: http://127.0.0.1:8000/docs
# make sure to connect to database first! (you know the password)

from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor
from hashlib import sha256
import uvicorn
import boto3
import uuid

app = FastAPI()

# disabling cors so anyone can access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

conn = None
cursor = None

class DBConnectRequest(BaseModel):
    password: str

s3 = boto3.client(
    "s3",
    aws_access_key_id="censored",
    aws_secret_access_key="censored",
    region_name="us-east-1"
)

@app.post("/connect")
def connect_db(req: DBConnectRequest):
    global conn, cursor
    try:
        conn = psycopg2.connect(
            host="studentanalyzer-db.cq9oieoy4a2v.us-east-1.rds.amazonaws.com",
            port=5432,
            database="studentanalyzer",
            user="studentanalyzer",
            password=req.password,
            cursor_factory=RealDictCursor
        )
        cursor = conn.cursor()
        return {"status": "connected"}
    except Exception as e:
        conn = None
        cursor = None
        raise HTTPException(status_code=401, detail=f"Connection failed: {e}")

def require_db_connection():
    if conn is None or cursor is None:
        raise HTTPException(status_code=500, detail="Database not connected. Call /connect first.")

class User(BaseModel):
    first_name: str
    last_name: str
    username: str
    password: str

class Chat(BaseModel):
    user_id: int
    chat_title: str
    video_url: str
    video_transcript: str | None = None

class ChatLog(BaseModel):
    chat_id: int
    role: str
    content: str

class Permission(BaseModel):
    user_id: int
    upload_videos: bool = False
    save_transcript: bool = False
    access_admin_page: bool = False

class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/users")
def create_user(user: User):
    require_db_connection()
    hashed = sha256(user.password.encode()).hexdigest()
    try:
        cursor.execute("""
            INSERT INTO users (first_name, last_name, username, password_sha256)
            VALUES (%s, %s, %s, %s) RETURNING user_id
        """, (user.first_name, user.last_name, user.username, hashed))
        conn.commit()
        return {"user_id": cursor.fetchone()["user_id"]}
    except psycopg2.Error as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/users")
def get_users():
    require_db_connection()
    cursor.execute("SELECT * FROM users")
    return cursor.fetchall()

@app.get("/users/{user_id}")
def get_user(user_id: int):
    require_db_connection()
    cursor.execute("SELECT * FROM users WHERE user_id = %s", (user_id,))
    user = cursor.fetchone()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.get("/users/{user_id}/chats")
def get_user_chats(user_id: int):
    require_db_connection()
    cursor.execute("""
        SELECT * FROM chats_list
        WHERE user_id = %s
        ORDER BY last_access_date DESC
    """, (user_id,))
    chats = cursor.fetchall()
    if not chats:
        raise HTTPException(status_code=404, detail="No chats found for this user")
    return chats

@app.post("/chats")
def create_chat(chat: Chat):
    require_db_connection()
    cursor.execute("""
        INSERT INTO chats_list (user_id, chat_title, video_url, video_transcript)
        VALUES (%s, %s, %s) RETURNING chat_id
    """, (chat.user_id, chat.chat_title, chat.video_url, chat.video_transcript))
    conn.commit()
    return {"chat_id": cursor.fetchone()["chat_id"]}

@app.post("/upload_video")
async def upload_video(
    user_id: int = Form(...),
    chat_title: str = Form(...),
    file: UploadFile = File(...)
):
    require_db_connection()

    allowed_types = ["video/mp4", "video/mov", "video/quicktime"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid video format")

    file_extension = file.filename.split(".")[-1]
    s3_key = f"videos/{uuid.uuid4()}.{file_extension}"

    try:
        s3.upload_fileobj(
            file.file,
            "studentanalyzer-bucket",
            s3_key,
            ExtraArgs={"ContentType": file.content_type}
        )

        video_url = f"https://studentanalyzer-bucket.s3.amazonaws.com/{s3_key}"

        cursor.execute("""
            INSERT INTO chats_list (user_id, chat_title, video_url)
            VALUES (%s, %s, %s)
            RETURNING chat_id
        """, (user_id, chat_title, video_url))

        conn.commit()
        new_chat_id = cursor.fetchone()["chat_id"]

        return {
            "status": "uploaded",
            "chat_id": new_chat_id,
            "video_url": video_url
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"S3 upload failed: {e}")
    
@app.get("/view_video/{chat_id}")
def view_video(chat_id: int):
    require_db_connection()
    cursor.execute("SELECT video_url FROM chats_list WHERE chat_id = %s", (chat_id,))
    result = cursor.fetchone()

    if not result or not result.get("video_url"):
        raise HTTPException(status_code=404, detail="Video not found for this chat")
    
    return {"chat_id": chat_id, "video_url": result["video_url"]}

@app.get("/chats/{chat_id}")
def get_chat(chat_id: int):
    require_db_connection()
    cursor.execute("SELECT * FROM chats_list WHERE chat_id = %s", (chat_id,))
    chat = cursor.fetchone()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    return chat

@app.post("/chat_logs")
def create_chat_log(log: ChatLog):
    require_db_connection()
    cursor.execute("""
        INSERT INTO chat_log (chat_id, role, content)
        VALUES (%s, %s, %s) RETURNING message_id
    """, (log.chat_id, log.role, log.content))
    conn.commit()
    return {"message_id": cursor.fetchone()["message_id"]}

@app.get("/chat_logs/{chat_id}")
def get_chat_logs(chat_id: int):
    require_db_connection()
    cursor.execute("SELECT * FROM chat_log WHERE chat_id = %s ORDER BY timestamp ASC", (chat_id,))
    return cursor.fetchall()

@app.post("/permissions")
def create_permission(p: Permission):
    require_db_connection()
    cursor.execute("""
        INSERT INTO permissions (user_id, upload_videos, save_transcript, access_admin_page)
        VALUES (%s, %s, %s, %s) RETURNING permission_id
    """, (p.user_id, p.upload_videos, p.save_transcript, p.access_admin_page))
    conn.commit()
    return {"permission_id": cursor.fetchone()["permission_id"]}

@app.get("/permissions/{user_id}")
def get_permission(user_id: int):
    require_db_connection()
    cursor.execute("SELECT * FROM permissions WHERE user_id = %s", (user_id,))
    perm = cursor.fetchone()
    if not perm:
        raise HTTPException(status_code=404, detail="Permission not found")
    return perm

@app.post("/login")
def login(req: LoginRequest):
    require_db_connection()

    req.password = sha256(req.password.encode()).hexdigest() # todo: uncomment out

    cursor.execute("SELECT * FROM users WHERE username = %s AND password_sha256 = %s", (req.username, req.password))
    user = cursor.fetchone()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    return {"user_id": user["user_id"], "first_name": user["first_name"], "last_name": user["last_name"]}

def main():
    print("backend server at http://127.0.0.1:8000")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    main()