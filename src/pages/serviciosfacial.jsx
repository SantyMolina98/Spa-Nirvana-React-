import '../App.css';
import '../styles/servicios.css';
import { Link } from 'react-router-dom';
import imagenMap from '../assets/imagenMap.js';
import {Card, Button, Carousel} from 'react-bootstrap';

function ServiciosFacial() {
  return (
    <section className='MainServicio'>
      <article>
        <Carousel className='Carrusel-Servicio'>
          <Carousel.Item>
            <Card className='Contenido-Carrusel-Serv'>
              <Card.Img variant="left" src={imagenMap.STF1} className='Img-Servicio'/>
              <Card.Body className='Cuerpo-Texto'>
                <Card.Title className='Titulo-Carrusel'>Essential Face Care</Card.Title>
                <Card.Text>
                  El full face es un procedimiento estético que aborda el rostro de manera integral, tratando diferentes áreas en una misma sesión para lograr un resultado armónico y natural. A diferencia de otros tratamientos localizados, su enfoque global permite trabajar de manera personalizada cada zona, según las necesidades específicas del paciente. Restaura el volumen, redefine los contornos y suaviza arrugas, siempre respetando la expresión natural del rostro.
                  <br/>
                  Duracion: 50-60 minutos
                  <br />
                  Precio del servicio: AR$ 45.500. 
                </Card.Text>
                <Link to={"/turnos?categoria=servicio-trat-facial&serviciosPorCategoria=essential-face-care"}>
                  <Button className='Btn-Servicio'>RESERVAR TURNO</Button>
                </Link>                   
              </Card.Body>
            </Card>
          </Carousel.Item>
          <Carousel.Item>
            <Card className='Contenido-Carrusel-Serv'>
              <Card.Img variant="left" src={imagenMap.STF2} className='Img-Servicio'/>
              <Card.Body className='Cuerpo-Texto'>
                <Card.Title className='Titulo-Carrusel'>Glowing Vit C+</Card.Title>
                <Card.Text>
                      El glowing vit c+ se trata de un procedimeinto de limpieza profunda para eliminar exceso de sebo. Se le aplica una máscara o sérum con vitamina C. Sus beneficios son brillo y luminosidad en la piel, mejora de textura y firmeza, nutrición y una piel hidratada.
                      <br/>
                      Duracion: 45-60 minutos
                      <br />
                      Precio del servicio: AR$ 45.500. 
                    
                </Card.Text>
                <Link to={"/turnos?categoria=servicio-trat-facial&serviciosPorCategoria=glowing-vit-c"}>
                  <Button className='Btn-Servicio'>RESERVAR TURNO</Button>
                </Link>                   
              </Card.Body>
            </Card>
          </Carousel.Item>
          <Carousel.Item>
            <Card  className='Contenido-Carrusel-Serv'>
              <Card.Img variant="left" src={imagenMap.STF3} className='Img-Servicio'/>
              <Card.Body  className='Cuerpo-Texto'>
                <Card.Title className='Titulo-Carrusel'>Rebalancing Face Care</Card.Title>
                <Card.Text>
                  <p className="card-text">El rebalancing es una técnica fundamental en el proceso de selección de los mejores productos de estética. Permite ajustar la proporción de ingredientes activos para lograr un equilibrio óptimo en cada fórmula. Además, rebalancing es el templo donde la piel y el pelo recuperan su equilibrio. Además, el rebalancing facial es el arte y la ciencia de usar tratamientos no quirúrgicos, como rellenos dérmicos y Botox, para restaurar la simetría, proporción y armonía en el rostro, destinados a mejorar la simetría y armonía del rostro. Cada procedimiento se enfoca en diferentes aspectos del rostro, lo que permite un enfoque completo en mejorar la apariencia general.
                  <br/>
                  Duracion: 45-60 minutos
                  <br />
                  Precio del servicio: AR$ 49.000.
                  </p>
                </Card.Text>
                <Link to={"/turnos?categoria=servicio-trat-facial&serviciosPorCategoria=rebalancing-face-care"}>
                  <Button className='Btn-Servicio'>RESERVAR TURNO</Button>
                </Link>
              </Card.Body>
            </Card>
          </Carousel.Item>
          <Carousel.Item>
            <Card  className='Contenido-Carrusel-Serv'>
              <Card.Img variant="left" src={imagenMap.STF4} className='Img-Servicio'/>
              <Card.Body className='Cuerpo-Texto'>
                <Card.Title className='Titulo-Carrusel'>Glowing Roses</Card.Title>
                  <Card.Text>
                    <p className="card-text"> El tratamiento facial Glowing Roses se realiza con perlas de células madre de rosa alpina y ácido hialurónico. Este lujoso ingrediente actúa como reafirmante natural, aportando luminosidad, hidratación, suavidad y elasticidad. Es un tratamiento no invasivo, indoloro y sin efectos secundarios, perfecto para recuperar la piel tras el verano y mejorar las manchas. El tratamiento se realiza con perlas de células madre de rosa alpina y ácido hialurónico, que previene la deshidratación a lo largo del día. Apto para todo tipo de piel, incluso las más sensibles.
                    <br/>
                    Duracion: 50-60 minutos
                    <br />
                    Precio del servicio: AR$ 50.000.
                    </p>
                  </Card.Text>
                  <Link to={"/turnos?categoria=servicio-trat-facial&serviciosPorCategoria=glowing-roses"}>
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
                  <strong>Laura M. (35 años)</strong>
                  <br />
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <br />
                </div>
                <Card.Text className='Testimonio'>
                "Desde que descubrí este spa, mi piel nunca ha estado mejor. Los tratamientos faciales son personalizados y se nota que utilizan productos de altísima calidad. El ambiente es relajante, elegante y cada detalle está cuidado. Mi favorito es el facial con oxigenoterapia, salgo con la piel luminosa y rejuvenecida. ¡Una experiencia cinco estrellas!"
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className='Comentario'>
            <Card.Body className='body-comentario'>
              <div className='top-comentario'><i className="bi bi-file-person boy-coment"></i> 
                <strong>Marcelo T. (42 años)</strong>
                <br />
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <br /></div>
              <Card.Text className='Testimonio'>
                
                "Nunca pensé que disfrutaría tanto de un tratamiento facial, pero este spa superó mis expectativas. La atención es impecable, te hacen sentir como en un hotel de lujo. Me encantó el tratamiento antiedad que me recomendaron: no solo me vi mejor al instante, sino que también me relajé como nunca. Lo recomiendo totalmente."
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className='Comentario'>
            <Card.Body className='body-comentario'>
              <div className="top-comentario">
                <i className="bi bi-file-person girl-coment"></i> 
                <strong>Juliana R. (68 años)</strong>
                <br />
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <br />
              </div>
              <Card.Text className='Testimonio'>
                
                "Visitar este spa es mi momento favorito del mes. Los tratamientos faciales no solo dejan mi piel radiante, sino que también me ayudan a desconectarme del estrés diario. El personal es sumamente profesional y te asesoran según las necesidades de tu piel. El espacio es precioso, con aromas suaves, música relajante y una atención que te hace sentir mimada de principio a fin."
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </article>
    </section>
  )
}

export default ServiciosFacial;