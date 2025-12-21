import '../App.css';
import React, { useState, useEffect } from 'react';
import { getUsuarios } from '../helpers/UsuariosApi';
import { getReservas } from '../helpers/ReservasApi';

export default function Admin() {
  const [usuarios, setUsuarios] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosData = await getUsuarios();
        const reservasData = await getReservas();
        setUsuarios(usuariosData.usuarios || []);
        setReservas(reservasData.reservas || []);
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
    </main>
  );
}