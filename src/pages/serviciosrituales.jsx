import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";
import "../styles/servicios.css";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Card } from "react-bootstrap";
import {
  ModalEditarServicio,
  ModalEliminarServicio,
} from "../components/ModalServicioEditDelete.jsx";
import CarruselServicios from "../components/CarruselServicio";

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
    <section className="MainServicio">
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
        <ModalEditarServicio
          show={showEdit}
          onHide={() => setShowEdit(false)}
          servicio={servicioSeleccionado}
          onSave={handleSaveEdit}
        />
        <ModalEliminarServicio
          show={showDelete}
          onHide={() => setShowDelete(false)}
          servicio={servicioSeleccionado}
          onDelete={handleConfirmDelete}
        />
      </article>
      <article className="Sector-Comentarios">
        <div className="testimonios-header">
          <span className="testimonios-label">Testimonios</span>
          <h2 className="Titulotesti">
            CONOCÉ LAS OPINIONES DE NUESTROS CLIENTES
          </h2>
        </div>

        <div className="Cards-Comentarios">
          <div className="Comentario-Lujo">
            <div className="estrellas-lujo">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
            </div>

            <p className="Testimonio-Lujo">
              "Para una persona como yo, que al trabajar en una escuela paso
              mucho tiempo de pie, el Ritual Nirvana Escape fue una verdadera
              experiencia extrasensorial. Me ayudaron a aliviar la tensión
              muscular y a sentirme renovada después de largas jornadas.
              ¡Recomiendo sus servicios a todos los que buscan un momento de
              relajación y bienestar!"
            </p>

            <div className="autor-lujo">
              <div className="avatar-lujo">PC</div>
              <div className="autor-info-lujo">
                <strong>Penélope C.</strong>
                <span>40 AÑOS</span>
              </div>
            </div>
          </div>
          <div className="Comentario-Lujo">
            <div className="estrellas-lujo">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
            </div>

            <p className="Testimonio-Lujo">
              "Desde que empecé a estudiar en la facultad soy un manojo de
              nervios, sinceramente este spa cambió mi vida. El Ritual Ürkutun
              es de otro planeta, me ayudó a relajarme y a encontrar un
              equilibrio mental que no sabía que necesitaba. El ambiente es
              increíble, el personal es súper atento y los resultados son
              impresionantes. ¡Una experiencia de cinco estrellas!"
            </p>

            <div className="autor-lujo">
              <div className="avatar-lujo">GB</div>
              <div className="autor-info-lujo">
                <strong>Gonzalo B.</strong>
                <span>24 AÑOS</span>
              </div>
            </div>
          </div>
          <div className="Comentario-Lujo">
            <div className="estrellas-lujo">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
            </div>

            <p className="Testimonio-Lujo">
              "Soy padre primerizo y el estrés de cuidar a un bebé es real, pero
              este spa me salvó la vida. El Ritual Mülfem es una experiencia
              única que me ayudó a relajarme y a recargar energías. El personal
              es increíblemente amable y profesional, y el ambiente es tan
              relajante que me sentí como en un oasis de tranquilidad.
              ¡Recomiendo este lugar a todos los padres que necesitan un
              respiro!"
            </p>

            <div className="autor-lujo">
              <div className="avatar-lujo">EC</div>
              <div className="autor-info-lujo">
                <strong>Eladio C.</strong>
                <span>29 AÑOS</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export default ServiciosRitual;
