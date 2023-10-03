import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems({ ...cartItems, order_items: [...cartItems.order_items, item]});
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };
    // this also needs to be a delete from the order_items table
  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await fetch('/current-cart');
      const cartItemsData = await response.json();
      setCartItems(cartItemsData)
    };
    fetchCartItems();
  }, []);
  

  return (
    <CartContext.Provider value={{ setCartItems, cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;