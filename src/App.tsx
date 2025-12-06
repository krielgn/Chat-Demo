import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/login'
import Chat from './pages/chat'
import UserContextProvider from './contexts/UserContext'
import './App.css'
import './index.css'
import UserRouter from './pages/UserRouter'
import RoomContextProvider from './contexts/RoomContext'


  createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename='/Chat-Demo/'>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Login/>}/>
          {/* Prevent users from skipping to chat */}
          <Route element={<UserRouter/>} >
            {/* Only fetch server data once user is 'logged in' */}
            <Route element={<RoomContextProvider/>}>
              <Route path="/chat" element={<Chat/>}/>
            </Route>
          </Route>
        </Routes>
    </UserContextProvider>
    </BrowserRouter>
  </StrictMode>
  )

