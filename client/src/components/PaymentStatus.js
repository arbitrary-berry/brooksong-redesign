import React, { useState, useEffect } from "react";
import { useStripe } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import { useCustomerAuth } from "../context/CustomerAuthProvider";

const PaymentStatus = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  const location = useLocation();
  const { customer, createNewOrder, checkAuthorized } = useCustomerAuth();
  
  const orderId = customer?.current_cart?.id || null;

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = location.state.clientSecret

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({paymentIntent}) => {

        switch (paymentIntent.status) {
          case 'succeeded':
            setMessage('Success! Payment received.');

            fetch(`/update-order-status/${orderId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ paid_unpaid: 'paid' }),
            })
              .then(() => checkAuthorized())
              .catch((error) => {
                console.error('Failed to update order status:', error);
              });
            break;

          case 'processing':
            setMessage("Payment processing. We'll update you when payment is received.");
            break;

          case 'requires_payment_method':
            setMessage('Payment failed. Please try another payment method.');
            break;

          default:
            setMessage('Something went wrong.');
            break;
        }
      });
  }, []);


  return (
    <h1>{message}</h1>
  );
};

export default PaymentStatus;