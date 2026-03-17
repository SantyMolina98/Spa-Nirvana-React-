import '../App.css';
import '../styles/Nosotros.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import imagenMap from '../assets/imagenMap.js';

function Nosotros () {
  return (
    <div className='mainNos'>
      <div className="centrado">
        <h1>Equilibrio y Bienestar</h1>
        <img src={imagenMap.logospaheader} alt="logo" className="logoarticle" />
        <h3 className="mainh">En Nirvana, creemos que el verdadero bienestar nace de la integración entre la salud física y la paz mental. Con años de experiencia en el sector de lujo y el autocuidado, hemos diseñado cada detalle para ofrecerte una experiencia transformadora.</h3>
      </div>
      <div className="cards-container">
        <section className="card-section">
          <div className="cardNos">
            <img src={imagenMap.Naza} alt="naza" className='fotoNos' />
            <div className='card-content'>
              <h2 className='h2Nos'>Nazarena Molina</h2>
              <p className='descripcionNos'>
                Soy estudiante de Biotecnología, estoy inmersa en el fascinante mundo de la ciencia, y actualmente estoy ampliando mis habilidades como desarrolladora Full Stack en Rolling Code. Me apasiona la intersección entre la ciencia y la tecnología, y mi objetivo es conectar ambos mundos. Resido en Tucumán y, además de mis estudios y mi formación, me desempeño como recepcionista y dedico mi tiempo libre a entrenar calistenia.
              </p>
              <ul className='ulNos'>
                <li className='liNos'><a href="https://github.com/nazarenamolina" target="_blank" rel="noopener noreferrer" className='fa'><i className="bi bi-github"></i></a></li>
                <li className='liNos'><a href="https://www.linkedin.com/in/nazarena-molina-b4376b270/" target="_blank" rel="noopener noreferrer" className='fa'><i className="bi bi-linkedin"></i></a></li>
                
              </ul>
            </div>
          </div>
        </section>
        <section className="card-section">
          <div className="cardNos">
            <img src={imagenMap.Anahi} alt="anahi" className='fotoNos' />
            <div className='card-content'>
              <h2 className='h2Nos'>Anahí Tellier</h2>
              <p className='descripcionNos'>
                Soy Bioterapeuta y miembro del equipo de Bioterapia El Despertar, me dedico a guiar a individuos en su camino hacia la autoconciencia y sanación de enfermedades y conflictos. Adicionalmente estoy cursando el programa de desarrollador Full Stack en Rolling Code para expandir mis habilidades en el ámbito web. Resido en Santa Fe, mis pasiones fuera del trabajo incluyen la cocina, mis mascotas, el yoga y explorar nuevos lugares a través de viajes.
              </p>
              <ul className='ulNos'>
                <li className='liNos'><a href="https://github.com/Anahi-Tellier" target="_blank" rel="noopener noreferrer" className='fa'><i className="bi bi-github"></i></a></li>
                <li className='liNos'><a href="*" className="fa"><i className="bi bi-linkedin"></i></a></li>
                
              </ul>
            </div>
          </div>
        </section>
        <section className="card-section">
          <div className="cardNos">
            <img src={imagenMap.Santy} alt="santy" className='fotoNos' />
            <div className='card-content'>
              <h2 className='h2Nos'>Santiago Martín Molina</h2>
              <p className='descripcionNos'>
                Trabajo en la heladería Grido, donde he desarrollado una sólida capacidad para la atención al cliente manejando diversas situaciones con profesionalismo. Adicionalmente, me estoy formando como desarrollador Full Stack en Rolling Code, una oportunidad para crecer profesionalmente y explorar nuevas áreas en el desarrollo web. Resido en Salta, me gusta jugar al fútbol, dedicarme a la organización de mi casa y disfrutar de la compañía de mi pareja y amigos.
              </p>
              <ul className='ulNos'>
                <li className='liNos'><a href="https://github.com/SantyMolina98" target="_blank" rel="noopener noreferrer" className='fa'><i className="bi bi-github"></i></a></li>
                <li className='liNos'><a href="https://www.linkedin.com/in/santiago-molina-2893a2339/" target="_blank" rel="noopener noreferrer" className='fa'><i className="bi bi-linkedin"></i></a></li>
                
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Nosotros;