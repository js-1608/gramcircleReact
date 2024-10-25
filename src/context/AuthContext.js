import React from 'react';
  
  const AuthContext = () =>  {
	return (
	  <div>
	  </div>
	);
  }
  
  export default AuthContext;
  import React, { createContext, useContext, useEffect, useState } from 'react';
import { getToken, removeToken, setToken as setTokenUtil } from '../utils/TokenUtils';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!getToken());

  const login = (token) => {
    setTokenUtil(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    removeToken();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

