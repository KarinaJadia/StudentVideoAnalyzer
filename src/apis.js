const BASE_URL = "http://127.0.0.1:8000";

async function request(endpoint, method = "GET", data = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (data) options.body = JSON.stringify(data);

  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || `Request failed with ${res.status}`);
  }
  return res.json();
}

export async function connectDB(password) {
  return request("/connect", "POST", { password });
}

/*
post JSON:
{
  "first_name": "string",
  "last_name": "string",
  "username": "string",
  "password_sha256": "string"
}

returns user ID
*/
export async function createUser(first_name, last_name, username, password_sha256) {
  return request("/users", "POST", { first_name, last_name, username, password_sha256 });
}

export async function getUsers() {
  return request("/users", "GET");
}

export async function getUser(user_id) {
  return request(`/users/${user_id}`, "GET");
}

export async function getUserChats(user_id) {
  return request(`/users/${user_id}/chats`, "GET");
}

export async function createChat(user_id, chat_title, video_transcript = null) {
  return request("/chats", "POST", { user_id, chat_title, video_transcript });
}

export async function getChat(chat_id) {
  return request(`/chats/${chat_id}`, "GET");
}

/*
post JSON:
{
  "chat_id": int,
  "role": "string" (ai or user),
  "content": "string"
}

returns message id
*/
export async function createChatLog(chat_id, role, content) {
  return request("/chat_logs", "POST", { chat_id, role, content });
}

export async function getChatLogs(chat_id) {
  return request(`/chat_logs/${chat_id}`, "GET");
}

/*
post JSON:
{
  "user_id": int,
  "upload_videos": boolean,
  "save_transcript": boolean,
  "access_admin_page": boolean
}

returns permission ID
*/
export async function createPermission(user_id, upload_videos = false, save_transcript = false, access_admin_page = false) {
  return request("/permissions", "POST", { user_id, upload_videos, save_transcript, access_admin_page });
}

export async function getPermission(user_id) {
  return request(`/permissions/${user_id}`, "GET");
}

export async function login(username, password) {
  return request("/login", "POST", { username, password });
}

/*
returns chat id and video url
*/
export async function uploadVideo(user_id, chat_title, file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("user_id", String(user_id));
  formData.append("chat_title", chat_title);

  const res = await fetch(`${BASE_URL}/upload_video`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || `Upload failed: ${res.status}`);
  }

  return res.json();
}

export async function viewVideo(chat_id) {
  return request(`/view_video/${chat_id}`, "GET");
}

/*
returns prompt and answer
*/
export async function askGemini(prompt) {
  return request("/ask_gemini", "POST", { prompt });
}

/*
returns video url and transcription
*/
export async function transcribeVideo(video_url) {
  return request("/transcribe_video", "POST", { video_url });
}