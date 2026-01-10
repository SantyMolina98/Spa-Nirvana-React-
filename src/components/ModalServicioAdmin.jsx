import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export function ModalEditarServicio({ show, onHide, servicio, onSave }) {
  const [titulo, setTitulo] = useState(servicio?.titulo || '');
  const [descripcion, setDescripcion] = useState(servicio?.descripcion || '');
  const [precio, setPrecio] = useState(servicio?.precio || '');

  React.useEffect(() => {
    setTitulo(servicio?.titulo || '');
    setDescripcion(servicio?.descripcion || '');
    setPrecio(servicio?.precio || '');
  }, [servicio]);

  const handleSave = () => {
    onSave({ ...servicio, titulo, descripcion, precio });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Servicio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control value={titulo} onChange={e => setTitulo(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" rows={3} value={descripcion} onChange={e => setDescripcion(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control type="number" value={precio} onChange={e => setPrecio(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="primary" onClick={handleSave}>Guardar Cambios</Button>
      </Modal.Footer>
    </Modal>
  );
}

export function ModalEliminarServicio({ show, onHide, servicio, onDelete }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Servicio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás por eliminar "{servicio?.titulo}"?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="danger" onClick={() => onDelete(servicio)}>Sí, eliminar servicio</Button>
      </Modal.Footer>
    </Modal>
  );
}
