import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import '../App.css';
import '../styles/headerComponent.css';
import { NavLink } from 'react-router-dom';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import logospaheader from '../assets/Img/logospaheader.png';

function HeaderComponent () {
  return (
      /* <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="assets/img/Logo-Spa.png" alt="logo" className="logo" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="Pages/turnosPage.html">Turnos</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="Pages/Categorias.html" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categorias
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="Pages/Categorias.html">Tratamientos Faciales</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="Pages/Categorias.html#scrollspyHeading1">Tratamientos Corporales</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="Pages/Categorias.html#scrollspyHeading2">Masajes</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="Pages/Categorias.html#scrollspyHeading3">Masajes con Aromaterapia</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="Pages/Categorias.html#scrollspyHeading4">Rituales</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="Pages/contactoPage.html">Contáctanos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="Pages/Nosotros.html">Nosotros</a>
              </li>
            </ul>
            <ul className="navbar-nav login">
              <li className="nav-item">
                <a className="nav-link" href="Pages/loginPage.html">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h5a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 11.5 2h-5A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                    <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                  </svg>
                  login
                </a>
              </li>
            </ul>
            <ul className="navbar-nav busqueda">
              <li className="nav-item">
                <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Buscar servicio" aria-label="Search" />
                  <button className="btn btn-outline-success" type="submit">Buscar</button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* El resto de tu código que sigue al navbar */
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/" className='logoheader'><img src={logospaheader} alt="logo-nirvana-deluxe-header" width="100%" height="100%" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/turnos">Turnos</NavLink>
              <NavDropdown title="Categorías" id="basic-nav-dropdown">
                <NavDropdown.Item href="/categorias">Tratamientos Faciales</NavDropdown.Item>
                <NavDropdown.Item href="/categorias">
                  Tratamientos Corporales
                </NavDropdown.Item>
                <NavDropdown.Item href="/categorias">Masajes</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/categorias">
                  Masajes con Aromaterapia
                </NavDropdown.Item>
                <NavDropdown.Item href="/categorias">
                  Rituales
                </NavDropdown.Item>
              </NavDropdown>
              <NavLink to="/contacto">Contacto</NavLink>
              <NavLink to="/nosotros">Nosotros</NavLink>
              <NavLink to="/login">Imagen de login</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
export default HeaderComponent;