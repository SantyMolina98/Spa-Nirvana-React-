import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { crearServicio } from '../helpers/ServicioApi';
import { getCategorias } from '../helpers/CategoriaApi';

export function ModalAgregarServicio({ show, onHide, onSave, categoriaPreselec }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [duracion, setDuracion] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [imagen, setImagen] = useState('');
  
  const [touchedFields, setTouchedFields] = useState({
    nombre: false,
    descripcion: false,
    precio: false,
    duracion: false,
    categoria: false,
    imagen: false,
  });
  
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [disponible, setDisponible] = useState(true);
  const [destacado, setDestacado] = useState(false);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [cargandoCategorias, setCargandoCategorias] = useState(false);

  useEffect(() => {
    if (show) {
      cargarCategorias();
    }
  }, [show]);

  const cargarCategorias = async () => {
    setCargandoCategorias(true);
    try {
      const data = await getCategorias(); 
      if (data && data.categorias) {
        setListaCategorias(data.categorias);
      }
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    } finally {
      setCargandoCategorias(false);
    }
  };

  const nombreTrimmed = nombre.trim();
  const nombreLongitudValida = nombreTrimmed.length >= 5 && nombreTrimmed.length <= 30;
  const nombreInvalidoPorLongitud = nombreTrimmed !== '' && !nombreLongitudValida;
  const descripcionTrimmed = descripcion.trim();
  const descripcionMinimaValida = descripcionTrimmed.length >= 70;
  const descripcionInvalidaPorMinimo = descripcionTrimmed !== '' && !descripcionMinimaValida;
  const precioNumber = Number(precio);
  const precioRangoValido = precio !== '' && precioNumber >= 30000 && precioNumber <= 1000000;
  const imagenTrimmed = imagen.trim();
  const duracionTrimmed = duracion.trim();
  const minCloudinaryPrefix = 'https://res.cloudinary.com/';
  const cloudinaryValida = imagenTrimmed.startsWith(minCloudinaryPrefix);

  const shouldValidate = (fieldName) => submitAttempted || touchedFields[fieldName];

  const resetForm = () => {
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setDuracion('');
    setCategoriaId('');
    setImagen('');
    setError('');
    setDestacado(false);
    
    setFieldErrors({});
    setSubmitAttempted(false);
    setTouchedFields({
      nombre: false,
      descripcion: false,
      precio: false,
      duracion: false,
      categoria: false,
      imagen: false,
    });
  };

  useEffect(() => {
    if (!show) return;
    setCategoriaId('');
  }, [show, categoriaPreselec]);

  const handleClose = () => {
    resetForm();
    onHide();
  };

  const handleSave = async () => {
    setSubmitAttempted(true);
    setTouchedFields({
      nombre: true,
      descripcion: true,
      precio: true,
      duracion: true,
      categoria: true,
      imagen: true,
    });

    const nextFieldErrors = {};

    if (!nombreTrimmed) nextFieldErrors.nombre = 'Completar campo de Nombre del Servicio';
    if (nombreTrimmed && !nombreLongitudValida) {
      nextFieldErrors.nombre = 'El nombre debe tener entre 5 y 30 caracteres';
    }
    if (!descripcionTrimmed) nextFieldErrors.descripcion = 'Completar campo de Descripción';
    if (descripcionTrimmed && !descripcionMinimaValida) {
      nextFieldErrors.descripcion = 'La descripción debe tener al menos 70 caracteres';
    }
    if (!precio) nextFieldErrors.precio = 'Completar campo de Precio';
    if (precio && !precioRangoValido) {
      nextFieldErrors.precio = 'El precio debe estar entre 30.000 y 1.000.000';
    }
    if (!duracionTrimmed) nextFieldErrors.duracion = 'Completar campo de Duración';
    if (!categoriaId.trim()) nextFieldErrors.categoria = 'Seleccionar una Categoría';
    if (!imagenTrimmed) nextFieldErrors.imagen = 'Completar campo de URL de Imagen';

    if (imagenTrimmed && !cloudinaryValida) {
      nextFieldErrors.imagen = 'La URL debe comenzar con https://res.cloudinary.com/';
    }

    setFieldErrors(nextFieldErrors);

    if (Object.keys(nextFieldErrors).length > 0) {
      console.warn('🔴 ModalAgregarServicio: validación fallida');
      return;
    }

    const categoriaFinal = categoriaId.trim() || (categoriaPreselec?.id || '');

    if (!categoriaFinal) {
      setFieldErrors((prev) => ({
        ...prev,
        categoria: 'Seleccionar una Categoría',
      }));
      return;
    }

    setLoading(true);
    setError('');

     try{
      const payload = {
        nombre: nombreTrimmed,
        descripcion: descripcionTrimmed,
        precio: parseFloat(precioNumber),
        duracion: duracionTrimmed,
        categoria: categoriaFinal,
        img: imagenTrimmed,
        disponible,
        destacado
      };

      const respuestaBackend = await crearServicio(payload);
      const servicioReal = respuestaBackend.servicio || respuestaBackend.data || respuestaBackend;
      const categoriaCompleta = listaCategorias.find(cat => cat._id === categoriaFinal);
      const servicioFormateadoParaTabla = {
        ...servicioReal,
        categoria: categoriaCompleta || servicioReal.categoria
      };
      onSave(servicioFormateadoParaTabla);
      resetForm();
    
    } catch (err) {
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
              minLength={5}
              maxLength={30} 
              onBlur={() => setTouchedFields((prev) => ({ ...prev, nombre: true }))}
              onChange={e => {
                setNombre(e.target.value);
                if (fieldErrors.nombre) {
                  setFieldErrors((prev) => ({ ...prev, nombre: '' }));
                }
              }} 
              placeholder="Ingrese el nombre del servicio"
              isInvalid={shouldValidate('nombre') && (!!fieldErrors.nombre || nombreInvalidoPorLongitud)}
              isValid={shouldValidate('nombre') && nombreLongitudValida && !fieldErrors.nombre}
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid" className="alerterror">
              {fieldErrors.nombre || (nombreInvalidoPorLongitud ? 'El nombre debe tener entre 5 y 30 caracteres' : 'Completar campo de Nombre del Servicio')}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={4}
              value={descripcion} 
              minLength={70}
              onBlur={() => setTouchedFields((prev) => ({ ...prev, descripcion: true }))}
              onChange={e => {
                setDescripcion(e.target.value);
                if (fieldErrors.descripcion) {
                  setFieldErrors((prev) => ({ ...prev, descripcion: '' }));
                }
              }} 
              placeholder="Ingrese la descripción del servicio"
              isInvalid={shouldValidate('descripcion') && (!!fieldErrors.descripcion || descripcionInvalidaPorMinimo)}
              isValid={shouldValidate('descripcion') && descripcionMinimaValida && !fieldErrors.descripcion}
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid" className="alerterror">
              {fieldErrors.descripcion || (descripcionInvalidaPorMinimo ? 'La descripción debe tener al menos 70 caracteres' : 'Completar campo de Descripción')}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="row g-3">
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Duración</Form.Label>
              <Form.Control
                type="text"
                value={duracion}
                onBlur={() => setTouchedFields((prev) => ({ ...prev, duracion: true }))}
                onChange={e => {
                  setDuracion(e.target.value);
                  if (fieldErrors.duracion) {
                    setFieldErrors((prev) => ({ ...prev, duracion: '' }));
                  }
                }}
                placeholder="Ej: 45-60 minutos"
                isInvalid={shouldValidate('duracion') && !!fieldErrors.duracion}
                isValid={shouldValidate('duracion') && !!duracionTrimmed && !fieldErrors.duracion}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid" className="alerterror">
                {fieldErrors.duracion || 'Completar campo de Duración'}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Precio (AR$)</Form.Label>
              <Form.Control 
                type="number" 
                step="0.01"
                value={precio} 
                min={30000}
                max={1000000}
                onBlur={() => setTouchedFields((prev) => ({ ...prev, precio: true }))}
                onChange={e => {
                  setPrecio(e.target.value);
                  if (fieldErrors.precio) {
                    setFieldErrors((prev) => ({ ...prev, precio: '' }));
                  }
                }} 
                placeholder="Ingrese el precio"
                isInvalid={shouldValidate('precio') && !!fieldErrors.precio}
                isValid={shouldValidate('precio') && precioRangoValido && !fieldErrors.precio}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid" className="alerterror">
                {fieldErrors.precio || 'Completar campo de Precio'}
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              value={categoriaId}
              onBlur={() => setTouchedFields((prev) => ({ ...prev, categoria: true }))}
              onChange={e => {
                setCategoriaId(e.target.value);
                if (fieldErrors.categoria) {
                  setFieldErrors((prev) => ({ ...prev, categoria: '' }));
                }
              }}
              isInvalid={shouldValidate('categoria') && !!fieldErrors.categoria}
              isValid={shouldValidate('categoria') && !!categoriaId.trim() && !fieldErrors.categoria}
              disabled={loading || cargandoCategorias}
            >
              <option value="">
                {cargandoCategorias ? 'Cargando categorías...' : 'Seleccione una categoría'}
              </option>
              {listaCategorias.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.nombre}
                </option>
              ))}
            </Form.Select>
            
            {categoriaPreselec && (
              <Form.Text className="text-muted">
                Categoría seleccionada por defecto.
              </Form.Text>
            )}
            <Form.Control.Feedback type="invalid" className="alerterror">
              {fieldErrors.categoria || 'Seleccionar una Categoría'}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL de Imagen (Cloudinary)</Form.Label>
            <Form.Control 
              value={imagen} 
              onBlur={() => setTouchedFields((prev) => ({ ...prev, imagen: true }))}
              onChange={e => {
                setImagen(e.target.value);
                if (fieldErrors.imagen) {
                  setFieldErrors((prev) => ({ ...prev, imagen: '' }));
                }
              }} 
              placeholder="https://res.cloudinary.com/..."
              isInvalid={shouldValidate('imagen') && !!fieldErrors.imagen}
              isValid={shouldValidate('imagen') && !!imagenTrimmed && cloudinaryValida && !fieldErrors.imagen}
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid" className="alerterror">
              {fieldErrors.imagen || 'Completar campo de URL de Imagen'}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDestacado">
            <Form.Check 
              type="switch"
              label="¿Marcar como Servicio Destacado?"
              checked={destacado}
              onChange={(e) => setDestacado(e.target.checked)}
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