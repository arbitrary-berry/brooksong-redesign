import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./PaymentPage.css";

export default function PaymentPage() {

  const [userID, setUserId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const stripePromise = loadStripe(
    "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"
  );

  const loadData = async () => {
    try {
      const response = await fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [{ id: "Premium" }],
          customer: userID,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } else {
        console.error("Failed to fetch client secret.");
      }
    } catch (error) {
      console.error("Error fetching client secret:", error);
    }
  };

  React.useEffect(() => {
    loadData();
  }, [userID]);

  const appearance = {
    theme: "night",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}