import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   const login = useCallback((token) => {
      localStorage.setItem('authToken', token);
      setIsAuthenticated(true);
   }, []);

   const logout = () => {
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
   };

   useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (token) {
         setIsAuthenticated(true); // Autentica automaticamente se o token estiver presente
      }
   }, []);

   return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
}
