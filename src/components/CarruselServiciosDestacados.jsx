import { Carousel, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function CarruselServiciosDestacados({ servicios }) {
  if (!servicios || servicios.length === 0) {
    return <p className="text-center">No hay promociones destacadas en este momento.</p>;
  }

  return (
    <Carousel className='carrusel-hp' interval={4000} controls indicators>
      {servicios.map((servicio) => (
        <Carousel.Item key={servicio._id}>
          <div className='d-flex justify-content-center'>
            <Card className="text-center" style={{ maxWidth: '500px', width: '100%' }}>
              <Card.Header>{servicio.categoria?.nombre || 'PROMO'}</Card.Header>
              <Card.Body>
                <Card.Img 
                  variant="top" 
                  src={servicio.img || servicio.imagen } 
                  className='img' 
                  alt={servicio.nombre}
                  style={{ maxHeight: '300px', objectFit: 'cover' }}
                />
                <Card.Title className="mt-3">{servicio.nombre}</Card.Title>
                <Card.Text className='TextCardPromoHP'>
                  {servicio.descripcion}
                </Card.Text>
                <Link to={`/servicios/${servicio._id}`}>
                  <Button className='btnCardPromo'>Ver más</Button>
                </Link>
              </Card.Body>
              <Card.Footer className="text-muted">
                Precio: AR${servicio.precio}
              </Card.Footer>
            </Card>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
