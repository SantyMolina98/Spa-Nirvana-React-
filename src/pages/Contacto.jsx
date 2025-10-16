import '../App.css';
import '../styles/contactopage.css';

import { Link } from 'react-router-dom';

function Contacto () {
  return (
     <>
        <section id="ContainerMapa">
          <div className="Mapa">
            <h2 id="Contacto"> Vias de acceso para llegar a <br/> Nirvana Spa</h2>
              <iframe
                src="https://www.google.com/maps/embed?pb=!3m2!1ses!2sar!4v1749521577195!5m2!1ses!2sar!6m8!1m7!1sEGPvzTxnSB0jJn6Tlx42Kg!2m2!1d-26.83608255632272!2d-65.20717602975233!3f196.0855845404589!4f10.75751827313735!5f0.7820865974627469"
                width="500" height="550" style="border: 1px;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>    
          </div>
          <div className="Mapa">
            <h3 id="direccion">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
              </svg> Gral. José María Paz 576, <br/> San Miguel de Tucumán, Tucumán
            </h3>
            <h3 id="direccion">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
              </svg> Telefono: 0381 5783 030
            </h3>
            <article id="Bordercaja">
              <h2 id="FormContacto">FORMULARIO DE CONTACTO</h2>
                <div>
                  <label for="exampleFormControlInput1" className="form-label">Nombre*</label>
                   <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Ej: Sofia"/>
                </div>
                <div>
                  <label for="exampleFormControlInput1" className="form-label">Apellido*</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Ej: Rodriguez"/>
                </div>
                <div>
                  <label for="exampleFormControlInput1" className="form-label">Email*</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                </div>
                <div>
                  <label for="exampleFormControlTextarea1" className="form-label">Dejanos tu consulta*</label>
                    <textarea className="form-control" id="exampleFormControlInput1" rows="3"></textarea>       
                </div>
                <div>
                  <Link to="*"><button type='button' className='btn' id='enviarboton'>Enviar</button></Link>
                </div>
              </article>
          </div>
        </section>   
     </>
  )
}
export default Contacto;