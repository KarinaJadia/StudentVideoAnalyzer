import { useState } from "react";
import {
  connectDB,
  createUser,
  getUsers,
  getUser,
  getUserChats,
  createChat,
  getChat,
  createChatLog,
  getChatLogs,
  createPermission,
  getPermission,
} from "./apis";

function ApiTester() {
  const [password, setPassword] = useState("");
  const [action, setAction] = useState("getUsers");
  const [param, setParam] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleClick() {
    setError("");
    setResult(null);

    try {
      console.log(`Running ${action}...`);
      await connectDB(password);

      let data;
      switch (action) {
        case "connectDB":
          data = await connectDB(password);
          break;
        case "getUsers":
          data = await getUsers();
          break;
        case "createUser": {
          const { first_name, last_name, username, password_sha256 } = JSON.parse(bodyText);
          data = await createUser(first_name, last_name, username, password_sha256);
          break;
        }
        case "getUser":
          data = await getUser(param);
          break;
        case "getUserChats":
          data = await getUserChats(param);
          break;
        case "createChat": {
          const { user_id, chat_title, video_transcript } = JSON.parse(bodyText);
          data = await createChat(user_id, chat_title, video_transcript);
          break;
        }
        case "getChat":
          data = await getChat(param);
          break;
        case "createChatLog": {
          const { chat_id, role, content } = JSON.parse(bodyText);
          data = await createChatLog(chat_id, role, content);
          break;
        }
        case "getChatLogs":
          data = await getChatLogs(param);
          break;
        case "createPermission": {
          const { user_id, upload_videos, save_transcript, access_admin_page } = JSON.parse(bodyText);
          data = await createPermission(user_id, upload_videos, save_transcript, access_admin_page);
          break;
        }
        case "getPermission":
          data = await getPermission(param);
          break;
        default:
          data = { message: "Unknown action" };
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>🧪 API Tester</h2>

      <div style={{ marginBottom: 10 }}>
        <input
          type="password"
          placeholder="DB password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <select
          value={action}
          onChange={(e) => {
            setAction(e.target.value);
            setBodyText("");
            setParam("");
          }}
          style={{ marginRight: 8 }}
        >
          <option value="connectDB">connectDB</option>
          <option value="getUsers">getUsers</option>
          <option value="createUser">createUser</option>
          <option value="getUser">getUser</option>
          <option value="getUserChats">getUserChats</option>
          <option value="createChat">createChat</option>
          <option value="getChat">getChat</option>
          <option value="createChatLog">createChatLog</option>
          <option value="getChatLogs">getChatLogs</option>
          <option value="createPermission">createPermission</option>
          <option value="getPermission">getPermission</option>
        </select>

        <input
          placeholder="param (id)"
          value={param}
          onChange={(e) => setParam(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button onClick={handleClick}>Run</button>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>JSON body (for create* actions):</label>
        <br />
        <textarea
          value={bodyText}
          onChange={(e) => setBodyText(e.target.value)}
          rows={6}
          cols={60}
          placeholder='Example: {"first_name": "Karina", "last_name": "Penpin", "username": "kpenpin", "password_sha256": "abc123"}'
        />
      </div>

      {error && <p style={{ color: "red" }}>❌ Error: {error}</p>}

      {result && (
        <div>
          <h3>✅ Result</h3>
          <pre style={{ textAlign: "left", background: "#111", color: "#0f0", padding: "1rem", borderRadius: 8 }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default ApiTester;