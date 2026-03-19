import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { restablecerContrasena } from "../helpers/UsuariosApi.js";
import "../styles/recuperar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import imagenMap from "../assets/imagenMap.js";

const NuevaPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");
  const [emptyFields, setEmptyFields] = useState({ password: false });
  const [touchedFields, setTouchedFields] = useState({ password: false });

  const passwordTrimmed = password.trim();
  const isPasswordLengthValid = passwordTrimmed.length >= 6;
  const passwordInvalid =
    emptyFields.password ||
    (touchedFields.password && passwordTrimmed !== "" && !isPasswordLengthValid);
  const passwordValid =
    touchedFields.password && passwordTrimmed !== "" && isPasswordLengthValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextEmptyFields = { password: passwordTrimmed === "" };
    setEmptyFields(nextEmptyFields);
    setTouchedFields({ password: true });
    setMensaje("");

    if (nextEmptyFields.password || !isPasswordLengthValid) {
      return;
    }

    try {
      const resp = await restablecerContrasena(token, passwordTrimmed);

      if (resp.mensaje === "Contraseña restablecida correctamente") {
        setTipoMensaje("success");
        setMensaje("Contrasena actualizada. Ahora puedes iniciar sesion.");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setTipoMensaje("danger");
        setMensaje(resp.mensaje || "Hubo un error");
      }
    } catch (error) {
      setTipoMensaje("danger");
      setMensaje("El enlace es invalido o ha expirado.");
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
        {mensaje && (
          <Alert variant={tipoMensaje} className="alerta-estilizada">
            {mensaje}
          </Alert>
        )}

        <Form noValidate onSubmit={handleSubmit} className="recuperar-form">
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
                isInvalid={passwordInvalid}
                isValid={passwordValid}
                onBlur={() => setTouchedFields((prev) => ({ ...prev, password: true }))}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (emptyFields.password) {
                    setEmptyFields({ password: false });
                  }
                  if (mensaje) {
                    setMensaje("");
                  }
                }}
                minLength={6}
                required
                className="recuperar-input"
              />
            </div>
            {passwordInvalid && (
              <div className="alerterror d-block">
                {emptyFields.password ? "Completar campo con su contraseña" : "Minimo 6 caracteres."}
              </div>
            )}
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
