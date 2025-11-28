import {Routes, Route} from 'react-router-dom'
import Login from './pages/login'
import Chat from './pages/chat'
import MyForm from './pages/test'
import UserContextProvider from './contexts/UserContext'
import './App.css'
import UserRouter from './pages/UserRouter'
import RoomContextProvider from './contexts/RoomContext'

export default function App() {
  return (
    <UserContextProvider>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/test" element={<MyForm/>}/>
          {/* Prevent users from skipping to chat */}
          <Route element={<UserRouter/>} >
            {/* Only fetch server data once user is 'logged in' */}
            <Route element={<RoomContextProvider/>}>
              <Route path="/chat" element={<Chat/>}/>
            </Route>
          </Route>
        </Routes>
    </UserContextProvider>
    // <>
    //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
  )
}

