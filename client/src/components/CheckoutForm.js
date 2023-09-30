import React, { useState, useContext } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
// import { CustomerAuthContext } from "../context/CustomerAuthProvider";
import { useHistory } from 'react-router-dom';


const CheckoutForm = ({ secret }) => {
  const stripe = useStripe();
  const elements = useElements();
  // const { customer }= useContext(CustomerAuthContext);
  const history = useHistory();

  // const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5555/confirmed",
      },
      redirect: 'if_required',
    });


    if (error) {
      setErrorMessage(error.message);
    } else {
      history.push({
        pathname: '/confirmed',
        state: { clientSecret: secret }
      });
    }
  };


  return (
    <form onSubmit={handleSubmit}>
    <PaymentElement />
    <button disabled={!stripe}>Submit</button>
    {errorMessage && <div>{errorMessage}</div>}
  </form>
);
};

export default CheckoutForm;