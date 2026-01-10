import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';
import '../styles/servicios.css';
import { Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import imagenMap from '../assets/imagenMap.js';
import {Card, Button, Carousel} from 'react-bootstrap';
import { actualizarServicio, eliminarServicio } from '../helpers/ServicioApi';

  


function ServiciosMasajes  () {
  const { isAdmin } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const [index, setIndex] = useState(0);
const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  // Estado de servicios editable
  const servicios = [
    {
      key: 'sueco',
      titulo: 'Masaje Sueco',
      descripcion: 'Este es el tipo de masaje en el que mover las manos relajar los músculos siempre coincidiendo en la dirección del masaje: siempre al corazón. Con eso, lo que obtienes es alivia todos los músculos relaja las articulaciones después de un día ajetreado y equilibra el cuerpo para descansar bien después del atardecer. Con masaje sueco la relajación se extiende por todo el cuerpo que además cubre la mente, eliminando toxinas, tonificando, activando la circulación sanguínea y transmitiendo todo lo que necesitamos para estar sanos.',
      precio: 50000
    },
    {
      key: 'hotstones',
      titulo: 'Masaje Hot Stones',
      descripcion: 'Es una técnica de relajación y bienestar utilizada desde tiempos ancestrales. Se basa en la aplicación de piedras previamente calentadas sobre diferentes áreas del cuerpo. Estas piedras, generalmente de origen volcánico, son seleccionadas por su capacidad de retener el calor de manera prolongada. El objetivo principal del masaje con piedras calientes es proporcionar alivio y relajación a través del calor y el contacto directo con las piedras. Existen beneficios de masaje con piedras calientes, este considera una terapia física y emocional, ya que actúa sobre distintos aspectos del ser humano, tanto a nivel corporal como energético.',
      precio: 55000
    },
    {
      key: 'deeptissue',
      titulo: 'Masaje Deep Tissue',
      descripcion: 'Es una técnica terapéutica enfocada en liberar la tensión muscular acumulada en las capas más profundas del músculo y el tejido conectivo. El objetivo del masaje Deep Tissue es tratar molestias musculares crónicas, contracturas, rigidez o nudos. Sus beneficios consisten en liberar nudos y adherencias musculares, mejorar la circulación y el flujo linfático, disminución notable de dolores musculares y articulares, mejora en su postura y movilidad, además de por supuesto, reducir el estrés físico y mental.',
      precio: 58000
    },
    {
      key: 'signature',
      titulo: 'Masaje Signature',
      descripcion: 'El masaje signature es un tipo de masaje que se caracteriza por ser de presión firme y eficaz, diseñado para eliminar dolores, tensiones del estrés y contracturas. Este masaje se personaliza según las necesidades del cliente y puede incluir el uso de aceite tibio fundido de velas naturales, lo que proporciona una hidratación profunda y una sensación de bienestar. Además, se enfoca en aliviar los músculos tensos y rígidos, utilizando técnicas que pueden incluir codos y nudillos para liberar la tensión muscular.',
      precio: 46500
    }
  ]

  const handleEdit = (servicio) => {
    setServicioSeleccionado(servicio);
    setShowEdit(true);
  };

  const handleDelete = (servicio) => {
    setServicioSeleccionado(servicio);
    setShowDelete(true);
  };

  const handleConfirmDelete = async (servicio) => {
    try {
      await eliminarServicio(servicio.key);
      setShowDelete(false);
      // Aquí podrías actualizar la lista de servicios si fuera dinámica
    } catch (error) {
      alert('Error al eliminar el servicio');
    }
    setShowDelete(false);
  };
  const serviceMap = {
    'sueco': 0,
    'hotstones': 1,
    'deeptissue': 2,
    'signature': 3
  };

  useEffect(() => {
    const servicioBuscado = searchParams.get('s');
    if (servicioBuscado && serviceMap[servicioBuscado] !== undefined) {
      setIndex(serviceMap[servicioBuscado]);
      const elemento = document.querySelector('.MainServicio');
      if(elemento) elemento.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchParams]);


  const handleSaveEdit = async (servicioEditado) => {
    try {
      await actualizarServicio(servicioEditado.key, {
        titulo: servicioEditado.titulo,
        descripcion: servicioEditado.descripcion,
        precio: servicioEditado.precio
      })
    } catch (error) {
      alert('Error al actualizar el servicio');
    }
    setShowEdit(false);
  };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
  <section className='MainServicio'>
    <article>
      <Carousel className='Carrusel-Servicio' activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <Card className='Contenido-Carrusel-Serv'>
            <Card.Img variant="left" src={imagenMap.SM1} className='Img-Servicio'/>
            <Card.Body className='Cuerpo-Texto'>
              <Card.Title className='Titulo-Carrusel'>Masaje Sueco</Card.Title>
              <Card.Text>
                Este es el tipo de masaje en el que mover las manos relajar los músculos siempre coincidiendo en la dirección del masaje: siempre al corazón. Con eso, lo que obtienes es alivia todos los músculos relaja las articulaciones después de un día ajetreado y equilibra el cuerpo para descansar bien después del atardecer. 
                <br />Con masaje sueco la relajación se extiende por todo el cuerpo que además cubre la mente, eliminando toxinas, tonificando, activando la circulación sanguínea y transmitiendo todo lo que necesitamos para estar sanos.
                <br/>
                Duracion: 60-70 minutos 
                <br />
                Precio del servicio: AR$ 50.000.
              </Card.Text>
              <Link to="/turnos?categoria=servicio-masajes&servicio=masaje-sueco">
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
            <Card.Img variant="left" src={imagenMap.SM2} className='Img-Servicio'/>
            <Card.Body className='Cuerpo-Texto'>
              <Card.Title className='Titulo-Carrusel'>Masaje Hot Stones</Card.Title>
              <Card.Text>
                Es una técnica de relajación y bienestar utilizada desde tiempos ancestrales. Se basa en la aplicación de piedras previamente calentadas sobre diferentes áreas del cuerpo. Estas piedras, generalmente de origen volcánico, son seleccionadas por su capacidad de retener el calor de manera prolongada.
                <br />
                El objetivo principal del masaje con piedras calientes es proporcionar alivio y relajación a través del calor y el contacto directo con las piedras. Existen beneficios de masaje con piedras calientes, este considera una terapia física y emocional, ya que actúa sobre distintos aspectos del ser humano, tanto a nivel corporal como energético.
                <br/>
                Duracion: 60-75 minutos
                <br />
                Precio del servicio: AR$ 55.000.
              </Card.Text>
              <Link to="/turnos?categoria=servicio-masajes&servicio=masaje-hot-stones">
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
          <Card  className='Contenido-Carrusel-Serv'>
            <Card.Img variant="left" src={imagenMap.SM3} className='Img-Servicio'/>
            <Card.Body  className='Cuerpo-Texto'>
              <Card.Title className='Titulo-Carrusel'>Masaje Deep Tissue</Card.Title>
              <Card.Text>
                Es una técnica terapéutica enfocada en liberar la tensión muscular acumulada en las capas más profundas del músculo y el tejido conectivo. El objetivo del masaje Deep Tissue es tratar molestias musculares crónicas, contracturas, rigidez o nudos.
                <br/>
                Sus beneficios consisten en liberar nudos y adherencias musculares, mejorar la circulación y el flujo linfático, disminución notable de dolores musculares y articulares, mejora en su postura y movilidad, además de por supuesto, reducir el estrés físico y mental.
                <br />
                Duracion: 45-60 minutos
                <br />
                Precio del servicio: AR$ 58.000.
              </Card.Text>
              <Link to="/turnos?categoria=servicio-masajes&servicio=masaje-deep-tissue">
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
        <Carousel.Item>
          <Card  className='Contenido-Carrusel-Serv'>
            <Card.Img variant="left" src={imagenMap.catmasajesignature} className='Img-Servicio'/>
            <Card.Body className='Cuerpo-Texto'>
              <Card.Title className='Titulo-Carrusel'>Masaje Signature</Card.Title>
                <Card.Text>
                  El masaje signature es un tipo de masaje que se caracteriza por ser de presión firme y eficaz, diseñado para eliminar dolores, tensiones del estrés y contracturas. Este masaje se personaliza según las necesidades del cliente y puede incluir el uso de aceite tibio fundido de velas naturales, lo que proporciona una hidratación profunda y una sensación de bienestar. Además, se enfoca en aliviar los músculos tensos y rígidos, utilizando técnicas que pueden incluir codos y nudillos para liberar la tensión muscular. 
                  <br/>
                  Duracion: 50-60 minutos
                  <br />
                  Precio del servicio: AR$ 46.500.
                </Card.Text>
                <Link to="/turnos?categoria=servicio-masajes&servicio=masaje-signature">
                  <Button className='Btn-Servicio'>RESERVAR TURNO</Button>
                </Link>
                {isAdmin && (
                  <div className="admin-actions">
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(servicios[3])}>Editar</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(servicios[3])}>Eliminar</Button>
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
              <i className="bi bi-file-person girl-coment"></i> 
              <strong>Camila T. (38 años)</strong>
              <br />
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <br />
            </div>
            <Card.Text className='Testimonio'>
              "Cada visita a este spa es un verdadero escape. El masaje relajante con aceites esenciales es mi favorito: salgo como nueva, sin tensiones y completamente renovada. El ambiente es sereno y elegante, y el personal tiene manos mágicas. Un lujo que vale cada centavo."
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className='Comentario'>
          <Card.Body className='body-comentario'>
            <div className='top-comentario'><i className="bi bi-file-person boy-coment"></i> 
              <strong>Martín S. (45 años)</strong>
              <br />
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <br />
            </div>
            <Card.Text className='Testimonio'>  
              "Trabajo muchas horas frente a la computadora y los masajes descontracturantes de este spa me han cambiado la vida. El lugar es impecable, con atención de primer nivel y terapeutas que realmente saben lo que hacen. Me ayudaron con dolores de espalda crónicos en pocas sesiones."
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className='Comentario'>
          <Card.Body className='body-comentario'>
            <div className="top-comentario">
              <i className="bi bi-file-person girl-coment"></i> 
              <strong>Elena V. (50 años)</strong>
              <br />
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <br />
            </div>
            <Card.Text className='Testimonio'>      
              "Este spa es mi refugio. El masaje con piedras calientes fue una experiencia única: profundo, relajante y sumamente reconfortante. Desde que empecé a venir, duermo mejor y me siento con más energía. Todo está pensado para que te sientas especial."
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </article>
  </section>
  )
}

export default ServiciosMasajes;