import { useSearchParams, Link } from 'react-router-dom';
import '../styles/resultadosBusqueda.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import { serviciosData } from '../helpers/ListaServicios'; 

const ResultadosBusqueda = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('busqueda') || ''; 

  const limpiarTexto = (texto) => {
    return texto
      .toLowerCase()
      .normalize("NFD")
  };

  const resultados = serviciosData.filter(servicio => {
    const termino = limpiarTexto(query);
    const titulo = limpiarTexto(servicio.titulo);
    const descripcion = limpiarTexto(servicio.descripcion);
    const categoria = limpiarTexto(servicio.categoria);

    return (
      titulo.includes(termino) ||
      descripcion.includes(termino) ||
      categoria.includes(termino)
    );
  });

  return (
    <div className="resultados-wrapper">
      
      <div className="resultados-header">
        <h2 className="resultados-title">Resultados de la búsqueda</h2>
        <p className="resultados-subtitle">Mostrando los mejores tratamientos de bienestar para ti.</p>
      </div>

      {resultados.length === 0 ? (
        <div className="resultados-vacio">
          <h4>Sin resultados 😢</h4>
          <p>Lo sentimos, no encontramos coincidencias con su búsqueda. Por favor, intente con palabras clave más generales o verifique la ortografía.</p>
          <Link to="/">
             <button className="btn-volver-lujo">Volver al Inicio</button>
          </Link>
        </div>
      ) : (
        <div className="resultados-grid">
          {resultados.map((item) => (
            <div key={item.id} className="resultado-card-lujo">
              
              <div className="resultado-contenido">
                <span className="resultado-badge">{item.categoria}</span>
                <h3 className="resultado-titulo">{item.titulo}</h3>
                <p className="resultado-desc">{item.descripcion}</p>
              </div>

              <div className="resultado-footer">
                <Link to={item.ruta} style={{ textDecoration: 'none' }}>
                  <button className="btn-ver-servicio">
                    Ver Servicio <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </Link>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultadosBusqueda;