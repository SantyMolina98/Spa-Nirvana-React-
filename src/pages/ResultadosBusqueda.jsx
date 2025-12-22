import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { serviciosData } from '../helpers/ListaServicios'; 

const ResultadosBusqueda = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || ''; 

  // --- FUNCIÓN DE AYUDA: Elimina acentos y pasa a minúsculas ---
  const limpiarTexto = (texto) => {
    return texto
      .toLowerCase()
      .normalize("NFD") // Descompone letras con tilde (é -> e + ´)
      .replace(/[\u0300-\u036f]/g, ""); // Borra los símbolos de tilde
  };
  // -------------------------------------------------------------

  const resultados = serviciosData.filter(servicio => {
    // 1. Limpiamos lo que escribió el usuario
    const termino = limpiarTexto(query);

    // 2. Limpiamos los datos de tu lista para comparar
    const titulo = limpiarTexto(servicio.titulo);
    const descripcion = limpiarTexto(servicio.descripcion);
    const categoria = limpiarTexto(servicio.categoria);

    // 3. Comparamos
    return (
      titulo.includes(termino) ||
      descripcion.includes(termino) ||
      categoria.includes(termino)
    );
  });

  return (
    <Container className="my-5" style={{ minHeight: '60vh' }}>
      <h2 className="text-center mb-4" style={{ color: '#5a3e36' }}>
        Resultados para: "<em>{query}</em>"
      </h2>

      {resultados.length === 0 ? (
        <div className="text-center mt-5">
          <h4>No encontramos servicios con ese nombre 😢</h4>
          <p>Prueba con otras palabras clave.</p> {/* Cambié el texto para que sea más genérico */}
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