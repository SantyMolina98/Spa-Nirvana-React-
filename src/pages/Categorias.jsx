import React, { useContext, useEffect, useState } from 'react';
import '../styles/categorias.css';
import { Link } from "react-router-dom";
import imagenMap from '../assets/imagenMap.js';
import { Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext.jsx';
import ModalAgregarServicio from '../components/ModalServicioNuevo.jsx';
import { getServicios } from '../helpers/ServicioApi.js';

const normalizarClave = (texto) => {
  if (!texto) return '';
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
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

const obtenerNombreServicio = (servicio) => (
  servicio?.nombre || servicio?.titulo || servicio?.nombreServicio || 'Servicio'
);

const obtenerDescripcionServicio = (servicio) => (
  servicio?.descripcion || servicio?.detalle || servicio?.descripcion_servicio || ''
);

const truncarTexto = (texto, maxChars = 150) => {
  if (!texto) return '';
  if (texto.length <= maxChars) return texto;
  return `${texto.slice(0, maxChars).trim()}...`;
};

const obtenerNombreCategoria = (categoria) => {
  if (!categoria) return '';
  if (typeof categoria === 'string') return categoria;
  return categoria?.nombre || '';
};

function Categorias() {
  const { user } = useContext(UserContext);
  const [showAgregarServicio, setShowAgregarServicio] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [servicios, setServicios] = useState([]);
  const [loadingServicios, setLoadingServicios] = useState(true);
  const [errorServicios, setErrorServicios] = useState('');


  const handleAgregarServicio = (categoria) => {
    console.log('🟡 Categorias: abrir modal agregar', { categoria });
    setCategoriaSeleccionada(categoria);
    setShowAgregarServicio(true);
  };

  const handleGuardarServicio = async (nuevoServicio) => {
    console.log('🟡 Categorias: onSave recibido', nuevoServicio);
    setShowAgregarServicio(false);
    const servicioCreado =
      nuevoServicio?.servicio ||
      nuevoServicio?.data?.servicio ||
      nuevoServicio?.nuevoServicio ||
      nuevoServicio;
    console.log('🟡 Categorias: servicio normalizado', servicioCreado);
    if (servicioCreado) {
      setServicios((prev) => [servicioCreado, ...prev]);
      console.log('🟢 Categorias: servicio agregado al estado');
    } else {
      console.warn('🔴 Categorias: no se pudo normalizar servicio');
    }
  };

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        setLoadingServicios(true);
        console.log('🟡 Categorias: cargando servicios');
        const data = await getServicios();
        console.log('🟢 Categorias: servicios recibidos', data);
        setServicios(data.servicios || []);
        setErrorServicios('');
      } catch (error) {
        console.error('Error al cargar servicios:', error);
        setErrorServicios('No se pudieron cargar los servicios');
      } finally {
        console.log('🟡 Categorias: fin carga servicios');
        setLoadingServicios(false);
      }
    };

    fetchServicios();
  }, []);

  const obtenerServiciosCategoria = (nombreCategoria) => {
    const claveObjetivo = normalizarClave(nombreCategoria);
    return servicios.filter((servicio) => {
      const nombreCat = obtenerNombreCategoria(servicio.categoria);
      const claveCategoria = normalizarClave(nombreCat);
      return claveCategoria === claveObjetivo;
    });
  };

  const renderServiciosCategoria = (nombreCategoria, rutaBase) => {
    const serviciosCategoria = obtenerServiciosCategoria(nombreCategoria);

    return (
      <article className="row-categorias">
        {loadingServicios && (
          <div className="TextoCargando">
            <h3>Cargando...</h3>
          </div>
        )}
        {errorServicios && !loadingServicios && (
          <div className="TextoError">
            <h3>{errorServicios}</h3>
          </div>
        )}
        {!loadingServicios && !errorServicios && serviciosCategoria.length === 0 && (
          <div className="TextoError">
            <h3>No hay servicios disponibles</h3>
          </div>
        )}
        {!loadingServicios && !errorServicios && serviciosCategoria.map((servicio) => {
          const nombreServicio = obtenerNombreServicio(servicio);
          const descripcionServicio = obtenerDescripcionServicio(servicio);
          const imagenServicio = obtenerImagenServicio(servicio);
          const slugServicio = servicio.slug || crearSlug(nombreServicio);

          return (
            <div className="contenedor" key={servicio._id || nombreServicio}>
              {imagenServicio && (
                <img
                  src={imagenServicio}
                  alt={nombreServicio}
                  className="img-categoria"
                />
              )}
              <h4>{nombreServicio}</h4>
              <p>
                {descripcionServicio
                  ? truncarTexto(descripcionServicio)
                  : 'Sin descripción disponible.'}
              </p>
              <Link to={`${rutaBase}?s=${slugServicio}`}>
                <Button type="button" className="btn-categoria">Ver más</Button>
              </Link>
            </div>
          );
        })}
      </article>
    );
  };

  return (
    <>
    <div className="maincategoria">  
      <section className='seccion-categoria'>
        <article className="contenedorImg" id="scrollspyHeading1">
          <img src={imagenMap.categoriatfacial} alt="tratamientos-faciales" className="imgbanner" />
          <h2 className="titulo">Tratamientos Faciales</h2>
          
        </article>
        <article className='boton-admin-serv'>
          {user?.rol === 'Admin' && (
            <Button 
              variant="success" 
              size="sm" 
              onClick={() => handleAgregarServicio('Tratamientos Faciales')}
              className="btn-admin-agregar"
            >
              + Añadir Servicio
            </Button>
          )}
        </article>         
        {renderServiciosCategoria('Tratamientos Faciales', '/serviciosfacial')}     
      </section>
      <section className='seccion-categoria'>
        <article className="contenedorImg" id="scrollspyHeading2">
          <img src={imagenMap.categoriatcorporal} alt="tratamientos-corporales"  className="imgbanner" />
          <h2 className="titulo">Tratamientos Corporales</h2>
        </article>
        <article className='boton-admin-serv'>
          {user?.rol === 'Admin' && (
            <Button 
              variant="success" 
              size="sm" 
              onClick={() => handleAgregarServicio('Tratamientos Corporales')}
              className="btn-admin-agregar"
            >
              + Añadir Servicio
            </Button>
          )}
        </article>
        {renderServiciosCategoria('Tratamientos Corporales', '/serviciostrcorporal')}
      </section>
      <section className='seccion-categoria'>
        <article className="contenedorImg" id="scrollspyHeading3">
          <img src={imagenMap.categoriamasaje} alt="masajes"  className="imgbanner" />
          <h2 className="titulo">Masajes</h2>
        </article>
        <article className='boton-admin-serv'>
          {user?.rol === 'Admin' && (
            <Button 
              variant="success" 
              size="sm" 
              onClick={() => handleAgregarServicio('Masajes')}
              className="btn-admin-agregar"
            >
              + Añadir Servicio
            </Button>
          )}
        </article>
        {renderServiciosCategoria('Masajes', '/serviciosmasaje')}
      </section>
      <section className='seccion-categoria'>
        <article className="contenedorImg" id="scrollspyHeading4">
          <img src={imagenMap.categoriaaromaterapia} alt="masajes-con-aromaterapia"  className="imgbanner" />
          <h2 className="titulo">Masajes con Aromaterapia</h2>
        </article>
        <article className='boton-admin-serv'>
          {user?.rol === 'Admin' && (
            <Button 
              variant="success" 
              size="sm" 
              onClick={() => handleAgregarServicio('Masajes con Aromaterapia')}
              className="btn-admin-agregar"
            >
              + Añadir Servicio
            </Button>
          )}
        </article>
        {renderServiciosCategoria('Masajes con Aromaterapia', '/serviciosmaromat')}
      </section>
      <section className='seccion-categoria'>
        <article className="contenedorImg" id="scrollspyHeading5">
          <img src={imagenMap.categoriarituales} alt="a5" className="imgbanner" />
          <h2 className="titulo">Rituales</h2>
        </article>
        <article className='boton-admin-serv'>
          {user?.rol === 'Admin' && (
            <Button 
              variant="success" 
              size="sm" 
              onClick={() => handleAgregarServicio('Rituales')}
              className="btn-admin-agregar"
            >
              + Añadir Servicio
            </Button>
          )}
        </article>
        {renderServiciosCategoria('Rituales', '/serviciosrituales')}
      </section>
    </div>

    {/* Modal para agregar nuevo servicio */}
    <ModalAgregarServicio 
      show={showAgregarServicio}
      onHide={() => setShowAgregarServicio(false)}
      onSave={handleGuardarServicio}
      categoriaPreselec={categoriaSeleccionada}
    />
  </>
  );
}

export default Categorias;