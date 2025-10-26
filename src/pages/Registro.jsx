import { Button, Card, Form } from 'react-bootstrap';
import '../App.css';
import '../styles/registroPage.css';
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

    const formReg = e.target;

    if (formReg.checkValidity() === false) {
      e.stopPropagation();
    } else {
      
      if (isNaN(nombre) && nombre.trim().length >= 3 && nombre.trim().length <= 18 && 
        isNaN(apellido) && apellido.trim().length >= 2 && apellido.trim().length <= 20 &&
        usuario.trim().length >= 3 && usuario.trim().length <= 18 && 
        email.trim().length >= 11 && email.trim().length <= 30 && 
        !isNaN(telefono) && telefono.trim().length >= 9 && telefono.trim().length <= 15 && 
        domicilio.trim().length >= 8 && domicilio.trim().length <= 40 && 
        !isNaN(cpostal) && cpostal.trim().length === 4  &&
        contrasena.trim().length >= 6 && contrasena.trim().length <= 25) 
      {
        alert(`Usuario registrado con éxito. ¡Bienvenido/a ${usuario}!`);
        navigateReg('/'); 
      }
    }

    setValidatedReg(true);
  }
  
  return (
    <>
    <div className='mainRegistro'>
      <h2 className='h2Reg'>CREAR NUEVO USUARIO</h2>
      <Card className="CardRegistro">   
        <Card.Body className="ContainerRegistro">
          <h4  className='h4Reg'>Ahora ingrese sus datos</h4> 
          <Form noValidate validated={validatedReg} className="FormRegistro" onSubmit={registrar}>
            <Form.Group>
              <Form.Label htmlFor="Nombre" name="Nombre" className="TextReg">Nombre:</Form.Label>
              <br/>
              <Form.Control aria-label='Nombre' type="text" name="Nombre" id="Nombre" placeholder="Ingrese su nombre" 
                minlength={3} maxlength={18} size="25" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                isInvalid={validatedReg && (nombre.trim().length < 3 || nombre.trim().length > 18)}
                isValid={validatedReg && nombre.trim().length >= 3 && nombre.trim().length <= 18}
                required />
                <Form.Control.Feedback type="invalid" className='alerterrorReg'>
                    Debe ingresar su nombre (sin números, entre 3 y 18 caracteres).
                </Form.Control.Feedback>
            </Form.Group> <br/>
            <Form.Group>
              <Form.Label htmlFor="Apellido" name="Apellido" className="TextReg">Apellido:</Form.Label><br/>
              <Form.Control type="text" name="Apellido" id="Apellido" placeholder="Ingrese su primer apellido" 
              minlength={2} maxlength={20} size="25" 
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              isInvalid={validatedReg && (apellido.trim().length < 2 || apellido.trim().length > 20)}
              isValid={validatedReg && apellido.trim().length >= 2 && apellido.trim().length <= 20}
              required /> 
              <Form.Control.Feedback type="invalid" className='alerterrorReg'>
                Debe ingresar su apellido(sin números, entre 2 y 20 caracteres).
              </Form.Control.Feedback>
            </Form.Group>
            <br/>
            <Form.Group>
              <Form.Label htmlFor="newuser" name="newuser" className="TextReg">Ingrese su nombre de usuario:</Form.Label><br/>
            <Form.Control type="text" name="newuser" id="newuser" placeholder="ej: Usuario123" 
              minLength={3} maxlength={18} size="20" 
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              isInvalid={validatedReg && (usuario.trim().length < 3 || usuario.trim().length > 18)}
              isValid={validatedReg && usuario.trim().length >= 3 && usuario.trim().length <= 18}
              required />
              <Form.Control.Feedback type="invalid" className='alerterrorReg'>
                El usuario debe tener entre 3 y 18 caracteres.
              </Form.Control.Feedback>
            </Form.Group>
            <br/>
            <Form.Group>
              <Form.Label htmlFor="E-mail" name="E-mail" className="TextReg">Ingrese su e-mail:</Form.Label><br/>
              <Form.Control type="E-mail" id="E-mail" placeholder="ej: usuario123@gmail.com" 
              minLength={11} maxLength={35} size="50"  
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={validatedReg && (email.trim().length < 11 || email.trim().length > 35)}
              isValid={validatedReg && email.trim().length >= 11 && email.trim().length <= 35}
              required /> 
              <Form.Control.Feedback type="invalid" className='alerterrorReg'>
                Ingrese un email válido(al menos 11 caracteres, @ y .com).
              </Form.Control.Feedback>
            </Form.Group>
            <br/>
            <Form.Group>
              <Form.Label htmlFor="telefono" className="TextReg">Telefono:</Form.Label><br/>
            <div className="TelefonoF">
              <Form.Label name="firsttelefono" id="firsttelefono" size="2" >+54</Form.Label>
              <Form.Control type="number" name="telefono" id="telefono"  placeholder="Ingrese su N° de Teléfono"
              minLength={9} maxlength={15} size="25" 
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              isInvalid={validatedReg && (telefono.trim().length < 9 || telefono.trim().length > 15)}
              isValid={validatedReg && telefono.trim().length >= 9 && telefono.trim().length <= 15}
              required />
              <Form.Control.Feedback type="invalid" className='alerterrorReg'>
                Debe ingresar solo números (entre 9 y 15 dígitos).
              </Form.Control.Feedback>
            </div> 
            </Form.Group>
            
            <Form.Group>
              <Form.Label htmlFor="domicilio" className="TextReg">Domicilio:</Form.Label> <br/>
              <Form.Control type="text" name="domicilio" id="domicilio" placeholder="Ingrese su domicilio actual" 
              minLength={5} maxLength={40} size="50" 
              value={domicilio}
              onChange={(e) => setDomicilio(e.target.value)}
              isInvalid={validatedReg && (domicilio.trim().length < 5 || domicilio.trim().length > 40)}
              isValid={validatedReg && domicilio.trim().length >= 5 && domicilio.trim().length <= 40}         
              required />
              <Form.Control.Feedback type="invalid" className='alerterrorReg'>
                Su domicilio debe tener entre 8 y 40 caracteres.
              </Form.Control.Feedback>
            </Form.Group>
            <br/>
            <Form.Group>
              <Form.Label htmlFor="provincia" className="TextReg">Provincia:</Form.Label><br/>
            <Form.Select name="provincia" id="selectprovincia" defaultValue={'------'} required>
              <option className='option-prov'>------</option>
              <option value="Buenos-Aires" className='option-prov'>Buenos Aires</option>
              <option value="Catamarca" className='option-prov'>Catamarca</option>
              <option value="Chaco" className='option-prov'>Chaco</option>
              <option value="Chubut" className='option-prov'>Chubut</option>
              <option value="CABA" className='option-prov'>Ciudad Autónoma de Buenos Aires</option>
              <option value="Cordoba" className='option-prov'>Córdoba</option>
              <option value="Corrientes" className='option-prov'>Corrientes</option>
              <option value="Entre-Rios" className='option-prov'>Entre Ríos</option>
              <option value="Formosa" className='option-prov'>Formosa</option>
              <option value="Jujuy" className='option-prov'>Jujuy</option>
              <option value="La-Pampa" className='option-prov'>La Pampa</option>
              <option value="La-Rioja" className='option-prov'>La Rioja</option>
              <option value="Mendoza" className='option-prov'>Mendoza</option>
              <option value="Misiones" className='option-prov'>Misiones</option>
              <option value="Neuquen" className='option-prov'>Neuquén</option>
              <option value="Rio-Negro" className='option-prov'>Río Negro</option>
              <option value="Salta" className='option-prov'>Salta</option>
              <option value="San-Juan" className='option-prov'>San Juan</option>
              <option value="San-Luis" className='option-prov'>San Luis</option>
              <option value="Santa-Cruz" className='option-prov'>Santa Cruz</option>
              <option value="Santa-Fe" className='option-prov'>Santa Fé</option>
              <option value="Santiago-del-Estero" className='option-prov'>Santiago del Estero</option>
              <option value="Tierra-del-Fuego" className='option-prov'>Tierra del Fuego</option>
              <option value="Tucuman" className='option-prov'>Tucumán</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid" className='alerterrorReg'>
             Debe seleccionar una provincia
            </Form.Control.Feedback>
            </Form.Group>
            <br/>
            <Form.Group>
              <Form.Label htmlFor="cp" className="TextReg">Código Postal:</Form.Label> <br/>
              <Form.Control type='text' name="cp" id="cp" placeholder="----" 
              maxlength={4} size="4" 
              value={cpostal}
              onChange={(e) => setCpostal(e.target.value)}
              isInvalid={validatedReg && (cpostal.trim().length !== 4)}
              isValid={validatedReg && cpostal.trim().length === 4}
              required/> 
              <Form.Control.Feedback type="invalid" className='alerterrorReg'>
                Debe ingresar el Código Postal de su ciudad.
              </Form.Control.Feedback>
            </Form.Group>
            <br/>
            <Form.Group>
              <Form.Label htmlFor="contraseña2" className="TextReg">Escriba una contraseña:</Form.Label> <br/>
              <Form.Control type="password" name="contraseña2" id="contraseña2" placeholder="Escriba aquí su contraseña" 
              minLength={6} maxlength={25} size='25'
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              isInvalid={validatedReg && (contrasena.trim().length < 6 || contrasena.trim().length > 25)}
              isValid={validatedReg && contrasena.trim().length >= 6 && contrasena.trim().length <= 25}
              required /> 
              <Form.Control.Feedback type="invalid" className='alerterrorReg'>
                Su contraseña debe tener entre 6 y 25 caracteres.
              </Form.Control.Feedback>
            </Form.Group>
            <br/>
            <Form.Group>
              <Form.Check type="checkbox" name="Recordar" id="Recordar" htmlFor="Recordar" label="Guardar contraseña" />
            </Form.Group>
            
            <div className="BtnRegistro">
              <Button type='submit' className='BotonR'>REGISTRARME</Button>
            </div>
          
          </Form>
        </Card.Body>
      </Card>
  </div>
  </>
    
  )
}

export default Registro;