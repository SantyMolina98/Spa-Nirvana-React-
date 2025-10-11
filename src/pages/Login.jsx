import { useState } from 'react';
import '../App.css';
import '../styles/loginpage.css';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const ingreso = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      
      if (user.trim().length >= 3 && user.trim().length <= 18 && password.trim().length >= 6 && password.trim().length <= 20)  {
        alert(`Bienvenido/a ${user} a Nirvana Spa & Beauty!`);
        navigate('/'); 
      }
    }

    setValidated(true);
  };

  return (
    <div className="mainLogin">
        <Card className="cardLogin colorcard">
          <h3 className="colorcard">INICIAR SESIÓN</h3>
          <Card.Body className="bodyCard colorcard">
            <p className="colorcard">¿Sos nuevo/a? <Link to="/login/registro" className="linkLogin colorcard">REGISTRATE</Link></p>
            <Form noValidate validated={validated} className="FormInicioSesion colorcard" onSubmit={ingreso}>
              <Form.Group className="mb-3 colorcard" controlId="formBasicUser">
                <Form.Label id='usuario' className='textlogin colorcard'>Usuario</Form.Label>
                <Form.Control aria-label="Username"  aria-describedby="basic-addon1" required type="text" placeholder="Ingrese su usuario"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  minLength={3} maxLength={18}
                  isInvalid={validated && (user.trim().length < 3 || user.trim().length > 18)}
                  isValid={validated && user.trim().length >= 3 && user.trim().length <= 18}
                />
                <Form.Control.Feedback type="invalid" className='alerterror'>
                  El usuario debe tener entre 3 y 18 caracteres.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3 colorcard" controlId="formBasicPassword">
                <Form.Label id='contrasenia' className='textlogin colorcard'>Contraseña</Form.Label>
                <Form.Control  name='contrasenia' required type="password" placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6} maxLength={20}
                  isInvalid={validated && (password.trim().length < 6 || password.trim().length > 20)}
                  isValid={validated && password.trim().length >= 6 && password.trim().length <= 20}
                />
                <Form.Control.Feedback type="invalid" className='alerterror'>
                  La contraseña debe tener entre 6 y 20 caracteres.
                </Form.Control.Feedback>
              </Form.Group>

              <div className="sectorBotones colorcard">
                <Button variant="primary" type="submit" size="lg" className="botonesLogin">Iniciar Sesión</Button>
                <Button variant="secondary" size="lg" className="botonesLogin">
                  Continuar con Google
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      
    </div>
  );
}

export default Login;
