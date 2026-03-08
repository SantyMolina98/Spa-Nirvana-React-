import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";
import "../styles/contactopage.css";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function Contacto() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const now = new Date();
    const fechaEnvio = `${now.toLocaleDateString()} a las ${now.toLocaleTimeString()}`;

    const templateParams = {
      name: form.current.name.value,
      email: form.current.email.value,
      title: form.current.title.value,
      message: form.current.message.value,
      fecha_registro: fechaEnvio,
    };

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, {
        publicKey: EMAILJS_PUBLIC_KEY,
      })
      .then(
        () => {
          alert("Email enviado con éxito!");
          form.current.reset();
        },
        (error) => {
          console.log("FALLÓ CONEXIÓN...", error);
          alert("Falló al enviar el email. Por favor, intente nuevamente.");
        },
      );
  };

  return (
    <>
      <div className="contacto-wrapper">
        <div className="contacto-header">
          <span className="contacto-subtitle">PONTE EN CONTACTO</span>
          <h1 className="contacto-title">Contacta con Nirvana</h1>
          <p className="contacto-desc">
            Experimenta la tranquilidad y el cuidado profesional. Estamos aquí
            para asistirte en tu viaje hacia el bienestar.
          </p>
        </div>
        <div className="contacto-grid-container">
          <div className="contacto-col-izq">
            <div className="contacto-card card-consulta">
              <div className="card-header-flex">
                <div>
                  <h3 className="card-title-small">
                    <i className="bi bi-clock"></i> Consulta Directa
                  </h3>
                  <p className="consulta-horario">
                    <strong>Disponible para consultas</strong>
                    <br />
                    Lun - Dom: 08:00 AM - 10:00 PM
                  </p>
                </div>
                <a
                  href="https://wa.me/543815783030"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-lujo"
                >
                  <i className="bi bi-chat-dots-fill"></i> Chat en WhatsApp
                </a>
              </div>
            </div>
            <div className="contacto-card card-mapa">
              <h3 className="card-title-small mb-3">
                <i className="bi bi-geo-alt"></i> Cómo llegar
              </h3>
              <div className="mapa-container-lujo">
                <iframe
                  title="Mapa-Spa"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.106067949513!2d-65.20974192563601!3d-26.836578490025058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1760819200251!5m2!1ses-419!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="mapa-iframe"
                ></iframe>
                <div className="mapa-overlay-info">
                  <span>
                    Gral. Paz 576
                    <br />
                    <small>San Miguel de Tucumán</small>
                  </span>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-mapa-pequeno"
                  >
                    Abrir Mapas
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="contacto-col-der">
            <div className="contacto-card card-formulario">
              <h3 className="card-title-medium mb-4">Envía un E-mail</h3>

              <Form ref={form} onSubmit={sendEmail} className="form-lujo">
                <div className="form-grid-2">
                  <Form.Group className="mb-3">
                    <Form.Label className="label-lujo">
                      NOMBRE COMPLETO
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      className="input-lujo"
                      placeholder="Ej. Ana García"
                      minLength={3}
                      maxLength={30}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="label-lujo">
                      CORREO ELECTRÓNICO
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      className="input-lujo"
                      placeholder="ana@ejemplo.com"
                      required
                    />
                  </Form.Group>
                </div>

                <Form.Group className="mb-3">
                  <Form.Label className="label-lujo">ASUNTO</Form.Label>
                  <Form.Select name="title" className="input-lujo" required>
                    <option value="">Selecciona un asunto...</option>
                    <option value="Consulta sobre tratamientos">
                      Consulta sobre tratamientos
                    </option>
                    <option value="Información sobre turnos">
                      Información sobre turnos
                    </option>
                    <option value="Sugerencias o reclamos">
                      Sugerencias o reclamos
                    </option>
                    <option value="Otros">Otros</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="label-lujo">TU MENSAJE</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    className="input-lujo"
                    placeholder="¿Cómo podemos ayudarte hoy?"
                    rows="4"
                    required
                  />
                </Form.Group>

                <Button type="submit" className="btn-enviar-lujo">
                  ENVIAR MENSAJE
                </Button>
              </Form>
            </div>
          </div>
        </div>
        <div className="contacto-footer-info">
          <div className="info-item-foot">
            <i className="bi bi-telephone"></i>
            <h4>Llámanos</h4>
            <p>0381-5783-030</p>
          </div>
          <div className="info-item-foot">
            <i className="bi bi-envelope"></i>
            <h4>Email</h4>
            <p>nirvanaspaybeauty@gmail.com</p>
          </div>
          <div className="info-item-foot">
            <i className="bi bi-share"></i>
            <h4>Redes Sociales</h4>
            <div className="redes-iconos">
              <a href="#">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#">
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Contacto;
