import { useState } from 'react'
import './App.css'
import UserContextProvider from './context/UserContextProvider'
import {Login, Profile} from './components'


function App() {
  const [count, setCount] = useState(0)

  return (
    <UserContextProvider >
      <h1>Understanding Context API</h1>
      <Login />
      <Profile />
    </UserContextProvider>
  )
}

export default App
