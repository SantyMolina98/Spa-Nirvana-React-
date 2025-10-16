import {Link} from 'react-router-dom';
import '../App.css';
import '../styles/HomePage.css';
import {Carousel, Image, Card, Button} from 'react-bootstrap';
import banner1 from '../assets/Img/banner1.jpg';
import banner2 from '../assets/Img/banner2.jpg';
import banner3 from '../assets/Img/banner3.jpg';
import logospaheader from '../assets/Img/logospaheader.png';
import promo1 from '../assets/Img/promo1.jpg';
import promo2 from '../assets/Img/promo2.jpg';
import promo3 from '../assets/Img/promo3.jpg';
import promo4 from '../assets/Img/promo4.jpg';
import publicidad50off from '../assets/Img/publicidad50off.jpg';
import grid1tratamientos from '../assets/Img/grid1tratamientos.jpg';
import grid2masajes from '../assets/Img/grid2masajes.jpg';
import grid3rituales from '../assets/Img/grid3rituales.jpg';


function HomePage () {
  return (
    <>
    <main>
      <section>
      <Carousel fade>
      <Carousel.Item>
        <Image src={banner1} rounded className='carrusel'/>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={banner2} rounded className='carrusel'/>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={banner3} rounded className='carrusel'/>
        </Carousel.Item>
      </Carousel>
      </section>
      <section>
          <article className="centrado">
          <h1>NIRVANA Spa & Beauty</h1>
          <h3>Un viaje sensorial de bienestar</h3>
          <img src={logospaheader} alt="logo" className="logoarticle"/>
          <p>Para una experiencia de verdadero placer, le da la bienvenida Nirvana Spa & Beauty, con una combinación de tratamientos, rituales y ceremonias basados ​​en los conocimientos ancestrales de diferentes culturas.<br/>
            Sumérjase en un viaje sensorial de bienestar en el spa más exclusivo de Tucumán. Disfrute relajantes masajes corporales y rituales cuidadosamente diseñados en un ambiente de lujo que irradia tranquilidad.</p>
            <p>*Los masajes, propuestas y tratamientos no incluyen instalaciones: sauna, jacuzzi, piscina y gimnasio se encuentran habilitados solamente para huéspedes.</p>
        </article>
      <h2>Promociones Destacadas</h2>
      <div className='flex'>
      <Card className="text-center">
      <Card.Header>PROMO MASAJES</Card.Header>
      <Card.Body>
        <Card.Title>Massage Relax</Card.Title>
        <Card.Img variant="top" src={promo1} className='img' />
        <Card.Text>
          Masajes Full Body + Coffee Pause<br/> Este paquete está diseñado para brindarle una experiencia integral de relajación, bienestar y renovación.
        </Card.Text>
        <Link to="*">
        <Button variant="primary">Ver más</Button>
        </Link>
      </Card.Body>
      <Card.Footer className="text-muted">Válida hasta el 15 de noviembre o hasta agotar cupos.</Card.Footer>
      </Card>
      </div>
    <div className='flex'>
        <Card className="text-center">
      <Card.Header>PROMO SPA</Card.Header>
      <Card.Body>
        <Card.Title>Spa Revitalizante</Card.Title>
        <Card.Img variant="top" src={promo2} className='img' />
        <Card.Text>
          Blend de masaje a elección<br/>Incluye máscara facial, descanso y restauración en sala de relax acompañado de merienda saludable.
        </Card.Text>
        <Link to="*">
        <Button variant="primary">Ver más</Button>
        </Link>
      </Card.Body>
      <Card.Footer className="text-muted">Promo disponible hasta el 15/11 inclusive.</Card.Footer>
    </Card>
    </div>
        <div className='flex'>
        <Card className="text-center">
      <Card.Header>PROMO SPA</Card.Header>
      <Card.Body>
        <Card.Title>Día de Spa Relax</Card.Title>
        <Card.Img variant="top" src={promo3} className='img' />
        <Card.Text>
          Hidroterapia, Masajes, Facial. Para 2 personas<br/>Una tarde diferente para relajarse, descansar y compartir.
        </Card.Text>
        <Link to="*">
        <Button variant="primary">Ver más</Button>
        </Link>
      </Card.Body>
      <Card.Footer className="text-muted">Promo vigente hasta el 15/11 — ¡no te la pierdas!</Card.Footer>
    </Card>
    </div>
        <div className='flex'>
        <Card className="text-center">
      <Card.Header>PROMO DIA DE SPA</Card.Header>
      <Card.Body>
        <Card.Title>Mini Day Spa</Card.Title>
        <Card.Img variant="top" src={promo4} className='img' />
        <Card.Text>
          Masajes + Limpieza Facial<br/>Este paquete incluye un masaje descontracturante y limpieza facial para relajar el cuerpo y renovar la piel.
        </Card.Text>
        <Link to="*">
        <Button variant="primary">Ver más</Button>
        </Link>
      </Card.Body>
      <Card.Footer className="text-muted">Promo disponible hasta el 15/11 inclusive.</Card.Footer>
    </Card>
    </div>
      </section>
      <section className="publicidad">
      <img src={publicidad50off} alt="publicidad-50-%" id="imgpublicidad"/>
      </section>
      <section>
        <article className="centrado" id="border">
          <p>General José María Paz 576, San Miguel de Tucumán - Argentina.</p>
          <p>Horario: todos los días de 07:00 a 21:00 hs. <br/>Mail: nirvanaspaybeauty@gmail.com</p>
        <a href="https://web.whatsapp.com/" target="_blank">
          <button type="button" className="btn">Whatsapp Spa Concierge</button>
        </a> 
        </article>
        <div className="seccionWrap">
          <div className="textoabs">
            <img src={grid1tratamientos} alt="grid1-tratamientos" className="secciones"/>
            <Link to="/categorias" className="textoabsolute" id="etiquetaAsize" >Tratamientos</Link>
          </div>
          <div className="textoabs">
            <img src={grid2masajes} alt="grid2-masajes" className="secciones"/>
            <Link to="/categorias" className="textoabsolute" id="etiquetaAsize" >Masajes</Link>
          </div>
          <div className="textoabs">
            <img src={grid3rituales} alt="grid3-rituales" className="secciones"/>
            <Link to="/categorias" className="textoabsolute" id="etiquetaAsize" >Rituales</Link>
          </div>
        </div>
      </section>
    </main>
    
    </>
  )
}
export default HomePage;
