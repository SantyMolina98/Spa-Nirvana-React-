import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Card, Container } from 'react-bootstrap';
import { restablecerContrasena } from '../helpers/UsuariosApi'; 

const NuevaPassword = () => {
  const { token } = useParams(); // Capturamos el token de la URL
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await restablecerContrasena(token, password);
      
      if(resp.mensaje === 'Contraseña restablecida correctamente'){
          alert("¡Contraseña actualizada! Ahora puedes iniciar sesión.");
          navigate('/login'); // Redirigir al login
      } else {
          alert(resp.mensaje || "Hubo un error");
      }
    } catch (error) {
      alert("El enlace es inválido o ha expirado.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow">
        <h3 className="text-center mb-4">Nueva Contraseña</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Ingresa tu nueva contraseña</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Mínimo 6 caracteres" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="success" type="submit">Cambiar Contraseña</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default NuevaPassword;