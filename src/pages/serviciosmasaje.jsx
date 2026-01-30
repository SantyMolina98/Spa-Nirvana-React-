import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';
import '../styles/servicios.css';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Card } from 'react-bootstrap';
import CarruselServicios from '../components/CarruselServicio';
import { ModalEditarServicio, ModalEliminarServicio } from '../components/ModalServicioEditDelete.jsx';

  


function ServiciosMasajes  () {
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

  const handleConfirmDelete = async () => {
    setShowDelete(false);
    setRefreshKey((prev) => prev + 1);
  };

  const handleSaveEdit = async () => {
    setShowEdit(false);
    setRefreshKey((prev) => prev + 1);
  };

  return (
  <section className='MainServicio'>
    <article>
      <CarruselServicios
        categoriaNombre="masajes"
        matchCategoriaExacta
        turnosCategoria="servicio-masajes"
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