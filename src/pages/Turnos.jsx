import '../App.css';
import '../styles/turnosPages.css';
import { Link } from 'react-router-dom';
import Fondologinturnos1 from '../assets/Img/Fondologinturnos1.png';
import TI1 from '../assets/Img/TI1.jpg';

function Turnos () {
  return (
    <div className='MainT'>
    <section className="sectioncombos">
        <h2 id="Texturno">Reserva tu turno</h2>
        <form id="formuselec">
          <div className="input-group">
            <label className="input-group-text" htmlFor="servicio">SERVICIO</label>
            <select className="form-select" id="servicio">
              <option defaultValue={'SELECCIONAR SERVICIO'}> SELECCIONAR</option>
              <option value="1">SERVICIO DE MASAJES </option>
              <option value="2">TRATAMIENTOS FACIALES</option>
              <option value="3">NUESTROS RITUALES</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-group-text" htmlFor="dia">DIA</label>
            <select className="form-select" id="dia">
              <option defaultValue={'SELECCIONAR DIA'}>SELECCIONAR</option>
              <option value="1">LUNES</option>
              <option value="2">JUEVES</option>
              <option value="3">SABADOS</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="horario">HORARIO</label>
            <select className="form-select" id="horario">
              <option defaultValue={'SELECCIONAR HORARIO'}>SELECCIONAR</option>
              <option value="1">10 AM</option>
              <option value="2">15 PM</option>
              <option value="3">18 PM</option>
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
              <img src={Fondologinturnos1} className="card-img-top" alt="Masajes" height="250px"/>
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
              <img src={TI1} className="card-img-top" alt="SPA" height="250px"/>
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
    <section id="reserva">
      <article>
        <div className="actions">
          <p id="resumen-solicitud">Resumen de solicitud:</p>
          <p id="texsoli">Masajes corporales; duración de sesion 60 min.
            Profesional asignado: Liliana Rodriguez</p>
          <Link to="*" className="btnTurnos btn-confirm" id="confboton"> Confirmar </Link>
          <Link to="*" className="btnTurnos btn-back" id="volver-btn">Volver</Link>
        </div>
      </article>
    </section>
  </div>
  )
}
export default Turnos;