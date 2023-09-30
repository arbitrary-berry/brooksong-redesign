import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import { styled } from "@mui/material";
import { useCart } from '../context/CartContext';
import { useCustomerAuth } from '../context/CustomerAuthProvider';

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
  const [unpaidOrders, setUnpaidOrders] = useState([]);
  const [unpaidOrderItems, setUnpaidOrderItems] = useState([]);
  const [order_items, setOrder_items] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { customer } = useCustomerAuth();
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [products, setProducts] = useState({});

  useEffect(() => {
    cartItems.order_items.forEach(item => {
      fetch(`/products/${item.sku_id}`)
        .then(response => response.json())
        .then(product => {
          setProducts(prevProducts => ({ ...prevProducts, [item.sku_id]: product }));
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    });
  }, [cartItems.order_items]);

  const calculateTotalPrice = () => {
    return cartItems.order_items.reduce((total, item) => {
      const product = products[item.sku_id];
      if (product && product.price) {
        return total + product.price;
      }
      return total;
    }, 0);
  };

  console.log(cartItems);
  if (cartItems.length === 0) {
    return (
      <div>
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }
//need to add quantity and color, quantity is in order_items, and color is in skus
  return (
    <div>
      <h2>Your Cart</h2>
        <ul style={listStyle}>
          {cartItems.order_items.map((item) => {
            const product = products[item.sku_id];
            return (
              <li key={item.id} style={listItemStyle}>
                <div>
                  {product && product.photo1 && (
                  <img 
                    src={product.photo1} 
                    alt={product.name}
                    style={thumbnailImageStyle} />
                  )}
                </div>
                <div style={productInfoStyle}>
                {product && product.name && product.price && `${product.name} - $${product.price}`}
              </div>
              <div style={buttonStyle}>
                <StyledButton onClick={() => removeFromCart(item.id)}>Remove</StyledButton>
              </div>
            </li>
            );
          })}
        </ul>
      <p>Total Price: ${calculateTotalPrice()}</p>
      <NavLink to='/checkout'>
        <StyledButton>purchase</StyledButton>
      </NavLink>
    </div>
  );
}

export default Cart;
