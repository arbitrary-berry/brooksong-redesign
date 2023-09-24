import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import Button from '@mui/material/Button';
import { styled } from "@mui/material";
import { useCart } from '../context/CartContext';

function Cart() {
  // Initialize the cart as an empty array of items
  const [order_items, setOrder_items] = useState([]);
  // const [testCart, setTestCard] = useState();
  const { cartItems } = useCart();
    console.log('cartItems', cartItems)

  // Function to add an item to the cart
  const addToCart = (product) => {
    console.log('Adding to cart:', product)
    setOrder_items([...order_items, product]);
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    const updatedCart = order_items.filter((item) => item.id !== productId);
    setOrder_items(updatedCart);
  };
  // this also needs to be a delete from the order_items table

  // Calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return order_items.reduce((total, item) => total + item.sku.product.price, 0);
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

  useEffect(() => {
    fetch('/order_items')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setOrder_items(data);
      })
      .catch((error) => {
        console.error('Error fetching order_items:', error);
      });
  }, []);


  
  return (
    <div>
      <h2>Your Cart</h2>

            {order_items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {order_items.map((product) => (
            <li key={product.sku.product.id}>
              {product.sku.product.name} - ${product.sku.product.price}
              <StyledButton onClick={() => removeFromCart(product.id)}>Remove</StyledButton>
            </li>
          ))}
        </ul>
      )}
      <p>Total Price: ${calculateTotalPrice()}</p>
      <NavLink to='/checkout'>
        <StyledButton>purchase</StyledButton>
      </NavLink>
    </div>
  );
}

export default Cart;