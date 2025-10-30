import '../App.css';
import '../styles/turnosPages.css';
import { Link } from 'react-router-dom';
import imagenMap from '../assets/imagenMap.js';

function Turnos () {
  return (
    <div className='MainT'>
    <section className="sectioncombos">
        <h2 id="Texturno">Reserva tu turno</h2>
        <form id="formuselec">
          <div className="input-group">
            <label className="input-group-text" htmlFor="servicio">SERVICIO</label>
            <select className="form-select" id="servicio">
              <option defaultValue={'SELECCIONAR SERVICIO'}> SELECCIONAR SERVICIO</option>
              <option value="servicio-masaje">SERVICIO DE MASAJES </option>
              <option value="servicio-trat-facial">TRATAMIENTOS FACIALES</option>
              <option value="servicio-rituales">NUESTROS RITUALES</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-group-text" htmlFor="dia">DIA</label>
            <select className="form-select" id="dia">
              <option defaultValue={'SELECCIONAR DIA'}>SELECCIONAR DIA</option>
              <input type="datetime" name="" id="" />
              <option value="lunes">LUNES</option>
              <option value="jueves">JUEVES</option>
              <option value="sabado">SABADOS</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="horario">HORARIO</label>
            <select className="form-select" id="horario">
              <option defaultValue={'SELECCIONAR HORARIO'}>SELECCIONAR HORARIO</option>
              <option value="horario-1">10 AM</option>
              <option value="horario-2">15 PM</option>
              <option value="horario-3">18 PM</option>
            </select>
            </div>
        <div className="input-group">
           <span className="input-group-text" id="total-pagar">Total a Pagar:</span>
          <span className="input-group-text" id="precio-total">$ 105.000</span>
        </div>
      </form>
    </section>
    <section>
      <article className="Tarjetaeliminar">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          <div>
            <div className="card">
              <img src={imagenMap.Fondologinturnos1} className="card-img-top" alt="Masajes" height="250px"/>
              <div className="card-body">
                <h5 className="card-title">Servicio de Masajes</h5>
                <p className="card-text">Sumérgete en un oasis de calma y renueva tu energía con nuestros masajes
                  terapéuticos reparadores. Renovacion completa garantizada </p>
                <Link to="*" className="btnTurnos">Eliminar turno</Link>
              </div>
            </div>
          </div>
          <div>
            <div className="card">
              <img src={imagenMap.TI1} className="card-img-top" alt="SPA" height="250px"/>
              <div className="card-body">
                <h5 className="card-title">Servicio Faciales</h5>
                <p className="card-text">Experimenta la revitalización profunda de tu piel con nuestros tratamientos
                  faciales exclusivos. Diseñados para cada tipo de piel.</p>
                <Link to="*" className="btnTurnos">Eliminar turno</Link>
              </div>
            </div>
        </div>
      </div>
      </article>
    </section>
    {/* <section id="reserva">
      <article>
        <div className="actions">
          <p id="resumen-solicitud">Resumen de solicitud:</p>
          <p id="texsoli">Masajes corporales; duración de sesion 60 min.
            Profesional asignado: Liliana Rodriguez</p>
          <Link to="*" className="btnTurnos btn-confirm" id="confboton"> Confirmar </Link>
          <Link to="*" className="btnTurnos btn-back" id="volver-btn">Volver</Link>
        </div>
      </article>
    </section> */}
  </div>
  )
}
export default Turnos;