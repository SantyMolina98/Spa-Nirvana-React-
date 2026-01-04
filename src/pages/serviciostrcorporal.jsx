import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';
import '../styles/servicios.css';
import { Link, useSearchParams } from 'react-router-dom';
import imagenMap from '../assets/imagenMap.js';
import {Card, Button, Carousel} from 'react-bootstrap';
import { useState, useEffect } from 'react';
function ServiciosTrCorporal() {
  const [searchParams] = useSearchParams();
  const [index, setIndex] = useState(0);

  const serviceMap = {
    'liwen': 0,
    'ragiantu': 1
  };

  useEffect(() => {
    const servicioBuscado = searchParams.get('s');
    if (servicioBuscado && serviceMap[servicioBuscado] !== undefined) {
      setIndex(serviceMap[servicioBuscado]);
      const elemento = document.querySelector('.MainServicio');
      if(elemento) elemento.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchParams]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <section className='MainServicio'>
      <article>
        <Carousel className='Carrusel-Servicio' activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <Card className='Contenido-Carrusel-Serv'>
              <Card.Img variant="left" src={imagenMap.cattcorporalliwen} className='Img-Servicio'/>
              <Card.Body className='Cuerpo-Texto'>
                <Card.Title className='Titulo-Carrusel'>Ceremonia Liwen</Card.Title>
                <Card.Text>
                  Terapia integral inspirada en rituales ancestrales mapuches, enfocada en restaurar el equilibrio físico y energético del cuerpo. Combinamos técnicas de exfoliación, envolturas naturales (arcilla o hierbas, a elección), masajes relajantes y aromas.
                  <br/>
                  En resumen, es una experiencia sensorial y de bienestar profundo, ideal para quienes buscan relajación y conexión con la naturaleza
                  <br />
                  Duracion: 50-65 minutos
                  <br />
                  Precio del servicio: AR$ 75.000. 
                </Card.Text>
                <Link to={"/turnos?categoria=servicio-trat-facial&serviciosPorCategoria=essential-face-care"}>
                  <Button className='Btn-Servicio'>RESERVAR TURNO</Button>
                </Link>                   
              </Card.Body>
            </Card>
          </Carousel.Item>
          <Carousel.Item>
            <Card className='Contenido-Carrusel-Serv'>
              <Card.Img variant="left" src={imagenMap.cattcorporalragiantu} className='Img-Servicio'/>
              <Card.Body className='Cuerpo-Texto'>
                <Card.Title className='Titulo-Carrusel'>Ceremonia Ragiantu</Card.Title>
                <Card.Text>
                  Exfoliación corporal natural para remover células muertas, seguido de una aplicación de fango nutritivo que contiene manzanilla y flores autóctonas para restaurar tejidos, finalizando con hidroterapia en ducha tipo Vichy.
                  <br/>
                  Sus beneficios constan en la restauración de tejidos corporales y una completa renovación sensorial.
                  <br />
                  Duracion: 50-70 minutos
                  <br />
                  Precio del servicio: AR$ 72.500.    
                </Card.Text>
                <Link to={"/turnos?categoria=servicio-trat-facial&serviciosPorCategoria=glowing-vit-c"}>
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
                     <i className="bi bi-file-person boy-coment"></i> 
                     <strong>Pablo M. (42 años)</strong>
                     <br />
                     <i className="bi bi-star-fill"></i>
                     <i className="bi bi-star-fill"></i>
                     <i className="bi bi-star-fill"></i>
                     <i className="bi bi-star-fill"></i>
                     <i className="bi bi-star-fill"></i>
                     <br />
                   </div>
                   <Card.Text className='Testimonio'>
                   "Desde que experimente la ceremonia ragiantu soy otra persona, la verdad que fue una experiencia inolviable, no es un lujo, ¡es una necesidad! el venir a este Spa, sin dudas lo mejor que me pasó en este 2025. ¡Una experiencia cinco estrellas!"
                 </Card.Text>
               </Card.Body>
             </Card>
             <Card className='Comentario'>
               <Card.Body className='body-comentario'>
                 <div className='top-comentario'><i className="bi bi-file-person boy-coment"></i> 
                   <strong>Julio F. (45 años)</strong>
                   <br />
                   <i className="bi bi-star-fill"></i>
                   <i className="bi bi-star-fill"></i>
                   <i className="bi bi-star-fill"></i>
                   <i className="bi bi-star-fill"></i>
                   <i className="bi bi-star-fill"></i>
                   <br /></div>
                 <Card.Text className='Testimonio'>
                   "Sinceramente siempre me negué a experimentar este tipo de cosas, nunca creí que fueran ciertas... Hasta que conocí Nirvana Spa & Beauty!!. Mi cuerpo y mi mente me lo agradecen todos los días, luego de la ceremonia Liwen me siento 20 años más jóven. Totalmente recomendado, volvería una y mil veces más, ¡10 de 5 estrellas se merecen!."
                 </Card.Text>
               </Card.Body>
             </Card>
             <Card className='Comentario'>
               <Card.Body className='body-comentario'>
                 <div className="top-comentario">
                   <i className="bi bi-file-person girl-coment"></i> 
                   <strong>Daniela C. (36 años)</strong>
                   <br />
                   <i className="bi bi-star-fill"></i>
                   <i className="bi bi-star-fill"></i>
                   <i className="bi bi-star-fill"></i>
                   <i className="bi bi-star-fill"></i>
                   <i className="bi bi-star-fill"></i>
                   <br />
                 </div>
                 <Card.Text className='Testimonio'>             
                   "He visitado distintos spa y centro de relajación en el país, pero la verdad que experimentar la ceremonia Liwen en Nirvana Spa & Beauty fue la 8va maravilla! La mejor atención de principio a fin, el mejor ambiente, las mejores técnicas, los mejores profesionales, ¡El mejor spa del país sin lugar a dudas! ."
                 </Card.Text>
               </Card.Body>
             </Card>
           </div>
      </article>
    </section>
  )
  
}

export default ServiciosTrCorporal;