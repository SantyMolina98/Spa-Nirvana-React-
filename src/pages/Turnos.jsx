import '../App.css';
import '../styles/turnosPages.css';
import { Link } from 'react-router-dom';
import imagenMap from '../assets/imagenMap.js';
import { Form } from 'react-bootstrap';

function Turnos () {
  

  return (
    <div className='MainT'>
    <section className="sectioncombos">
        <h2 id="Texturno">Reserva tu turno</h2>
        <Form id="formuselec">
          <div className="input-group">
            <Form.Label className="input-group-text" htmlFor="categoria">CATEGORÍA</Form.Label>
            <Form.Select className="form-select" id="categoriaturno">
              <option defaultValue={'SELECCIONAR CATEGORÍA'}> SELECCIONAR CATEGORÍA</option>
              <option value="servicio-trat-facial">TRATAMIENTOS FACIALES</option>
              <option value="servicio-rituales">NUESTROS RITUALES</option>
            </Form.Select>
            
          </div>
          <div className="input-group">
            <Form.Label className="input-group-text" htmlFor="servicio-tipo">TIPO DE SERVICIO</Form.Label>
            <Form.Select>
                <option value="servicio-tratamiento-facial">SERVICIO DE TRATAMIENTOS FACIALES</option>
                <option value="servicio-essential-face-care">Essential Face Care</option>
                <option value="servicio-glowing-vit-c">Glowing Vit C+</option>
                <option value="servicio-rebalancing-face-care">Rebalancing Face Care</option>
                <option value="servicio-glowing-roses">Glowing Roses</option>
              </Form.Select>
              <Form.Select>
                <option value="servicio-tratamiento-facial">SERVICIO DE TRATAMIENTOS CORPORALES</option>
                <option value="servicio-ceremonia-liwen">Ceremonia Liwen</option>
                <option value="servicio-ceremonia-ragiantu">Ceremonia Ragiantu</option>
              </Form.Select>
              <Form.Select>
                <option value="servicio-tratamiento-facial">SERVICIO DE MASAJES</option>
                <option value="servicio-masaje-sueco">Masaje Sueco</option>
                <option value="servicio-masaje-hot-stones">Masaje Hot Stones</option>
                <option value="servicio-masaje-deep-tissue">Masaje Deep Tissue</option>
                <option value="servicio-masaje-signature">Masaje Signature</option>
              </Form.Select>
              <Form.Select>
                <option value="servicio-tratamiento-facial">SERVICIO DE MASAJES CON AROMATERAPIA</option>
                <option value="servicio-purificante">Purificante</option>
                <option value="servicio-relajante">Relajante</option>
                <option value="servicio-estimulante">Estimulante</option>
              </Form.Select>
              <Form.Select>
                <option value="servicio-tratamiento-facial">SERVICIO DE RITUALES</option>
                <option value="servicio-ritual-nirvana-escape">Ritual Nirvana Escape</option>
                <option value="servicio-ritual-mind-soul">Ritual Mind & Soul</option>
                <option value="servicio-ritual-afflora">Ritual Afflora</option>
                <option value="servicio-ritual-mulfem">Ritual Mülfem</option>
                <option value="servicio-ritual-unad">Ritual Üñad</option>
                <option value="servicio-ritual-urkutun">Ritual Ürkutun</option>
              </Form.Select>
          </div>
          <div className="input-group">
            <Form.Label className="input-group-text" htmlFor="dia">DIA</Form.Label>
            <Form.Select className="form-select" id="dia">
              <option defaultValue={'SELECCIONAR DIA'}>SELECCIONAR DIA</option>
              
              <option value="lunes">LUNES</option>
              <option value="jueves">JUEVES</option>
              <option value="sabado">SABADOS</option>
            </Form.Select>
          </div>
          <div className="input-group mb-3">
            <Form.Label className="input-group-text" htmlFor="horario">HORARIO</Form.Label>
            <Form.Select className="form-select" id="horario">
              <option defaultValue={'SELECCIONAR HORARIO'}>SELECCIONAR HORARIO</option>
              <option value="horario-1">10 AM</option>
              <option value="horario-2">15 PM</option>
              <option value="horario-3">18 PM</option>
            </Form.Select>
          </div>
        {/* <div className="input-group">
           <span className="input-group-text" id="total-pagar">Total a Pagar:</span>
          <span className="input-group-text" id="precio-total">$ 105.000</span>
        </div> */}
      </Form>
    </section>
    <hr className='hrturnos'/>
    <section>
      <article className="turnos-reservados">
        <h3>Turnos Reservados</h3>
        <hr className='hrturnos'/>
      </article>
    </section>
    {/* <section>
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
    </section> */}
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