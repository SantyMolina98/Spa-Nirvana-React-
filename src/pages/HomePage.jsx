import {Link} from 'react-router-dom';
import '../App.css';
import '../styles/index.css';
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
    <main>
      <section>
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={banner1} className="d-block w-100" alt="banner1"/>
              <div className="carousel-caption d-none d-md-block">
              </div>
            </div>
            <div className="carousel-item">
              <img src={banner2} className="d-block w-100" alt="banner2"/>
              <div className="carousel-caption d-none d-md-block">
              </div>
            </div>
            <div className="carousel-item">
              <img src={banner3} className="d-block w-100" alt="banner3"/>
              <div className="carousel-caption d-none d-md-block">
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
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
      </section>
      <section>
        <h2>Promociones Destacadas</h2>
        <div className="container text-center">
          <div className="row">
            <div className="col contenedor">
              <img src={promo1} alt="prom1" className="img"/>
              <h4>Massage Relax</h4>
              <p><strong>Masajes Full Body + Coffee Pause</strong> <br/> Este paquete está diseñado para brindarle una experiencia integral de relajación, bienestar y renovación. </p>
              <Link to="*">
                <button type="button" className="btn">Ver más</button>
              </Link> 
            </div>
            <div className="col contenedor">
              <img src={promo2} alt="prom2" className="img"/>
              <h4>Spa Revitalizante</h4>
              <p><strong>Blend de masaje a elección</strong><br/>Incluye máscara facial, descanso y restauración en sala de relax acompañado de merienda saludable.</p>
              <Link to="*">
                <button type="button" className="btn">Ver más</button>
              </Link> 
            </div>
            <div className="col contenedor">
              <img src={promo3} alt="prom3" className="img"/>
              <h4>Día de Spa Relax</h4>
              <p><strong>Hidroterapia, Masajes, Facial. Para 2 personas</strong><br/>Una tarde diferente para relajarse, descansar y compartir.</p>
              <Link to="*">
                <button type="button" className="btn">Ver más</button>
              </Link> 
            </div>
            <div className="col contenedor">
              <img src={promo4} alt="prom4" className="img"/>
              <h4>Mini Day Spa</h4>
              <p><strong>Masajes + Limpieza Facial</strong><br/>Este paquete incluye un masaje descontracturante y limpieza facial para relajar el cuerpo y renovar la piel.</p>
              <Link to="*">
                <button type="button" className="btn">Ver más</button>
              </Link>
            </div>
          </div>
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
  )
}
export default HomePage;
