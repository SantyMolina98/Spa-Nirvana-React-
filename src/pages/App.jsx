import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HeaderComponent from '../components/headerComponents';
import HomePage from './HomePage';
import Turnos from './turnos.jsx';
import Categorias from './categorias.jsx';
import Contacto from './contacto.jsx';
import { Nosotros } from './nosotros.jsx';
import { Login } from './login.jsx';
import { PaginaError} from './PaginaError.jsx';

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
        <Route path='*' element={<PaginaError/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
