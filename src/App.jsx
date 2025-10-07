import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FileExplorer from './FileExplorer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FileExplorer />
    </>
  )
}

export default App
