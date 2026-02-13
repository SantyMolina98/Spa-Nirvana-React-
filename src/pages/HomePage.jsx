import '../App.css';
import '../styles/HomePage.css';
import {Link} from 'react-router-dom';
import {Carousel, Image, Button} from 'react-bootstrap';
import imagenMap from '../assets/imagenMap.js';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import { getServicios } from '../helpers/ServicioApi.js';
import { CarruselServiciosDestacados } from '../components/CarruselServiciosDestacados.jsx';

function HomePage () {
  const { user } = useContext(UserContext);
  const [serviciosDestacados, setServiciosDestacados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarServiciosDestacados = async () => {
      try {
        const data = await getServicios();
        const destacados = (data.servicios || []).filter(servicio => servicio.destacado === true);
        setServiciosDestacados(destacados);
      } catch (error) {
        console.error('Error al cargar servicios destacados:', error);
      } finally {
        setLoading(false);
      }
    };
    cargarServiciosDestacados();
  }, []);

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
          <h1>Nirvana Spa & Beauty</h1>
          <h3>Un viaje sensorial de bienestar...</h3>
          <img src={imagenMap.logospaheader} alt="logo" className="logoarticle"/>
          <p>Te damos la bienvenida a Nirvana, donde combinamos tratamientos, rituales y ceremonias basados ​​en los conocimientos ancestrales de diferentes culturas.<br/>
            Adéntrate en un viaje sensorial de bienestar en el spa más exclusivo de Tucumán. Disfrutá de relajantes masajes corporales y rituales cuidadosamente diseñados en un ambiente de lujo que irradia tranquilidad.</p>
            <p>*Los masajes, propuestas y tratamientos no incluyen las siguientes instalaciones: sauna, jacuzzi y piscina; éstos se encuentran habilitados solamente para huéspedes.</p>
        </article>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h2 className='h2HomeP'>Promociones Destacadas</h2>
        {user?.rol === 'Admin' && (
          <Link to="/admin">
            <Button variant="primary" size="sm">Agregar Promo</Button>
          </Link>
        )}
      </div>
      
      {loading ? (
        <p className="text-center">Cargando promociones...</p>
      ) : (
        <CarruselServiciosDestacados servicios={serviciosDestacados} />
      )}
      
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
