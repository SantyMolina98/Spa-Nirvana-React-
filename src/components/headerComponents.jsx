import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import '../App.css';
import '../styles/headerComponent.css';
import { NavLink } from 'react-router-dom';
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import logospaheader from '../assets/Img/logospaheader.png';

function HeaderComponent () {
  return (
    <>
      <Navbar key='lg' expand='lg'>
        <Container fluid>
          <Navbar.Brand to="/">
            <img src={logospaheader} className='logoSPA' alt="LogoSPA"/>
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
              <img src={logospaheader} className='logoSPA' alt="LogoSPA"/>
             </Navbar.Brand>
            </Container>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/">Inicio</Nav.Link>
                <Nav.Link href="/turnos">Turnos</Nav.Link>
                <NavDropdown
                  title="Categorías"
                  id={`offcanvasNavbarDropdown-expand-lg`}>
                  <NavDropdown.Item href="/categorias">Tratamientos Faciales</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/categorias">
                    Tratamientos Corporales
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/categorias">
                    Masajes
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/categorias">
                    Masajes con Aromaterapia
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/categorias">
                    Rituales
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/categorias">
                    Fix
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/contacto">Contáctanos</Nav.Link>
                <Nav.Link href="/nosotros">Nosotros</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Buscar "
                  className="me-2"
                  aria-label="Search"
                />
                <Button>Buscar</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
export default HeaderComponent;