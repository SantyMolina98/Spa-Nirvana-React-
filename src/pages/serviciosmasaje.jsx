import '../App.css';
import '../styles/servicios.css';
import { Link } from 'react-router-dom';
import imagenMap from '../assets/imagenMap.js';
import {Card, Button, Carousel} from 'react-bootstrap';

function ServiciosMasajes  () {
  return (
  <section className='MainServicio'>
    <article>
      <Carousel className='Carrusel-Servicio'>
        <Carousel.Item>
          <Card className='Contenido-Carrusel-Serv'>
            <Card.Img variant="left" src={imagenMap.SM1} className='Img-Servicio'/>
            <Card.Body className='Cuerpo-Texto'>
              <Card.Title className='Titulo-Carrusel'>Masaje Sueco</Card.Title>
              <Card.Text>
                Este es el tipo de masaje en el que mover las manos relajar los músculos siempre coincidiendo en la dirección del masaje: siempre al corazón. Con eso, lo que obtienes es alivia todos los músculos relaja las articulaciones después de un día ajetreado y equilibra el cuerpo para descansar bien después del atardecer. 
                <br />Con masaje sueco la relajación se extiende por todo el cuerpo que además cubre la mente, eliminando toxinas, tonificando, activando la circulación sanguínea y transmitiendo todo lo que necesitamos para estar sanos.
                <br/>
                Duracion: 60-70 minutos 
                <br />
                Precio del servicio: AR$ 50.000.
              </Card.Text>
              <Link to="/turnos?categoria=servicio-masajes&servicio=masaje-sueco">
                <Button className='Btn-Servicio'>RESERVAR TURNO</Button>
              </Link>                   
            </Card.Body>
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <Card className='Contenido-Carrusel-Serv'>
            <Card.Img variant="left" src={imagenMap.SM2} className='Img-Servicio'/>
            <Card.Body className='Cuerpo-Texto'>
              <Card.Title className='Titulo-Carrusel'>Masaje Hot Stones</Card.Title>
              <Card.Text>
                Es una técnica de relajación y bienestar utilizada desde tiempos ancestrales. Se basa en la aplicación de piedras previamente calentadas sobre diferentes áreas del cuerpo. Estas piedras, generalmente de origen volcánico, son seleccionadas por su capacidad de retener el calor de manera prolongada.
                <br />
                El objetivo principal del masaje con piedras calientes es proporcionar alivio y relajación a través del calor y el contacto directo con las piedras. Existen beneficios de masaje con piedras calientes, este considera una terapia física y emocional, ya que actúa sobre distintos aspectos del ser humano, tanto a nivel corporal como energético.
                <br/>
                Duracion: 60-75 minutos
                <br />
                Precio del servicio: AR$ 55.000.
              </Card.Text>
              <Link to="/turnos?categoria=servicio-masajes&servicio=masaje-hot-stones">
                <Button className='Btn-Servicio'>RESERVAR TURNO</Button>
              </Link>                   
            </Card.Body>
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <Card  className='Contenido-Carrusel-Serv'>
            <Card.Img variant="left" src={imagenMap.SM3} className='Img-Servicio'/>
            <Card.Body  className='Cuerpo-Texto'>
              <Card.Title className='Titulo-Carrusel'>Masaje Deep Tissue</Card.Title>
              <Card.Text>
                {/* falta agregar descripcion */}
                <br/>
                Duracion: 45-60 minutos
                <br />
                Precio del servicio: AR$ 49.000.
              </Card.Text>
              <Link to="/turnos?categoria=servicio-masajes&servicio=masaje-deep-tissue">
                <Button className='Btn-Servicio'>RESERVAR TURNO</Button>
              </Link>
            </Card.Body>
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <Card  className='Contenido-Carrusel-Serv'>
            <Card.Img variant="left" src={imagenMap.catmasajesignature} className='Img-Servicio'/>
            <Card.Body className='Cuerpo-Texto'>
              <Card.Title className='Titulo-Carrusel'>Masaje Signature</Card.Title>
                <Card.Text>
                  El masaje signature es un tipo de masaje que se caracteriza por ser de presión firme y eficaz, diseñado para eliminar dolores, tensiones del estrés y contracturas. Este masaje se personaliza según las necesidades del cliente y puede incluir el uso de aceite tibio fundido de velas naturales, lo que proporciona una hidratación profunda y una sensación de bienestar. Además, se enfoca en aliviar los músculos tensos y rígidos, utilizando técnicas que pueden incluir codos y nudillos para liberar la tensión muscular. 
                  <br/>
                  Duracion: 50-60 minutos
                  <br />
                  Precio del servicio: AR$ 46.500.
                </Card.Text>
                <Link to="/turnos?categoria=servicio-masajes&servicio=masaje-signature">
                  <Button className='Btn-Servicio'>RESERVAR TURNO</Button>
                </Link>
              </Card.Body>
            </Card>
          </Carousel.Item>
        </Carousel>         
    </article>
    <article className='Sector-Comentarios'>
      <hr className='hr-servicio'/>
      <h2 className="Titulotesti">~ CONOCÉ LAS OPINIONES DE NUESTROS CLIENTES ~</h2>
      <hr className='hr-servicio'/>
      <div className='Cards-Comentarios'>
        <Card className='Comentario'>
          <Card.Body className='body-comentario'>
            <div className='top-comentario'>
              <i className="bi bi-file-person girl-coment"></i> 
              <strong>Camila T. (38 años)</strong>
              <br />
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <br />
            </div>
            <Card.Text className='Testimonio'>
              "Cada visita a este spa es un verdadero escape. El masaje relajante con aceites esenciales es mi favorito: salgo como nueva, sin tensiones y completamente renovada. El ambiente es sereno y elegante, y el personal tiene manos mágicas. Un lujo que vale cada centavo."
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className='Comentario'>
          <Card.Body className='body-comentario'>
            <div className='top-comentario'><i className="bi bi-file-person boy-coment"></i> 
              <strong>Martín S. (45 años)</strong>
              <br />
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <br />
            </div>
            <Card.Text className='Testimonio'>  
              "Trabajo muchas horas frente a la computadora y los masajes descontracturantes de este spa me han cambiado la vida. El lugar es impecable, con atención de primer nivel y terapeutas que realmente saben lo que hacen. Me ayudaron con dolores de espalda crónicos en pocas sesiones."
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className='Comentario'>
          <Card.Body className='body-comentario'>
            <div className="top-comentario">
              <i className="bi bi-file-person girl-coment"></i> 
              <strong>Elena V. (50 años)</strong>
              <br />
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <br />
            </div>
            <Card.Text className='Testimonio'>      
              "Este spa es mi refugio. El masaje con piedras calientes fue una experiencia única: profundo, relajante y sumamente reconfortante. Desde que empecé a venir, duermo mejor y me siento con más energía. Todo está pensado para que te sientas especial."
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </article>
  </section>
  )
}

export default ServiciosMasajes;