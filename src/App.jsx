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
import ServiciosTrCorporal from './pages/serviciostrcorporal.jsx';
import ServiciosMaAromat from './pages/serviciosmarom.jsx';
import ServiciosRitual from './pages/serviciosrituales.jsx';
import ProtectedAdmin from './routes/ProtectedAdmin.jsx';
import Admin from './pages/Admin.jsx';
import RecuperarCuenta from './components/RecuperarCuenta';
import NuevaPassword from './components/NuevaPassword';

function App() {
 
  return (
    <>
    <BrowserRouter>
      <div className='body-content'>
      <HeaderComponents />
        <main className='main-content'>
        <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/turnos' element={<Turnos/>}/>
              <Route path='/categorias' element={<Categorias/>}/>
              <Route path='/serviciosfacial' element={<ServiciosFacial/>}/>
              <Route path='/serviciostrcorporal' element={<ServiciosTrCorporal/>}/>
              <Route path='/serviciosmasaje' element={<ServiciosMasajes/>}/>
              <Route path='/serviciosmaromat' element={<ServiciosMaAromat/>}/>
              <Route path='/serviciosrituales' element={<ServiciosRitual/>}/>
              <Route path='/contacto' element={<Contacto/>}/>
              <Route path='/nosotros' element={<Nosotros/>}/> 
              <Route path='/admin' element={
                <ProtectedAdmin >  
                  <Admin/>
                </ProtectedAdmin> 
              }/>
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
