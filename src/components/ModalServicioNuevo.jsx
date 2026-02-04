import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { crearServicio } from '../helpers/ServicioApi';

export function ModalAgregarServicio({ show, onHide, onSave, categoriaPreselec }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
  const [duracion, setDuracion] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [imagen, setImagen] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [disponible, setDisponible] = useState(true);

  const resetForm = () => {
    setNombre('');
    setDescripcion('');
    setPrecio(0);
    setDuracion('');
    setCategoriaId('');
    setImagen('');
    setError('');
  };

  const handleClose = () => {
    console.log('🟡 ModalAgregarServicio: cerrar modal');
    resetForm();
    onHide();
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');

    const categoriaFinal = categoriaId.trim() || (categoriaPreselec?.id || '');
    if (!nombre.trim() || !descripcion.trim() || precio <= 0 || !duracion.trim() || !categoriaFinal || !imagen.trim()) {
      console.warn('🔴 ModalAgregarServicio: validación fallida');
      setError('Todos los campos son obligatorios');
      setLoading(false);
      return;
    }

     try{
      const payload = {
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        precio: parseFloat(precio),
        duracion: duracion.trim(),
        categoria: categoriaFinal,
        img: imagen.trim(),
        disponible
      };
      console.log('🟡 ModalAgregarServicio: enviando a crearServicio', payload);

      const nuevoServicio = await crearServicio(payload);

      console.log('🟢 ModalAgregarServicio: servicio creado', nuevoServicio);

      onSave(nuevoServicio);
      resetForm();
    
    } catch (err) {
      console.error('Error al crear servicio:', err);
      console.error('🔴 ModalAgregarServicio: fallo en crearServicio', err?.message || err);
      setError('Error al crear servicio: ' + err.message);
    } finally {
      console.log('🟡 ModalAgregarServicio: fin de intento');
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Servicio</Modal.Title>
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

          <Form.Group className="mb-3">
            <Form.Label>ID de Categoría</Form.Label>
            <Form.Control
              value={categoriaId}
              onChange={e => setCategoriaId(e.target.value)}
              placeholder="Ingrese el ID de la categoría"
              disabled={loading}
            />
            {categoriaPreselec && (
              <Form.Text className="text-muted">
                Categoría seleccionada: {categoriaPreselec}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL de Imagen (Cloudinary)</Form.Label>
            <Form.Control 
              value={imagen} 
              onChange={e => setImagen(e.target.value)} 
              placeholder="https://res.cloudinary.com/..."
              disabled={loading}
            />
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
          {loading ? 'Creando...' : 'Crear Servicio'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAgregarServicio;
