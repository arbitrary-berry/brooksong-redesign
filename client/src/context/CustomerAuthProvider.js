// CustomerAuthProvider.js
import React, { createContext, useState, useContext } from 'react';

const CustomerAuthContext = createContext();

export const useCustomerAuth = () => {
  return useContext(CustomerAuthContext);
};

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

  const createNewOrder = async () => {
    try {

      const orderData = {
        customer_id: customer.id,
        paid_unpaid: 'unpaid', // Initial status
        status: 'not shipped', // Initial status
      };
      const response = await fetch('/create-new-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Include any necessary data in the request body
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        // Handle the successful creation of the cart (if needed)
        // For example, you can set the new cart data in your state
        const newOrderData = await response.json();
        setCustomer((prevCustomer) => ({
          ...prevCustomer,
          current_order: newOrderData,
        }));
      } else {
        // Handle errors if the cart creation fails
        setError('Order creation failed');
      }
    } catch (error) {
      // Handle any other errors that may occur
      setError('An error occurred');
    }
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
    createNewOrder,
  };

  return (
    <CustomerAuthContext.Provider value={contextValue}>
      {children}
    </CustomerAuthContext.Provider>
  );
};

export {CustomerAuthContext, CustomerAuthProvider};