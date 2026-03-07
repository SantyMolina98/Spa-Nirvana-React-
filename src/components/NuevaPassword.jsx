import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { restablecerContrasena } from "../helpers/UsuariosApi.js";
import "../styles/recuperar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import imagenMap from "../assets/imagenMap.js";

const NuevaPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await restablecerContrasena(token, password);

      if (resp.mensaje === "Contraseña restablecida correctamente") {
        alert("¡Contraseña actualizada! Ahora puedes iniciar sesión.");
        navigate("/login");
      } else {
        alert(resp.mensaje || "Hubo un error");
      }
    } catch (error) {
      alert("El enlace es inválido o ha expirado.");
    }
  };

  return (
    <div className="recuperar-wrapper">
      <div className="recuperar-card">
        <div className="recuperar-brand">
          <img
            src={imagenMap.logospaheader}
            alt="logo"
            className="brand-icon"
          />
          <span>NIRVANA SPA</span>
        </div>
        <div className="recuperar-banner">
          <img
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            alt="Spa Zen"
          />
        </div>
        <h2 className="recuperar-title">Nueva Contraseña</h2>
        <p className="recuperar-subtitle">
          Crea una nueva contraseña segura para tu cuenta en Nirvana Spa.
        </p>
        <Form onSubmit={handleSubmit} className="recuperar-form">
          <Form.Group className="mb-4">
            <Form.Label className="recuperar-label">
              NUEVA CONTRASEÑA
            </Form.Label>

            <div className="input-icon-wrapper">
              <i className="bi bi-lock icon-dentro"></i>
              <Form.Control
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
                className="recuperar-input"
              />
            </div>
          </Form.Group>

          <button type="submit" className="btn-recuperar">
            Cambiar Contraseña <i className="bi bi-check2-circle ms-2"></i>
          </button>
        </Form>
      </div>

      <div className="recuperar-help-text">
        ¿Necesitas ayuda? Contacta con nuestro servicio de
        <br />
        atención al cliente de Nirvana Spa.
      </div>
    </div>
  );
};

export default NuevaPassword;
