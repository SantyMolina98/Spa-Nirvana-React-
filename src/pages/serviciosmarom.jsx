import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';
import '../styles/servicios.css';
import { Link, useSearchParams} from 'react-router-dom';
import imagenMap from '../assets/imagenMap.js';
import {Card, Button, Carousel} from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { ModalEditarServicio, ModalEliminarServicio } from '../components/ModalServicioAdmin';
import { actualizarServicio, eliminarServicio } from '../helpers/ServicioApi';


function ServiciosMaAromat() {
  const { isAdmin } = useContext(UserContext);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  // Ejemplo de servicios para edición/eliminación (debería venir de props o estado real)
  const servicios = [
    {
      key: 0,
      titulo: 'Purificante',
      descripcion: 'Tratamiento para eliminar toxinas y revitalizar la piel, mediante el uso de diferentes aceites que contienen romero, eucalipto, menta, aloe vera y demás. El objetivo del masaje con aromaterapia purificante es desintoxicar y drenar su piel para una mejora tanto estética como saludable para su correcta cirulación.',
      precio: 65000
    },
    {
      key: 1,
      titulo: 'Relajante',
      descripcion: 'Aplicamos aceites calmantes mediante maniobras de masaje lentas y suaves,pero precisas para cumplir el objetivo de liberar tensiones. Nuestros aceites están integrados por lavanda, manzanilla, sándalo, vainilla, entre otros. Al finalizar habrá librado hasta las tensiones más profundas, calmando su sistema nervioso y favorenciendo su descanso, ayudando también a dormir correctamente luego del masaje con aromaterapia relajante',
      precio: 70000
    },
    {
      key: 2,
      titulo: 'Estimulante',
      descripcion: 'Mediante el masaje con aromaterapia estimulante logramos combatir el cansancio y reactivar su energía con masajes firmes y dinámicos. El mismo se hace con la ayuda de aceites energizantes, los cuales contienen cítricos, cafeína, jengibre, entre otros. Garantizamos una mejora en el tono muscular, correcta circulación y una sensación de vitalidad y ánimo elevado.',
      precio: 72500
    }
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
    } catch (error) {
      alert('Error al actualizar el servicio');
    }
    setShowEdit(false);
  };
  const handleConfirmDelete = async (servicio) => {
    try {
      await eliminarServicio(servicio.key);
    } catch (error) {
      alert('Error al eliminar el servicio');
    }
    setShowDelete(false);
  };
  const [searchParams] = useSearchParams();
  const [index, setIndex] = useState(0);

  const serviceMap = {
    'purificante': 0,
    'relajante': 1,
    'estimulante': 2
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

  return (
   <section className='MainServicio'>
    <article>
     <Carousel className='Carrusel-Servicio' activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <Card className='Contenido-Carrusel-Serv'>
          <Card.Img variant="left" src={imagenMap.cataromatepurif} className='Img-Servicio'/>
          <Card.Body className='Cuerpo-Texto'>
            <Card.Title className='Titulo-Carrusel'>Purificante</Card.Title>
            <Card.Text>
              Tratamiento para eliminar toxinas y revitalizar la piel, mediante el uso de diferentes aceites que contienen romero, eucalipto, menta, aloe vera y demás. 
              <br/>
              El objetivo del masaje con aromaterapia purificante es desintoxicar y drenar su piel para una mejora tanto estética como saludable para su correcta cirulación.
              <br />
              Duracion: 50-65 minutos
              <br />
              Precio del servicio: AR$ 65.000. 
            </Card.Text>
            <Link to={"/turnos?categoria=servicio-trat-facial&serviciosPorCategoria=essential-face-care"}>
              <Button className='Btn-Servicio'>RESERVAR TURNO</Button>
            </Link>
            {isAdmin && (
              <div className="admin-actions">
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(servicios[0])}>Editar</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(servicios[0])}>Eliminar</Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </Carousel.Item>
      <Carousel.Item>
        <Card className='Contenido-Carrusel-Serv'>
          <Card.Img variant="left" src={imagenMap.cataromaterelaj} className='Img-Servicio'/>
          <Card.Body className='Cuerpo-Texto'>
            <Card.Title className='Titulo-Carrusel'>Relajante</Card.Title>
            <Card.Text>
              Aplicamos aceites calmantes mediante maniobras de masaje lentas y suaves,pero precisas para cumplir el objetivo de liberar tensiones. Nuestros aceites están integrados por lavanda, manzanilla, sándalo, vainilla, entre otros.
              <br/>
              Al finalizar habrá librado hasta las tensiones más profundas, calmando su sistema nervioso y favorenciendo su descanso, ayudando también a dormir correctamente luego del masaje con aromaterapia relajante
              <br />
              Duracion: 60-75 minutos
              <br />
              Precio del servicio: AR$ 70.000. 
            </Card.Text>
            <Link to={"/turnos?categoria=servicio-trat-facial&serviciosPorCategoria=essential-face-care"}>
              <Button className='Btn-Servicio'>RESERVAR TURNO</Button>
            </Link>
            {isAdmin && (
              <div className="admin-actions">
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(servicios[1])}>Editar</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(servicios[1])}>Eliminar</Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </Carousel.Item>
      <Carousel.Item>
        <Card className='Contenido-Carrusel-Serv'>
          <Card.Img variant="left" src={imagenMap.cataromateestim} className='Img-Servicio'/>
          <Card.Body className='Cuerpo-Texto'>
            <Card.Title className='Titulo-Carrusel'>Estimulante</Card.Title>
            <Card.Text>
              Mediante el masaje con aromaterapia estimulante logramos combatir el cansancio y reactivar su energía con masajes firmes y dinámicos. El mismo se hace con la ayuda de aceites energizantes, los cuales contienen cítricos, cafeína, jengibre, entre otros.
              <br/>
              Garantizamos una mejora en el tono muscular, correcta circulación y una sensación de vitalidad y ánimo elevado.
              <br />
              Duracion: 50-60 minutos
              <br />
              Precio del servicio: AR$ 72.500.    
            </Card.Text>
            <Link to={"/turnos?categoria=servicio-trat-facial&serviciosPorCategoria=glowing-vit-c"}>
              <Button className='Btn-Servicio'>RESERVAR TURNO</Button>
            </Link>
            {isAdmin && (
              <div className="admin-actions">
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(servicios[2])}>Editar</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(servicios[2])}>Eliminar</Button>
              </div>
            )}
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
              <i className="bi bi-file-person boy-coment"></i> 
              <strong>José G. (65 años)</strong>
              <br />
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <br />
            </div>
            <Card.Text className='Testimonio'>
              "Mi esposa siempre me decía que necesitaba un cambio en mi vida si quería disfrutar a mis nietos, es por ellos que me animé a probar el masaje con aromaterapia estimulante, desde ese día me siento de 30 años otra vez!!. Gracias por la atención y el buen ambiente que brinda Nirvana Spa & Beauty, si no fuera por ustedes no podría disfrutar de mis nietos que son lo que más amo en este mundo, ¡¡Gracias infinitas!!"
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className='Comentario'>
          <Card.Body className='body-comentario'>
            <div className='top-comentario'><i className="bi bi-file-person girl-coment"></i> 
              <strong>Andrea K. (22 años)</strong>
              <br />
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <br />
            </div>
            <Card.Text className='Testimonio'>
              "Amo venir a este lugar, sin dudas es mi cable a tierra, si no fuera por el masaje con aromaterapia relajante no hubiera aprobado ninguna materia en la universidad de los nervios. Realmente me salvaron la vida!, desde el día que visité Nirvana Spa & Beauty duermo como un oso y estoy con los ánimos al 100%!. ¡Experiencia 5 estrellas!"
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className='Comentario'>
          <Card.Body className='body-comentario'>
            <div className="top-comentario">
              <i className="bi bi-file-person girl-coment"></i> 
              <strong>Fabiana V. (39 años)</strong>
              <br />
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <br />
            </div>
            <Card.Text className='Testimonio'>             
              "Siempre creí que al pasar los 30 años uno perdía vitalidad, más como madre soltera y a mi edad... pero la verdad que cuando conocí el masaje con aromaterapia purificante ahora ¡puedo con todo!. Hasta mis hijos me lo agradecen, pero no tanto como yo agradezco a todo el personal de Nirvan Spa & Beauty, que siempre se portan de manera maravillosa."
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
     </article>
    </section>
  )
}

export default ServiciosMaAromat;