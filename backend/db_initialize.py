# this will create and RESET the database
# do not run unless you want to RESET the database and DELETE ALL DATA

# database: https://us-east-1.console.aws.amazon.com/rds/home?region=us-east-1#database:id=studentanalyzer-db
# bucket: https://us-east-1.console.aws.amazon.com/s3/buckets?region=us-east-1

import psycopg2
import random
from hashlib import sha256

password = input('password: ')

print('connecting')

conn = psycopg2.connect(
    host="studentanalyzer-db.cq9oieoy4a2v.us-east-1.rds.amazonaws.com",
    port=5432,
    database="studentanalyzer",
    user="studentanalyzer",
    password=password
)
cursor = conn.cursor()

print('executing script')

with open("tables.sql") as f:
    statements = f.read().split(';')
    for stmt in statements:
        if stmt.strip():
            cursor.execute(stmt)
conn.commit()

print("tables created")

print('inserting test data')

# fake users
for i in range(1, 4):

    hashed_password = sha256(f"testuser{i}".encode()).hexdigest()

    user_data = {
        "first_name": f"FirstName{i}",
        "last_name": f"LastName{i}",
        "username": f"testuser{i}",
        "password_sha256": hashed_password
    }

    insert_query = """
    INSERT INTO users (first_name, last_name, username, password_sha256)
    VALUES (%(first_name)s, %(last_name)s, %(username)s, %(password_sha256)s)
    """

    cursor.execute(insert_query, user_data)
conn.commit()

# fake chat titles
for i in range(0, 6):

    chat_data = {
        "user_id": i%3+1,
        "chat_title": f"Title {i+1} for User {i%3+1}",
        "video_transcript": "This is where the AI video transcript would be stored"
    }

    insert_query = """
    INSERT INTO chats_list (user_id, chat_title, video_transcript)
    VALUES (%(user_id)s, %(chat_title)s, %(video_transcript)s)
    """

    cursor.execute(insert_query, chat_data)
conn.commit()

# IF YOU ARE SETTING UP YOUR OWN S3 BUCKET, TURN OFF ALL PERMISSIONS AND SET UP A CORS POLICY AND A BUCKET POLICY
# OR IT WON'T WORK
test_vid_url = 'https://studentanalyzer-bucket.s3.us-east-1.amazonaws.com/individual_project.mov'
chat_data = {
    "user_id": 1,
    "chat_title": "Test Video",
    "video_url": test_vid_url
}

insert_query = """
INSERT INTO chats_list (user_id, chat_title, video_url)
VALUES (%(user_id)s, %(chat_title)s, %(video_url)s)
"""
cursor.execute(insert_query, chat_data)
conn.commit()

# fake chats (rip)
messages = [
    {"chat_id": 1, "role": "user", "content": "message from user!"},
    {"chat_id": 1, "role": "ai", "content": "response from ai!"},
    {"chat_id": 1, "role": "user", "content": "second message from user!"},
    {"chat_id": 1, "role": "ai", "content": "final ai response!"}
]

insert_query = """
INSERT INTO chat_log (chat_id, role, content)
VALUES (%(chat_id)s, %(role)s, %(content)s)
"""

for message in messages:
    cursor.execute(insert_query, message)
conn.commit()

# fake permissions
for i in range(0, 3):

    perm_data = {
        "user_id": i+1,
        "upload_videos": random.choice([True, False]),
        "save_transcript": random.choice([True, False]),
        "access_admin_page": random.choice([True, False])
    }

    insert_query = """
    INSERT INTO permissions (user_id, upload_videos, save_transcript, access_admin_page)
    VALUES (%(user_id)s, %(upload_videos)s, %(save_transcript)s, %(access_admin_page)s)
    """

    cursor.execute(insert_query, perm_data)
conn.commit()

cursor.close()
conn.close()