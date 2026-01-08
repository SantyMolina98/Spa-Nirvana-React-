import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';
import '../styles/contactopage.css';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function Contacto () {
  
 const form = useRef();

 const sendEmail = (e) => {
  e.preventDefault();

  emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current, EMAILJS_PUBLIC_KEY)
    .then(
      () => {
        alert('Email enviado con éxito!');
        form.current.reset();
      },
      (error) => {
        console.log('FALLÓ CONEXIÓN...', error);
        alert('Falló al enviar el email. Por favor, intente nuevamente!');
      }
    )
 }

  return (
     <>
      <section id="MainContacto">
        <article className="Mapa">
          <div className="aesthetic-card">
           <i className="bi bi-clock-history aesthetic-icon"></i>
           <h1 className="aesthetic-title">CONSULTA DIRECTA</h1>
           <p className="aesthetic-text">
          <span>Disponible:</span> 08:00 a 22:00 hs <br />Todos los días</p>
          <div className="space-y-4">
            <a href="https://wa.me/543815783030" target="_blank" 
               className="aesthetic-button">
                <i className="bi bi-whatsapp"></i>
                <span> 0381-5783-030</span>
            </a>
        </div>
        <p className="aesthetic-footer-text">
            Hacé click para iniciar el chat. Respondemos al instante.
        </p>
        </div>
          <hr className='hrcontacto'/>
          <h3 id="direccion">Nos encontramos en: </h3> 
          <p className='texto-direccion'>Gral. José María Paz 576, San Miguel de Tucumán, Tucumán</p>      
          <h2 id="Contacto"> <i className="bi bi-geo-alt-fill"></i> Cómo llegar: </h2>
            <div className='MapaContainer'>
              <iframe title='Mapa-Spa' className='MapaCard' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.106067949513!2d-65.20974192563601!3d-26.836578490025058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1760819200251!5m2!1ses-419!2sar" width="600" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"> 
              </iframe>
            </div>           
        </article>
         <hr className='hrcontacto'/>
        <h2 id="FormContacto">Nuestro equipo está disponible las 24 horas. Envíe su consulta aquí:</h2>
        <article className="ContactoForm">
          <Form ref={form} onSubmit={sendEmail}>
            <Form.Group className="mb-3" id="formBasicEmail">
              <Form.Label htmlFor="nombre-contacto" className="form-label" name="nombre-contacto">Nombre</Form.Label>
                <Form.Control type="text" name='user_name' className="form-control" id="nombre-contacto" placeholder="Ej: Sofia" 
                minLength={3} maxLength={30}
                required/>
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label htmlFor="apellido-contacto" className="form-label" name="apellido-contacto">Apellido</Form.Label>
              <Form.Control type="text" name='user_lastname' className="form-control" id="apellido-contacto" placeholder="Ej: Rodriguez" required/>
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label htmlFor="email-contacto" className="form-label" name="email-contacto">Email</Form.Label>
              <Form.Control type="email" name='user_email' className="form-control" id="email-contacto" placeholder="name@example.com" required/>
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label htmlFor="textarea-contacto" className="form-label">Dejanos tu consulta</Form.Label>
              <Form.Control as="textarea" name="message" id="textarea-contacto" placeholder='Escriba aquí su consulta' rows="3" required/>
            </Form.Group>
              <Button variant='primary' type='submit' className='btnContacto'>Enviar</Button>
          </Form>  
          </article>
        </section>   
     </>
  )
}
export default Contacto;