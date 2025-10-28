import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import FileExplorer from './FileExplorer';
import About from './About';
import Admin from './Admin';
import {connectDB, getUsers} from './apis';


function App() {
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  async function handleClick() {
    setError("");
    setUsers([]);

    try {
      // connect to DB
      await connectDB(password);

      // replace with other functions as you go along
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  }

  return (
    <>
      {/* <About /> */}
      {/* <Admin /> */}
      <div style={{ padding: "2rem" }}>
        <input
          type="password"
          placeholder="DB password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // style={{ marginRight: "1rem" }}
        />
        <button onClick={handleClick}>connect & see output</button>

        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {users.length > 0 && (
          <pre style={{ marginTop: "1rem" }}>
            {JSON.stringify(users, null, 2)}
          </pre>
        )}
      </div>
    </>
  )
}

export default App
