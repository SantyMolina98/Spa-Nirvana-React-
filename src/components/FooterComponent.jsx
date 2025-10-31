import { Container, Row, Col, ListGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import imagenMap from '../assets/imagenMap.js'; 
import '../styles/footer.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';

function FooterComponent() {
  return (
    <footer className="back-footer-color pt-4 pt-md-5">
      <Container>
        <Row className="pb-4 mb-4 border-bottom align-items-start">
          <Col xs={12} lg={4} className="mb-4 mb-lg-0 text-center">
            <img 
              src={imagenMap.logospafooter} 
              alt="Logo Nirvana Spa & Beauty" 
              className="mb-3 logospafooter"/>
            <h5 className="text-uppercase mb-2">Síguenos</h5>
            <div className="RedesIMG d-flex justify-content-center">
              <Link to="URL_FACEBOOK" className="redes mx-2 text-white fs-4"><i className="bi bi-facebook"></i></Link>
              <Link to="URL_INSTAGRAM" className="redes mx-2 text-white fs-4"><i className="bi bi-instagram"></i></Link>
              <Link to="URL_TIKTOK" className="redes mx-2 text-white fs-4"><i className="bi bi-tiktok"></i></Link>
              <Link to="URL_X" className="redes mx-2 text-white fs-4"><i className="bi bi-twitter-x"></i></Link>
            </div>
          </Col>
          <Col xs={12} md={6} lg={4} className="mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-3">Nuestros Datos</h5>
            <ListGroup variant="flush" className="bg-transparent">
              <ListGroup.Item className="bg-transparent border-0 ps-0 pb-2 text-white p-footer-link">
                <i className="bi bi-telephone-fill me-2"></i>Atención al Cliente - 0381 5783 030
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 ps-0 pb-2">
                <Link to="URL_LINKEDIN" target="_blank" rel="noopener noreferrer" className="text-white p-footer-link">
                  Trabajá con Nosotros <i className="bi bi-linkedin ms-1"></i>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 ps-0 pb-2">
                <Link to="/contacto" className="text-white p-footer-link">Contáctanos</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 ps-0 pb-3">
                <Link to="/nosotros" className="text-white p-footer-link">Nosotros</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 ps-0 pb-2">
                <a href="URL_GOOGLE_MAPS" target="_blank" rel="noopener noreferrer" className="text-white p-footer-link">
                  <img src={imagenMap.direccion} alt="logo-mastercard" className="me-2" width="20" />Gral. José María Paz 576, SMT</a>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col xs={12} lg={4} className="mb-4 mb-lg-0 text-center">
            <h5 className="text-uppercase mb-3 text-white">Info. de la Empresa</h5>
            <ListGroup className="bg-transparent">
              <ListGroup.Item className="bg-transparent border-0 ps-0 pb-2">
                <Link to="/ayuda" className="text-white p-footer-link">Centro de Ayuda</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 ps-0 pb-3">
                <Link to="/cancelar-turno" className="text-warning fw-bold p-footer-link">Cancelar un turno</Link>
              </ListGroup.Item>
              
              <ListGroup.Item className="bg-transparent border-0 ps-0 pb-2">
                <Link to="/privacidad" className="text-white p-footer-link">Política de Privacidad</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 ps-0 pb-2">
                <Link to="/terminos" className="text-white p-footer-link">Términos y Condiciones</Link>
              </ListGroup.Item>
            </ListGroup>
            <h6 className="mt-4 text-white">Medios de Pago:</h6>
            <div className="payment-icons d-flex align-items-center">
              <img src={imagenMap.logomastercard} alt="logo-mastercard" className="me-2" width="40" />
              <i className="bi bi-credit-card-fill text-white fs-4 me-2"></i>
              <i className="bi bi-paypal text-white fs-4"></i>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="py-3">
            <p className='text-center text-white-50 mb-0'>© Todos los derechos reservados | ® Nirvana Spa & Beauty Company 2025</p>
          </Col>
        </Row>
      </Container>
      <div className="wp cajawp">
        <a href="URL_WHATSAPP_API" target="_blank" rel="noopener noreferrer" className="visitado"><i className="bi bi-whatsapp"></i></a>
      </div>
    </footer>
  );
}

export default FooterComponent;