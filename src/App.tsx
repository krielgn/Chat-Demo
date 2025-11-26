import {Routes, Route} from 'react-router-dom'
import Login from './pages/login'
import Chat from './pages/chat'
import Room from './pages/room'
import MyForm from './pages/test'
import UserContextProvider from './contexts/UserContext'
import './App.css'
import UserRouter from './contexts/UserRouter'


export default function App() {
  //const [count, setCount] = useState(0)
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/test" element={<MyForm/>}/>
        <Route element={<UserRouter/>}>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/room" element={<Room/>}/>
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

