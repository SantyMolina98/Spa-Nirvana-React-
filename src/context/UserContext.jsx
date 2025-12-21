import { createContext, useState, useEffect } from 'react';
import { crearUsuario } from '../helpers/UsuariosApi.js';
import { authLogin } from '../helpers/LoginApi.js'; 

export const UserContext = createContext();

export function UserProvider({ children }) {
 //SECCIÓN PARA USUARIOS
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.rol === 'Admin';

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


  // Funciones de autenticación LOGIN
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('spa_user');
    localStorage.removeItem('token');
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
    console.log("Enviando al backend (FINAL):", datosParaBackend);

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
    <UserContext.Provider value={{ user, loading, login, logout, registro, isAuthenticated: !!user, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;