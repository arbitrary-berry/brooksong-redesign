import React, { useEffect, useContext, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { CustomerAuthContext } from "../context/CustomerAuthProvider";
import Home from './Home';
import Profile from './Profile';
import Shop from './Shop';
import Leather from './Leather';
import Story from "./Story";
import Donation from "./Donation";
import FAQs from "./FAQs";
import ProductDetail from "./ProductDetail"
import Cart from "./Cart";
import About from "./About"
import Header from "./Header"; 
import Footer from "./Footer";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import PaymentStatus from "./PaymentStatus";

const stripePromise = loadStripe(
  "pk_test_51NtdPjAon7k0RE4WOlRfPmGcPgJSJMeNeD9D4arnZUUlUpVkyePlOYt5Aw1yUVXfE2MRs3GY43HE19v6XbiQ9AZ800oVVLQJJj"
);

function App() {
  const { checkAuthorized, customer } = useContext(CustomerAuthContext);
  const [clientSecret, setClientSecret] = useState("")
  const [count, setCount] = useState(0)
  const [order_items, setOrder_items] = useState(null);

  const getClientSecret = async () => {
    const res = await fetch('/create-payment-intent')
    const { client_secret: clientSecret } = await res.json()
    setClientSecret(clientSecret)
  } 
  useEffect(() => {
    checkAuthorized();
    fetchOrderItems();
    getClientSecret()
  
  }, [])

  const appearance = {
    theme: 'night',
  }

  const options = {
    clientSecret,
    appearance
  }
  
  if (!clientSecret) return <h1>Loading...</h1>

  function fetchOrderItems() {

    fetch('/order_items')
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch order items");
        }
        return res.json();
      })
      .then((data) => {
        setOrder_items(data);
      })
      .catch((error) => {
        console.error("Error fetching order items:", error);
      });
  }

  return (
  <div>
    <Elements stripe={stripePromise} options={options}>
    <Header />
      <Switch>
        <Route path="/customer/:id" ><Profile /></Route>
        <Route path="/about"><About /></Route>
        <Route path="/shop" ><Shop /></Route>         
        <Route path="/leather" ><Leather /></Route>        
        <Route path="/story" ><Story /></Route>
        <Route path="/donation"><Donation /></Route>
        <Route path="/faqs"><FAQs /></Route>
        <Route path="/products/:id"><ProductDetail /></Route>
        <Route path="/products"></Route>
        <Route path="/cart"><Cart /></Route>
        <Route path="/confirmed"><PaymentStatus /></Route>
        <Route path="/checkout">
          <CheckoutForm secret={clientSecret}/>
        </Route>
        <Route path="/"><Home /></Route>
      </Switch>
    <Footer />
    </Elements>
      </div>
  )
}

export default App;






