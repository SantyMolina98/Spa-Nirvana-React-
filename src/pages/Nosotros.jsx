import '../App.css';
import '../styles/Nosotros.css';
import 'bootstrap';
import { Link } from 'react-router-dom';
import logospaheader from '../assets/Img/logospaheader.png';
import Naza from '../assets/Img/Naza.png';
import Anahi from '../assets/Img/Anahi.png';
import Santy from '../assets/Img/Santy.png';
import Gene from '../assets/Img/Gene.png';

function Nosotros  ()  {
  return (
    <main>
      <article className="centrado">
        <h1>NIRVANA Spa & Beauty</h1>
        <img src={logospaheader} alt="logo" className="logoarticle" />
        <h3 className="mainh">Trabajamos con dedicación y creatividad para convertir ideas en soluciones funcionales y bien pensadas.</h3>
      </article>
    <section className="card-section">
      <div className="card">
        <img src={Naza} alt="naza" />
        <div>
          <h2>Nazarena Molina</h2>
          <p>Soy estudiante de Biotecnología, estoy inmersa en el fascinante mundo de la ciencia, y actualmente estoy
            ampliando mis habilidades como desarrolladora Full Stack en Rolling Code. Me apasiona la intersección entre
            la ciencia y la tecnología, y mi objetivo es conectar ambos mundos. Resido en Tucumán y, además de mis
            estudios y mi formación, me desempeño como recepcionista y dedico mi tiempo libre a entrenar calistenia.</p>
          <ul>
            <li><a href="https://www.facebook.com/nazarena.molina.381265" target="_blank" className="fa fa-facebook"></a></li>
            <li><a href="https://www.linkedin.com/in/nazarena-molina-b4376b270/" target="_blank" className="fa fa-linkedin"></a></li>
            <li><a href="https://www.instagram.com/nazarenamolina/" target="_blank" className="fa fa-instagram"></a></li>
          </ul>
        </div>
      </div>      
    </section>
    <section className="card-section">
      <div className="card">
        <img src={Anahi} alt="anahi" />
        <div>
          <h2>Anahí Tellier</h2>
          <p>Soy Bioterapeuta y miembro del equipo de Bioterapia El Despertar, me dedico a guiar a individuos en su
            camino hacia la autoconciencia y sanación de enfermedades y conflictos.Adicionalmente estoy cursando el
            programa de desarrollador Full Stack en Rolling Code para expandir mis habilidades en el ámbito web. Resido
            en Santa Fe, mis pasiones fuera del trabajo incluyen la cocina, mis
            mascotas, el yoga y explorar nuevos lugares a través de viajes.</p>
          <ul>
            <li><a href="https://www.facebook.com/share/1E2tGpbciN/" target="_blank" className="fa fa-facebook"></a></li>
            <li><a href="#" className="fa fa-linkedin"></a></li>
            <li><a href="https://www.instagram.com/anahi.tellier_bioterapeuta/?igsh=aGFlMTV2NXllbHhi#"
               target="_blank" className="fa fa-instagram"></a></li>
          </ul>
        </div>
      </div>
    </section>
    <section className="card-section">
      <div className="card">
        <img src={Santy} alt="santy" />
        <div>
          <h2>Santiago Martín Molina</h2>
          <p>Trabajo en la heladería Grido, donde he desarrollado una sólida capacidad para la atención al cliente
            manejando diversas situaciones con profesionalismo. Adicionalmente, me estoy formando como
            desarrollador Full Stack en Rolling Code, una oportunidad para crecer profesionalmente y explorar nuevas
            áreas en el desarrollo web. Resido de Salta, me gusta jugar al fútbol,
            dedicarme a la organización de mi casa y disfrutar de la compañía de mi pareja y amigos.</p>
          <ul>
            <li><a href="https://www.facebook.com/santy.molina.98cima?locale=es_LA" target="_blank" className="fa fa-facebook"></a></li>
            <li><a href="https://www.linkedin.com/in/santiago-molina-2893a2339/" target="_blank" className="fa fa-linkedin"></a></li>
            <li><a href="https://www.instagram.com/santymolina98/" target="_blank" className="fa fa-instagram"></a></li>
          </ul>
        </div>
      </div>
    </section>
    <section className="card-section">
      <div className="card">
        <img src={Gene} alt="gene" />
        <div>
          <h2>Genesis Bolaño</h2>
          <p>Trabajo en Red Link como Auditor de Sistemas. Me encuentro estudiando la Licenciatura en Gestión en
            Tecnología Informática en la UAI y también el
            curso de desarrollador Full Stack en Rolling Code. Esto es para sumar nuevos conocimientos a nivel
            profesional y poder avanzar en mis proyectos personales.Resido en Buenos Aires. En mi tiempo libre, me gusta
            ir al gimnasio, compartir con amigos, bailar, viajar y pasear a mi mascota.</p>
          <ul>
            <li><a href="https://www.facebook.com/Genesiscarolinabolano" target="_blank" className="fa fa-facebook"></a></li>
            <li><a href="https://www.linkedin.com/in/genesis-bola%C3%B1o-55b6b0aa/" target="_blank" className="fa fa-linkedin"></a></li>
            <li><a href="https://www.instagram.com/bgenesism/" target="_blank" className="fa fa-instagram"></a></li>
          </ul>
      </div>
      </div>
    </section>
  </main>
  )
}

export default Nosotros;