import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [register, setRegister] = useState(null);
  
  const [loading, setLoading] = useState(true);

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

  // Simula una llamada a una API que devuelve un token y datos de usuario
  const login = async ({ username, password }) => {
    if (!username || !password) {
      throw new Error('Credenciales inválidas');
    }

    // Simular delay
    await new Promise((r) => setTimeout(r, 2000));

    // Simular token y datos de usuario
    
    const userData = { username };

    setUser(userData);
    

    return { user: userData };
  };

  const logout = () => {
    setUser(null);
    
  };

  const registro = async (userInfo) => {
    if(!userInfo){
      throw new Error('Información de registro inválida');
    }
    await new Promise((r) => setTimeout(r, 2000));
      const inforegistro = {nombre: userInfo.nombre, apellido: userInfo.apellido, usuario: userInfo.usuario, email: userInfo.email, telefono: userInfo.telefono, domicilio: userInfo.domicilio, provincia: userInfo.provincia, cpostal: userInfo.cpostal, contrasena: userInfo.contrasena};
    setRegister(inforegistro);

    return inforegistro;
  }


  return (
    <UserContext.Provider value={{ user, loading, login, logout, registro, isAuthenticated: !!user }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
