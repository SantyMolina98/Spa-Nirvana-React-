import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";
import "../styles/servicios.css";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import {
  ModalEditarServicio,
  ModalEliminarServicio,
} from "../components/ModalServicioEditDelete.jsx";
import CarruselServicios from "../components/CarruselServicio";

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
    <section className="MainServicio">
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
              "Desde que descubrí este spa, mi piel nunca ha estado mejor. Los
              tratamientos faciales son personalizados y se nota que utilizan
              productos de altísima calidad. El ambiente es relajante y
              elegante."
            </p>

            <div className="autor-lujo">
              <div className="avatar-lujo">LM</div>
              <div className="autor-info-lujo">
                <strong>Laura M.</strong>
                <span>35 AÑOS</span>
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
              "Nunca pensé que disfrutaría tanto de un tratamiento facial, pero
              este spa superó mis expectativas. La atención es impecable, te
              hacen sentir como en un hotel de lujo. Lo recomiendo totalmente."
            </p>

            <div className="autor-lujo">
              <div className="avatar-lujo">MT</div>
              <div className="autor-info-lujo">
                <strong>Marcelo T.</strong>
                <span>42 AÑOS</span>
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
              "Visitar este spa es mi momento favorito del mes. Los tratamientos
              no solo dejan mi piel radiante, sino que también me ayudan a
              desconectarme. Una atención que te hace sentir mimada de principio
              a fin."
            </p>

            <div className="autor-lujo">
              <div className="avatar-lujo">JR</div>
              <div className="autor-info-lujo">
                <strong>Juliana R.</strong>
                <span>68 AÑOS</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export default ServiciosFacial;
