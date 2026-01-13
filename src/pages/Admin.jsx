import '../App.css';
import '../styles/admin.css';
import { useState, useEffect, useContext } from 'react';
import { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } from '../helpers/UsuariosApi.js';
import { getCategorias, getCategoriaById, crearCategoria, actualizarCategoria, eliminarCategoria } from '../helpers/CategoriaApi.js';
import { getServicios , getServicioById, crearServicio, actualizarServicio, eliminarServicio,  } from '../helpers/ServicioApi.js';
import { getReservas,  } from '../helpers/ReservasApi.js';
import { UserContext } from '../context/UserContext.jsx';
import { Button, Form, FormControl } from 'react-bootstrap';

export default function Admin() {
  const {user} = useContext(UserContext);
  const [usuarios, setUsuarios] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosData = await getUsuarios();
        const reservasData = await getReservas();
        const categoriasData = await getCategorias();
        const serviciosData = await getServicios();

        setUsuarios(usuariosData.usuarios || []);
        setReservas(reservasData.reservas || []);
        setCategorias(categoriasData.categorias || []);
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

  const admins = usuarios.filter(usuario => usuario.rol === 'Admin');
  const regularUsers = usuarios.filter(usuario => usuario.rol !== 'Admin');

  if (loading) return <div className="TextoCargando"><h2>Cargando...</h2></div>;
  if (error) return <div className="TextoError"><h2>{error}</h2></div>;

  return (
    <main className="AdminPage">
      <h2 className='PanelAdmin'>Panel de Administración. Bienvenido/a {user?.nombre}</h2>
      <div className='ContenidoAdmin'>
        <section>
        <h3 className='TituloSeccion'>Usuarios</h3>
        <Form>
          <Form.Control type='search' placeholder='Buscar usuarios por ID' aria-label='Search'/>
          <Button type='submit'>Buscar</Button>
        </Form>
        <hr />
        <ul>
          {regularUsers.map(usuario => (
            <li key={usuario.uid}>
              Usuario: {usuario.nombre} - Email: {usuario.correo}
            </li>
          ))}
          <li>
            Total de Usuarios: {regularUsers.length}
          </li>
        </ul>
        </section>
        <hr />
        <section>
        <h3 className='TituloSeccion'>Administradores</h3>
        <Form>
          <Form.Control type='search' placeholder='Buscar administradores por ID' aria-label='Search'/>
          <Button type='submit'>Buscar</Button>
        </Form>
        <hr />
        <ul>
          {admins.map(usuario => (
            <li key={usuario.uid}>
              Administrador: {usuario.nombre} - Email: {usuario.correo}
            </li>
          ))}
          <li>
            Total de Administradores: {admins.length}
          </li>
        </ul>
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
        <Button>Añadir Servicio</Button>
        <hr />
        <ul>
          {categorias.map(categoria => (
            <li key={categoria._id}>
              Nombre: {categoria.nombre}
            </li>
          ))}
          {servicios.map(servicio => (
            <li key={servicio._id}>
              Servicio: {servicio.nombre}, Descripción: {servicio.descripcion}, Duración: {servicio.duracion} , Precio: ${servicio.precio}, <Button>Editar</Button>  <Button>Eliminar</Button>
            </li>
          ))}
          <li>
            Total de Servicios: {servicios.length}
          </li>
        </ul>
        
        </section>
      </div>
    </main>
  );
}