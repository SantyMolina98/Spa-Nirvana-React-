import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';
import '../styles/headerComponent.css';
import { NavLink, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import { UserContext } from '../context/UserContext';
import imagenMap from '../assets/imagenMap.js';

function HeaderComponent () {
  const { user, logout, isAuthenticated, isAdmin } = useContext(UserContext);
  const navigate = useNavigate();

    const [termino, setTermino] = useState('');

  const handleSearch = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    if (termino.trim()) {
      // Redirige a la ruta de búsqueda con el query param
      navigate(`/buscar?q=${termino}`);
      setTermino(''); // Opcional: Limpia el input después de buscar
      
      // Opcional: Si quieres cerrar el menú Offcanvas en móvil al buscar, 
      // necesitarías controlar el estado del show del Navbar, 
      // pero por ahora dejémoslo simple.
    }
  };

  return (
    <>
      <Navbar key='lg' expand='lg' className='header-overflow ColorLetrasH' sticky="top">
        <Container fluid>
          <Navbar.Brand to="/">
            <img src={imagenMap.logospaheader} className='logoSPA' alt="LogoSPA"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
              <Container>
              <Navbar.Brand to="/">
              <img src={imagenMap.logospaheader} className='logoSPA' alt="LogoSPA"/>
             </Navbar.Brand>
            </Container>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 itemsHeader">
                <NavLink to='/'>Inicio</NavLink>
                <NavDropdown
                  title="Categorías"
                  id={`offcanvasNavbarDropdown-expand-lg`}>
                  <NavDropdown.Item as={HashLink} to='/categorias#scrollspyHeading1'>
                    Tratamientos Faciales
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={HashLink} to='/categorias#scrollspyHeading2'>
                    Tratamientos Corporales
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={HashLink} to='/categorias#scrollspyHeading3'>
                    Masajes
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={HashLink} to='/categorias#scrollspyHeading4'>
                    Masajes con Aromaterapia
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={HashLink} to='/categorias#scrollspyHeading5'>
                    Rituales
                  </NavDropdown.Item>
                </NavDropdown>
                <NavLink to='/turnos'>Turnos</NavLink>
                <NavLink to='/contacto'>Contáctanos</NavLink>
                <NavLink to='/nosotros'>Nosotros</NavLink>
                {isAdmin && <NavLink to='/admin'>Admin</NavLink>}
                <NavDropdown title={<i className="bi bi-person-circle"></i>} id='offcanvasNavbarDropdown-expand-login'>
                  {!isAuthenticated ? (
                    <>
                      <NavDropdown.Item as={Link} to='/login' className='dropdownn-login-header'>Iniciar Sesión</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={Link} to='/login/registro' className='dropdownn-login-header'>Registrarme</NavDropdown.Item>
                    </>
                  ) : (
                    <>
                      <NavDropdown.ItemText className='dropdownn-login-saludo-header'>Hola, {user?.username || 'Usuario'}</NavDropdown.ItemText>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as="button" onClick={() => { logout(); navigate('/'); }} className='dropdownn-login-header'>Cerrar Sesión</NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>

              </Nav>
              <Form className="d-flex itemsHeaderBusqueda" onSubmit={handleSearch}>
                <Form.Control
                  type="search"
                  placeholder="Buscar"
                  className="me-2 busqueda"
                  aria-label="Search"
                  value={termino}
                  onChange={(e) => setTermino(e.target.value)}
                />
                <Button type="submit" className='btnBusqueda'>Buscar</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
export default HeaderComponent;