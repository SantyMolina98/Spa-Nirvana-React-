import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';
import '../styles/servicios.css';
import { Card } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { ModalEditarServicio, ModalEliminarServicio } from '../components/ModalServicioEditDelete.jsx';
import CarruselServicios from '../components/CarruselServicio';


function ServiciosFacial() {
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
          categoriaNombre="facial"
          turnosCategoria="servicio-trat-facial"
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
                  <strong>Laura M. (35 años)</strong>
                  <br />
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <br />
                </div>
                <Card.Text className='Testimonio'>
                "Desde que descubrí este spa, mi piel nunca ha estado mejor. Los tratamientos faciales son personalizados y se nota que utilizan productos de altísima calidad. El ambiente es relajante, elegante y cada detalle está cuidado. Mi favorito es el facial con oxigenoterapia, salgo con la piel luminosa y rejuvenecida. ¡Una experiencia cinco estrellas!"
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className='Comentario'>
            <Card.Body className='body-comentario'>
              <div className='top-comentario'><i className="bi bi-file-person boy-coment"></i> 
                <strong>Marcelo T. (42 años)</strong>
                <br />
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <br /></div>
              <Card.Text className='Testimonio'>
                
                "Nunca pensé que disfrutaría tanto de un tratamiento facial, pero este spa superó mis expectativas. La atención es impecable, te hacen sentir como en un hotel de lujo. Me encantó el tratamiento antiedad que me recomendaron: no solo me vi mejor al instante, sino que también me relajé como nunca. Lo recomiendo totalmente."
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className='Comentario'>
            <Card.Body className='body-comentario'>
              <div className="top-comentario">
                <i className="bi bi-file-person girl-coment"></i> 
                <strong>Juliana R. (68 años)</strong>
                <br />
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <br />
              </div>
              <Card.Text className='Testimonio'>
                
                "Visitar este spa es mi momento favorito del mes. Los tratamientos faciales no solo dejan mi piel radiante, sino que también me ayudan a desconectarme del estrés diario. El personal es sumamente profesional y te asesoran según las necesidades de tu piel. El espacio es precioso, con aromas suaves, música relajante y una atención que te hace sentir mimada de principio a fin."
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </article>
    </section>
  )
}

export default ServiciosFacial;