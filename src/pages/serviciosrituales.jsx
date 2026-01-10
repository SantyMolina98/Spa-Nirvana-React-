import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';
import '../styles/servicios.css';
import { Link, useSearchParams} from 'react-router-dom';
import imagenMap from '../assets/imagenMap.js';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import {Card, Button, Carousel} from 'react-bootstrap';
import { ModalEditarServicio, ModalEliminarServicio } from '../components/ModalServicioAdmin';
import { actualizarServicio, eliminarServicio } from '../helpers/ServicioApi';
  
function ServiciosRitual() {
  const { isAdmin } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const [index, setIndex] = useState(0);

  const serviceMap = {
    'nirvanaescape': 0,
    'mindsoul': 1,
    'afflora': 2,
    'mulfem': 3,
    'unad': 4,
    'urkutun': 5
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
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  // Ejemplo de servicios para edición/eliminación (debería venir de props o estado real)
  const servicios = [
    {
      key: 0,
      titulo: 'Ritual Nirvana Escape',
      descripcion: 'Este tratamiento es un viaje sensorial, en el cuál no solo va a relajar su cuerpo y alimentar su alma, sino también podrá degustar nuestros helados artesanales, recomendados por los mejores nutricionistas de Tucumán. Combinamos nuestro masaje más famoso, el masaje sueco, junto con nuestros mejores aceites relajantes, cerrando la experiencia con un rico helado. El objetivo del Ritual Nirvana Escape es mejorar su circulación, alviar tensiones, eliminar estrés y experimente un viaje sensorial de la más alta calidad.',
      precio: 125000
    },
    {
      key: 1,
      titulo: 'Ritual Mind & Soul',
      descripcion: 'Consta de un masaje relajante de cuero cabelludo, cara y cuello, que incluye un snack y un mocktail. Sus beneficios son el alivio en cuello y zona craneal, ideal para personas que permanecen mucho tiempo sentadas. Revitalización facial y un espacio para desconectarse',
      precio: 110000
    },
    {
      key: 2,
      titulo: 'Ritual Afflora',
      descripcion: 'El ritual afflora incluye una sesión privada de jacuzzi, masaje sueco, relajación en sala con infusión, además usted se lleva un spray y aceite esencial marca Afflora. Este ritual está diseñado para experimentar una profunda relajación con hidroterapia, masaje y desconectar acompañado de una infusión, ideales para liberar tensiones',
      precio: 115000
    }
    // Agrega más servicios según corresponda
  ];

  const handleEdit = (servicio) => {
    setServicioSeleccionado(servicio);
    setShowEdit(true);
  };
  const handleDelete = (servicio) => {
    setServicioSeleccionado(servicio);
    setShowDelete(true);
  };
  const handleSaveEdit = async (servicioEditado) => {
    try {
      await actualizarServicio(servicioEditado.key, {
        titulo: servicioEditado.titulo,
        descripcion: servicioEditado.descripcion,
        precio: servicioEditado.precio
      });
      setServicios(prev => prev.map(s =>
        s.key === servicioEditado.key
          ? { ...s, titulo: servicioEditado.titulo, descripcion: servicioEditado.descripcion, precio: servicioEditado.precio }
          : s
      ));
    } catch (error) {
      alert('Error al actualizar el servicio');
    }
    setShowEdit(false);
  };
  const handleConfirmDelete = async (servicio) => {
    try{
      await eliminarServicio(servicio.key);
    }catch(error){
      alert('Error al eliminar el servicio');
    }
    setShowDelete(false);
  };

   return (
   <section className='MainServicio'>
    <article>
     <Carousel className='Carrusel-Servicio' activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <Card className='Contenido-Carrusel-Serv'>
          <Card.Img variant="left" src={imagenMap.catritualnirvesc} className='Img-Servicio'/>
          <Card.Body className='Cuerpo-Texto'>
            <Card.Title className='Titulo-Carrusel'>Ritual Nirvana Escape</Card.Title>
            <Card.Text>
              Este tratamiento es un viaje sensorial, en el cuál no solo va a relajar su cuerpo y alimentar su alma, sino también podrá degustar nuestros helados artesanales, recomendados por los mejores nutricionistas de Tucumán. Combinamos nuestro masaje más famoso, el masaje sueco, junto con nuestros mejores aceites relajantes, cerrando la experiencia con un rico helado 
              <br/>
              El objetivo del Ritual Nirvana Escape es mejorar su circulación, alviar tensiones, eliminar estrés y experimente un viaje sensorial de la más alta calidad.
              <br />
              Duracion: 75-90 minutos
              <br />
              Precio del servicio: AR$ 125.000. 
            </Card.Text>
            <Link to={"/turnos?categoria=servicio-trat-facial&serviciosPorCategoria=essential-face-care"}>
              <Button className='Btn-Servicio'>RESERVAR TURNO</Button>
            </Link>
            {isAdmin && (
              <div className="admin-actions">
                <Button variant="warning" size="sm" className="me-2">Editar</Button>
                <Button variant="danger" size="sm">Eliminar</Button>
                
              </div>
            )}
          </Card.Body>
        </Card>
      </Carousel.Item>
      <Carousel.Item>
        <Card className='Contenido-Carrusel-Serv'>
          <Card.Img variant="left" src={imagenMap.catritualminds} className='Img-Servicio'/>
          <Card.Body className='Cuerpo-Texto'>
            <Card.Title className='Titulo-Carrusel'>Ritual Mind & Soul</Card.Title>
            <Card.Text>
              Consta de un masaje relajante de cuero cabelludo, cara y cuello, que incluye un snack y un mocktail. 
              <br/>
              Sus beneficios son el alivio en cuello y zona craneal, ideal para personas que permanecen mucho tiempo sentadas. Revitalización facial y un espacio para desconectarse
              <br />
              Duracion: 60-70 minutos
              <br />
              Precio del servicio: AR$ 110.000. 
            </Card.Text>
            <Link to={"/turnos?categoria=servicio-trat-facial&serviciosPorCategoria=essential-face-care"}>
              <Button className='Btn-Servicio'>RESERVAR TURNO</Button>
            </Link>                   
          </Card.Body>
        </Card>
      </Carousel.Item>
      <Carousel.Item>
        <Card className='Contenido-Carrusel-Serv'>
          <Card.Img variant="left" src={imagenMap.catritualafflora} className='Img-Servicio'/>
          <Card.Body className='Cuerpo-Texto'>
            <Card.Title className='Titulo-Carrusel'>Ritual Afflora</Card.Title>
            <Card.Text>
              El ritual afflora incluye una sesión privada de jacuzzi, masaje sueco, relajación en sala con infusión, además usted se lleva un spray y aceite esencial marca Afflora.
              <br/>
              Este ritual está diseñado para experimentar una profunda relajación con hidroterapia, masaje y desconectar acompañado de una infusión, ideales para liberar tensiones
              <br />
              Duracion: 90-100 minutos
              <br />
              Precio del servicio: AR$ 115.000. 
            </Card.Text>
            <Link to={"/turnos?categoria=servicio-trat-facial&serviciosPorCategoria=essential-face-care"}>
              <Button className='Btn-Servicio'>RESERVAR TURNO</Button>
            </Link>                   
          </Card.Body>
        </Card>
      </Carousel.Item>
      <Carousel.Item>
        <Card className='Contenido-Carrusel-Serv'>
                          {isAdmin && (
                            <div className="admin-actions">
                              <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(servicios[0])}>Editar</Button>
                              <Button variant="danger" size="sm" onClick={() => handleDelete(servicios[0])}>Eliminar</Button>
                            </div>
                          )}
          <Card.Img variant="left" src={imagenMap.catritualmulfem} className='Img-Servicio'/>
          <Card.Body className='Cuerpo-Texto'>
            <Card.Title className='Titulo-Carrusel'>Ritual Mülfem</Card.Title>
            <Card.Text>
              Nuestro ritual Mülfem es nombrado así por su significado en el idioma mapuche "rocío", el cuál da sensación de frescura y renovación. Incluye exfoliación corporal, seguido de una ducha Vichy, luego un masaje sueco con el acompañamiento de aromas de bergamota nativa.
              <br/>
              Es un ritual de lujo que combina exfoliación, hidroterapia, masaje, relajación y revitalización del cuerpo.
              <br />
              Duracion: 100-110 minutos
              <br />
              Precio del servicio: AR$ 120.000. 
            </Card.Text>
            <Link to={"/turnos?categoria=servicio-trat-facial&serviciosPorCategoria=essential-face-care"}>
              <Button className='Btn-Servicio'>RESERVAR TURNO</Button>
            </Link>                   
          </Card.Body>
        </Card>
      </Carousel.Item>
      <Carousel.Item>
        <Card className='Contenido-Carrusel-Serv'>
          <Card.Img variant="left" src={imagenMap.catritualunad} className='Img-Servicio'/>
          <Card.Body className='Cuerpo-Texto'>
            <Card.Title className='Titulo-Carrusel'>Ritual Üñad</Card.Title>
            <Card.Text>
              Es un masaje con piedras calientes, seguido de un tratamiento facial Essential Face Care, utilizando cosmética en té blanco y rosa mosqueta patagónica.
              <br/>
              Está pensado para restaurar la piel, relajar el cuerpo y ofrecer un momento de relación de la mano de un masaje profundo con piedras calientes, más el mejor cuidado facial
              <br />
              Duracion: 90-105 minutos
              <br />
              Precio del servicio: AR$ 100.000. 
            </Card.Text>
            <Link to={"/turnos?categoria=servicio-trat-facial&serviciosPorCategoria=essential-face-care"}>
              <Button className='Btn-Servicio'>RESERVAR TURNO</Button>
            </Link>
          </Card.Body>
        </Card>
      </Carousel.Item>
      <Carousel.Item>
        <Card className='Contenido-Carrusel-Serv'>
          <Card.Img variant="left" src={imagenMap.catritualurkutun} className='Img-Servicio'/>
          <Card.Body className='Cuerpo-Texto'>
            <Card.Title className='Titulo-Carrusel'>Ritual Ürkutun</Card.Title>
            <Card.Text>
              Comenzamos con un masaje californiano, realizado con movimientos suaves, largos y fluídos, con masaje de pies y manos complementario. Todo acompañado con una experiencia aromática con esencia de magnolia sagrada, lo que enfatiza la relajación intensa.
              <br/>
              Es una sesión de bienestar profundo enfocada en relajar cuerpo y mente, especialmente diseñada para liberar tensiones trás viajes.
              <br />
              Duracion: 85-100 minutos
              <br />
              Precio del servicio: AR$ 100.000. 
            </Card.Text>
            <Link to={"/turnos?categoria=servicio-trat-facial&serviciosPorCategoria=essential-face-care"}>
              <Button className='Btn-Servicio'>RESERVAR TURNO</Button>
            </Link>
          </Card.Body>
        </Card>
      </Carousel.Item>
    </Carousel>
    {/* Modales admin */}
    <ModalEditarServicio show={showEdit} onHide={() => setShowEdit(false)} servicio={servicioSeleccionado} onSave={handleSaveEdit} />
    <ModalEliminarServicio show={showDelete} onHide={() => setShowDelete(false)} servicio={servicioSeleccionado} onDelete={handleConfirmDelete} />
      </article>
      <article className='Sector-Comentarios'>
      <hr className='hr-servicio'/>
      <h2 className="Titulotesti">~ CONOCÉ LAS OPINIONES DE NUESTROS CLIENTES ~</h2>
      <hr className='hr-servicio'/>
      <div className='Cards-Comentarios'>
        <Card className='Comentario'>
          <Card.Body className='body-comentario'>
            <div className='top-comentario'>
              <i className="bi bi-file-person girl-coment"></i> 
              <strong>Penélope C. (40 años)</strong>
              <br />
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <br />
            </div>
            <Card.Text className='Testimonio'>
              
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className='Comentario'>
          <Card.Body className='body-comentario'>
            <div className='top-comentario'><i className="bi bi-file-person boy-coment"></i> 
              <strong>Gonzalo B. (24 años)</strong>
              <br />
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <br />
            </div>
            <Card.Text className='Testimonio'>
              
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className='Comentario'>
          <Card.Body className='body-comentario'>
            <div className="top-comentario">
              <i className="bi bi-file-person boy-coment"></i> 
              <strong>Eladio C. (29 años)</strong>
              <br />
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <br />
            </div>
            <Card.Text className='Testimonio'>             
              
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
     </article>
    </section>
  )
}

export default ServiciosRitual;