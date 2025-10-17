import { Button } from 'react-bootstrap';
import '../App.css';
import '../styles/contactopage.css';

import { Link } from 'react-router-dom';

function Contacto () {
  return (
     <>
        <section id="ContainerMapa">
          <div className="Mapa">
            <h2 id="Contacto"> Vias de acceso para llegar a <br/> Nirvana Spa</h2>
              
          </div>
          <div className="Mapa">
            <h3 id="direccion">
             Gral. José María Paz 576, <br/> San Miguel de Tucumán, Tucumán
            </h3>
            <h3 id="direccion-telefono">
               Telefono: 0381 5783 030
            </h3>
            <article id="Bordercaja">
              <h2 id="FormContacto">FORMULARIO DE CONTACTO</h2>
                <div>
                  <label htmlFor="nombre-contacto" className="form-label">Nombre</label>
                   <input type="text" className="form-control" id="nombre-contacto" placeholder="Ej: Sofia"/>
                </div>
                <div>
                  <label htmlFor="apellido-contacto" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="apellido-contacto" placeholder="Ej: Rodriguez"/>
                </div>
                <div>
                  <label htmlFor="email-contacto" className="form-label">Email*</label>
                    <input type="email" className="form-control" id="email-contacto" placeholder="name@example.com"/>
                </div>
                <div>
                  <label htmlFor="textarea-contacto" className="form-label">Dejanos tu consulta*</label>
                    <textarea className="form-control" id="textarea-contacto" rows="3"></textarea>       
                </div>
                <div>
                  <Link to="*"><Button type='button' className='btn'>Enviar</Button></Link>
                </div>
              </article>
          </div>
        </section>   
     </>
  )
}
export default Contacto;