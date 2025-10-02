import '../App.css';
import '../styles/registroPage.css';
import 'bootstrap';
import { Link } from 'react-router-dom';

function Registro () {
  return (
    <main>
      <h2>CREAR NUEVO USUARIO</h2>
      <div className="CardRegistro">   
        <div className="ContainerRegistro">
          <h4>Ahora ingrese sus datos</h4> 
          <form className="FormRegistro" >
          <label for="Nombre" name="Nombre" className="TextReg">Nombre:</label><br/>
          <input type="text" name="Nombre" id="Nombre" placeholder="Ingrese su primer nombre" minlength="3" maxlength="12" size="25" required /> <br/>
          <label for="Apellido" name="Apellido" className="TextReg">Apellido:</label><br/>
          <input type="text" name="Apellido" id="Apellido" placeholder="Ingrese su primer apellido" minlength="3" maxlength="12" size="25" required /> <br/>
          <label for="newuser" name="newuser" className="TextReg">Ingrese su nombre de usuario:</label><br/>
          <input type="text" name="newuser" id="newuser" maxlength="16" placeholder="ej: Usuario123" size="20" required /><br/>
          <label for="E-mail" name="E-mail" className="TextReg">Ingrese su e-mail:</label><br/>
          <input type="E-mail" id="E-mail" placeholder="ej: usuario123@gmail.com" size="50"  required /> <br/>
          <label for="telefono"  className="TextReg">Telefono:</label><br/>
          <div className="TelefonoF">
            <input type="text" name="firsttelefono" id="firsttelefono" size="2" placeholder="+54" />
            <input type="text" name="telefono" id="telefono" maxlength="15" placeholder="Ingrese su N° de Teléfono" size="25" required />
          </div> 
          <label for="domicilio" className="TextReg">Domicilio:</label> <br/>
          <input type="text" name="domicilio" id="domicilio" placeholder="Ingrese su domicilio actual" size="35" required /><br/>
          <label for="ciudad" className="TextReg">Ciudad:</label><br/>
          <select name="ciudad" id="selectciudad" required>
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
          <br/>
          <label for="cp" className="TextReg">Código Postal:</label> <br/>
          <input type="text" name="cp" id="cp" placeholder="----" size="4" maxlength="5" /> <br/>
          <label for="contraseña2" className="TextReg">Escriba una contraseña:</label> <br/>
          <input type="password" name="contraseña2" id="contraseña2" maxlength="20" size="25" placeholder="Escriba aquí su contraseña" required /> <br/>
          <input type="checkbox" name="Recordar" id="Recordar" /><label id="Recordar" for="Recordar" >Guardar contraseña</label>
          <div className="BtnRegistro">
            <Link to="*"><input type="button" className="BotonR" name="Agregar-Usuario"  value="REGISTRARME" /></Link>
          </div>
          
          </form>
        </div>
      </div>
  </main>
  )
}

export default Registro;