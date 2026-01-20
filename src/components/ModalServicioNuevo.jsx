import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { crearServicio } from '../helpers/ServicioApi';
import { getCategorias } from '../helpers/CategoriaApi';

export function ModalAgregarServicio({ show, onHide, onSave }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [duracion, setDuracion] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [imagen, setImagen] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data.categorias || []);
      } catch (err) {
        console.error('Error al cargar categorías:', err);
      }
    };
    fetchCategorias();
  }, []);

  const resetForm = () => {
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setDuracion('');
    setCategoriaId('');
    setImagen('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onHide();
  };

  const handleSave = async () => {
    if (!nombre.trim() || !descripcion.trim() || !precio || !duracion.trim() || !categoriaId) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const nuevoServicio = await crearServicio({
        nombre,
        descripcion,
        precio: parseFloat(precio),
        duracion,
        categoria: categoriaId,
        imagen: imagen || undefined
      });

      onSave(nuevoServicio);
      resetForm();
    } catch (err) {
      console.error('Error al crear servicio:', err);
      setError('Error al crear servicio: ' + err.message);
    } finally {
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
            <Form.Label>Categoría</Form.Label>
            <Form.Select 
              value={categoriaId} 
              onChange={e => setCategoriaId(e.target.value)}
              disabled={loading}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map(cat => (
                <option key={cat._id} value={cat._id}>
                  {cat.nombre}
                </option>
              ))}
            </Form.Select>
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
