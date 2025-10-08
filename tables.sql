CREATE TABLE users (
    user_id INTEGER PRIMARY KEY, -- auto-incrementing ID
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_sha256 CHAR(64) NOT NULL
);

CREATE TABLE chats_list (
    chat_id INTEGER PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    chat_title VARCHAR(150) NOT NULL,
    video_transcript TEXT,  -- can store entire transcript as JSON or plain text
    created_date TIMESTAMP DEFAULT NOW(),
    last_access_date TIMESTAMP DEFAULT NOW()
);

CREATE TABLE chat_log (
    message_id INTEGER PRIMARY KEY,
    chat_id INT NOT NULL REFERENCES chats_list(chat_id) ON DELETE CASCADE,
    role VARCHAR(10) CHECK (role IN ('user', 'ai')) NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT NOW()
);

CREATE TABLE permissions (
    permission_id INTEGER PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    upload_videos BOOLEAN DEFAULT FALSE,
    save_transcript BOOLEAN DEFAULT FALSE,
    access_admin_page BOOLEAN DEFAULT FALSE
);