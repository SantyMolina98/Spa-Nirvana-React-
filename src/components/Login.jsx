import { useState, useContext, useEffect } from 'react';
import '../App.css';
import '../styles/loginPage.css';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  // cuando haya un mensaje de éxito, lo mostramos y redirigimos después
  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => {
      setSuccess(null);
      navigate('/');
    }, 2000);
    return () => clearTimeout(t);
  }, [success, navigate]);

  const ingreso = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      if (user.trim().length >= 3 && user.trim().length <= 18 && password.trim().length >= 6 && password.trim().length <= 20)  {
        try {
          setError(null);
          await login({ username: user.trim(), password: password.trim() });
          setSuccess(`¡Bienvenido/a, ${user.trim()}! Has iniciado sesión con éxito.`);
        } catch (err) {
          console.error(err);
          setError('Credenciales inválidas. Por favor, verifica tu usuario y contraseña.');
        }
      }
    }

    setValidated(true);
  };

  return (
    <>
    <div className="mainLogin">
        <Card className="cardLogin colorcard">
          <h3 className="colorcard title-login">INICIAR SESIÓN</h3>
          <Card.Body className="bodyCard colorcard">
            <p className="colorcard">¿Sos nuevo/a? <Link to="/login/registro" className="linkLogin colorcard">REGISTRATE</Link></p>
              {error && (
                <Alert variant="danger"  onClose={() => setError(null)} dismissible>
                  {error}
                </Alert>
              )}
              {success && (
                <Alert variant="success" onClose={() => setSuccess(null)} dismissible>
                  {success}
                </Alert>
              )}
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
    </>
    
  );
}

export default Login;
