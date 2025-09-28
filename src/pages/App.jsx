import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HeaderComponent from '../components/headerComponents.jsx';
import '../styles/headerComponent.css';
import HomePage from './HomePage';
import Turnos from './turnos.jsx';
import Categorias from './categorias.jsx';
import ServiciosMasajes from './serviciosmasaje.jsx';
import ServiciosFacial from './serviciosfacial.jsx';
import Contacto from './contacto.jsx';
import Nosotros from './nosotros.jsx';
import Login from './login.jsx';
import Registro from './registro.jsx';
import PaginaError from './PaginaError.jsx';
import FooterComponent from '../components/footerComponents.jsx';

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
