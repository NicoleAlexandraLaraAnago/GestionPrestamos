import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    const storedAuthData = JSON.parse(localStorage.getItem('authData'));
    if (storedAuthData) {
      setAuthData(storedAuthData);
      console.log('AuthData recuperado del localStorage:', storedAuthData); // Verifica que se lee correctamente
    }
  }, []);

  const login = async (username, password, mfaCode = '', mfaSecret = '') => {
    try {
      const response = await axios.post('http://localhost:5000/api/usuarios/login', {
        correo: username,
        contrasena: password,
        codigo_mfa: mfaCode,
        secret_mfa: mfaSecret,
      });
  
      if (response.data.success) {
        setAuthData(response.data); // Guardamos el authData
        localStorage.setItem('authData', JSON.stringify(response.data)); // Guardamos en localStorage
        console.log('AuthData actualizado:', response.data); // Verifica que se actualiza correctamente
        return { success: true };
      } else {
        return { success: false, mensaje: response.data.mensaje };
      }
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, mensaje: 'Error en el servidor' };
    }
  };
  
  
  const logout = () => {
    setAuthData(null);
    localStorage.removeItem('authData'); // Eliminar del almacenamiento local
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
