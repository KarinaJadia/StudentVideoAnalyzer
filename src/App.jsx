import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import FileExplorer from './FileExplorer';
import About from './About';
import Admin from './Admin';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <About /> */}
      <Admin />
    </>
  )
}

export default App
