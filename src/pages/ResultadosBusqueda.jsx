import { useSearchParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
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
    <Container className="my-4">
      <h2 className="text-center mb-4">
        Resultados de la búsqueda:
      </h2>
      {resultados.length === 0 ? (
        <div className="text-center mt-5">
          <h4>Sin resultados 😢</h4>
          <p>Lo sentimos, no encontramos coincidencias con su búsqueda. Por favor, intente con palabras clave más generales o verifique la ortografía.</p>
          <Link to="/">
             <Button variant="secondary">Volver al Inicio</Button>
          </Link>
        </div>
      ) : (
        <Row>
          {resultados.map((item) => (
            <Col key={item.id} xs={12} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm colorcard border-0"> 
                <Card.Body className="d-flex flex-column">
                  <div className="mb-2">
                    <span className="badge bg-secondary">{item.categoria}</span>
                  </div>
                  <Card.Title className="fw-bold">{item.titulo}</Card.Title>
                  <Card.Text>{item.descripcion}</Card.Text>
                  <div className="mt-auto pt-3">
                    <Link to={item.ruta} className="w-100 btn btn-primary botonesLogin">
                      Ver Servicio
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ResultadosBusqueda;