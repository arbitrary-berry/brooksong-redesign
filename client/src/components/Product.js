import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

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

function Product({ id, name, photo1, price }) {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardMedia
                sx={{ maxWidth: "none"}}
                component="img"
                alt={name}
                image={photo1}
              />
                <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="body1" color="black" style={{ marginBottom: 'auto' }}>
                    <h3>{price}</h3>
                  </Typography>
                  <CardActions>
                    <NavLink to={`/products/${id}`}>
                        <StyledButton>{name}</StyledButton>
                    </NavLink>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
            </Grid>
        </Box>
    </div>
  );
}

export default Product;