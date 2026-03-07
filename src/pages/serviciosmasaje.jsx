import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";
import "../styles/servicios.css";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Card } from "react-bootstrap";
import CarruselServicios from "../components/CarruselServicio";
import {
  ModalEditarServicio,
  ModalEliminarServicio,
} from "../components/ModalServicioEditDelete.jsx";

function ServiciosMasajes() {
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
    <section className="MainServicio">
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
              "Cada visita a este spa es un verdadero escape. El masaje
              relajante con aceites esenciales es mi favorito: salgo como nueva,
              sin tensiones y completamente renovada. El ambiente es sereno y
              elegante, y el personal tiene manos mágicas. Un lujo que vale cada
              centavo."
            </p>

            <div className="autor-lujo">
              <div className="avatar-lujo">CT</div>
              <div className="autor-info-lujo">
                <strong>Camila T.</strong>
                <span>38 AÑOS</span>
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
              "Trabajo muchas horas frente a la computadora y los masajes
              descontracturantes de este spa me han cambiado la vida. El lugar
              es impecable, con atención de primer nivel y terapeutas que
              realmente saben lo que hacen. Me ayudaron con dolores de espalda
              crónicos en pocas sesiones."
            </p>

            <div className="autor-lujo">
              <div className="avatar-lujo">MS</div>
              <div className="autor-info-lujo">
                <strong>Martín S.</strong>
                <span>45 AÑOS</span>
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
              "Este spa es mi refugio. El masaje con piedras calientes fue una
              experiencia única: profundo, relajante y sumamente reconfortante.
              Desde que empecé a venir, duermo mejor y me siento con más
              energía. Todo está pensado para que te sientas especial."
            </p>

            <div className="autor-lujo">
              <div className="avatar-lujo">EV</div>
              <div className="autor-info-lujo">
                <strong>Elena V.</strong>
                <span>50 AÑOS</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export default ServiciosMasajes;
