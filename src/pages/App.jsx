import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HeaderComponent from '../components/headerComponents';
import { HomePage } from './HomePage';
import { Turnos } from './Turnos';
import { Categorias } from './Categorias';
import { Contacto } from './Contacto';
import { Nosotros } from './Nosotros';
import { Login } from './Login';

function App() {
  
  return (
    <BrowserRouter>
      <HeaderComponent/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/turnos' element={<Turnos/>}/>
        <Route path='/categorias' element={<Categorias/>}/>
        <Route path='/contacto' element={<Contacto/>}/>
        <Route path='/nosotros' element={<Nosotros/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
