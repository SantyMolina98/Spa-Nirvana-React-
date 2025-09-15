import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { HeaderComponents } from './components/headerComponents';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <HeaderComponents/>
    </>
  )
}

export default App
