import React, { useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import Button from '@mui/material/Button';
import { styled } from "@mui/material";

function Cart() {
  // Initialize the cart as an empty array of items
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
  };

  // Calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'black', 
    color: theme.palette.common.white,
    borderRadius: "15%",
    margin: "5px",
    '&:hover': {
      backgroundColor: 'white', 
      color: 'black',
    },
    fontfamily: 'Lato, sans-serif',
    fontSize: '16px', 
    fontweight: 'bold',
    textTransform: 'lowercase',
  }));

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
              <StyledButton onClick={() => removeFromCart(product.id)}>Remove</StyledButton>
            </li>
          ))}
        </ul>
      )}
      <p>Total Price: ${calculateTotalPrice()}</p>
      <NavLink to='/checkoutform'>
        <StyledButton>purchase</StyledButton>
      </NavLink>
    </div>
  );
}

export default Cart;