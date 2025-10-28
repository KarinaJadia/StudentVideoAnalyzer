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