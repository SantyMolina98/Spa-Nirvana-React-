import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HeaderComponents from './components/headerComponents';
import HomePage from './pages/HomePage';
import Turnos from './pages/Turnos';
import { Categorias } from './pages/Categorias';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import Login from './pages/Login';
import Registro from './pages/Registro';
import PaginaError from './pages/PaginaError';
import FooterComponents from './components/FooterComponents';


function App() {
  
  return (
    <>
    <BrowserRouter>
      <HeaderComponents/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/turnos' element={<Turnos/>}/>
        <Route path='/categorias' element={<Categorias/>}/>
        <Route path='/contacto' element={<Contacto/>}/>
        <Route path='/nosotros' element={<Nosotros/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/login/registro' element={<Registro/>}/>
        <Route path='*' element={<PaginaError/>}/>
      </Routes>
      <FooterComponents/>
    </BrowserRouter>
    
    </>
  )
}

export default App;
