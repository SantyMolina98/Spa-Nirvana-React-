import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // cargar desde localStorage si existe
    const stored = localStorage.getItem('spa_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed.user || null);
        setToken(parsed.token || null);
      } catch (e) {
        console.error('Error parsing stored user', e);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // persistir cambios
    if (user || token) {
      localStorage.setItem('spa_user', JSON.stringify({ user, token }));
    } else {
      localStorage.removeItem('spa_user');
    }
  }, [user, token]);

  // Simula una llamada a una API que devuelve un token y datos de usuario
  const login = async ({ username, password }) => {
    // aquí iría la llamada real a tu API (fetch / axios)
    // validación simple simulada
    if (!username || !password) {
      throw new Error('Credenciales inválidas');
    }

    // Simular delay
    await new Promise((r) => setTimeout(r, 400));

    // En una app real, verificarías con la API y obtendrías un token
    const fakeToken = btoa(username + ':' + password + ':' + Date.now());
    const userData = { username };

    setUser(userData);
    setToken(fakeToken);

    return { user: userData, token: fakeToken };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const register = async ({ username, password }) => {
    // Simula registro — en producción harías POST a /register
    if (!username || !password) throw new Error('Invalid data');
    await new Promise((r) => setTimeout(r, 400));
    // devolver mismo resultado que login para autologin
    return login({ username, password });
  };

  return (
    <UserContext.Provider value={{ user, token, loading, login, logout, register, isAuthenticated: !!token }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
