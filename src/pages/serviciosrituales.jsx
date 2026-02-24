import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';
import '../styles/servicios.css';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Card } from 'react-bootstrap';
import { ModalEditarServicio, ModalEliminarServicio } from '../components/ModalServicioEditDelete.jsx';
import CarruselServicios from '../components/CarruselServicio';
  
function ServiciosRitual() {
  const { isAdmin } = useContext(UserContext);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (servicio) => {
    setServicioSeleccionado(servicio);
    setShowEdit(true);
  };
  const handleDelete = (servicio) => {
    setServicioSeleccionado(servicio);
    setShowDelete(true);
  };
  const handleSaveEdit = async () => {
    setShowEdit(false);
    setRefreshKey((prev) => prev + 1);
  };
  const handleConfirmDelete = async () => {
    setShowDelete(false);
    setRefreshKey((prev) => prev + 1);
  };

   return (
   <section className='MainServicio'>
    <article>
     <CarruselServicios
      categoriaNombre="rituales"
      matchCategoriaExacta
      turnosCategoria="servicio-rituales"
      isAdmin={isAdmin}
      onEdit={handleEdit}
      onDelete={handleDelete}
      refreshKey={refreshKey}
     />
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
              "Para una persona como yo, que al trabajar en una escuela paso mucho tiempo de pie, el Ritual Nirvana Escape fue una verdadera experiencia extrasensorial. Me ayudaron a aliviar la tensión muscular y a sentirme renovada después de largas jornadas. ¡Recomiendo sus servicios a todos los que buscan un momento de relajación y bienestar!"
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
              "Desde que empecé a estudiar en la facultad soy un manojo de nervios, sinceramente este spa cambió mi vida. El Ritual Ürkutun es de otro planeta, me ayudó a relajarme y a encontrar un equilibrio mental que no sabía que necesitaba. El ambiente es increíble, el personal es súper atento y los resultados son impresionantes. ¡Una experiencia de cinco estrellas!"
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
              "Soy padre primerizo y el estrés de cuidar a un bebé es real, pero este spa me salvó la vida. El Ritual Mülfem es una experiencia única que me ayudó a relajarme y a recargar energías. El personal es increíblemente amable y profesional, y el ambiente es tan relajante que me sentí como en un oasis de tranquilidad. ¡Recomiendo este lugar a todos los padres que necesitan un respiro!"
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
     </article>
    </section>
  )
}

export default ServiciosRitual;