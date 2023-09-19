import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";

function Shop() {
  const [products, setProducts] = useState([]);

useEffect(() => {
  fetch("/products")
    .then((res) => res.json())
    .then((data) => setProducts(data))
    .catch((error) => console.error("Error fetching products:", error));
}, []);

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1>Shop</h1>
      </div>
      <div>
        <ProductList products={products}></ProductList>
      </div>
    </div>
  );
}

export default Shop;