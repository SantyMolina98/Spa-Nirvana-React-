import { createContext, useState, useEffect } from 'react';
import { crearUsuario } from '../helpers/UsuariosApi';

export const UserContext = createContext();

export function UserProvider({ children }) {
  
  //Turnos como un array vacío y leemos de localStorage si existen
  const [turnos, setTurnos] = useState(() => {
    const savedTurnos = localStorage.getItem('spa_turnos');
    return savedTurnos ? JSON.parse(savedTurnos) : [];
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Efecto para guardar turnos automáticamente en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('spa_turnos', JSON.stringify(turnos));
  }, [turnos]);

  // Agregar un turno al carrito
  const addTurno = (nuevoServicio) => {
    //ID único para poder eliminarlo después sin errores
    const turnoConId = { ...nuevoServicio, id: Date.now() };
    setTurnos((prevTurnos) => [...prevTurnos, turnoConId]);
  };

  // Eliminar un turno del carrito
  const removeTurno = (id) => {
    setTurnos((prevTurnos) => prevTurnos.filter(turno => turno.id !== id));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('spa_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (e) {
        console.error('Error parsing stored user', e);
        localStorage.removeItem('spa_user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('spa_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('spa_user');
    }
  }, [user]);
  
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem('token');
    localStorage.removeItem('spa_user');
  };

  const registro = async (datos) => {
    const datosParaBackend = {
      nombre: datos.nombre,
      apellido: datos.apellido,
      correo: datos.email,
      telefono: datos.telefono,
      domicilio: datos.domicilio,
      ciudad: datos.provincia,
      codpostal: datos.cpostal,
      password: datos.contrasena,
      rol: "ROL_USUARIO"
    };

    try {
      const respuesta = await crearUsuario(datosParaBackend);
      if (respuesta.usuario || respuesta.uid) {
        setUser(respuesta.usuario);
        return respuesta.usuario;
      } else {
        return true;
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      throw error;
    }
  }

  return (
    <UserContext.Provider value={{
      user,
      loading,
      login,
      logout,
      registro,
      isAuthenticated: !!user,
      turnos,
      addTurno,
      removeTurno
    }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;