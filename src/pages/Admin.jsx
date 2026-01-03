import '../App.css';
import '../styles/admin.css';
import { useState, useEffect } from 'react';
import { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } from '../helpers/UsuariosApi.js';
import { getCategorias, getCategoriaById, crearCategoria, actualizarCategoria, eliminarCategoria } from '../helpers/CategoriaApi.js';
import { getServicios , getServicioById, crearServicio, actualizarServicio, eliminarServicio,  } from '../helpers/ServicioApi.js';
import { getReservas,  } from '../helpers/ReservasApi.js';

export default function Admin() {
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
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const admins = usuarios.filter(user => user.rol === 'Admin');
  const regularUsers = usuarios.filter(user => user.rol !== 'Admin');

  if (loading) return <div className="AdminPage"><h2>Cargando...</h2></div>;
  if (error) return <div className="AdminPage"><h2>{error}</h2></div>;

  return (
    <main className="AdminPage">
      <h2>Panel de Administración</h2>
      <section>
        <h3>Usuarios</h3>
        <ul>
          {regularUsers.map(user => (
            <li key={user._id}>{user.nombre} - {user.email}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Administradores</h3>
        <ul>
          {admins.map(user => (
            <li key={user._id}>{user.nombre} - {user.email}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Reservas</h3>
        <ul>
          {reservas.map(reserva => (
            <li key={reserva._id}>
              Servicio: {reserva.servicio}, Fecha: {new Date(reserva.fechaReserva).toLocaleDateString()}, Usuario: {reserva.usuario?.nombre}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Categorías</h3>
        <ul>
          {categorias.map(categoria => (
            <li key={categoria._id}>
              Nombre: {categoria.nombre}
            </li>
          ))}
          {servicios.map(servicio => (
            <li key={servicio._id}>
              Servicio: {servicio.nombre}, Descripción: {servicio.descripcion}, Duración: {servicio.duracion} mins, Precio: ${servicio.precio}
            </li>
          ))}
        </ul>
        
      </section>
    </main>
  );
}