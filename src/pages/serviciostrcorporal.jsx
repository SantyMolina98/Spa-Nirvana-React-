import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';
import '../styles/servicios.css';
import { Card } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { ModalEditarServicio, ModalEliminarServicio } from '../components/ModalServicioEditDelete.jsx';
import CarruselServicios from '../components/CarruselServicio';


function ServiciosTrCorporal() {
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
          categoriaNombre="corporal"
          matchCategoriaExacta
          turnosCategoria="servicio-trat-corporal"
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
                     <i className="bi bi-file-person boy-coment"></i> 
                     <strong>Pablo M. (42 años)</strong>
                     <br />
                     <i className="bi bi-star-fill"></i>
                     <i className="bi bi-star-fill"></i>
                     <i className="bi bi-star-fill"></i>
                     <i className="bi bi-star-fill"></i>
                     <i className="bi bi-star-fill"></i>
                     <br />
                   </div>
                   <Card.Text className='Testimonio'>
                   "Desde que experimente la ceremonia ragiantu soy otra persona, la verdad que fue una experiencia inolviable, no es un lujo, ¡es una necesidad! el venir a este Spa, sin dudas lo mejor que me pasó en este 2025. ¡Una experiencia cinco estrellas!"
                 </Card.Text>
               </Card.Body>
             </Card>
             <Card className='Comentario'>
               <Card.Body className='body-comentario'>
                 <div className='top-comentario'><i className="bi bi-file-person boy-coment"></i> 
                   <strong>Julio F. (45 años)</strong>
                   <br />
                   <i className="bi bi-star-fill"></i>
                   <i className="bi bi-star-fill"></i>
                   <i className="bi bi-star-fill"></i>
                   <i className="bi bi-star-fill"></i>
                   <i className="bi bi-star-fill"></i>
                   <br /></div>
                 <Card.Text className='Testimonio'>
                   "Sinceramente siempre me negué a experimentar este tipo de cosas, nunca creí que fueran ciertas... Hasta que conocí Nirvana Spa & Beauty!!. Mi cuerpo y mi mente me lo agradecen todos los días, luego de la ceremonia Liwen me siento 20 años más jóven. Totalmente recomendado, volvería una y mil veces más, ¡10 de 5 estrellas se merecen!."
                 </Card.Text>
               </Card.Body>
             </Card>
             <Card className='Comentario'>
               <Card.Body className='body-comentario'>
                 <div className="top-comentario">
                   <i className="bi bi-file-person girl-coment"></i> 
                   <strong>Daniela C. (36 años)</strong>
                   <br />
                   <i className="bi bi-star-fill"></i>
                   <i className="bi bi-star-fill"></i>
                   <i className="bi bi-star-fill"></i>
                   <i className="bi bi-star-fill"></i>
                   <i className="bi bi-star-fill"></i>
                   <br />
                 </div>
                 <Card.Text className='Testimonio'>             
                   "He visitado distintos spa y centro de relajación en el país, pero la verdad que experimentar la ceremonia Liwen en Nirvana Spa & Beauty fue la 8va maravilla! La mejor atención de principio a fin, el mejor ambiente, las mejores técnicas, los mejores profesionales, ¡El mejor spa del país sin lugar a dudas! ."
                 </Card.Text>
               </Card.Body>
             </Card>
           </div>
      </article>
    </section>
  )
  
}

export default ServiciosTrCorporal;