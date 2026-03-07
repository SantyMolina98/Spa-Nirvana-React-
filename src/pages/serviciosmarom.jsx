import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";
import "../styles/servicios.css";
import { Card } from "react-bootstrap";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import {
  ModalEditarServicio,
  ModalEliminarServicio,
} from "../components/ModalServicioEditDelete.jsx";
import CarruselServicios from "../components/CarruselServicio";

function ServiciosMaAromat() {
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
          categoriaNombre="aromaterapia"
          turnosCategoria="servicio-masaje-aromaterapia"
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
              "Mi esposa siempre me decía que necesitaba un cambio en mi vida si
              quería disfrutar a mis nietos, es por ellos que me animé a probar
              el masaje con aromaterapia estimulante, desde ese día me siento de
              30 años otra vez!!. Gracias por la atención y el buen ambiente que
              brinda Nirvana Spa & Beauty, si no fuera por ustedes no podría
              disfrutar de mis nietos que son lo que más amo en este mundo,
              ¡¡Gracias infinitas!!"
            </p>

            <div className="autor-lujo">
              <div className="avatar-lujo">JG</div>
              <div className="autor-info-lujo">
                <strong>José G.</strong>
                <span>65 AÑOS</span>
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
              "Amo venir a este lugar, sin dudas es mi cable a tierra, si no
              fuera por el masaje con aromaterapia relajante no hubiera aprobado
              ninguna materia en la universidad de los nervios. Realmente me
              salvaron la vida!, desde el día que visité Nirvana Spa & Beauty
              duermo como un oso y estoy con los ánimos al 100%!. ¡Experiencia 5
              estrellas!"
            </p>

            <div className="autor-lujo">
              <div className="avatar-lujo">AK</div>
              <div className="autor-info-lujo">
                <strong>Andrea K.</strong>
                <span>22 AÑOS</span>
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
              "Siempre creí que al pasar los 30 años uno perdía vitalidad, más
              como madre soltera y a mi edad... pero la verdad que cuando conocí
              el masaje con aromaterapia purificante ahora ¡puedo con todo!.
              Hasta mis hijos me lo agradecen, pero no tanto como yo agradezco a
              todo el personal de Nirvan Spa & Beauty, que siempre se portan de
              manera maravillosa."
            </p>

            <div className="autor-lujo">
              <div className="avatar-lujo">FV</div>
              <div className="autor-info-lujo">
                <strong>Fabiana V.</strong>
                <span>39 AÑOS</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export default ServiciosMaAromat;
