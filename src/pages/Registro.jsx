import { Button, Card, Form } from 'react-bootstrap';
import '../App.css';
import '../styles/registroPage.css';
import 'bootstrap';
import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Registro () {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState(0);
  const [domicilio, setDomicilio] = useState('');
  const [provincia, setProvincia] = useState('------');
  const [cpostal, setCpostal] = useState('----');
  const [contrasena, setContrasena] = useState('');
  const [validatedReg, setValidatedReg] = useState(false);
  const navigateReg = useNavigate('')

  function registrar(e){
    e.preventDefault();

    const formReg = e.currentTarget;

    if (formReg.checkValidity() === false) {
      e.stopPropagation();
    } else {
      
      if (nombre.trim().length >= 3 && nombre.trim().length <= 18 && 
        apellido.trim().length >= 2 && apellido.trim().length <= 20 &&
        usuario.trim().length >= 3 && usuario.trim().length <= 18 && 
        email.trim().length >= 11 && email.trim().length <= 30 && 
        telefono.trim().length >= 9 && telefono.trim().length <= 15 && 
        domicilio.trim().length >= 8 && domicilio.trim().length <= 40 && 
        cpostal.trim().length === 4  &&
        contrasena.trim().length >= 6 && contrasena.trim().length <= 25) 
      {
        alert(`Usuario registrado con éxito. ¡Bienvenido/a ${usuario}!`);
        navigateReg('/'); 
      }
    }

    setValidatedReg(true);
  }
  
  return (
    <div className='mainRegistro'>
      <h2>CREAR NUEVO USUARIO</h2>
      <Card className="CardRegistro">   
        <Card.Body className="ContainerRegistro">
          <h4>Ahora ingrese sus datos</h4> 
          <Form noValidate validated={validatedReg} className="FormRegistro" onSubmit={registrar}>
          <Form.Group>
            <Form.Label for="Nombre" name="Nombre" className="TextReg">Nombre:</Form.Label>
            <br/>
            <Form.Control aria-label='Nombre' type="text" name="Nombre" id="Nombre" placeholder="Ingrese su primer nombre" 
              minlength={3} maxlength={18} size="25" 
              value={nombre}
              onClick={(e) => setNombre(e.target.value)}
              required />
              <Form.Control.Feedback type="invalid" className='alerterrorReg'>
                  Su nombre debe tener entre 3 y 18 caracteres.
                </Form.Control.Feedback>
          </Form.Group> <br/>
          <Form.Group>
            <Form.Label for="Apellido" name="Apellido" className="TextReg">Apellido:</Form.Label><br/>
            <Form.Control type="text" name="Apellido" id="Apellido" placeholder="Ingrese su primer apellido" 
            minlength={2} maxlength={20} size="25" 
            value={apellido}
            onClick={(e) => setApellido(e.target.value)}
            required /> 
            <Form.Control.Feedback type="invalid" className='alerterrorReg'>
              Su apellido debe tener entre 2 y 20 caracteres.
            </Form.Control.Feedback>
          </Form.Group>
          <br/>
          <Form.Group>
            <Form.Label for="newuser" name="newuser" className="TextReg">Ingrese su nombre de usuario:</Form.Label><br/>
          <Form.Control type="text" name="newuser" id="newuser" placeholder="ej: Usuario123" 
            minLength={3} maxlength={18} size="20" 
            value={usuario}
            onClick={(e) => setUsuario(e.target.value)}
            required />
            <Form.Control.Feedback type="invalid" className='alerterrorReg'>
              El usuario debe tener entre 3 y 18 caracteres.
            </Form.Control.Feedback>
          </Form.Group>
          <br/>
          <Form.Group>
            <Form.Label for="E-mail" name="E-mail" className="TextReg">Ingrese su e-mail:</Form.Label><br/>
            <Form.Control type="E-mail" id="E-mail" placeholder="ej: usuario123@gmail.com" 
             minLength={11} maxLength={30} size="50"  
             value={email}
             onClick={(e) => setEmail(e.target.value)}
             required /> 
             <Form.Control.Feedback type="invalid" className='alerterrorReg'>
              El usuario debe tener mínimo 10 caracteres.
             </Form.Control.Feedback>
          </Form.Group>
          <br/>
          <Form.Group>
            <Form.Label for="telefono"  className="TextReg">Telefono:</Form.Label><br/>
          <div className="TelefonoF">
            <Form.Control type="text" name="firsttelefono" id="firsttelefono" size="2" placeholder="+54" />
            <Form.Control type="number" name="telefono" id="telefono"  placeholder="Ingrese su N° de Teléfono"
             minLength={9} maxlength={15} size="25" 
             value={telefono}
             onClick={(e) => setTelefono(e.target.value)}
             required />
             <Form.Control.Feedback type="invalid" className='alerterrorReg'>
              Su teléfono debe tener entre 9 y 15 números.
             </Form.Control.Feedback>
          </div> 
          </Form.Group>
          
          <Form.Group>
            <Form.Label for="domicilio" className="TextReg">Domicilio:</Form.Label> <br/>
            <Form.Control type="text" name="domicilio" id="domicilio" placeholder="Ingrese su domicilio actual" 
             minLength={8} maxLength={40} size="50" 
             value={domicilio}
             onClick={(e) => setDomicilio(e.target.value)}         
             required />
             <Form.Control.Feedback type="invalid" className='alerterrorReg'>
              Su domicilio debe tener entre 8 y 40 caracteres.
             </Form.Control.Feedback>
          </Form.Group>
          <br/>
          <Form.Group>
            <Form.Label for="provincia" className="TextReg">Provincia:</Form.Label><br/>
          <select name="provincia" id="selectprovincia" required>
            <option value="-">------</option>
            <option value="Buenos-Aires">Buenos Aires</option>
            <option value="Catamarca">Catamarca</option>
            <option value="Chaco">Chaco</option>
            <option value="Chubut">Chubut</option>
            <option value="CABA">Ciudad Autónoma de Buenos Aires</option>
            <option value="Cordoba">Córdoba</option>
            <option value="Corrientes">Corrientes</option>
            <option value="Entre-Rios">Entre Ríos</option>
            <option value="Formosa">Formosa</option>
            <option value="Jujuy">Jujuy</option>
            <option value="La-Pampa">La Pampa</option>
            <option value="La-Rioja">La Rioja</option>
            <option value="Mendoza">Mendoza</option>
            <option value="Misiones">Misiones</option>
            <option value="Neuquen">Neuquén</option>
            <option value="Rio-Negro">Río Negro</option>
            <option value="Salta">Salta</option>
            <option value="San-Juan">San Juan</option>
            <option value="San-Luis">San Luis</option>
            <option value="Santa-Cruz">Santa Cruz</option>
            <option value="Santa-Fe">Santa Fé</option>
            <option value="Santiago-del-Estero">Santiago del Estero</option>
            <option value="Tierra-del-Fuego">Tierra del Fuego</option>
            <option value="Tucuman">Tucumán</option>
          </select>
          <Form.Control.Feedback type="invalid" className='alerterrorReg'>
           Debe seleccionar una provincia
          </Form.Control.Feedback>
          </Form.Group>
          <br/>
          <Form.Group>
            <Form.Label for="cp" className="TextReg">Código Postal:</Form.Label> <br/>
            <Form.Control type="text" name="cp" id="cp" placeholder="----" 
             maxlength={4} size="4" 
             value={cpostal}
             onClick={(e) => setCpostal(e.target.value)}
             required/> 
             <Form.Control.Feedback type="invalid" className='alerterrorReg'>
              Debe ingresar el Código Postal de su ciudad.
             </Form.Control.Feedback>
          </Form.Group>
          <br/>
          <Form.Group>
            <Form.Label for="contraseña2" className="TextReg">Escriba una contraseña:</Form.Label> <br/>
            <Form.Control type="password" name="contraseña2" id="contraseña2" placeholder="Escriba aquí su contraseña" 
             minLength={6} maxlength={25} size='25'
             value={contrasena}
             onClick={(e) => setContrasena(e.target.value)}
             required /> 
             <Form.Control.Feedback type="invalid" className='alerterrorReg'>
              Su contraseña debe tener entre 6 y 25 caracteres.
             </Form.Control.Feedback>
          </Form.Group>
          <br/>
          <Form.Group><input type="checkbox" name="Recordar" id="Recordar" /><label id="Recordar" for="Recordar" >Guardar contraseña</label></Form.Group>
          
          <div className="BtnRegistro">
            <Button type='submit' className='BotonR'>REGISTRARME</Button>
          </div>
          
          </Form>
        </Card.Body>
      </Card>
  </div>
  )
}

export default Registro;