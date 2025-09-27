import '../styles/App.css';
import '../styles/loginPage.css';
import 'bootstrap';
import { Link } from 'react-router-dom';

function Login ()  {
  return (
    <main className='main'>
    <div className="CardIS">
      <h3 className="TitleLOGIN">INICIAR SESIÓN</h3>
      <p className="TextSecLOGIN">¿Sos nuevo/a? <Link to="/login/registro">REGISTRATE</Link></p>
      <div className="FormInicioSesion">
        <form>
          <label for="usuario" name="usuario" className="TextCard">Usuario</label><br/>
          <input type="text" id="usuario" minlength="3" maxlength="15" size="25" placeholder="Ingrese su nombre de usuario" required /><br/>
          <label for="contraseña" name="contraseña" className="TextCard">Contraseña</label><br/>
          <input type="password" name="contraseña" id="contraseña" placeholder="Ingrese su contraseña" required /> <br/>
          <input type="checkbox" name="recuerdame" id="recuerdame" /><label for="recuerdame"  className="TextSecLOGIN" >Recordar usuario y contraseña</label> <br/>
          <div className="ForgivePassword">
            <Link to="*" className="TextSecLOGIN">¿Olvidaste tu contraseña?</Link>
          </div>
         <div className="SectorBTN">
            <Link to="*" ><button type="submit" className="BotonL"><Link to="*">Ingresar</Link></button></Link>
            <Link to="*"><button type="submit" className="BotonL"><Link to="*"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16"><path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/></svg>Continuar con Google</Link></button></Link>
          </div>           
                  
        </form>
      </div>
    </div>
  </main>
  )
}

export default Login;