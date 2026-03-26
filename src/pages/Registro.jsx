import { Button, Card, Form } from "react-bootstrap";
import "../App.css";
import "../styles/registroPage.css";
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_BIENVENIDA_ID = import.meta.env
  .VITE_EMAILJS_TEMPLATE_BIENVENIDA_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function Registro() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [provincia, setProvincia] = useState("------");
  const [cpostal, setCpostal] = useState("");
  const [contrasena, setContrasena] = useState("");

  const [validatedReg, setValidatedReg] = useState(false);
  const navigateReg = useNavigate();

  const { registro } = useContext(UserContext);

  async function registrar(e) {
  e.preventDefault();
  const formReg = e.target;
  setValidatedReg(true);

  if (formReg.checkValidity() === false) {
    e.stopPropagation();
    return;
  }

  try {
    await registro({
      nombre,
      apellido,
      usuario,
      email,
      telefono,
      domicilio,
      provincia,
      cpostal,
      contrasena,
    });

    // Si el usuario se creó, intentamos el email sin romper el flujo
    try {
      const templateParams = {
        name: usuario,
        email: email,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_BIENVENIDA_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      alert("¡Registro exitoso! Te enviamos un email de bienvenida.");
    } catch (emailErr) {
      console.error("Usuario creado, pero falló email de bienvenida:", emailErr);
      alert("¡Registro exitoso! No pudimos enviar el email de bienvenida.");
    }

    navigateReg("/");
  } catch (err) {
    console.error("Error creando usuario:", err);
    alert(err.message || "No se pudo crear el usuario. Intente más tarde.");
  }
}

  return (
    <>
    <section className="bgRegistro">
      <div className="registro-wrapper">
        <div className="registro-card">
          <div className="registro-header">
            <h2>Crear Cuenta</h2>
            <div className="header-line"></div>
          </div>

          <Form
            noValidate
            validated={validatedReg}
            onSubmit={registrar}
            className="registro-form"
          >
            <div className="form-grid-2 mb-3">
              <Form.Group>
                <Form.Label className="registro-label">NOMBRE</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. Ana"
                  minLength={3}
                  maxLength={18}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="registro-input"
                />
                <Form.Control.Feedback type="invalid">
                  Obligatorio (3-18 carac.)
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label className="registro-label">APELLIDO</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. García"
                  minLength={2}
                  maxLength={20}
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                  className="registro-input"
                />
                <Form.Control.Feedback type="invalid">
                  Obligatorio (2-20 carac.)
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <Form.Group className="mb-3">
              <Form.Label className="registro-label">
                NOMBRE DE USUARIO
              </Form.Label>
              <div className="input-icon-wrapper">
                <i className="bi bi-person icon-dentro"></i>
                <Form.Control
                  type="text"
                  placeholder="Tu identificador único"
                  minLength={3}
                  maxLength={18}
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                  className="registro-input con-icono"
                />
              </div>
              <Form.Control.Feedback type="invalid">
                Obligatorio (3-18 carac.)
              </Form.Control.Feedback>
            </Form.Group>
            <div className="form-grid-2 mb-3">
              <Form.Group>
                <Form.Label className="registro-label">E-MAIL</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ana@ejemplo.com"
                  minLength={11}
                  maxLength={45}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="registro-input"
                />
                <Form.Control.Feedback type="invalid">
                  Email válido requerido.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label className="registro-label">TELÉFONO</Form.Label>
                <div className="input-prefijo-wrapper">
                  <span className="prefijo">+54</span>
                  <Form.Control
                    type="number"
                    placeholder="381 000 0000"
                    min={10000000}
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                    className="registro-input con-prefijo"
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  Obligatorio (solo números).
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <Form.Group className="mb-3">
              <Form.Label className="registro-label">DOMICILIO</Form.Label>
              <Form.Control
                type="text"
                placeholder="Calle, número, piso"
                minLength={5}
                maxLength={40}
                value={domicilio}
                onChange={(e) => setDomicilio(e.target.value)}
                required
                className="registro-input"
              />
              <Form.Control.Feedback type="invalid">
                Obligatorio (5-40 carac.)
              </Form.Control.Feedback>
            </Form.Group>
            <div className="form-grid-2 mb-3">
              <Form.Group>
                <Form.Label className="registro-label">PROVINCIA</Form.Label>
                <Form.Select
                  value={provincia}
                  onChange={(e) => setProvincia(e.target.value)}
                  required
                  isInvalid={validatedReg && provincia === "------"}
                  className="registro-input"
                >
                  <option value="------" disabled>
                    Provincia
                  </option>
                  <option value="Buenos Aires">Buenos Aires</option>
                  <option value="Catamarca">Catamarca</option>
                  <option value="Chaco">Chaco</option>
                  <option value="Chubut">Chubut</option>
                  <option value="Ciudad Autonoma de Buenos Aires">Ciudad Autónoma de Buenos Aires</option>
                  <option value="Cordoba">Córdoba</option>
                  <option value="Corrientes">Corrientes</option>
                  <option value="Entre Rios">Entre Ríos</option>
                  <option value="Formosa">Formosa</option>
                  <option value="Jujuy">Jujuy</option>
                  <option value="La Pampa">La Pampa</option>
                  <option value="La Rioja">La Rioja</option>
                  <option value="Mendoza">Mendoza</option>
                  <option value="Misiones">Misiones</option>
                  <option value="Neuquen">Neuquén</option>
                  <option value="Rio Negro">Río Negro</option>
                  <option value="Salta">Salta</option>
                  <option value="San Juan">San Juan</option>
                  <option value="San Luis">San Luis</option>
                  <option value="Santa Cruz">Santa Cruz</option>
                  <option value="Santa Fe">Santa Fé</option>
                  <option value="Santiago del Estero">
                    Santiago del Estero
                  </option>
                  <option value="Tierra del Fuego">Tierra del Fuego</option>
                  <option value="Tucuman">Tucumán</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Seleccione una provincia.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label className="registro-label">
                  CÓDIGO POSTAL
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ej. 4000"
                  min={1000}
                  value={cpostal}
                  onChange={(e) => setCpostal(e.target.value)}
                  required
                  className="registro-input"
                />
                <Form.Control.Feedback type="invalid">
                  Obligatorio (mín 4 num).
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <Form.Group className="mb-4">
              <Form.Label className="registro-label">CONTRASEÑA</Form.Label>
              <div className="input-icon-wrapper">
                <i className="bi bi-lock icon-dentro"></i>
                <Form.Control
                  type="password"
                  placeholder="••••••••"
                  minLength={6}
                  maxLength={25}
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  required
                  className="registro-input con-icono"
                />
              </div>
              <Form.Text className="text-muted" style={{ fontSize: "0.75rem" }}>
                Mínimo 6 caracteres.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Mínimo 6 caracteres.
              </Form.Control.Feedback>
            </Form.Group>
            <button type="submit" className="btn-registro-lujo">
              REGISTRARME <i className="bi bi-arrow-right"></i>
            </button>
            <div className="registro-footer-link">
              ¿Ya tiene una cuenta? <Link to="/login">Iniciar Sesión</Link>
            </div>
          </Form>
        </div>
      </div>
      </section>
    </>
  );
}

export default Registro;
