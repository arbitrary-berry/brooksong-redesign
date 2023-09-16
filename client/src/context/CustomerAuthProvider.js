// CustomerAuthProvider.js
import React, { createContext, useState } from 'react';

const CustomerAuthContext = createContext();

// export const useCustomerAuth = () => {
//   return useContext(CustomerAuthContext);
// };

const CustomerAuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);
  const [signUp, setSignUp] = useState(false);

  const handleAuthSubmit = async (values, actions, authType) => {
    try {
      // Determine the endpoint based on authType
      const endpoint = authType === 'signup' ? '/signup' : '/login';

      const response = await fetch(`${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      //console.log(endpoint)
      if (response.ok) {
        const userData = await response.json();
        setCustomer(userData);
      } else {
        setError('Authentication error'); 
      }
    } catch (error) {
      setError('An error occurred');
    }
    
  };

  const checkAuthorized = async () => {
    const response = await fetch('/authorized')
    if (response.ok) {
      const customer = await response.json();
      setCustomer(customer);
    }else {
       setError('Bad credentials');
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/logout', {
        method: 'DELETE',
      });

      setCustomer(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleClick = () => {
    setSignUp(!signUp);
    setError(null);
  };

  const contextValue = {
    customer,
    setCustomer,
    error,
    signUp,
    handleAuthSubmit,
    handleLogout,
    handleClick,
    checkAuthorized,
  };

  return (
    <CustomerAuthContext.Provider value={contextValue}>
      {children}
    </CustomerAuthContext.Provider>
  );
};

export {CustomerAuthContext, CustomerAuthProvider};