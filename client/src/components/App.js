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

const stripePromise = loadStripe(
  "pk_test_51H7Vj4K2nZ17yEZ9QyAQGRkvaYkrhyCwI18hBCiuoGBJQiIPQXCkWywjm4ardmeqYISAFAaxVWLG9A408l8ayRCB00FMTQr5tx"
);

function App() {
  const { checkAuthorized, customer } = useContext(CustomerAuthContext);
  const [clientSecret, setClientSecret] = useState("")
  const [order_items, setOrder_items] = useState(null);

  useEffect(() => {
    checkAuthorized();

    fetchOrderItems();
  }, [])

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

  function loadIntent() {

    if (!order_items) {
      console.error("Order is not defined.");
      return;
    }

    const order_itemIds = order_items.map((order_item) => order_item.sku_id);
    console.log(order_itemIds)

        fetch("/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: order_itemIds, customer: customer.id }),
        })
          .then((res) => {
            console.log(res);
            if (!res.ok) {
              throw new Error("Failed to fetch payment intent");
            }
            return res.json();
          })
          .then((data) => {
            console.log("Stripe API: response:", data);
            setClientSecret(data.clientSecret);
          })
          .catch((error) => {
            console.error("Error fetching payment intent:", error);

          if (error.response) {
            console.error("Response Status:", error.response.status);
            error.response.text().then((text) => {
              console.error("Response Body:", text);
            });
            console.error("Stripe API response:", error.response);
          }
          });
        }


  useEffect(() => {
    if (customer) {
      loadIntent()}
  }, [customer, order_items])

  const appearance = {
    theme: 'stripe',
  };
  
  const options = {
    clientSecret,
    appearance,
  };


  return (
  <div>
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
        <Route path="/checkout">
          {clientSecret && (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm />
            </Elements>
          )}
        </Route>
        <Route path="/"><Home /></Route>
      </Switch>
    <Footer />
      </div>
  )
}

export default App;






