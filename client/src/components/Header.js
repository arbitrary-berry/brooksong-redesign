import React, { useState, useContext } from "react";
import { styled } from '@mui/material/styles';
import { CustomerAuthContext  } from "../context/CustomerAuthProvider";
import { NavLink } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';


const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'black', 
    color: theme.palette.common.white,
    borderRadius: "15%",
    margin: "5px",
    '&:hover': {
      backgroundColor: 'white', 
      color: 'black',
    },
  }));

const TransparentAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: "transparent",
    boxShadow: "none",
}));

const containerStyle ={
  display: 'flex',
  alignItems: 'center',
};



function Header() {

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const { customer, handleLogout } = useContext(CustomerAuthContext) ;

  const handleLoginModalOpen = () => {
    setLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
  };

  const handleSignupModalOpen = () => {
    setSignupModalOpen(true);
  };

  const handleSignupModalClose = () => {
    setSignupModalOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <TransparentAppBar position="static">
        <div style={containerStyle}>
        <NavLink to='/'>
          <div>
          <img src="/images/brooksongdesignlogofromwebsite.jpg" alt="brooksong design logo"  width="400px" />
          </div>
        </NavLink>
        <Toolbar>
          <div>
          {customer !== undefined ? (
            customer ? (
              <StyledButton variant="outlined" onClick={handleLogout}>
                Logout
              </StyledButton>
            ) : (
              <>
                <StyledButton variant="outlined" onClick={handleLoginModalOpen}>
                  Login
                </StyledButton>
                <StyledButton variant="outlined" onClick={handleSignupModalOpen}>
                  Signup
                </StyledButton>
                <Dialog open={isLoginModalOpen} onClose={handleLoginModalClose}>
                  <DialogTitle>Login</DialogTitle>
                  <DialogContent>
                    <Login onLogin={() => handleLoginModalClose()} />
                  </DialogContent>
                </Dialog>
                <Dialog open={isSignupModalOpen} onClose={handleSignupModalClose}>
                  <DialogTitle>Signup</DialogTitle>
                  <DialogContent>
                    <Signup />
                  </DialogContent>
                </Dialog>
              </>
              )
            ) : null}
          </div>
        </Toolbar>
        </div>
      </TransparentAppBar>
    </Box>
  );
}

export default Header;