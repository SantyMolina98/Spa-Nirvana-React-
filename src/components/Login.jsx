import { useState, useContext, useEffect } from 'react';
import '../App.css';
import '../styles/loginPage.css';
import { Button, Card, Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { authLogin } from '../helpers/LoginApi'; 

function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();
  const { login } = useContext(UserContext); 

  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => {
      setSuccess(null);
      navigate('/');
    }, 2000);
    return () => clearTimeout(t);
  }, [success, navigate]);

  const handleIngreso = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    if (password.trim().length >= 6 && password.trim().length <= 20) {
      setLoading(true);
      setError(null);

      try {
        const datos = {
          correo: email.trim(),
          password: password.trim(),
        };

        const respuesta = await authLogin(datos);

        if (respuesta?.token) {
          localStorage.setItem("token", JSON.stringify(respuesta.token));
          
          if(respuesta.usuario){
             await login(respuesta.usuario); 
          } else {
             await login({ username: email });
          }

          setSuccess(`¡Bienvenido/a! Has iniciado sesión con éxito.`);
        } else {
          throw new Error(respuesta?.msg || 'Error al iniciar sesión.');
        }

      } catch (err) {
        console.error(err);
        setError(err.message || 'Credenciales inválidas. Por favor, verifica tu correo y contraseña.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="mainLogin">
        <Card className="cardLogin colorcard">
          <h3 className="colorcard title-login">INICIAR SESIÓN</h3>
          <Card.Body className="bodyCard colorcard">
            <p className="colorcard">¿Sos nuevo/a? <Link to="/login/registro" className="linkLogin colorcard">REGISTRATE</Link></p>
            
            {error && (
              <Alert variant="danger" onClose={() => setError(null)} dismissible>
                {error}
              </Alert>
            )}
            {success && (
              <Alert variant="success" onClose={() => setSuccess(null)} dismissible>
                {success}
              </Alert>
            )}

            <Form noValidate validated={validated} className="FormInicioSesion colorcard" onSubmit={handleIngreso}>
              <Form.Group className="mb-3 colorcard" controlId="formBasicEmail">
                <Form.Label id='usuario' className='textlogin colorcard'>Email</Form.Label>
                <Form.Control 
                  aria-label="Email" 
                  required 
                  type="email" 
                  placeholder="Ingrese su email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                
                <Form.Control.Feedback type="invalid" className='alerterror'>
                  Por favor ingrese un email válido.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3 colorcard" controlId="formBasicPassword">
                <Form.Label id='contrasenia' className='textlogin colorcard'>Contraseña</Form.Label>
                <Form.Control 
                  name='contrasenia' 
                  required 
                  type="password" 
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6} 
                  maxLength={20}
                  isInvalid={validated && (password.trim().length < 6 || password.trim().length > 20)}
                />
                <Form.Control.Feedback type="invalid" className='alerterror'>
                  La contraseña debe tener entre 6 y 20 caracteres.
                </Form.Control.Feedback>
              </Form.Group>
              <div className="sectorBotones colorcard">
                <Button 
                  variant="primary" 
                  type="submit" 
                  size="lg" 
                  className="botonesLogin"
                  disabled={loading}>
                  {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Iniciar Sesión"}
                </Button>              
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