import { createContext, useState, useEffect } from 'react';
import { crearUsuario } from '../helpers/UsuariosApi.js';
import { authLogin } from '../helpers/LoginApi.js'; 

export const UserContext = createContext();


export function UserProvider({ children }) {
 //SECCIÓN PARA USUARIOS
  const [user, setUser] = useState(null);
  const [register, setRegister] = useState(null);
  
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.rol === 'Admin';

  useEffect(() => {
    // cargar desde localStorage si existe
    const stored = localStorage.getItem('spa_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed.user || null);
        
        setRegister(parsed.register || null);
      } catch (e) {
        console.error('Error parsing stored user', e);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // persistir cambios
    if (user || register) {
      localStorage.setItem('spa_user', JSON.stringify({ user, register }));
    } else {
      localStorage.removeItem('spa_user');
    }
  }, [user, register]);


  // Funciones de autenticación LOGIN
  const login = async ({ username, password }) => {
    if (!username || !password) {
      throw new Error('Credenciales inválidas');
    }

    try{
      const respuestaLog = await authLogin({ username, password });
      if(respuestaLog.ok){
        localStorage.setItem("token", JSON.stringify(respuestaLog.token));
        setUser(respuestaLog.usuario);

        return { user: respuestaLog.usuario };
      } else{
        throw new Error(respuestaLog.msg || 'Error en el login');
      }
    } catch (error) {
      console.error('Error en el login API :', error);
      throw new Error('No se pudo completar el login');
    } 
    
    
  };

  const logout = () => {
    setUser(null);
    setRegister(null);
    localStorage.removeItem('spa_user');
    localStorage.removeItem('token');
  };

  const registro = async (datos) => {
    const data = datos?.userInfo || datos;
    if(!data){
      throw new Error('Información de registro inválida');
    }
    
    try {
      const respuestareg = await crearUsuario(data);
      if(respuestareg.ok){
        setRegister(respuestareg.usuario);
        setUser(respuestareg.usuario);

        return { user : respuestareg.usuario}
      } else{
        throw new Error(respuestareg.msg || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      throw new Error('No se pudo completar el registro');
    }
  }


  return (
    <UserContext.Provider value={{ user, loading, login, logout, registro, isAuthenticated: !!user, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
