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

export async function getUsers() {
  return request("/users", "GET");
}

// Create a new user
// user: { first_name, last_name, username, password_sha256 }
export async function createUser(user) {
  return request("/users", "POST", user);
}

// Get a single user by id
export async function getUser(userId) {
  return request(`/users/${userId}`, "GET");
}

// Create a chat
// chat: { user_id, chat_title, video_transcript }
export async function createChat(chat) {
  return request("/chats", "POST", chat);
}

// Get a chat by id
export async function getChat(chatId) {
  return request(`/chats/${chatId}`, "GET");
}

// Create a chat log entry
// log: { chat_id, role, content }
export async function createChatLog(log) {
  return request("/chat_logs", "POST", log);
}

// Get chat logs for a chat
export async function getChatLogs(chatId) {
  return request(`/chat_logs/${chatId}`, "GET");
}

// Create permissions
// p: { user_id, upload_videos, save_transcript, access_admin_page }
export async function createPermission(p) {
  return request("/permissions", "POST", p);
}

// Get permission for a user
export async function getPermission(userId) {
  return request(`/permissions/${userId}`, "GET");
}