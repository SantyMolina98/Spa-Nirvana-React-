import { Button } from 'react-bootstrap';
import '../App.css';
import '../styles/contactopage.css';

import { Link } from 'react-router-dom';

function Contacto () {
  return (
     <>
        <section id="MainContacto">
          <article className="Mapa">
            <h3 id="direccion-telefono">
               Podés contactarnos de 08:00 a 22:00  todos los días al siguiente número: <br />
               <i className="bi bi-whatsapp"></i> 0381 5783 030
            </h3>
            <hr className='hrcontacto'/>
            <h3 id="direccion">Nos encontramos en: </h3> 
            <p className='texto-direccion'>Gral. José María Paz 576, San Miguel de Tucumán, Tucumán</p>
            
            <h2 id="Contacto"> <i className="bi bi-geo-alt-fill"></i> Como llegar: </h2>
              <div className='MapaContainer'>
                <iframe title='Mapa-Spa' className='MapaCard' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.106067949513!2d-65.20974192563601!3d-26.836578490025058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1760819200251!5m2!1ses-419!2sar" width="600" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"> 
                </iframe>
              </div>
              
          </article>
          <h2 id="FormContacto">También podés contactarnos por aquí las 24 hs:</h2>
          <article className="ContactoForm">
  
                <div>
                  <label htmlFor="nombre-contacto" className="form-label">Nombre</label>
                   <input type="text" className="form-control" id="nombre-contacto" placeholder="Ej: Sofia"/>
                </div>
                <div>
                  <label htmlFor="apellido-contacto" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="apellido-contacto" placeholder="Ej: Rodriguez"/>
                </div>
                <div>
                  <label htmlFor="email-contacto" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email-contacto" placeholder="name@example.com"/>
                </div>
                <div>
                  <label htmlFor="textarea-contacto" className="form-label">Dejanos tu consulta</label>
                    <textarea className="form-control" id="textarea-contacto" rows="3"></textarea>       
                </div>
                <div>
                  <Link to="*"><Button type='button' className='btnContacto'>Enviar</Button></Link>
                </div>
              
          </article>
        </section>   
     </>
  )
}
export default Contacto;