import React, { useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import { useCustomerAuth  } from "../context/CustomerAuthProvider";
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
    backgroundColor: 'black', // Green pastel color
    color: theme.palette.common.white,
    borderRadius: "15%",
    margin: "5px",
    '&:hover': {
      backgroundColor: '#7bc68c', // Slightly darker shade on hover
    },
  }));

function Header() {

// add logo

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const { customer, handleLogout } = useCustomerAuth() ;


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
      <AppBar position="static">
        <Toolbar>
          <div>
            {customer ? (
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
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;