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

export async function createChatLog(chat_id, role, content) {
  return request("/chat_logs", "POST", { chat_id, role, content });
}

export async function getChatLogs(chat_id) {
  return request(`/chat_logs/${chat_id}`, "GET");
}

export async function createPermission(user_id, upload_videos = false, save_transcript = false, access_admin_page = false
) {
  return request("/permissions", "POST", { user_id, upload_videos, save_transcript, access_admin_page });
}

export async function getPermission(user_id) {
  return request(`/permissions/${user_id}`, "GET");
}
