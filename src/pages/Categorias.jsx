import React, { useContext, useState } from 'react';
import '../styles/categorias.css';
import { Link } from "react-router-dom";
import imagenMap from '../assets/imagenMap.js';
import { Button } from 'react-bootstrap';
import { crearServicio } from '../helpers/ServicioApi.js';
import { UserContext } from '../context/UserContext.jsx';
import ModalAgregarServicio from '../components/ModalServicioNuevo.jsx';

function Categorias() {
  const { user } = useContext(UserContext);
  const [showAgregarServicio, setShowAgregarServicio] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  // Debug: verificar el usuario
  console.log('👤 Usuario en Categorias:', user);
  console.log('🔑 Rol del usuario:', user?.rol);

  const handleAgregarServicio = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setShowAgregarServicio(true);
  };

  const handleGuardarServicio = async (nuevoServicio) => {
    setShowAgregarServicio(false);
    // Aquí puedes agregar lógica adicional si necesitas refrescar la lista
  };

  return (
    <>
    <div className="maincategoria">  
      <section className='seccion-categoria'>
        <article className="contenedorImg" id="scrollspyHeading1">
          <img src={imagenMap.categoriatfacial} alt="tratamientos-faciales" className="imgbanner" />
          <h2 className="titulo">Tratamientos Faciales</h2>
          
        </article>
        <article className='boton-admin-serv'>
          {user?.rol === 'Admin' && (
            <Button 
              variant="success" 
              size="sm" 
              onClick={() => handleAgregarServicio('Tratamientos Faciales')}
              className="btn-admin-agregar"
            >
              + Añadir Servicio
            </Button>
          )}
        </article>         
        <article className="row-categorias">   
            <div className="contenedor">
              <img src={imagenMap.cattfacialessfaca} alt="tratamiento-essential-face-care" className="img-categoria" />
              <h4>Essential Face Care</h4>
              <p>
                <strong>Frescura y Equilibrio</strong> <br />
                Una rutina completa pensada para limpiar, hidratar y revitalizar
                tu rostro de forma profunda pero suave. Ideal para todo tipo de
                piel.
              </p>
              <Link to="/serviciosfacial">
                <Button type="button" className="btn-categoria" >Ver más</Button>
              </Link>
            </div>
            <div className="contenedor">
              <img src={imagenMap.cattfacialglowvitc} alt="tratamiento-glowing-vit-c" className="img-categoria" />
              <h4>Glowing Vit C+</h4>
              <p>
                <strong>¡Devuélvele la luz a tu piel!</strong> <br />Este
                tratamiento exclusivo está diseñado para revitalizar, hidratar y
                unificar el tono de tu rostro, gracias al poder antioxidante de
                la vitamina C.
              </p>
              <Link to="/serviciosfacial">
                <Button type="button" className="btn-categoria" >Ver más</Button>
              </Link>
            </div>
            <div className="contenedor">
              <img src={imagenMap.cattfacialrebfaca} alt="tratamiento-rebalancing-face-care" className="img-categoria" />
              <h4>Rebalancing Face Care</h4>
              <p>
                <strong>Equilibrio perfecto para tu piel</strong><br />Tratamiento especialmente formulado para restaurar el
                equilibrio natural del rostro, regulando la producción de sebo,
                purificando los poros y calmando las zonas sensibles.
              </p>
              <Link to="/serviciosfacial">
                <Button type="button" className="btn-categoria" >Ver más</Button>
              </Link>
            </div>
            <div className="contenedor">
              <img src={imagenMap.cattfacialglowr} alt="tratamiento-glowing-roses" className="img-categoria" />
              <h4>Glowing Roses</h4>
              <p>
                <strong>Piel luminosa e hidratada</strong><br />Luce una piel
                radiante, suave y fresca con el poder hidratante y calmante de
                las rosas.
              </p>
              <Link to="/serviciosfacial">
                <Button type="button" className="btn-categoria" >Ver más</Button>
              </Link>
            </div>
          
        </article>       
      </section>
      <section className='seccion-categoria'>
        <article className="contenedorImg" id="scrollspyHeading2">
          <img src={imagenMap.categoriatcorporal} alt="tratamientos-corporales"  className="imgbanner" />
          <h2 className="titulo">Tratamientos Corporales</h2>
        </article>
        <article className='boton-admin-serv'>
          {user?.rol === 'Admin' && (
            <Button 
              variant="success" 
              size="sm" 
              onClick={() => handleAgregarServicio('Tratamientos Corporales')}
              className="btn-admin-agregar"
            >
              + Añadir Servicio
            </Button>
          )}
        </article>
        <article className="row-categorias">
            <div className="contenedor">
              <img src={imagenMap.cattcorporalliwen} alt="tratamiento-corporal-liwen" className="img-categoria" />
              <h4>Ceremonia Liwen</h4>
              <p>
                <strong>Descubrí tu equilibrio natural</strong>
                <br />Tratamiento profundamente tonificante, nutritivo y
                protector, diseñado para aliviar la pesadez, tensión e hinchazón
                en piernas.
              </p>
              <Link to="/serviciostrcorporal">
                <Button type="button" className="btn-categoria" >Ver más</Button>
              </Link>
            </div>
            <div className="contenedor">
              <img src={imagenMap.cattcorporalragiantu} alt="tratamiento-corporal-ragiantu" className="img-categoria" />
              <h4>Ceremonia Ragiantu</h4>
              <p>
                <strong>Exfoliación + fango nutritivo + ducha Vichy</strong>
                <br />Tratamiento con ingredientes patagónicos que purifica y
                renueva tu piel en solo 50 minutos.
              </p>
              <Link to="/serviciostrcorporal">
                <Button type="button" className="btn-categoria" >Ver más</Button>
              </Link>
            </div>         
        </article>
      </section>
      <section className='seccion-categoria'>
        <article className="contenedorImg" id="scrollspyHeading3">
          <img src={imagenMap.categoriamasaje} alt="masajes"  className="imgbanner" />
          <h2 className="titulo">Masajes</h2>
        </article>
        <article className='boton-admin-serv'>
          {user?.rol === 'Admin' && (
            <Button 
              variant="success" 
              size="sm" 
              onClick={() => handleAgregarServicio('Masajes')}
              className="btn-admin-agregar"
            >
              + Añadir Servicio
            </Button>
          )}
        </article>
        <article className="row-categorias">         
            <div className="contenedor">
              <img src={imagenMap.catmasajesueco} alt="masaje-sueco" className="img-categoria" />
              <h4>Masaje Sueco</h4>
              <p>
                <strong>Relajación, alivio y renovación total</strong> <br />
                Con movimientos suaves y firmes, mejora la circulación, reduce
                el estrés y libera tensiones.
              </p>
              <Link to="/serviciosmasaje">
                <Button type="button" className="btn-categoria" >Ver más</Button>
              </Link>
            </div>
            <div className="contenedor">
              <img src={imagenMap.catmasajehots} alt="masaje-hot-stones" className="img-categoria" />
              <h4>Masaje Hot Stones</h4>
              <p>
                <strong>Energía volcánica para tu bienestar</strong>
                <br />Alivia el dolor muscular, estimula el metabolismo y relaja
                los tejidos.
              </p>
              <Link to="/serviciosmasaje">
                <Button type="button" className="btn-categoria" >Ver más</Button>
              </Link>
            </div>
            <div className="contenedor">
              <img src={imagenMap.catmasajedtissue} alt="masaje-deep-tissue" className="img-categoria" />
              <h4>Masaje Deep Tissue</h4>
              <p>
                <strong>¡Liberá tensiones profundas!</strong><br />Es ideal para
                aliviar contracturas crónicas, liberar tensiones profundas y
                mejorar la movilidad.
              </p>
              <Link to="/serviciosmasaje">
                <Button type="button" className="btn-categoria" >Ver más</Button>
              </Link>
            </div>
            <div className="contenedor">
              <img src={imagenMap.catmasajesignature} alt="masaje-signature" className="img-categoria" />
              <h4>Masaje Signature</h4>
              <p>
                <strong
                  >Ritual de bienestar con cera tibia y aceites
                  naturales</strong
                ><br />Experiencia sensorial y nutritiva que combina lo mejor de
                la aromaterapia y la cosmética natural.
              </p>
              <Link to="/serviciosmasaje">
                <Button type="button" className="btn-categoria" >Ver más</Button>
              </Link>
            </div>
        </article>
      </section>
      <section className='seccion-categoria'>
        <article className="contenedorImg" id="scrollspyHeading4">
          <img src={imagenMap.categoriaaromaterapia} alt="masajes-con-aromaterapia"  className="imgbanner" />
          <h2 className="titulo">Masajes con Aromaterapia</h2>
        </article>
        <article className='boton-admin-serv'>
          {user?.rol === 'Admin' && (
            <Button 
              variant="success" 
              size="sm" 
              onClick={() => handleAgregarServicio('Masajes con Aromaterapia')}
              className="btn-admin-agregar"
            >
              + Añadir Servicio
            </Button>
          )}
        </article>
        <article className="row-categorias">        
            <div className="contenedor">
              <img src={imagenMap.cataromatepurif} alt="masaje-a-purificante" className="img-categoria" />
              <h4>Purificante</h4>
              <p>
                <strong>Masaje con Rosas & Azhar</strong> <br />Combina el poder
                relajante del masaje con los delicados aromas de la rosa y el
                azahar.
              </p>
              <Link to="/serviciosmaromat">
                <Button type="button" className="btn-categoria" >Ver más</Button>
              </Link>
            </div>
            <div className="contenedor">
              <img src={imagenMap.cataromaterelaj} alt="masaje-a-relajante" className="img-categoria" />
              <h4>Relajante</h4>
              <p>
                <strong>Magnolia Sagrada, Cedro & Madera</strong> <br />Dejá que
                los aromas envolventes te transporten a un estado de calma
                profunda.
              </p>
              <Link to="/serviciosmaromat">
                <Button type="button" className="btn-categoria" >Ver más</Button>
              </Link>
            </div>
            <div className="contenedor">
              <img src={imagenMap.cataromateestim} alt="masaje-a-estimulante" className="img-categoria" />
              <h4>Estimulante</h4>
              <p>
                <strong>Bergamota, Limón & Lima</strong><br />Experiencia
                fresca, cítrica y energizante que despierta tus sentidos y
                renueva tu cuerpo.
              </p>
              <Link to="/serviciosmaromat">
                <Button type="button" className="btn-categoria" >Ver más</Button>
              </Link>
            </div> 
        </article>
      </section>
      <section className='seccion-categoria'>
        <article className="contenedorImg" id="scrollspyHeading5">
          <img src={imagenMap.categoriarituales} alt="a5" className="imgbanner" />
          <h2 className="titulo">Rituales</h2>
        </article>
        <article className='boton-admin-serv'>
          {user?.rol === 'Admin' && (
            <Button 
              variant="success" 
              size="sm" 
              onClick={() => handleAgregarServicio('Rituales')}
              className="btn-admin-agregar"
            >
              + Añadir Servicio
            </Button>
          )}
        </article>
        <article className="row-categorias">
            <div className="contenedor">
              <img src={imagenMap.catritualnirvesc} alt="ritual-nirvana-escape" className="img-categoria" />
              <h4>Ritual Nirvana Escape</h4>
              <p>
                <strong>Calma, presencia y bienestar</strong> <br />
                Experiencia dentro de nuestras Spa Suites. Incluye masaje sueco
                y un servicio especial de delicias.
              </p>
              <Link to="/serviciosrituales">
                <Button type="button" className="btn-categoria" >Ver más</Button>
              </Link>
            </div>
            <div className="contenedor">
              <img src={imagenMap.catritualminds} alt="ritual-mind-soul" className="img-categoria" />
              <h4>Ritual Mind & Soul</h4>
              <p>
                <strong>¡Experiencia rejuvenecedora!</strong><br />Este
                tratamiento combina técnicas especializadas para liberar
                tensiones en el cuero cabelludo, rostro y cuello.
              </p>
              <Link to="/serviciosrituales">
                <Button type="button" className="btn-categoria" >Ver más</Button>
              </Link>
            </div>
            <div className="contenedor">
              <img src={imagenMap.catritualafflora} alt="ritual-afflora" className="img-categoria" />
              <h4>Ritual Afflora</h4>
              <p>
                <strong>Alternativa Sensorial</strong><br />Experiencia dentro
                de nuestras Spa Suites. Incluye sesión de jacuzzi y masaje de
                aromaterapia.
              </p>
              <Link to="/serviciosrituales">
                <Button type="button" className="btn-categoria" >Ver más</Button>
              </Link>
            </div>
            <div className="contenedor">
              <img src={imagenMap.catritualmulfem} alt="ritual-mulfem" className="img-categoria" />
              <h4>Ritual Mülfem</h4>
              <p>
                <strong>Encuentro único y renovador</strong><br />Incluye
                exfoliación corporal con ducha Vichy y masaje sueco.
              </p>
              <Link to="/serviciosrituales">
                <Button type="button" className="btn-categoria" >Ver más</Button>
              </Link>
            </div>
            <div className="contenedor">
              <img src={imagenMap.catritualunad} alt="ritual-unad" className="img-categoria" />
              <h4>Ritual Üñad</h4>
              <p><strong>Trabajá en la flexibilidad y revitalización del cuerpo</strong><br />
                Este tratamiento incluye masaje de piedras calientes y
                tratamiento facial.
              </p>
              <Link to="/serviciosrituales">
                <Button type="button" className="btn-categoria" >Ver más</Button>
              </Link>
            </div>
            <div className="contenedor">
              <img src={imagenMap.catritualurkutun} alt="ritual-urkutun" className="img-categoria" />
              <h4>Ritual Ürkutun</h4>
              <p>
                <strong>Relajación Intensa</strong><br />Tratamiento ideal para
                quien desee descansar luego de un viaje o un intenso día de
                trabajo. Incluye masaje californiano y masaje de pies.
              </p>
              <Link to="/serviciosrituales">
                <Button type="button" className="btn-categoria" >Ver más</Button>
              </Link>
            </div>
        </article>
      </section>
    </div>

    {/* Modal para agregar nuevo servicio */}
    <ModalAgregarServicio 
      show={showAgregarServicio}
      onHide={() => setShowAgregarServicio(false)}
      onSave={handleGuardarServicio}
      categoriaPreselec={categoriaSeleccionada}
    />
  </>
  );
}

export default Categorias;