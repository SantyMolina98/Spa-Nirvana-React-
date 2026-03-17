import { useState, useContext, useEffect } from 'react';
import '../App.css';
import '../styles/loginPage.css';
import { Button, Card, Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import { authLogin } from '../helpers/LoginApi.js'; 

function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emptyFields, setEmptyFields] = useState({ email: false, password: false });
  const [touchedFields, setTouchedFields] = useState({ email: false, password: false });
  const [authError, setAuthError] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false); 

  const isEmailFormatValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPasswordLengthValid = password.trim().length >= 6;
  const emailInvalid = emptyFields.email || (touchedFields.email && email.trim() !== '' && !isEmailFormatValid) || authError;
  const emailValid = touchedFields.email && email.trim() !== '' && isEmailFormatValid && !authError;
  const passwordInvalid = emptyFields.password || (touchedFields.password && password.trim() !== '' && !isPasswordLengthValid) || authError;
  const passwordValid = touchedFields.password && password.trim() !== '' && isPasswordLengthValid && !authError;

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

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const nextEmptyFields = {
      email: trimmedEmail === '',
      password: trimmedPassword === '',
    };
    const isPasswordTooShort = trimmedPassword !== '' && trimmedPassword.length < 6;

    setEmptyFields(nextEmptyFields);
    setTouchedFields({ email: true, password: true });
    setAuthError(false);

    if (nextEmptyFields.email || nextEmptyFields.password || isPasswordTooShort) {
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    setAuthError(false);

    try {
      const datos = {
        correo: trimmedEmail,
        password: trimmedPassword,
      };

      const respuesta = await authLogin(datos);

      if (respuesta?.token) {
        localStorage.setItem("token", respuesta.token); 
        
        if(respuesta.usuario){
           await login(respuesta.usuario); 
        }
        setSuccess(`¡Bienvenido/a! Has iniciado sesión con éxito.`);
      } else {
        throw new Error(respuesta?.msg || 'Error al iniciar sesión.');
      }

    } catch (err) {
      console.error(err);
      setAuthError(true);
      setError('Email y/o contraseña incorrectos. Ingrese nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mainLogin">
        <Card className="cardLogin colorcard">
          <h3 className="colorcard title-login">Iniciar Sesión</h3>
          <Card.Body className="bodyCard colorcard">
            <p className="colorcard">¿No tienes una cuenta? <Link to="/login/registro" className="linkLogin colorcard">Registrate</Link></p>
            
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

            <Form noValidate className="FormInicioSesion colorcard" onSubmit={handleIngreso}>
              <Form.Group className="mb-3 colorcard" controlId="formBasicEmail">
                <Form.Label id='usuario' className='textlogin colorcard'>Email</Form.Label>
                <Form.Control 
                  className='emailInput'
                  aria-label="Email" 
                  required 
                  type="email" 
                  placeholder="Ingrese su email"
                  value={email}
                  isInvalid={emailInvalid}
                  isValid={emailValid}
                  onBlur={() => setTouchedFields((prev) => ({ ...prev, email: true }))}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emptyFields.email) {
                      setEmptyFields((prev) => ({ ...prev, email: false }));
                    }
                    if (authError) setAuthError(false);
                    if (error) setError(null);
                  }}
                />
                
                <Form.Control.Feedback type="invalid" className='alerterror'>
                  {emptyFields.email ? 'Completar campo con su email' : 'Ingrese un email valido'}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3 colorcard" controlId="formBasicPassword">
                <Form.Label id='contrasenia' className='textlogin colorcard'>Contraseña</Form.Label>
                <Form.Control 
                  className='passwordInput'
                  name='contrasenia' 
                  required 
                  minLength={6}
                  type="password" 
                  placeholder="Ingrese su contraseña"
                  value={password}
                  isInvalid={passwordInvalid}
                  isValid={passwordValid}
                  onBlur={() => setTouchedFields((prev) => ({ ...prev, password: true }))}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (emptyFields.password) {
                      setEmptyFields((prev) => ({ ...prev, password: false }));
                    }
                    if (authError) setAuthError(false);
                    if (error) setError(null);
                  }}
                />
                <Form.Control.Feedback type="invalid" className='alerterror'>
                  {emptyFields.password ? 'Completar campo con su contraseña' : 'Email y/o contraseña incorrectos. Ingrese nuevamente.'}
                </Form.Control.Feedback>
                <div className="text-center mt-3">
                    <Link to="/RecuperarCuenta" className="linkLogin colorcard">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
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
                <Link to="*" className='continuar-google'>
                  <Button variant="secondary" size="lg" className="botonesLogin">
                  Continuar con Google
                  </Button>
                </Link>              
                
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Login;