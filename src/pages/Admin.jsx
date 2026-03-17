import '../App.css';
import '../styles/admin.css';
import { useState, useEffect, useContext } from 'react';
import { getUsuarios } from '../helpers/UsuariosApi.js';
import { getServicios } from '../helpers/ServicioApi.js';
import { getReservasAdmin } from '../helpers/ReservasApi.js';
import { UserContext } from '../context/UserContext.jsx';
import { Button } from 'react-bootstrap';
import { ModalEditarServicio, ModalEliminarServicio } from '../components/ModalServicioEditDelete.jsx';
import { ModalAgregarUsuario, ModalEditarUsuario, ModalEliminarUsuario } from '../components/ModalUsuariosAdmin.jsx';
import { ModalAgregarServicio } from '../components/ModalServicioNuevo.jsx';
import { ModalEliminarReserva } from '../components/ModalEliminarReserva.jsx';

export default function Admin() {
  const {user} = useContext(UserContext);
  const [usuarios, setUsuarios] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modales de servicios
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [showAgregarServicio, setShowAgregarServicio] = useState(false);

  // Modales de usuarios
  const [showAgregarUsuario, setShowAgregarUsuario] = useState(false);
  const [showEditarUsuario, setShowEditarUsuario] = useState(false);
  const [showEliminarUsuario, setShowEliminarUsuario] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  // Modales de reservas
  const [showEliminarReserva, setShowEliminarReserva] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosData = await getUsuarios();
        const reservasData = await getReservasAdmin();
        const serviciosData = await getServicios();

        setUsuarios(usuariosData.usuarios || []);
        setReservas(reservasData.reservas || []);
        setServicios(serviciosData.servicios || []);
        
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtrar usuarios por rol
  const admins = usuarios.filter(usuario => usuario.rol === 'Admin');
  const profesionales = usuarios.filter(usuario => usuario.rol === 'Profesional');
  const regularUsers = usuarios.filter(usuario => usuario.rol !== 'Admin' && usuario.rol !== 'Profesional');

  // Funciones para manejo de servicios
  const handleEditServicio = (servicio) => {
    setServicioSeleccionado(servicio);
    setShowEditModal(true);
  };

  const handleDeleteServicio = (servicio) => {
    setServicioSeleccionado(servicio);
    setShowDeleteModal(true);
  };

  const handleSaveServicio = (servicioEditado) => {
    setServicios(servicios.map(s => s._id === servicioEditado._id ? servicioEditado : s));
    setShowEditModal(false);
  };

  const handleConfirmDeleteServicio = (servicio) => {
    setServicios(servicios.filter(s => s._id !== servicio._id));
    setShowDeleteModal(false);
  };

  const handleAgregarServicio = (nuevoServicio) => {
    setServicios([...servicios, nuevoServicio]);
    setShowAgregarServicio(false);
  };

  // Funciones para manejo de usuarios
  const handleAgregarUsuario = (nuevoUsuario) => {
    setUsuarios([...usuarios, nuevoUsuario]);
    setShowAgregarUsuario(false);
  };

  const handleEditarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setShowEditarUsuario(true);
  };

  const handleEliminarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setShowEliminarUsuario(true);
  };

  const handleSaveUsuario = (usuarioEditado) => {
    setUsuarios(usuarios.map(u => u.uid === usuarioEditado.uid ? usuarioEditado : u));
    setShowEditarUsuario(false);
  };

  const handleConfirmDeleteUsuario = (usuario) => {
    setUsuarios(usuarios.filter(u => u.uid !== usuario.uid));
    setShowEliminarUsuario(false);
  };

  // Funciones para manejo de reservas
  const handleEliminarReserva = (reserva) => {
    setReservaSeleccionada(reserva);
    setShowEliminarReserva(true);
  };

  const handleConfirmDeleteReserva = (reserva) => {
    setReservas(reservas.filter(r => r._id !== reserva._id));
    setShowEliminarReserva(false);
  };

  if (loading) return <div className="TextoCargando"><h2>Cargando...</h2></div>;
  if (error) return <div className="TextoError"><h2>{error}</h2></div>;

  return (
    <div className="AdminPage">
      
      {/* Nuevo Header del Dashboard */}
      <div className="dashboard-header">
        <h2>Panel de Administración</h2>
        <p>Bienvenido/a {user?.nombre}. Gestiona tu exclusiva clientela y servicios.</p>
      </div>

      {/* Nuevas Tarjetas de Métricas (KPIs) */}
      <div className="kpi-container">
        <div className="kpi-card">
          <p className="kpi-title">Total Clientes</p>
          <h3 className="kpi-number">{regularUsers.length}</h3>
        </div>
        <div className="kpi-card">
          <p className="kpi-title">Staff Activo</p>
          <h3 className="kpi-number">{admins.length}</h3>
        </div>
        <div className="kpi-card">
          <p className="kpi-title">Reservas Totales</p>
          <h3 className="kpi-number">{reservas.length}</h3>
        </div>
        <div className="kpi-card">
          <p className="kpi-title">Servicios Ofrecidos</p>
          <h3 className="kpi-number">{servicios.length}</h3>
        </div>
      </div>

      {/* SECCIÓN USUARIOS */}
      <section className="admin-card">
        <article className='sector-titulo-boton'>
          <h3 className='TituloSeccion'>Directorio de Clientes</h3>
          <Button className="boton-panel-admin" onClick={() => setShowAgregarUsuario(true)}>
            + Agregar Usuario
          </Button>
        </article>
        
        {regularUsers.length > 0 ? (
          <div className="table-responsive">
            <table className="tabla-servicios">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {regularUsers.map(usuario => (
                  <tr key={usuario.uid}>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.correo}</td>
                    <td><span className="badge-status badge-active">Activo</span></td>
                    <td>
                      <Button className="action-btn edit-btn" onClick={() => handleEditarUsuario(usuario)}>
                        Editar
                      </Button>
                      <Button className="action-btn delete-btn" onClick={() => handleEliminarUsuario(usuario)}>
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted mt-3">No hay clientes registrados.</p>
        )}
      </section>

      {/* SECCIÓN ADMINISTRADORES */}
      <section className="admin-card">
        <h3 className='TituloSeccion mb-4'>Directorio de Staff</h3>
        {admins.length > 0 ? (
          <div className="table-responsive">
            <table className="tabla-servicios">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {admins.map(admin => (
                  <tr key={admin.uid}>
                    <td>{admin.nombre}</td>
                    <td>{admin.correo}</td>
                    <td><span className="badge-status badge-role">Admin</span></td>
                    <td>
                      {admin.uid === user?.uid ? (
                        <Button className="action-btn edit-btn" onClick={() => handleEditarUsuario(admin)}>
                          Editar mi perfil
                        </Button>
                      ) : (
                        <span className="text-muted" style={{fontSize: '0.85rem'}}>Solo {admin.nombre} puede editar</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted mt-3">No hay administradores registrados.</p>
        )}
      </section>

      {/* SECCIÓN RESERVAS */}
      <section className="admin-card">
        <h3 className='TituloSeccion mb-4'>Registro de Reservas</h3>
        {reservas.length > 0 ? (
          <div className="table-responsive">
            <table className="tabla-servicios">
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map(reserva => (
                  <tr key={reserva._id}>
                    <td>{reserva.servicio?.nombre || reserva.servicio}</td>
                    <td>{new Date(reserva.fechaReserva).toLocaleDateString('es-AR')}</td>
                    <td>{reserva.usuario?.nombre || 'No disponible'}</td>
                    <td>
                      <Button className="action-btn delete-btn" onClick={() => handleEliminarReserva(reserva)}>
                        Cancelar Turno
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted mt-3">No hay reservas registradas.</p>
        )}
      </section>

      {/* SECCIÓN SERVICIOS */}
      <section className="admin-card">
        <article className='sector-titulo-boton'>
          <h3 className='TituloSeccion'>Catálogo de Servicios</h3>
          <Button className="boton-panel-admin" onClick={() => setShowAgregarServicio(true)}>
            + Añadir Servicio
          </Button>
        </article>
        
        {servicios.length > 0 ? (
          <div className="table-responsive">
            <table className="tabla-servicios">
              <thead>
                <tr>
                  <th>Categoría</th>
                  <th>Servicio</th>
                  <th>Duración & Precio</th>
                  <th>Destacado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {servicios.map(servicio => (
                  <tr key={servicio._id}>
                    <td style={{color: 'var(--text-muted)'}}>{servicio.categoria?.nombre || 'Sin categoría'}</td>
                    <td style={{fontWeight: '600'}}>{servicio.nombre}</td>
                    <td>{servicio.duracion} • AR${servicio.precio}</td>
                    <td>
                      {servicio.destacado ? 
                        <span className="badge-status badge-active">Sí</span> : 
                        <span className="badge-status badge-inactive">No</span>
                      }
                    </td>
                    <td>
                      <Button className="action-btn edit-btn" onClick={() => handleEditServicio(servicio)}>
                        Editar
                      </Button>
                      <Button className="action-btn delete-btn" onClick={() => handleDeleteServicio(servicio)}>
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted mt-3">No hay servicios registrados.</p>
        )}
      </section>

      {/* MODALES INTACTOS */}
      <ModalEditarServicio show={showEditModal} onHide={() => setShowEditModal(false)} servicio={servicioSeleccionado} onSave={handleSaveServicio} />
      <ModalEliminarServicio show={showDeleteModal} onHide={() => setShowDeleteModal(false)} servicio={servicioSeleccionado} onDelete={handleConfirmDeleteServicio} />
      <ModalAgregarUsuario show={showAgregarUsuario} onHide={() => setShowAgregarUsuario(false)} onSave={handleAgregarUsuario} />
      <ModalEditarUsuario show={showEditarUsuario} onHide={() => setShowEditarUsuario(false)} usuario={usuarioSeleccionado} onSave={handleSaveUsuario} />
      <ModalEliminarUsuario show={showEliminarUsuario} onHide={() => setShowEliminarUsuario(false)} usuario={usuarioSeleccionado} onDelete={handleConfirmDeleteUsuario} />
      <ModalAgregarServicio show={showAgregarServicio} onHide={() => setShowAgregarServicio(false)} onSave={handleAgregarServicio} />
      <ModalEliminarReserva show={showEliminarReserva} onHide={() => setShowEliminarReserva(false)} reserva={reservaSeleccionada} onDelete={handleConfirmDeleteReserva} />
    </div>
  );
}