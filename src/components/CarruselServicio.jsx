import '../styles/carrusel.css';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getServicios } from '../helpers/ServicioApi';
import { getCategorias } from '../helpers/CategoriaApi';
import { Card, Carousel, Button } from 'react-bootstrap';

const normalizarClave = (texto) => {
  if (!texto) return '';
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
};

const crearSlug = (texto) => {
  if (!texto) return '';
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const obtenerNombreServicio = (servicio) => (
  servicio?.nombre || servicio?.titulo || servicio?.nombreServicio || ''
);

const obtenerDescripcionServicio = (servicio) => (
  servicio?.descripcion ||
  servicio?.detalle ||
  servicio?.descripcion_servicio ||
  ''
);

const obtenerImagenServicio = (servicio) => (
  servicio?.imagen?.secure_url ||
  servicio?.imagen?.url ||
  servicio?.imagen?.[0]?.secure_url ||
  servicio?.imagen?.[0]?.url ||
  servicio?.imagenes?.[0]?.secure_url ||
  servicio?.imagenes?.[0]?.url ||
  servicio?.imagenes?.[0] ||
  servicio?.imagenUrl ||
  servicio?.imagen ||
  servicio?.img ||
  servicio?.foto ||
  ''
);

const obtenerDuracionServicio = (servicio) => (
  servicio?.duracion || servicio?.tiempo || servicio?.duracionMin || ''
);

const obtenerPrecioServicio = (servicio) => (
  servicio?.precio ?? servicio?.costo ?? servicio?.valor ?? ''
);

const CarruselServicios = ({
  categoriaNombre,
  categoriaId,
  turnosCategoria,
  searchParamKey = 's',
  matchCategoriaExacta = false,
  isAdmin = false,
  onEdit,
  onDelete,
  refreshKey = 0
}) => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [index, setIndex] = useState(0);
  const [searchParams] = useSearchParams();
  const [categoriaMap, setCategoriaMap] = useState({});

  useEffect(() => {
    const fetchCategorias = async () => {
      if (!categoriaNombre || categoriaId) return;
      try {
        const data = await getCategorias();
        const categorias = data.categorias || [];
        const map = categorias.reduce((acc, cat) => {
          const clave = normalizarClave(cat.nombre || '');
          if (clave) acc[clave] = cat._id;
          return acc;
        }, {});
        setCategoriaMap(map);
      } catch (err) {
        console.error('Error al cargar categorías:', err);
      }
    };
    fetchCategorias();
  }, [categoriaNombre, categoriaId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getServicios();
        setServicios(data.servicios || []);
        setError('');
      } catch (err) {
        console.error('Error al cargar los servicios:', err);
        setError('No se pudieron cargar los servicios');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refreshKey]);

  const serviciosFiltrados = useMemo(() => {
    if (!categoriaNombre && !categoriaId) return servicios;

    const claveCategoriaNombre = normalizarClave(categoriaNombre || '');
    const categoriaIdDesdeNombre = categoriaId || categoriaMap[claveCategoriaNombre];

    return servicios.filter((servicio) => {
      const categoria = servicio.categoria;
      const nombreCategoria = typeof categoria === 'string' ? categoria : categoria?.nombre;
      const idCategoria = typeof categoria === 'string' ? categoria : categoria?._id;

      if (categoriaIdDesdeNombre && idCategoria) {
        return idCategoria === categoriaIdDesdeNombre;
      }

      if (categoriaNombre && nombreCategoria) {
        const claveNombreCategoria = normalizarClave(nombreCategoria);
        if (matchCategoriaExacta) {
          return claveNombreCategoria === claveCategoriaNombre;
        }
        return claveNombreCategoria.includes(claveCategoriaNombre);
      }

      return false;
    });
  }, [servicios, categoriaNombre, categoriaId]);

  useEffect(() => {
    const paramValue =
      searchParams.get(searchParamKey) ||
      searchParams.get('serviciosPorCategoria') ||
      '';

    if (!paramValue || serviciosFiltrados.length === 0) return;

    const claveParam = normalizarClave(paramValue);
    const nuevoIndex = serviciosFiltrados.findIndex((servicio) => {
      const nombreServicio = obtenerNombreServicio(servicio);
      const claveNombre = normalizarClave(nombreServicio);
      const claveSlug = normalizarClave(servicio.slug || crearSlug(nombreServicio));
      return claveNombre.includes(claveParam) || claveSlug === claveParam;
    });

    if (nuevoIndex >= 0) {
      setIndex(nuevoIndex);
      const elemento = document.querySelector('.MainServicio');
      if (elemento) elemento.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchParams, serviciosFiltrados, searchParamKey]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  if (loading) return <div className="TextoCargando"><h2>Cargando...</h2></div>;
  if (error) return <div className="TextoError"><h2>{error}</h2></div>;

  if (serviciosFiltrados.length === 0) {
    return <div className="TextoError"><h2>No hay servicios disponibles</h2></div>;
  }

  return (
    <Carousel className="Carrusel-Servicio" activeIndex={index} onSelect={handleSelect}>
      {serviciosFiltrados.map((servicio) => {
        const nombreServicio = obtenerNombreServicio(servicio);
        const descripcionServicio = obtenerDescripcionServicio(servicio);
        const imagenServicio = obtenerImagenServicio(servicio);
        const duracionServicio = obtenerDuracionServicio(servicio);
        const precioServicio = obtenerPrecioServicio(servicio);
        const slugServicio = servicio.slug || crearSlug(nombreServicio);
        const linkTurnos = turnosCategoria
          ? `/turnos?categoria=${turnosCategoria}&serviciosPorCategoria=${slugServicio}`
          : null;

        return (
          <Carousel.Item key={servicio._id || nombreServicio}>
            <Card className='Contenido-Carrusel-Serv'>
              <Card.Img
                variant="left"
                src={imagenServicio}
                className='Img-Servicio'
                alt={nombreServicio}
              />
              <Card.Body className='Cuerpo-Texto'>
                <Card.Title className='Titulo-Carrusel'>{nombreServicio}</Card.Title>
                <Card.Text>
                  {descripcionServicio || 'Sin descripción disponible.'}
                  <br /> <br />
                  <i className="bi bi-circle-fill"></i> Duración: {duracionServicio || 'A confirmar'}
                  <br />
                  <i className="bi bi-circle-fill"></i> Precio del servicio: AR$ {precioServicio || 'A confirmar'}.
                </Card.Text>

                {linkTurnos && (
                  <Link to={linkTurnos}>
                    <Button className='Btn-Servicio'>RESERVAR TURNO</Button>
                  </Link>
                )}

                {isAdmin && (onEdit || onDelete) && (
                  <div className="admin-actions">
                    {onEdit && (
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => onEdit(servicio)}
                      >
                        Editar
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(servicio)}
                      >
                        Eliminar
                      </Button>
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default CarruselServicios;