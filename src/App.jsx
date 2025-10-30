import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HeaderComponents from './components/headerComponents.jsx';
import HomePage from './pages/HomePage.jsx';
import Turnos from './pages/Turnos.jsx';
import Categorias from './pages/Categorias.jsx';
import ServiciosFacial from './pages/serviciosfacial.jsx';
import ServiciosMasajes from './pages/serviciosmasaje.jsx';
import Contacto from './pages/Contacto.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Login from './components/Login.jsx';
import Registro from './pages/Registro.jsx';
import PaginaError from './pages/PaginaError.jsx';
import FooterComponent from './components/FooterComponent.jsx';

function App() {

  return (
    <>
    <BrowserRouter>
      <div className='body-content'>
      <HeaderComponents/>
        <main className='main-content'>
        <Routes>
          
              <Route path='/' element={<HomePage/>}/>
              <Route path='/turnos' element={<Turnos/>}/>
              <Route path='/categorias' element={<Categorias/>}/>
              <Route path='/serviciosfacial' element={<ServiciosFacial/>}/>
              <Route path='/serviciosmasaje' element={<ServiciosMasajes/>}/>
              <Route path='/contacto' element={<Contacto/>}/>
              <Route path='/nosotros' element={<Nosotros/>}/>    
              <Route path='/login' element={<Login/>}/>
              <Route path='/login/registro' element={<Registro/>}/>
              <Route path='*' element={<PaginaError/>}/>
            
          
        </Routes> 
        </main>
    <FooterComponent/>     
    </div>
    </BrowserRouter>
    </>
  )
}

export default App;
