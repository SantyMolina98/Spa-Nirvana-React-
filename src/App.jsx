import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HeaderComponent from './components/headerComponents.jsx';
import './styles/headerComponent.css';
import HomePage from './pages/HomePage.jsx';
import Turnos from './pages/turnos.jsx';
import Categorias from './pages/categorias.jsx';
import ServiciosMasajes from './pages/serviciosmasaje.jsx';
import ServiciosFacial from './pages/serviciosfacial.jsx';
import Contacto from './pages/contacto.jsx';
import Nosotros from './pages/nosotros.jsx';
import Login from './pages/login.jsx';
import Registro from './pages/registro.jsx';
import PaginaError from './pages/PaginaError.jsx';
import FooterComponent from './components/footerComponents.jsx';

function App() {
  
  return (
    <>
    <BrowserRouter>
      <HeaderComponent/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/turnos' element={<Turnos/>}/>
        <Route path='/categorias' element={<Categorias/>}/>
        <Route path='/categorias/serviciosmasajes' element={<ServiciosMasajes/>}/>
        <Route path='/categorias/serviciosfacial' element={<ServiciosFacial/>}/>
        <Route path='/contacto' element={<Contacto/>}/>
        <Route path='/nosotros' element={<Nosotros/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/login/registro' element={<Registro/>}/>
        <Route path='*' element={<PaginaError/>}/>
      </Routes>
      <FooterComponent/>
    </BrowserRouter>
    
    </>
  )
}

export default App;
