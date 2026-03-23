import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { crearUsuario, actualizarUsuario, eliminarUsuario } from '../helpers/UsuariosApi';

export function ModalAgregarUsuario({ show, onHide, onSave }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [provincia, setProvincia] = useState('------');
  const [cpostal, setCpostal] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rol, setRol] = useState('Usuario');
  const [touchedFields, setTouchedFields] = useState({
    nombre: false,
    apellido: false,
    usuario: false,
    email: false,
    telefono: false,
    domicilio: false,
    provincia: false,
    cpostal: false,
    contrasena: false,
  });

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const provincias = [
    '------', 'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Ciudad de Buenos Aires',
    'Cordoba', 'Corrientes', 'Entre Rios', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja',
    'Mendoza', 'Misiones', 'Neuquen', 'Rio Negro', 'Salta', 'San Juan', 'San Luis',
    'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucuman'
  ];

  const nombreTrimmed = nombre.trim();
  const apellidoTrimmed = apellido.trim();
  const usuarioTrimmed = usuario.trim();
  const emailTrimmed = email.trim();
  const telefonoTrimmed = telefono.trim();
  const domicilioTrimmed = domicilio.trim();
  const cpostalTrimmed = cpostal.trim();
  const contrasenaTrimmed = contrasena.trim();

  const nombreLongitudValida = nombreTrimmed.length >= 3 && nombreTrimmed.length <= 18;
  const apellidoLongitudValida = apellidoTrimmed.length >= 2 && apellidoTrimmed.length <= 20;
  const usuarioLongitudValida = usuarioTrimmed.length >= 3 && usuarioTrimmed.length <= 18;
  const emailLongitudValida = emailTrimmed.length >= 11 && emailTrimmed.length <= 45;
  const emailFormatoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed);
  const telefonoValido = /^\d+$/.test(telefonoTrimmed) && Number(telefonoTrimmed) >= 10000000;
  const domicilioLongitudValida = domicilioTrimmed.length >= 5 && domicilioTrimmed.length <= 40;
  const cpostalValido = /^\d+$/.test(cpostalTrimmed) && Number(cpostalTrimmed) >= 1000;
  const contrasenaLongitudValida = contrasenaTrimmed.length >= 6 && contrasenaTrimmed.length <= 25;

  const shouldValidate = (fieldName) => submitAttempted || touchedFields[fieldName];

  const resetForm = () => {
    setNombre('');
    setApellido('');
    setUsuario('');
    setEmail('');
    setTelefono('');
    setDomicilio('');
    setProvincia('------');
    setCpostal('');
    setContrasena('');
    setRol('Usuario');
    setError('');
    setFieldErrors({});
    setSubmitAttempted(false);
    setTouchedFields({
      nombre: false,
      apellido: false,
      usuario: false,
      email: false,
      telefono: false,
      domicilio: false,
      provincia: false,
      cpostal: false,
      contrasena: false,
    });
  };

  const handleClose = () => {
    resetForm();
    onHide();
  };

  const handleSave = async () => {
    setSubmitAttempted(true);
    setTouchedFields({
      nombre: true,
      apellido: true,
      usuario: true,
      email: true,
      telefono: true,
      domicilio: true,
      provincia: true,
      cpostal: true,
      contrasena: true,
    });

    const nextFieldErrors = {};

    if (!nombreTrimmed || !nombreLongitudValida) {
      nextFieldErrors.nombre = 'Obligatorio (3-18 carac.)';
    }
    if (!apellidoTrimmed || !apellidoLongitudValida) {
      nextFieldErrors.apellido = 'Obligatorio (2-20 carac.)';
    }
    if (!usuarioTrimmed || !usuarioLongitudValida) {
      nextFieldErrors.usuario = 'Obligatorio (3-18 carac.)';
    }
    if (!emailTrimmed || !emailLongitudValida || !emailFormatoValido) {
      nextFieldErrors.email = 'Email valido requerido.';
    }
    if (!telefonoTrimmed || !telefonoValido) {
      nextFieldErrors.telefono = 'Obligatorio (solo numeros).';
    }
    if (!domicilioTrimmed || !domicilioLongitudValida) {
      nextFieldErrors.domicilio = 'Obligatorio (5-40 carac.)';
    }
    if (provincia === '------') {
      nextFieldErrors.provincia = 'Seleccione una provincia.';
    }
    if (!cpostalTrimmed || !cpostalValido) {
      nextFieldErrors.cpostal = 'Obligatorio (min 4 num).';
    }
    if (!contrasenaTrimmed || !contrasenaLongitudValida) {
      nextFieldErrors.contrasena = 'Minimo 6 caracteres.';
    }

    setFieldErrors(nextFieldErrors);

    if (Object.keys(nextFieldErrors).length > 0) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const datosAEnviar = {
        nombre: nombreTrimmed,
        apellido: apellidoTrimmed,
        username: usuarioTrimmed,
        correo: emailTrimmed,
        telefono: telefonoTrimmed,
        domicilio: domicilioTrimmed,
        ciudad: provincia,      
        codpostal: Number(cpostalTrimmed), 
        password: contrasenaTrimmed,
        rol: rol
      };

      const nuevoUsuario = await crearUsuario(datosAEnviar);

      if (nuevoUsuario.errors) {
        setError("Error del servidor: " + nuevoUsuario.errors[0].msg);
        setLoading(false);
        return;
      }
      if (nuevoUsuario.msg) {
        setError("Error: " + nuevoUsuario.msg);
        setLoading(false);
        return;
      }

      onSave(nuevoUsuario);
      resetForm();
    } catch (err) {
      console.error('Error al crear usuario:', err);
      setError('Error al crear usuario: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form>
          <div className="row g-3">
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                minLength={3}
                maxLength={18}
                onBlur={() => setTouchedFields((prev) => ({ ...prev, nombre: true }))}
                onChange={e => {
                  setNombre(e.target.value);
                  if (fieldErrors.nombre) {
                    setFieldErrors((prev) => ({ ...prev, nombre: '' }));
                  }
                }}
                placeholder="Ej. Ana"
                isInvalid={shouldValidate('nombre') && !!fieldErrors.nombre}
                isValid={shouldValidate('nombre') && nombreLongitudValida && !fieldErrors.nombre}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid" className="alerterror">
                {fieldErrors.nombre || 'Obligatorio (3-18 carac.)'}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                value={apellido}
                minLength={2}
                maxLength={20}
                onBlur={() => setTouchedFields((prev) => ({ ...prev, apellido: true }))}
                onChange={e => {
                  setApellido(e.target.value);
                  if (fieldErrors.apellido) {
                    setFieldErrors((prev) => ({ ...prev, apellido: '' }));
                  }
                }}
                placeholder="Ej. Garcia"
                isInvalid={shouldValidate('apellido') && !!fieldErrors.apellido}
                isValid={shouldValidate('apellido') && apellidoLongitudValida && !fieldErrors.apellido}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid" className="alerterror">
                {fieldErrors.apellido || 'Obligatorio (2-20 carac.)'}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="row g-3">
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                value={usuario}
                minLength={3}
                maxLength={18}
                onBlur={() => setTouchedFields((prev) => ({ ...prev, usuario: true }))}
                onChange={e => {
                  setUsuario(e.target.value);
                  if (fieldErrors.usuario) {
                    setFieldErrors((prev) => ({ ...prev, usuario: '' }));
                  }
                }}
                placeholder="Tu identificador unico"
                isInvalid={shouldValidate('usuario') && !!fieldErrors.usuario}
                isValid={shouldValidate('usuario') && usuarioLongitudValida && !fieldErrors.usuario}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid" className="alerterror">
                {fieldErrors.usuario || 'Obligatorio (3-18 carac.)'}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                value={email}
                minLength={11}
                maxLength={45}
                onBlur={() => setTouchedFields((prev) => ({ ...prev, email: true }))}
                onChange={e => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) {
                    setFieldErrors((prev) => ({ ...prev, email: '' }));
                  }
                }}
                placeholder="ana@ejemplo.com"
                isInvalid={shouldValidate('email') && !!fieldErrors.email}
                isValid={shouldValidate('email') && emailLongitudValida && emailFormatoValido && !fieldErrors.email}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid" className="alerterror">
                {fieldErrors.email || 'Email valido requerido.'}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="row g-3">
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="number"
                value={telefono}
                min={10000000}
                onBlur={() => setTouchedFields((prev) => ({ ...prev, telefono: true }))}
                onChange={e => {
                  setTelefono(e.target.value);
                  if (fieldErrors.telefono) {
                    setFieldErrors((prev) => ({ ...prev, telefono: '' }));
                  }
                }}
                placeholder="3810000000"
                isInvalid={shouldValidate('telefono') && !!fieldErrors.telefono}
                isValid={shouldValidate('telefono') && telefonoValido && !fieldErrors.telefono}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid" className="alerterror">
                {fieldErrors.telefono || 'Obligatorio (solo numeros).'}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Domicilio</Form.Label>
              <Form.Control
                type="text"
                value={domicilio}
                minLength={5}
                maxLength={40}
                onBlur={() => setTouchedFields((prev) => ({ ...prev, domicilio: true }))}
                onChange={e => {
                  setDomicilio(e.target.value);
                  if (fieldErrors.domicilio) {
                    setFieldErrors((prev) => ({ ...prev, domicilio: '' }));
                  }
                }}
                placeholder="Calle, numero, piso"
                isInvalid={shouldValidate('domicilio') && !!fieldErrors.domicilio}
                isValid={shouldValidate('domicilio') && domicilioLongitudValida && !fieldErrors.domicilio}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid" className="alerterror">
                {fieldErrors.domicilio || 'Obligatorio (5-40 carac.)'}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="row g-3">
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Provincia</Form.Label>
              <Form.Select
                value={provincia}
                onBlur={() => setTouchedFields((prev) => ({ ...prev, provincia: true }))}
                onChange={e => {
                  setProvincia(e.target.value);
                  if (fieldErrors.provincia) {
                    setFieldErrors((prev) => ({ ...prev, provincia: '' }));
                  }
                }}
                isInvalid={shouldValidate('provincia') && !!fieldErrors.provincia}
                isValid={shouldValidate('provincia') && provincia !== '------' && !fieldErrors.provincia}
                disabled={loading}
              >
                {provincias.map(prov => (
                  <option key={prov} value={prov} disabled={prov === '------'}>
                    {prov === '------' ? 'Provincia' : prov}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid" className="alerterror">
                {fieldErrors.provincia || 'Seleccione una provincia.'}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Codigo Postal</Form.Label>
              <Form.Control
                type="number"
                value={cpostal}
                min={1000}
                onBlur={() => setTouchedFields((prev) => ({ ...prev, cpostal: true }))}
                onChange={e => {
                  setCpostal(e.target.value);
                  if (fieldErrors.cpostal) {
                    setFieldErrors((prev) => ({ ...prev, cpostal: '' }));
                  }
                }}
                placeholder="Ej. 4000"
                isInvalid={shouldValidate('cpostal') && !!fieldErrors.cpostal}
                isValid={shouldValidate('cpostal') && cpostalValido && !fieldErrors.cpostal}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid" className="alerterror">
                {fieldErrors.cpostal || 'Obligatorio (min 4 num).'}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="row g-3">
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Contrasena</Form.Label>
              <Form.Control
                type="password"
                value={contrasena}
                minLength={6}
                maxLength={25}
                onBlur={() => setTouchedFields((prev) => ({ ...prev, contrasena: true }))}
                onChange={e => {
                  setContrasena(e.target.value);
                  if (fieldErrors.contrasena) {
                    setFieldErrors((prev) => ({ ...prev, contrasena: '' }));
                  }
                }}
                placeholder="Minimo 6 caracteres"
                isInvalid={shouldValidate('contrasena') && !!fieldErrors.contrasena}
                isValid={shouldValidate('contrasena') && contrasenaLongitudValida && !fieldErrors.contrasena}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid" className="alerterror">
                {fieldErrors.contrasena || 'Minimo 6 caracteres.'}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Select
              value={rol}
              onChange={e => setRol(e.target.value)}
              disabled={loading}
            >
              <option value="Usuario">Usuario</option>
              <option value="Admin">Administrador</option>
            </Form.Select>
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>Cancelar</Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'Creando...' : 'Crear Usuario'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function ModalEditarUsuario({ show, onHide, usuario, onSave }) {
  const [nombre, setNombre] = useState(usuario?.nombre || '');
  const [correo, setCorreo] = useState(usuario?.correo || '');
  const [rol, setRol] = useState(usuario?.rol || 'Usuario');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    setNombre(usuario?.nombre || '');
    setCorreo(usuario?.correo || '');
    setRol(usuario?.rol || 'Usuario');
    setError('');
  }, [usuario]);

  const handleSave = async () => {
    if (!nombre.trim() || !correo.trim()) {
      setError('El nombre y correo son obligatorios');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await actualizarUsuario(usuario.uid, {
        nombre,
        correo,
        rol
      });

      const usuarioEditado = {
        ...usuario,
        nombre,
        correo,
        rol
      };

      onSave(usuarioEditado);
    } catch (err) {
      console.error('Error al actualizar usuario:', err);
      setError('Error al actualizar usuario: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Select
              value={rol}
              onChange={e => setRol(e.target.value)}
              disabled={loading}
            >
              <option value="Usuario">Usuario</option>
              <option value="Admin">Administrador</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>Cancelar</Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function ModalEliminarUsuario({ show, onHide, usuario, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConfirmDelete = async () => {
    const idReal = usuario?.uid || usuario?._id;

    console.log("ID detectado para borrar:", idReal);
    console.log("Objeto usuario completo:", usuario);

    if (!idReal) {
      setError('No se encontró el ID del usuario para eliminar');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const respuesta = await eliminarUsuario(idReal);
      console.log("respuesta del servidor al borrar", respuesta)
      
      onDelete(usuario);
      onHide();
    } catch (err) {
      console.error('Error al eliminar usuario:', err);
      setError('Error al eliminar usuario: ' + err.message);
      } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        ¿Estás seguro de que deseas eliminar a <strong>"{usuario?.nombre}"</strong>? Esta acción no se puede deshacer.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>Cancelar</Button>
        <Button
          variant="danger"
          onClick={handleConfirmDelete}
          disabled={loading}
        >
          {loading ? 'Eliminando...' : 'Sí, eliminar usuario'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}