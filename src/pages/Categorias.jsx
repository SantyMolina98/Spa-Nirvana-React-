import '../styles/App.css';
import '../styles/categorias.css';
import 'bootstrap';
import { Link } from 'react-router-dom';
import categoriatfacial from '../assets/Img/categoriatfacial.JPG';
import cattfacialessfaca from '../assets/Img/cattfacialessfaca.JPG';
import cattfacialglowr from '../assets/Img/cattfacialglowr.JPG';
import cattfacialglowvitc from '../assets/Img/cattfacialglowvitc.JPG';
import cattfacialrebfaca from '../assets/Img/cattfacialrebfaca.JPG';
import categoriatcorporal from '../assets/Img/categoriatcorporal.JPG';
import cattcorporalliwen from '../assets/Img/cattcorporalliwen.jpg';
import cattcorporalragiantu from '../assets/Img/cattcorporalragiantu.JPG';
import categoriamasaje from '../assets/Img/categoriamasaje.JPG';
import catmasajedtissue from '../assets/Img/catmasajedtissue.JPG';
import catmasajehots from '../assets/Img/catmasajehots.JPG';
import catmasajesignature from '../assets/Img/catmasajesignature.JPG';
import catmasajesueco from '../assets/Img/catmasajesueco.JPG';
import categoriaaromaterapia from '../assets/Img/categoriaaromaterapia.JPG';
import cataromateestim from '../assets/Img/cataromateestim.JPG';
import cataromatepurif from '../assets/Img/cataromatepurif.JPG';
import cataromaterelaj from '../assets/Img/cataromaterelaj.JPG';
import categoriarituales from '../assets/Img/categoriarituales.JPG';
import catritualafflora from '../assets/Img/catritualafflora.JPG';
import catritualminds from '../assets/Img/catritualminds.jpg';
import catritualmulfem from '../assets/Img/catritualmulfem.JPG';
import catritualnirvesc from '../assets/Img/catritualnirvesc.jpg';
import catritualunad from '../assets/Img/catritualunad.JPG';
import catritualurkutun from '../assets/Img/catritualurkutun.JPG';

export default function Categorias () {
  return (
    <main>
      <section>
        <div className="contenedorImg" id="scrollspyHeading1">
          <img src={categoriatfacial} alt="a" id="imgbanner" />
          <h2 className="titulo">Tratamientos Faciales</h2>
        </div>
        <div className="container text-center">
          <div className="row">
            <div className="col contenedor">
              <img src={cattfacialessfaca} alt="tf1" className="img" />
              <h4>Essential Face Care</h4>
              <p>
                <strong>Frescura y Equilibrio</strong> <br />
                Una rutina completa pensada para limpiar, hidratar y revitalizar
                tu rostro de forma profunda pero suave. Ideal para todo tipo de
                piel.
              </p>
              <Link to="/categorias/serviciosmasajes">
                <button type="button" className='btn'>Ver más</button>
              </Link>
            </div>
            <div className="col contenedor">
              <img src={cattfacialglowvitc} alt="tf2" className="img" />
              <h4>Glowing Vit C+</h4>
              <p>
                <strong>¡Devuélvele la luz a tu piel!</strong> <br />Este
                tratamiento exclusivo está diseñado para revitalizar, hidratar y
                unificar el tono de tu rostro, gracias al poder antioxidante de
                la vitamina C.
              </p>
              <Link to="/categorias/serviciosfacial">
                <button type="button" className='btn'>Ver más</button>
              </Link>
            </div>
            <div className="col contenedor">
              <img src={cattfacialrebfaca} alt="tf3" className="img" />
              <h4>Rebalancing Face Care</h4>
              <p>
                <strong>Equilibrio perfecto para tu piel</strong
                ><br />Tratamiento especialmente formulado para restaurar el
                equilibrio natural del rostro, regulando la producción de sebo,
                purificando los poros y calmando las zonas sensibles.
              </p>
                <Link to="/categorias/serviciosfacial">
                <button type="button" className='btn'>Ver más</button>
              </Link>
            </div>
            <div className="col contenedor">
              <img src={cattfacialglowr} alt="tf4" className="img" />
              <h4>Glowing Roses</h4>
              <p>
                <strong>Piel luminosa e hidratada</strong><br />Luce una piel
                radiante, suave y fresca con el poder hidratante y calmante de
                las rosas.
              </p>
              <Link to="/categorias/serviciosfacial">
                <button type="button" className='btn'>Ver más</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="contenedorImg" id="scrollspyHeading2">
          <img src={categoriatcorporal} alt="a2" id="imgbanner" />
          <h2 className="titulo">Tratamientos Corporales</h2>
        </div>
        <div className="container text-center">
          <div className="row">
            <div className="col contenedor">
              <img src={cattcorporalliwen} alt="tc1" className="img" />
              <h4>Ceremonia Liwen</h4>
              <p>
                <strong>Descubrí tu equilibrio natural</strong>
                <br />Tratamiento profundamente tonificante, nutritivo y
                protector, diseñado para aliviar la pesadez, tensión e hinchazón
                en piernas.
              </p>
              <Link to="*">
                <button type="button" className='btn'>Ver más</button>
              </Link> 
            </div>
            <div className="col contenedor">
              <img src={cattcorporalragiantu} alt="tc2" className="img" />
              <h4>Ceremonia Ragiantu</h4>
              <p>
                <strong>Exfoliación + fango nutritivo + ducha Vichy</strong>
                <br />Tratamiento con ingredientes patagónicos que purifica y
                renueva tu piel en solo 50 minutos.
              </p>
             <Link to="*">
                <button type="button" className='btn'>Ver más</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="contenedorImg" id="scrollspyHeading3">
          <img src={categoriamasaje} alt="a3" id="imgbanner" />
          <h2 className="titulo">Masajes</h2>
        </div>
        <div className="container text-center">
          <div className="row">
            <div className="col contenedor">
              <img src={catmasajesueco} alt="m1" className="img" />
              <h4>Masaje Sueco</h4>
              <p>
                <strong>Relajación, alivio y renovación total</strong> <br />
                Con movimientos suaves y firmes, mejora la circulación, reduce
                el estrés y libera tensiones.
              </p>
              <Link to="/categorias/serviciosmasajes">
                <button type="button" className='btn'>Ver más</button>
              </Link>              
            </div>
            <div className="col contenedor">
              <img src={catmasajehots} alt="m2" className="img" />
              <h4>Masaje Hot Stones</h4>
              <p>
                <strong>Energía volcánica para tu bienestar</strong>
                <br />Alivia el dolor muscular, estimula el metabolismo y relaja
                los tejidos.
              </p>
              <Link to="/categorias/serviciosmasajes">
                <button type="button" className='btn'>Ver más</button>
              </Link> 
            </div>
            <div className="col contenedor">
              <img src={catmasajedtissue} alt="m3" className="img" />
              <h4>Masaje Deep Tissue</h4>
              <p>
                <strong>¡Liberá tensiones profundas!</strong><br />Es ideal para
                aliviar contracturas crónicas, liberar tensiones profundas y
                mejorar la movilidad.
              </p>
              <Link to="/categorias/serviciosmasajes">
                <button type="button" className='btn'>Ver más</button>
              </Link>
            </div>
            <div className="col contenedor">
              <img src={catmasajesignature} alt="m4" className="img" />
              <h4>Masaje Signature</h4>
              <p>
                <strong
                  >Ritual de bienestar con cera tibia y aceites
                  naturales</strong
                ><br />Experiencia sensorial y nutritiva que combina lo mejor de
                la aromaterapia y la cosmética natural.
              </p>
              <Link to="/categorias/serviciosmasajes">
                <button type="button" className='btn'>Ver más</button>
              </Link> 
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="contenedorImg" id="scrollspyHeading4">
          <img src={categoriaaromaterapia} alt="a4" id="imgbanner" />
          <h2 className="titulo">Masajes con Aromaterapia</h2>
        </div>
        <div className="container text-center">
          <div className="row">
            <div className="col contenedor">
              <img src={cataromatepurif} alt="ma1" className="img" />
              <h4>Purificante</h4>
              <p>
                <strong>Masaje con Rosas & Azhar</strong> <br />Combina el poder
                relajante del masaje con los delicados aromas de la rosa y el
                azahar.
              </p>
              <Link to="*">
                <button type="button" className='btn'>Ver más</button>
              </Link> 
            </div>
            <div className="col contenedor">
              <img src={cataromaterelaj} alt="ma2" className="img" />
              <h4>Relajante</h4>
              <p>
                <strong>Magnolia Sagrada, Cedro & Madera</strong> <br />Dejá que
                los aromas envolventes te transporten a un estado de calma
                profunda.
              </p>
              <Link to="*">
                <button type="button" className='btn'>Ver más</button>
              </Link> 
            </div>
            <div className="col contenedor">
              <img src={cataromateestim} alt="ma3" className="img" />
              <h4>Estimulante</h4>
              <p>
                <strong>Bergamota, Limón & Lima</strong><br />Experiencia
                fresca, cítrica y energizante que despierta tus sentidos y
                renueva tu cuerpo.
              </p>
              <Link to="*">
                <button type="button" className='btn'>Ver más</button>
              </Link>  
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="contenedorImg" id="scrollspyHeading5">
          <img src={categoriarituales} alt="a5" id="imgbanner" />
          <h2 className="titulo">Rituales</h2>
        </div>
        <div className="container text-center">
          <div className="row">
            <div className="col contenedor">
              <img src={catritualnirvesc} alt="r1" className="img" />
              <h4>Ritual Nirvana Escape</h4>
              <p>
                <strong>Calma, presencia y bienestar</strong> <br />
                Experiencia dentro de nuestras Spa Suites. Incluye masaje sueco
                y un servicio especial de delicias.
              </p>
              <Link to="*">
                <button type="button" className='btn'>Ver más</button>
              </Link> 
            </div>
            <div className="col contenedor">
              <img src={catritualminds} alt="r2" className="img" />
              <h4>Ritual Mind & Soul</h4>
              <p>
                <strong>¡Experiencia rejuvenecedora!</strong><br />Este
                tratamiento combina técnicas especializadas para liberar
                tensiones en el cuero cabelludo, rostro y cuello.
              </p>
              <Link to="*">
                <button type="button" className='btn'>Ver más</button>
              </Link> 
            </div>
            <div className="col contenedor">
              <img src={catritualafflora} alt="r3" className="img" />
              <h4>Ritual Afflora</h4>
              <p>
                <strong>Alternativa Sensorial</strong><br />Experiencia dentro
                de nuestras Spa Suites. Incluye sesión de jacuzzi y masaje de
                aromaterapia.
              </p>
              <Link to="*">
                <button type="button" className='btn'>Ver más</button>
              </Link> 
            </div>
            <div className="col contenedor">
              <img src={catritualmulfem} alt="r4" className="img" />
              <h4>Ritual Mülfem</h4>
              <p>
                <strong>Encuentro único y renovador</strong><br />Incluye
                exfoliación corporal con ducha Vichy y masaje sueco.
              </p>
              <Link to="*">
                <button type="button" className='btn'>Ver más</button>
              </Link> 
            </div>
            <div className="col contenedor">
              <img src={catritualunad} alt="r5" className="img" />
              <h4>Ritual Üñad</h4>
              <p>
                <strong
                  >Trabajá en la flexibilidad y revitalización del
                  cuerpo</strong
                ><br />Este tratamiento incluye masaje de piedras calientes y
                tratamiento facial.
              </p>
              <Link to="*">
                <button type="button" className='btn'>Ver más</button>
              </Link> 
            </div>
            <div className="col contenedor">
              <img src={catritualurkutun} alt="r6" className="img" />
              <h4>Ritual Ürkutun</h4>
              <p>
                <strong>Relajación Intensa</strong><br />Tratamiento ideal para
                quien desee descansar luego de un viaje o un intenso día de
                trabajo. Incluye masaje californiano y masaje de pies.
              </p>
              <Link to="*">
                <button type="button" className='btn'>Ver más</button>
              </Link> 
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

