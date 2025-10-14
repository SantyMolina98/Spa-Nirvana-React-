import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HeaderComponents from './components/headerComponents';
import HomePage from './pages/HomePage';
import Turnos from './pages/turnos.jsx';
import { Categorias } from './pages/categorias.jsx';
import Contacto from './pages/contacto.jsx';
import Nosotros from './pages/nosotros.jsx';
import Login from './pages/login.jsx';
import Registro from './pages/registro.jsx';
import PaginaError from './pages/PaginaError.jsx';
import Footer from './components/footer.jsx';



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
    
      <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App;
