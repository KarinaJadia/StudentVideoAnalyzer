import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import FileExplorer from './FileExplorer';
import About from './About';
import Admin from './Admin';
import {
  connectDB,
  getUsers,
  createUser,
  getUser,
  createChat,
  getChat,
  createChatLog,
  getChatLogs,
  createPermission,
  getPermission,
} from './apis';


function App() {
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [action, setAction] = useState('getUsers');
  const [param, setParam] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [result, setResult] = useState(null);

  async function handleClick() {
    setError("");
    setUsers([]);
    setResult(null);

    try {
      // connect to DB
      await connectDB(password);

      // dispatch based on selected action
      let data;
      switch (action) {
        case 'connectDB':
          data = await connectDB(password);
          break;
        case 'getUsers':
          data = await getUsers();
          setUsers(data);
          break;
        case 'createUser':
          data = await createUser(JSON.parse(bodyText));
          break;
        case 'getUser':
          data = await getUser(param);
          break;
        case 'createChat':
          data = await createChat(JSON.parse(bodyText));
          break;
        case 'getChat':
          data = await getChat(param);
          break;
        case 'createChatLog':
          data = await createChatLog(JSON.parse(bodyText));
          break;
        case 'getChatLogs':
          data = await getChatLogs(param);
          break;
        case 'createPermission':
          data = await createPermission(JSON.parse(bodyText));
          break;
        case 'getPermission':
          data = await getPermission(param);
          break;
        default:
          data = { message: 'unknown action' };
      }
      setResult(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  }

  return (
    <>
      {/* <About /> */}
      {/* <Admin /> */}
      <div style={{ padding: "2rem" }}>
        <div style={{ marginBottom: 8 }}>
          <input
            type="password"
            placeholder="DB password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginRight: "1rem" }}
          />
          <select value={action} onChange={(e) => setAction(e.target.value)} style={{ marginRight: 8 }}>
            <option value="getUsers">getUsers</option>
            <option value="createUser">createUser</option>
            <option value="getUser">getUser</option>
            <option value="createChat">createChat</option>
            <option value="getChat">getChat</option>
            <option value="createChatLog">createChatLog</option>
            <option value="getChatLogs">getChatLogs</option>
            <option value="createPermission">createPermission</option>
            <option value="getPermission">getPermission</option>
          </select>
          <input placeholder="param (id)" value={param} onChange={(e) => setParam(e.target.value)} style={{ marginRight: 8 }} />
          <button onClick={handleClick}>run</button>
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>JSON body (for create* actions):</label>
          <br />
          <textarea value={bodyText} onChange={(e) => setBodyText(e.target.value)} rows={6} cols={60} />
        </div>

        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {users.length > 0 && (
          <div>
            <h3>Users</h3>
            <pre style={{ marginTop: "1rem" }}>{JSON.stringify(users, null, 2)}</pre>
          </div>
        )}

        {result && (
          <div>
            <h3>Result</h3>
            <pre style={{ marginTop: "1rem" }}>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  )
}

export default App
