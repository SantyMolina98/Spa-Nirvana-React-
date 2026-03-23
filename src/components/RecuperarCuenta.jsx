import { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { solicitarRecuperacion } from "../helpers/UsuariosApi.js";
import { Link } from "react-router-dom";
import "../styles/recuperar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import imagenMap from '../assets/imagenMap.js';

const RecuperarCuenta = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");
  const [debugLink, setDebugLink] = useState(null);
  const [emptyFields, setEmptyFields] = useState({ email: false });
  const [touchedFields, setTouchedFields] = useState({ email: false });

  const emailTrimmed = email.trim();
  const isEmailFormatValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed);
  const emailInvalid =
    emptyFields.email ||
    (touchedFields.email && emailTrimmed !== "" && !isEmailFormatValid);
  const emailValid = touchedFields.email && emailTrimmed !== "" && isEmailFormatValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setDebugLink(null);

    const nextEmptyFields = { email: emailTrimmed === "" };
    setEmptyFields(nextEmptyFields);
    setTouchedFields({ email: true });

    if (nextEmptyFields.email || !isEmailFormatValid) {
      return;
    }

    try {
      const resp = await solicitarRecuperacion(emailTrimmed);
      setTipoMensaje("success");
      setMensaje(resp.mensaje);
      if (resp.link) {
        setDebugLink(resp.link);
      }
    } catch (error) {
      setTipoMensaje("danger");
      setMensaje("Error al enviar la solicitud");
    }
  };

  return (
    <div className="recuperar-wrapper">
      <div className="recuperar-card">
        <div className="recuperar-brand">
          <img src={imagenMap.logospaheader} alt="logo" className="brand-icon" />
          <span>NIRVANA SPA</span>
        </div>
        <div className="recuperar-banner">
          <img
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            alt="Spa Zen"
          />
        </div>
        <h2 className="recuperar-title">Recuperar Contraseña</h2>
        <p className="recuperar-subtitle">
          Introduce tu correo electrónico para recibir un enlace de recuperación
          seguro.
        </p>
        {mensaje && (
          <Alert variant={tipoMensaje} className="alerta-estilizada">
            {mensaje}
          </Alert>
        )}

        {debugLink ? (
          <div className="d-grid gap-2 mt-3">
            <Alert variant="warning" className="alerta-estilizada">
              <strong>MODO DEBUG:</strong>
              <br />
              Como no enviamos emails reales todavía, haz clic aquí:
            </Alert>
            <a href={debugLink} className="btn-recuperar debug-btn">
              🔗 SIMULAR CLICK EN EL EMAIL
            </a>
          </div>
        ) : (
          !mensaje && (
            <Form noValidate onSubmit={handleSubmit} className="recuperar-form">
              <Form.Group className="mb-4">
                <Form.Label className="recuperar-label">
                  CORREO ELECTRÓNICO
                </Form.Label>
                <div className="input-icon-wrapper">
                  <i className="bi bi-envelope icon-dentro"></i>
                  <Form.Control
                    type="email"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    isInvalid={emailInvalid}
                    isValid={emailValid}
                    onBlur={() => setTouchedFields((prev) => ({ ...prev, email: true }))}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emptyFields.email) {
                        setEmptyFields({ email: false });
                      }
                      if (mensaje) {
                        setMensaje("");
                        setDebugLink(null);
                      }
                    }}
                    required
                    className="recuperar-input"
                  />
                </div>
                {emailInvalid && (
                  <div className="alerterror d-block">
                    {emptyFields.email ? "Completar campo con su email" : "Ingrese un email valido"}
                  </div>
                )}
              </Form.Group>

              <button type="submit" className="btn-recuperar">
                Enviar enlace <i className="bi bi-arrow-right"></i>
              </button>
            </Form>
          )
        )}

        <div className="recuperar-footer-link">
          <Link to="/login">
            <i className="bi bi-arrow-left"></i> Volver al Login
          </Link>
        </div>
      </div>

      <div className="recuperar-help-text">
        ¿Necesitas ayuda? Contacta con nuestro servicio de
        <br />
        atención al cliente de Nirvana Spa.
      </div>
    </div>
  );
};

export default RecuperarCuenta;
