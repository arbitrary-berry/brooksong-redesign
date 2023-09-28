import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import { styled } from "@mui/material";
import { useCart } from '../context/CartContext';
import CheckoutForm from "./CheckoutForm";

const listStyle = {
  fontFamily: 'Merriweather, serif',
  fontSize : '14px',
};

const thumbnailImageStyle = {
  maxWidth: '300px',
  maxHeight: '300px',
  marginRight: '10px',
};

const listItemStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
};

const productInfoStyle = {
  flex: 1,
};

const buttonStyle = {
  marginLeft: '10px',
};


function Cart({ orderId }) {
  const [order_items, setOrder_items] = useState([]);
  const { cartItems } = useCart();
  const history = useHistory();

  const addToCart = (product) => {
    console.log('Adding to cart:', product)
    setOrder_items([...order_items, product]);
  };

  const removeFromCart = (productId) => {
    const updatedCart = order_items.filter((item) => item.id !== productId);
    setOrder_items(updatedCart);
  };
  // this also needs to be a delete from the order_items table

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

  if (order_items.length === 0) {
    return (
      <div>
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Cart</h2>

            {order_items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul style={listStyle}>
          {order_items.map((product) => (
            <li key={product.sku.product.id} style={listItemStyle}>
              <div>
                <img 
                src={product.sku.product.photo1} 
                alt={product.sku.product.name}
                style={thumbnailImageStyle} />
              </div>
              <div style={productInfoStyle}>
                {product.sku.product.name} - ${product.sku.product.price}
              </div>
              <div style={buttonStyle}>
                <StyledButton onClick={() => removeFromCart(product.id)}>Remove</StyledButton>
              </div>
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