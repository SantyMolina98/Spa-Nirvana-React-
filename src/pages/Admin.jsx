import '../App.css';
import '../styles/admin.css';
import { useState, useEffect, useContext } from 'react';
import { getUsuarios } from '../helpers/UsuariosApi.js';
import { getServicios } from '../helpers/ServicioApi.js';
import { getReservas,  } from '../helpers/ReservasApi.js';
import { UserContext } from '../context/UserContext.jsx';
import { Button } from 'react-bootstrap';
import { ModalEditarServicio, ModalEliminarServicio } from '../components/ModalServicioEditDelete.jsx';
import { ModalAgregarUsuario, ModalEditarUsuario, ModalEliminarUsuario } from '../components/ModalUsuariosAdmin.jsx';
import { ModalAgregarServicio } from '../components/ModalServicioNuevo.jsx';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosData = await getUsuarios();
        const reservasData = await getReservas();
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
  const regularUsers = usuarios.filter(usuario => usuario.rol !== 'Admin');

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
                      <Button 
                        variant="warning" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleEditarUsuario(admin)}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => handleEliminarUsuario(admin)}
                      >
                        Eliminar
                      </Button>
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
        <Button>Añadir Reserva</Button>
        <Button>Eliminar Reserva</Button>
        <hr />
        <ul>
          {reservas.map(reserva => (
            <li key={reserva._id}>
              Servicio: {reserva.servicio}, Fecha: {new Date(reserva.fechaReserva).toLocaleDateString()}, Usuario: {reserva.usuario?.nombre}
            </li>
          ))}
          <li>
            Total de Reservas: {reservas.length}
          </li>
        </ul>
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
      </div>
    </main>
  );
}