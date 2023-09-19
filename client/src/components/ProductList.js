import React from "react";
import Product from "./Product";
import Grid from '@mui/material/Grid';


function ProductList({ products }) {

return (
    <div>
        <Grid container spacing={2}>
            {products.map((product) => (
                <Grid item xs={4} >
                    <Product 
                    id={product.id}
                    name={product.name}
                    photo1={product.photo1}
                    price={product.price}
                    />
                </Grid>
            ))}
        </Grid>
    </div>
);
}

export default ProductList;