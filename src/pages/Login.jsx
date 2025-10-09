import { useState } from 'react';
import '../App.css';
import '../styles/loginPage.css';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Login () {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  

  
  return (
    <div className='mainLogin'>
    <Card className='cardLogin colorcard'>
      <h3 className='colorcard'>INICIAR SESIÓN</h3>
      <Card.Body className='bodyCard colorcard'>
      <p className='colorcard'>¿Sos nuevo/a? <Link to="/login/registro"  className='linkLogin colorcard'>REGISTRATE</Link></p>
        <Form className="FormInicioSesion colorcard" >   
          <Form.Group className="mb-3 colorcard" controlId="formGroupUser">
            <Form.Label id='usuario' className='textlogin colorcard'>Usuario</Form.Label>
            <Form.Control placeholder="Ingrese su usuario" aria-label="Username" name='usuario' aria-describedby="basic-addon1" required/>
          </Form.Group>
          <Form.Group className="mb-3 colorcard" controlId="formBasicPassword">
            <Form.Label id='contrasenia' className='textlogin colorcard'>Password</Form.Label>
            <Form.Control type="password" name='contrasenia' placeholder="Password" />
          </Form.Group>          
          <Form.Check id='recordar-contraseña' className='form-check colorcard' label='Recordar contraseña' aria-label='Recordar contraseña' />
          <div className='sectorBotones colorcard'>
            <Button variant="primary" type='submit' className='botonesLogin' size="lg">Iniciar Sesión</Button>
            <br />
            <Button variant="primary" className='botonesLogin' size="lg">Continuar con Google</Button>
          </div>     
        </Form>
        
      </Card.Body>
    </Card>
  </div>
  );
};

export default Login;