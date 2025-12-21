import { Button, Card, Form } from 'react-bootstrap';
import '../App.css';
import '../styles/registroPage.css';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Registro () {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [provincia, setProvincia] = useState('------');
  const [cpostal, setCpostal] = useState('');
  const [contrasena, setContrasena] = useState('');
  
  const [validatedReg, setValidatedReg] = useState(false);
  const navigateReg = useNavigate();

  const { registro } = useContext(UserContext);

  async function registrar(e){
    e.preventDefault();
    const formReg = e.target;
    setValidatedReg(true);
    if (formReg.checkValidity() === false) {
      e.stopPropagation();
      return; 
    } 
    try {
        await registro({
                nombre, 
                apellido, 
                usuario, 
                email, 
                telefono, 
                domicilio, 
                provincia, 
                cpostal, 
                contrasena
        });

        alert('Registro exitoso!');
        navigateReg('/'); 

    } catch (err) {
        console.error(err);
        alert('No se pudo crear el usuario. Intente más tarde.');
    }
}
  
  return (
    <>
    <div className='mainRegistro'>
      <h2 className='h2Reg'>CREAR NUEVO USUARIO</h2>
      <Card className="CardRegistro">   
        <Card.Body className="ContainerRegistro">
          <h4  className='h4Reg'>Ahora ingrese sus datos</h4> 
          
          <Form noValidate validated={validatedReg} className="FormRegistro" onSubmit={registrar}>
            
            {/* NOMBRE */}
            <Form.Group>
              <Form.Label className="TextReg">Nombre:</Form.Label>
              <br/>
              <Form.Control 
                type="text" 
                placeholder="Ingrese su nombre" 
                minLength={3} maxLength={18} 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required 
              />
              <Form.Control.Feedback type="invalid" className='alerterrorReg'>
                  Campo obligatorio (3-18 caracteres).
              </Form.Control.Feedback>
            </Form.Group> 
            <br/>

            {/* APELLIDO */}
            <Form.Group>
              <Form.Label className="TextReg">Apellido:</Form.Label><br/>
              <Form.Control 
                type="text" 
                placeholder="Ingrese su apellido" 
                minLength={2} maxLength={20} 
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required 
              /> 
              <Form.Control.Feedback type="invalid" className='alerterrorReg'>
                Campo obligatorio (2-20 caracteres).
              </Form.Control.Feedback>
            </Form.Group>
            <br/>

            {/* USUARIO */}
            <Form.Group>
              <Form.Label className="TextReg">Nombre de usuario:</Form.Label><br/>
            <Form.Control 
                type="text" 
                placeholder="ej: Usuario123" 
                minLength={3} maxLength={18} 
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required 
            />
              <Form.Control.Feedback type="invalid" className='alerterrorReg'>
                Campo obligatorio (3-18 caracteres).
              </Form.Control.Feedback>
            </Form.Group>
            <br/>

            {/* EMAIL (El type="email" valida el formato básico automáticamente) */}
            <Form.Group>
              <Form.Label className="TextReg">E-mail:</Form.Label><br/>
              <Form.Control 
                type="email" 
                placeholder="ej: usuario123@gmail.com" 
                minLength={11} maxLength={45} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              /> 
              <Form.Control.Feedback type="invalid" className='alerterrorReg'>
                Ingrese un email válido.
              </Form.Control.Feedback>
            </Form.Group>
            <br/>

            {/* TELÉFONO */}
            <Form.Group>
              <Form.Label className="TextReg">Telefono:</Form.Label><br/>
            <div className="TelefonoF">
              <Form.Label size="2" >+54</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Ingrese su N° de Teléfono"
                min={18} // Validación básica de nro
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required 
              />
              <Form.Control.Feedback type="invalid" className='alerterrorReg'>
                Campo obligatorio (solo números).
              </Form.Control.Feedback>
            </div> 
            </Form.Group>
            
            {/* DOMICILIO */}
            <Form.Group>
              <Form.Label className="TextReg">Domicilio:</Form.Label> <br/>
              <Form.Control 
                type="text" 
                placeholder="Ingrese su domicilio actual" 
                minLength={5} maxLength={40} 
                value={domicilio}
                onChange={(e) => setDomicilio(e.target.value)}
                required 
              />
              <Form.Control.Feedback type="invalid" className='alerterrorReg'>
                Campo obligatorio (5-40 caracteres).
              </Form.Control.Feedback>
            </Form.Group>
            <br/>

            {/* PROVINCIA */}
            <Form.Group>
              <Form.Label className="TextReg">Provincia:</Form.Label><br/>
            <Form.Select 
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)} 
                required
                isInvalid={validatedReg && provincia === '------'} // Validación manual simple para el select
            >
              <option value="------" disabled>------</option>
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
            </Form.Select>
            <Form.Control.Feedback type="invalid" className='alerterrorReg'>
             Debe seleccionar una provincia
            </Form.Control.Feedback>
            </Form.Group>
            <br/>

            {/* CÓDIGO POSTAL */}
            <Form.Group>
              <Form.Label className="TextReg">Código Postal:</Form.Label> <br/>
              <Form.Control 
                type='number' 
                placeholder="----" 
                min={4}
                value={cpostal}
                onChange={(e) => setCpostal(e.target.value)}
                required
              /> 
              <Form.Control.Feedback type="invalid" className='alerterrorReg'>
                Campo obligatorio (4 números).
              </Form.Control.Feedback>
            </Form.Group>
            <br/>

            {/* CONTRASEÑA */}
            <Form.Group>
              <Form.Label className="TextReg">Escriba una contraseña:</Form.Label> <br/>
              <Form.Control 
                type="password" 
                placeholder="Escriba aquí su contraseña" 
                minLength={6} maxLength={25}
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required 
              /> 
              <Form.Control.Feedback type="invalid" className='alerterrorReg'>
                Mínimo 6 caracteres.
              </Form.Control.Feedback>
            </Form.Group>
            <br/>

            <Form.Group>
              <Form.Check type="checkbox" label="Guardar contraseña" />
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