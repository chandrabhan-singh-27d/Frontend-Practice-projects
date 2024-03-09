import { useState } from 'react'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className='text-center text-3xl text-white mx-auto my-auto'>Understanding Redux with todo</h1>
    <AddTodo />
    <Todos />
    </>
  )
}

export default App
