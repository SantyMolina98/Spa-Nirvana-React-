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
    <main className="AdminPage">
      <h2 className='PanelAdmin'>Panel de Administración. Bienvenido/a {user?.nombre}</h2>
      <div className='ContenidoAdmin'>
        <section>
        <h3 className='TituloSeccion'>Usuarios</h3>
        <Button 
          className="mb-3"
          onClick={() => setShowAgregarUsuario(true)}
        >
          Agregar Usuario
        </Button>
        <hr />
        {regularUsers.length > 0 ? (
          <div className="table-responsive">
            <table className="tabla-servicios">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {regularUsers.map(usuario => (
                  <tr key={usuario.uid}>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.correo}</td>
                    <td>
                      <Button 
                        variant="warning" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleEditarUsuario(usuario)}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => handleEliminarUsuario(usuario)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p><strong>Total de Usuarios: {regularUsers.length}</strong></p>
          </div>
        ) : (
          <p>No hay usuarios registrados.</p>
        )}
        </section>
        <hr />
        <section>
        <h3 className='TituloSeccion'>Administradores</h3>
        {admins.length > 0 ? (
          <div className="table-responsive">
            <table className="tabla-servicios">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {admins.map(admin => (
                  <tr key={admin.uid}>
                    <td>{admin.nombre}</td>
                    <td>{admin.correo}</td>
                    <td>
                      {admin.uid === user?.uid ? (
                        <Button 
                          variant="warning" 
                          size="sm" 
                          onClick={() => handleEditarUsuario(admin)}
                        >
                          Editar
                        </Button>
                      ) : (
                        <span className="text-muted">Solo {admin.nombre} puede editar su perfil</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p><strong>Total de Administradores: {admins.length}</strong></p>
          </div>
        ) : (
          <p>No hay administradores registrados.</p>
        )}
        </section>
        <hr />
        <section>
        <h3 className='TituloSeccion'>Reservas</h3>
        <hr />
        {reservas.length > 0 ? (
          <div className="table-responsive">
            <table className="tabla-servicios">
              <thead>
                <tr>
                  <th>ID Reserva</th>
                  <th>Servicio</th>
                  <th>Fecha</th>
                  <th>ID Profesional</th>
                  <th>Usuario</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map(reserva => (
                  <tr key={reserva._id}>
                    <td>{reserva._id}</td>
                    <td>{reserva.servicio?.nombre || reserva.servicio}</td>
                    <td>{new Date(reserva.fechaReserva).toLocaleDateString('es-AR')}</td>
                    <td>{reserva.profesional?._id || reserva.profesional?.nombre || reserva.profesional || 'No disponible'}</td>
                    <td>{reserva.usuario?.nombre || 'No disponible'}</td>
                    <td>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => handleEliminarReserva(reserva)}
                      >
                        Eliminar Reserva
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p><strong>Total de Reservas: {reservas.length}</strong></p>
          </div>
        ) : (
          <p>No hay reservas registradas.</p>
        )}
        </section>
        <hr />
       <section>
        <h3 className='TituloSeccion'>Servicios</h3>
        <Button 
          className="mb-3"
          onClick={() => setShowAgregarServicio(true)}
        >
          Añadir Servicio
        </Button>
        <hr />
        {servicios.length > 0 ? (
          <div className="table-responsive">
            <table className="tabla-servicios">
              <thead>
                <tr>
                  <th>Categoría</th>
                  <th>Servicio</th>
                  <th>Duración</th>
                  <th>Precio</th>
                  <th>Destacado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {servicios.map(servicio => (
                  <tr key={servicio._id}>
                    <td>{servicio.categoria?.nombre || 'Sin categoría'}</td>
                    <td>{servicio.nombre}</td>
                    <td>{servicio.duracion}</td>
                    <td>AR${servicio.precio}</td>
                    <td>{servicio.destacado ? 'SÍ' : 'NO'}</td>
                    <td>
                      <Button 
                        variant="warning" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleEditServicio(servicio)}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => handleDeleteServicio(servicio)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p><strong>Total de Servicios: {servicios.length}</strong></p>
          </div>
        ) : (
          <p>No hay servicios registrados.</p>
        )}
        </section>
        <ModalEditarServicio 
          show={showEditModal} 
          onHide={() => setShowEditModal(false)} 
          servicio={servicioSeleccionado} 
          onSave={handleSaveServicio} 
        />
        <ModalEliminarServicio 
          show={showDeleteModal} 
          onHide={() => setShowDeleteModal(false)} 
          servicio={servicioSeleccionado} 
          onDelete={handleConfirmDeleteServicio} 
        />
        
        {/* Modales de Usuarios */}
        <ModalAgregarUsuario 
          show={showAgregarUsuario} 
          onHide={() => setShowAgregarUsuario(false)} 
          onSave={handleAgregarUsuario} 
        />
        <ModalEditarUsuario 
          show={showEditarUsuario} 
          onHide={() => setShowEditarUsuario(false)} 
          usuario={usuarioSeleccionado} 
          onSave={handleSaveUsuario} 
        />
        <ModalEliminarUsuario 
          show={showEliminarUsuario} 
          onHide={() => setShowEliminarUsuario(false)} 
          usuario={usuarioSeleccionado} 
          onDelete={handleConfirmDeleteUsuario} 
        />

        {/* Modal para agregar servicios */}
        <ModalAgregarServicio 
          show={showAgregarServicio} 
          onHide={() => setShowAgregarServicio(false)} 
          onSave={handleAgregarServicio} 
        />

        {/* Modal para eliminar reservas */}
        <ModalEliminarReserva 
          show={showEliminarReserva} 
          onHide={() => setShowEliminarReserva(false)} 
          reserva={reservaSeleccionada} 
          onDelete={handleConfirmDeleteReserva} 
        />
      </div>
    </main>
  );
}