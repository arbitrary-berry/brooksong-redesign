import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { CustomerAuthProvider } from "./context/CustomerAuthProvider";
import { CartProvider } from "./context/CartContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Router>
    <CartProvider>
      <CustomerAuthProvider>
        <App />
      </CustomerAuthProvider>
    </CartProvider>
  </Router>
);
