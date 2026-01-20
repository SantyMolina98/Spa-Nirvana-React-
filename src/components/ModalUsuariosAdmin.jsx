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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const provincias = [
    '------', 'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Ciudad de Buenos Aires',
    'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja',
    'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis',
    'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'
  ];

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
  };

  const handleClose = () => {
    resetForm();
    onHide();
  };

  const handleSave = async () => {
    // Validar campos obligatorios
    if (!nombre.trim() || !apellido.trim() || !usuario.trim() || !email.trim() || 
        !telefono.trim() || !domicilio.trim() || provincia === '------' || !cpostal.trim() || !contrasena.trim()) {
      setError('Todos los campos son obligatorios');
      return;
    }

    // Validar longitudes
    if (nombre.length < 3 || nombre.length > 18) {
      setError('El nombre debe tener entre 3 y 18 caracteres');
      return;
    }
    if (apellido.length < 2 || apellido.length > 20) {
      setError('El apellido debe tener entre 2 y 20 caracteres');
      return;
    }
    if (usuario.length < 3 || usuario.length > 18) {
      setError('El nombre de usuario debe tener entre 3 y 18 caracteres');
      return;
    }
    if (email.length < 11 || email.length > 45) {
      setError('El email debe tener entre 11 y 45 caracteres');
      return;
    }
    if (domicilio.length < 5 || domicilio.length > 40) {
      setError('El domicilio debe tener entre 5 y 40 caracteres');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const nuevoUsuario = await crearUsuario({
        nombre,
        apellido,
        usuario,
        email,
        telefono,
        domicilio,
        provincia,
        cpostal,
        contrasena,
        rol
      });

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
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control 
              type="text"
              value={nombre} 
              onChange={e => setNombre(e.target.value)} 
              placeholder="Ingrese el nombre (3-18 caracteres)"
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control 
              type="text"
              value={apellido} 
              onChange={e => setApellido(e.target.value)} 
              placeholder="Ingrese el apellido (2-20 caracteres)"
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control 
              type="text"
              value={usuario} 
              onChange={e => setUsuario(e.target.value)} 
              placeholder="Ej: Usuario123 (3-18 caracteres)"
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="Ej: usuario@gmail.com"
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control 
              type="number"
              value={telefono} 
              onChange={e => setTelefono(e.target.value)} 
              placeholder="Número de teléfono"
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Domicilio</Form.Label>
            <Form.Control 
              type="text"
              value={domicilio} 
              onChange={e => setDomicilio(e.target.value)} 
              placeholder="Ingrese su domicilio (5-40 caracteres)"
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Provincia</Form.Label>
            <Form.Select 
              value={provincia} 
              onChange={e => setProvincia(e.target.value)}
              disabled={loading}
            >
              {provincias.map(prov => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Código Postal</Form.Label>
            <Form.Control 
              type="text"
              value={cpostal} 
              onChange={e => setCpostal(e.target.value)} 
              placeholder="Ingrese el código postal"
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control 
              type="password"
              value={contrasena} 
              onChange={e => setContrasena(e.target.value)} 
              placeholder="Ingrese una contraseña segura"
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
    setLoading(true);
    setError('');

    try {
      await eliminarUsuario(usuario.uid);
      onDelete(usuario);
    } catch (err) {
      console.error('Error al eliminar usuario:', err);
      setError('Error al eliminar usuario: ' + err.message);
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
