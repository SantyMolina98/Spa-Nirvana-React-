import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { actualizarServicio, eliminarServicio } from '../helpers/ServicioApi';

export function ModalEditarServicio({ show, onHide, servicio, onSave }) {
  const [nombre, setNombre] = useState(servicio?.nombre || '');
  const [descripcion, setDescripcion] = useState(servicio?.descripcion || '');
  const [precio, setPrecio] = useState(servicio?.precio || '');
  const [duracion, setDuracion] = useState(servicio?.duracion || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    setNombre(servicio?.nombre || '');
    setDescripcion(servicio?.descripcion || '');
    setPrecio(servicio?.precio || '');
    setDuracion(servicio?.duracion || '');
    setError('');
  }, [servicio]);

  const handleSave = async () => {
    if (!nombre.trim()) {
      setError('El nombre del servicio es obligatorio');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const servicioEditado = { 
        ...servicio, 
        nombre, 
        descripcion, 
        precio: parseFloat(precio), 
        duracion 
      };

      // Llamar a la API para actualizar el servicio
      await actualizarServicio(servicio._id, {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        duracion
      });

      // Llamar al callback onSave con los datos actualizados
      onSave(servicioEditado);
      
    } catch (err) {
      console.error('Error al actualizar el servicio:', err);
      setError('Error al actualizar el servicio: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Editar Servicio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Servicio</Form.Label>
            <Form.Control 
              value={nombre} 
              onChange={e => setNombre(e.target.value)} 
              placeholder="Ingrese el nombre del servicio"
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={4} 
              value={descripcion} 
              onChange={e => setDescripcion(e.target.value)} 
              placeholder="Ingrese la descripción del servicio"
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Duración</Form.Label>
            <Form.Control 
              value={duracion} 
              onChange={e => setDuracion(e.target.value)} 
              placeholder="Ej: 45-60 minutos"
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio (AR$)</Form.Label>
            <Form.Control 
              type="number" 
              step="0.01"
              value={precio} 
              onChange={e => setPrecio(e.target.value)} 
              placeholder="Ingrese el precio"
              disabled={loading}
            />
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

export function ModalEliminarServicio({ show, onHide, servicio, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConfirmDelete = async () => {
    setLoading(true);
    setError('');

    try {
      // Llamar a la API para eliminar el servicio
      await eliminarServicio(servicio._id);

      // Llamar al callback onDelete con el servicio eliminado
      onDelete(servicio);

    } catch (err) {
      console.error('Error al eliminar el servicio:', err);
      setError('Error al eliminar el servicio: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Servicio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        ¿Estás por eliminar <strong>"{servicio?.nombre}"</strong>? Esta acción no se puede deshacer.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>Cancelar</Button>
        <Button 
          variant="danger" 
          onClick={handleConfirmDelete}
          disabled={loading}
        >
          {loading ? 'Eliminando...' : 'Sí, eliminar servicio'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
