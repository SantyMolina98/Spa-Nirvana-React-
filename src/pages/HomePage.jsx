import '../App.css';
import '../styles/HomePage.css';
import {Link} from 'react-router-dom';
import {Carousel, Image, Card, Button} from 'react-bootstrap';
import imagenMap from '../assets/imagenMap.js';

function HomePage () {
  return (
    <>
    <main className='MainHomeP'>
      <section>
      <Carousel fade>
      <Carousel.Item>
        <Image src={imagenMap.banner1} rounded className='carrusel'/>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={imagenMap.banner2} rounded className='carrusel'/>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={imagenMap.banner3} rounded className='carrusel'/>
        </Carousel.Item>
      </Carousel>
      </section>
      <section className='sectionPromosHP'>
          <article className="centrado">
          <h1>NIRVANA Spa & Beauty</h1>
          <h3>Un viaje sensorial de bienestar</h3>
          <img src={imagenMap.logospaheader} alt="logo" className="logoarticle"/>
          <p>Para una experiencia de verdadero placer, le da la bienvenida Nirvana Spa & Beauty, con una combinación de tratamientos, rituales y ceremonias basados ​​en los conocimientos ancestrales de diferentes culturas.<br/>
            Sumérjase en un viaje sensorial de bienestar en el spa más exclusivo de Tucumán. Disfrute relajantes masajes corporales y rituales cuidadosamente diseñados en un ambiente de lujo que irradia tranquilidad.</p>
            <p>*Los masajes, propuestas y tratamientos no incluyen instalaciones: sauna, jacuzzi, piscina y gimnasio se encuentran habilitados solamente para huéspedes.</p>
        </article>
      <h2 className='h2HomeP'>Promociones Destacadas</h2>
      <div className='flex'>
      <Card className="text-center">
      <Card.Header>PROMO MASAJES</Card.Header>
      <Card.Body>
        <Card.Title>Massage Relax</Card.Title>
        <Card.Img variant="top" src={imagenMap.promo1} className='img' />
        <Card.Text className='TextCardPromoHP'>
          Masajes Full Body + Coffee Pause<br/> Este paquete está diseñado para brindarle una experiencia integral de relajación, bienestar y renovación.
        </Card.Text>
        <Link to="*">
        <Button variant="primary btnCardPromo">Ver más</Button>
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
        <Card.Img variant="top" src={imagenMap.promo2} className='img' />
        <Card.Text className='TextCardPromoHP'>
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
        <Card.Img variant="top" src={imagenMap.promo3} className='img' />
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
        <Card.Img variant="top" src={imagenMap.promo4} className='img' />
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
      <img src={imagenMap.publicidad50off} alt="publicidad-50-%" id="imgpublicidad"/>
      </section>
      <section className='GridsHomeP'>
        <article className="centrado" >
          <p>General José María Paz 576, San Miguel de Tucumán - Argentina.</p>
          <p>Horario: todos los días de 07:00 a 21:00 hs. <br/>Mail: nirvanaspaybeauty@gmail.com</p>
        <a href="https://web.whatsapp.com/" target="_blank">
          <button type="button" className="btnWappHP">Whatsapp Spa Concierge</button>
        </a> 
        </article>
        <div className="seccionWrap">
          <div className="textoabs">
            <img src={imagenMap.grid1tratamientos} alt="grid1-tratamientos" className="secciones"/>
            <Link to="/categorias" className="textoabsolute" id="etiquetaAsizeTratamiento" >Tratamientos</Link>
          </div>
          <div className="textoabs">
            <img src={imagenMap.grid2masajes} alt="grid2-masajes" className="secciones"/>
            <Link to="/categorias" className="textoabsolute" id="etiquetaAsizeMasaje" >Masajes</Link>
          </div>
          <div className="textoabs">
            <img src={imagenMap.grid3rituales} alt="grid3-rituales" className="secciones"/>
            <Link to="/categorias" className="textoabsolute" id="etiquetaAsizeRitual" >Rituales</Link>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}
export default HomePage;
