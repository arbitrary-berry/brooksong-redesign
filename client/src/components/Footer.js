import * as React from 'react';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { NavLink } from 'react-router-dom'

const StickyFooter = styled('div')({
  position: 'sticky',
  bottom: 0,
  backgroundColor: 'white', 
  zIndex: 1000,
  width: '100%',
  textAlign: 'center',
});

const footerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const buttonContainerStyle = {
  paddingLeft: '90px',
  paddingRight: '90px',
};

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

function Footer() {
  return (
    <StickyFooter>
      <Divider />
      <div style={footerStyle}>
        <NavLink to="/about" style={buttonContainerStyle}>
          <StyledButton>about</StyledButton>
        </NavLink>
        <NavLink to="/shop">
          <StyledButton>shop</StyledButton>
        </NavLink>
        <NavLink to="/cart" style={buttonContainerStyle}>
          <Button>
            <ShoppingCartIcon style={{ color: 'black' }} />
          </Button>
        </NavLink>
      </div>
      <Divider />
    </StickyFooter>
  );
}

export default Footer