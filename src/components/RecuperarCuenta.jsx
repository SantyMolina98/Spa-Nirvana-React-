import { useState } from 'react';
import { Button, Form, Card, Container, Alert } from 'react-bootstrap'; 
import { solicitarRecuperacion } from '../helpers/UsuariosApi';
import { Link } from 'react-router-dom';

const RecuperarCuenta = () => {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [debugLink, setDebugLink] = useState(null); // Estado para guardar el link de prueba

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setDebugLink(null);

    try {
      const resp = await solicitarRecuperacion(email);
      
      setMensaje(resp.mensaje);
      
      if (resp.link) {
        setDebugLink(resp.link);
      }

    } catch (error) {
      alert("Error al enviar la solicitud");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow">
        <h3 className="text-center mb-4">Recuperar Contraseña</h3>
        
        {/* Si hay mensaje, lo mostramos */}
        {mensaje && <Alert variant="success">{mensaje}</Alert>}

        {/*BOTON*/}
        {debugLink ? (
            <div className="d-grid gap-2 mt-3">
                <Alert variant="warning">
                    <strong>MODO DEBUG:</strong><br/>
                    Como no enviamos emails reales todavía, haz clic aquí:
                </Alert>
                <a href={debugLink} className="btn btn-warning">
                    🔗 SIMULAR CLICK EN EL EMAIL
                </a>
            </div>
        ) : (
            // Si no hay link, mostramos el formulario normal
            !mensaje && (
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Ingresa tu correo electrónico</Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder="ejemplo@correo.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">Enviar enlace</Button>
                </div>
                </Form>
            )
        )}
        
        <div className="text-center mt-3">
            <Link to="/login">Volver al Login</Link>
        </div>
      </Card>
    </Container>
  );
};

export default RecuperarCuenta;