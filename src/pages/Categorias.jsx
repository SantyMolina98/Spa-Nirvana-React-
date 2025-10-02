import '../App.css';
import '../styles/categorias.css';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import imagenMap from '../assets/imagenMap';

function Categorias () {
  return (
    <div className='maincategoria'>
      <div>
        <div className="contenedorImg" id="scrollspyHeading1">
          <img src={imagenMap.categoriatfacial} alt="banner-tratamiento-facial" className="imgbanner" />
          <h2 className="titulo">Tratamientos Faciales</h2>
        </div>
        <div className="row">
            <Card style={{ width: '22rem' }} className='cardcategoria'>
              <Card.Img variant="top" src={imagenMap.cattfacialessfaca} alt="tratamiento-facial-essential-face-care" className="img" />
              <Card.Body className='bodycard'>
                <Card.Title>Essential Face Care</Card.Title>
                  <Card.Text>
                    <strong>Frescura y Equilibrio</strong> <br />
                    Una rutina completa pensada para limpiar, hidratar y revitalizar
                    tu rostro de forma profunda pero suave. Ideal para todo tipo de
                    piel.
                  </Card.Text>
              <Link to="/categorias/serviciosmasajes" className='links'>
                <Button className='btn'>Ver más</Button>
              </Link>
              </Card.Body>
              
            </Card>
            <Card  style={{ width: '22rem' }} className='cardcategoria'>
              <Card.Img variant="top" src={imagenMap.cattfacialglowvitc} alt="tratamiento-facial-glowinf-vit-c" className="img" />
              <Card.Body className='bodycard'>
              <Card.Title>Glowing Vit C+</Card.Title>
              <Card.Text>
                <strong>¡Devuélvele la luz a tu piel!</strong> <br />Este
                tratamiento exclusivo está diseñado para revitalizar, hidratar y
                unificar el tono de tu rostro, gracias al poder antioxidante de
                la vitamina C.
              </Card.Text>
              <Link to="/categorias/serviciosfacial" className='links'>
                <Button variant="primary" className='btn'>Ver más</Button>
              </Link>
              </Card.Body>
            </Card>
            <Card  style={{ width: '22rem' }} className='cardcategoria'>
              <Card.Img variant="top" src={imagenMap.cattfacialrebfaca} alt="tratamiento-facial-rebalancing" className="img" />
              <Card.Body className='bodycard'>
              <Card.Title>Rebalancing Face Care</Card.Title>
              <Card.Text>
                <strong>Equilibrio perfecto para tu piel</strong> <br />Tratamiento especialmente formulado para restaurar el
                equilibrio natural del rostro, regulando la producción de sebo,
                purificando los poros y calmando las zonas sensibles.
              </Card.Text>
                <Link to="/categorias/serviciosfacial" className='links'>
                <Button variant="primary" className='btn'>Ver más</Button>
              </Link>
              </Card.Body>
            </Card>
            <Card  style={{ width: '22rem' }} className='cardcategoria'>
              <Card.Img variant="top" src={imagenMap.cattfacialglowr} alt="tratamiento-facial-glowing-roses" className="img" />
              <Card.Body className='bodycard'>
              <Card.Title>Glowing Roses</Card.Title>
              <Card.Text>
                <strong>Piel luminosa e hidratada</strong><br />Luce una piel
                radiante, suave y fresca con el poder hidratante y calmante de
                las rosas.
              </Card.Text>
              <Link to="/categorias/serviciosfacial" className='links'>
                <Button variant="primary" className='btn'>Ver más</Button>
              </Link>
              </Card.Body>
            </Card>
        </div>
        
      </div>
      <div>
        <div className="contenedorImg" id="scrollspyHeading2">
          <img src={imagenMap.categoriatcorporal} alt="banner-tratamiento-corporal" className="imgbanner" />
          <h2 className="titulo">Tratamientos Corporales</h2>
        </div>
        <div className="row">
            <Card  style={{ width: '22rem' }} className='cardcategoria'>
              <Card.Img  variant="top" src={imagenMap.cattcorporalliwen} alt="tratamiento-corporal-ceremonia-liwen" className="img" />
              <Card.Body className='bodycard'>
              <Card.Title>Ceremonia Liwen</Card.Title>
              <Card.Text>
                <strong>Descubrí tu equilibrio natural</strong>
                <br />Tratamiento profundamente tonificante, nutritivo y
                protector, diseñado para aliviar la pesadez, tensión e hinchazón
                en piernas.
              </Card.Text>
              <Link to="*" className='links'>
                <Button type="button" className='btn'>Ver más</Button>
              </Link> 
              </Card.Body>
            </Card>
            <Card  style={{ width: '22rem' }} className='cardcategoria'>
              <Card.Img variant="top"  src={imagenMap.cattcorporalragiantu} alt="tratamiento-corporal-ragiantu" className="img" />
              <Card.Body className='bodycard'>
              <Card.Title>Ceremonia Ragiantu</Card.Title>
              <Card.Text>
                <strong>Exfoliación + fango nutritivo + ducha Vichy</strong>
                <br />Tratamiento con ingredientes patagónicos que purifica y
                renueva tu piel en solo 50 minutos.
              </Card.Text>
             <Link to="*" className='links'>
                <Button type="button" className='btn'>Ver más</Button>
              </Link>
              </Card.Body>
            </Card>
        </div>       
      </div>
      <div>
        <div className="contenedorImg" id="scrollspyHeading3">
          <img src={imagenMap.categoriamasaje} alt="banner-masajes" className="imgbanner" />
          <h2 className="titulo">Masajes</h2>
        </div>
        <div className="row">
            <Card  style={{ width: '22rem' }} className='cardcategoria'>
              <Card.Img variant='top' src={imagenMap.catmasajesueco} alt="masaje-sueco" className="img" />
              <Card.Body className='bodycard'>
              <Card.Title>Masaje Sueco</Card.Title>
              <Card.Text>
                <strong>Relajación, alivio y renovación total</strong> <br />
                Con movimientos suaves y firmes, mejora la circulación, reduce
                el estrés y libera tensiones.
              </Card.Text>
              <Link to="/categorias/serviciosmasajes" className='links'>
                <Button type="button" className='btn'>Ver más</Button>
              </Link>     
              </Card.Body>         
            </Card>
            <Card  style={{ width: '22rem' }} className='cardcategoria'>
              <Card.Img variant='top' src={imagenMap.catmasajehots} alt="masaje-hot-stones" className="img" />
              <Card.Body className='bodycard'>
              <Card.Title>Masaje Hot Stones</Card.Title>
              <Card.Text>
                <strong>Energía volcánica para tu bienestar</strong>
                <br />Alivia el dolor muscular, estimula el metabolismo y relaja
                los tejidos.
              </Card.Text>
              <Link to="/categorias/serviciosmasajes" className='links'>
                <Button type="button" className='btn'>Ver más</Button>
              </Link>
              </Card.Body>
            </Card>
            <Card  style={{ width: '22rem' }} className='cardcategoria'>
              <Card.Img variant='top' src={imagenMap.catmasajedtissue} alt="masaje-deep-tissue" className="img" />
              <Card.Body className='bodycard'>
              <Card.Title>Masaje Deep Tissue</Card.Title>
              <Card.Text>
                <strong>¡Liberá tensiones profundas!</strong><br />Es ideal para
                aliviar contracturas crónicas, liberar tensiones profundas y
                mejorar la movilidad.
              </Card.Text>
              <Link to="/categorias/serviciosmasajes" className='links'>
                <Button type="button" className='btn'>Ver más</Button>
              </Link>
              </Card.Body>
            </Card>
            <Card  style={{ width: '22rem' }} className='cardcategoria'>
              <Card.Img variant='top' src={imagenMap.catmasajesignature} alt="masaje-signature" className="img" />
              <Card.Body className='bodycard'>
              <Card.Title>Masaje Signature</Card.Title>
              <Card.Text>
                <strong>Ritual de bienestar con cera tibia y aceites
                  naturales</strong> <br />Experiencia sensorial y nutritiva que combina lo mejor de
                la aromaterapia y la cosmética natural.
              </Card.Text>
              <Link to="/categorias/serviciosmasajes" className='links'>
                <Button type="button" className='btn'>Ver más</Button>
              </Link> 
              </Card.Body>
            </Card>
        </div>
       
      </div>
      <div>
        <div className="contenedorImg" id="scrollspyHeading4">
          <img src={imagenMap.categoriaaromaterapia} alt="banner-masajes-aromaterapia" className="imgbanner" />
          <h2 className="titulo">Masajes con Aromaterapia</h2>
        </div>
          <div className="row">
            <Card  style={{ width: '22rem' }} className='cardcategoria'>
              <Card.Img variant='top' src={imagenMap.cataromatepurif} alt="masaje-aromaterapia-purificante" className="img" />
              <Card.Body className='bodycard'>
              <Card.Title>Purificante</Card.Title>
              <Card.Text>
                <strong>Masaje con Rosas & Azhar</strong> <br />Combina el poder
                relajante del masaje con los delicados aromas de la rosa y el
                azahar.
              </Card.Text>
              <Link to="*" className='links'>
                <Button type="button" className='btn'>Ver más</Button>
              </Link>
              </Card.Body> 
            </Card>
            <Card  style={{ width: '22rem' }} className='cardcategoria'>
              <Card.Img variant='top' src={imagenMap.cataromaterelaj} alt="masaje-aromaterapia-relajante" className="img" />
              <Card.Body className='bodycard'>
              <Card.Title>Relajante</Card.Title>
              <Card.Text>
                <strong>Magnolia Sagrada, Cedro & Madera</strong> <br />Dejá que
                los aromas envolventes te transporten a un estado de calma
                profunda.
              </Card.Text>
              <Link to="*" className='links'>
                <Button type="button" className='btn'>Ver más</Button>
              </Link>
              </Card.Body> 
            </Card>
            <Card  style={{ width: '22rem' }} className='cardcategoria'>
              <Card.Img variant='top' src={imagenMap.cataromateestim} alt="masaje-aromaterapia-estimulante" className="img" />
              <Card.Body className='bodycard'>
              <Card.Title>Estimulante</Card.Title>
              <Card.Text>
                <strong>Bergamota, Limón & Lima</strong><br />Experiencia
                fresca, cítrica y energizante que despierta tus sentidos y
                renueva tu cuerpo.
              </Card.Text>
              <Link to="*" className='links'>
                <Button type="button" className='btn'>Ver más</Button>
              </Link>
              </Card.Body>  
            </Card>
          </div>
      </div>
      <div>
        <div className="contenedorImg" id="scrollspyHeading5">
          <img src={imagenMap.categoriarituales} alt="banner-rituales" className="imgbanner" />
          <h2 className="titulo">Rituales</h2>
        </div>
          <div className="row">
            <Card  style={{ width: '22rem' }} className='cardcategoria'>
              <Card.Img variant='top'  src={imagenMap.catritualnirvesc} alt="ritual-nirvana-escape" className="img" />
              <Card.Body className='bodycard'>
              <Card.Title>Ritual Nirvana Escape</Card.Title>
              <Card.Text>
                <strong>Calma, presencia y bienestar</strong> <br />
                Experiencia dentro de nuestras Spa Suites. Incluye masaje sueco
                y un servicio especial de delicias.
              </Card.Text>
              <Link to="*" className='links'>
                <Button type="button" className='btn'>Ver más</Button>
              </Link>
              </Card.Body> 
            </Card>
            <Card  style={{ width: '22rem' }} className='cardcategoria'>
              <Card.Img variant='top'  src={imagenMap.catritualminds} alt="ritual-mind-soul" className="img" />
              <Card.Body className='bodycard'>
              <Card.Title>Ritual Mind & Soul</Card.Title>
              <Card.Text>
                <strong>¡Experiencia rejuvenecedora!</strong><br />Este
                tratamiento combina técnicas especializadas para liberar
                tensiones en el cuero cabelludo, rostro y cuello.
              </Card.Text>
              <Link to="*" className='links'>
                <Button type="button" className='btn'>Ver más</Button>
              </Link>
              </Card.Body> 
            </Card>
            <Card  style={{ width: '22rem' }} className='cardcategoria'>
              <Card.Img variant='top'  src={imagenMap.catritualafflora} alt="ritual-afflora" className="img" />
              <Card.Body className='bodycard'>
              <Card.Title>Ritual Afflora</Card.Title>
              <Card.Text>
                <strong>Alternativa Sensorial</strong><br />Experiencia dentro
                de nuestras Spa Suites. Incluye sesión de jacuzzi y masaje de
                aromaterapia.
              </Card.Text>
              <Link to="*" className='links'>
                <Button type="button" className='btn'>Ver más</Button>
              </Link>
              </Card.Body> 
            </Card>
            <Card  style={{ width: '22rem' }} className='cardcategoria'>
              <Card.Img variant='top'  src={imagenMap.catritualmulfem} alt="ritual-mulfem" className="img" />
              <Card.Body className='bodycard'>
              <Card.Title>Ritual Mülfem</Card.Title>
              <Card.Text>
                <strong>Encuentro único y renovador</strong><br />Incluye
                exfoliación corporal con ducha Vichy y masaje sueco.
              </Card.Text>
              <Link to="*" className='links'>
                <Button type="button" className='btn'>Ver más</Button>
              </Link>
              </Card.Body> 
            </Card>
            <Card  style={{ width: '22rem' }} className='cardcategoria'>
              <Card.Img variant='top'  src={imagenMap.catritualunad} alt="ritual-unad" className="img" />
              <Card.Body className='bodycard'>
              <Card.Title>Ritual Üñad</Card.Title>
              <Card.Text>
                <strong
                  >Trabajá en la flexibilidad y revitalización del
                  cuerpo</strong
                ><br />Este tratamiento incluye masaje de piedras calientes y
                tratamiento facial.
              </Card.Text>
              <Link to="*" className='links'>
                <Button type="button" className='btn'>Ver más</Button>
              </Link>
              </Card.Body> 
            </Card>
            <Card  style={{ width: '22rem' }} className='cardcategoria'>
              <Card.Img variant='top'  src={imagenMap.catritualurkutun} alt="ritual-urkutun" className="img" />
              <Card.Body className='bodycard'>
              <Card.Title>Ritual Ürkutun</Card.Title>
              <Card.Text>
                <strong>Relajación Intensa</strong><br />Tratamiento ideal para
                quien desee descansar luego de un viaje o un intenso día de
                trabajo. Incluye masaje californiano y masaje de pies.
              </Card.Text>
              <Link to="*" className='links'>
                <Button type="button" className='btn'>Ver más</Button>
              </Link>
              </Card.Body> 
            </Card>
          </div>
      </div>
    </div>
  );
};

export default Categorias;