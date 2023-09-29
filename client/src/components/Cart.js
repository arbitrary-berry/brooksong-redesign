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

  const customerId = customer.id


  useEffect(() => {
    const fetchUnpaidOrders = async () => {
      try {
        const response = await fetch(`/customer/${customerId}/unpaid-orders`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const unpaidOrdersData = await response.json();
          setUnpaidOrders(unpaidOrdersData);
        } else {
          console.error('Failed to fetch unpaid orders');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUnpaidOrders();
  }, [customerId]);

  useEffect(() => {
    if (!Array.isArray(unpaidOrders) || unpaidOrders.length === 0) {
      return;
    }

    const fetchUnpaidOrderItems = async () => {
      try {
        const unpaidOrderItemsData = [];

        const fetchPromises = unpaidOrders.map(async (order) => {
          try {
            const response = await fetch(`/order/${order.id}/unpaid-order-items`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (response.ok) {
              const unpaidOrderItemsForOrder = await response.json();
              unpaidOrderItemsData.push(...unpaidOrderItemsForOrder);
            } else {
              console.error(`Failed to fetch unpaid order items for order ID ${order.id}`);
            }
          } catch (error) {
            console.error('An error occurred:', error);
          }
        });

        await Promise.all(fetchPromises);
  
        setUnpaidOrderItems(unpaidOrderItemsData);
        console.log('Data loaded successfully')

        setDataLoaded(true);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchUnpaidOrderItems();
  }, [unpaidOrders]);

  if (!dataLoaded) {
    return (
      <div>
        <h2>Your Cart</h2>
        <p>Loading...</p>
      </div>
    );
  }

  // if (order_items.length === 0) {
  //   return (
  //     <div>
  //       <h2>Your Cart</h2>
  //       <p>Your cart is empty.</p>
  //     </div>
  //   );
  // }

  return (
    <div>
      <h2>Your Cart</h2>
            {unpaidOrderItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul style={listStyle}>
          {unpaidOrderItems.map((order_item) => (
            <li key={order_item.sku.product.id} style={listItemStyle}>
              <div>
                <img 
                src={order_item.sku.product.photo1} 
                alt={order_item.sku.product.name}
                style={thumbnailImageStyle} />
              </div>
              <div style={productInfoStyle}>
                {order_item.sku.product.name} - ${order_item.sku.product.price}
              </div>
              <div style={buttonStyle}>
                <StyledButton onClick={() => removeFromCart(order_item.id)}>Remove</StyledButton>
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