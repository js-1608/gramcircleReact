import React from 'react';
  
  const TokenUtils = () =>  {
	return (
	  <div>
	  </div>
	);
  }
  
  export default TokenUtils;
  import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const getToken = () => Cookies.get('jwtToken');

export const setToken = (token) => {
    Cookies.set('jwtToken', token, { 
        expires: 7,
        secure: true,
        sameSite: 'strict'
    });
};

export const removeToken = () => Cookies.remove('jwtToken');

export const decodeToken = () => {
    const token = getToken();
    if (token) {
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }
    return null;
};

export const getEmailFromToken = () => {
    const decodedToken = decodeToken();
    return decodedToken ? (decodedToken.emailId || decodedToken.unique_name || '') : '';
};
