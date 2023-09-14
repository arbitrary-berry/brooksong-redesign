import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { NavLink } from 'react-router-dom'
// import { useCustomerAuth } from '../context/CustomerAuthProvider';

const StickyFooter = styled('div')({
  position: 'sticky',
  bottom: 0,
  backgroundColor: 'white', 
  zIndex: 1000,
});

function Footer() {
  // const { customer } = useCustomerAuth(); 
  return (
    <StickyFooter>
      <Grid container>
        <Stack direction="row" spacing={5}>
          <Divider orientation="vertical" flexItem />
          <Grid item xs>
            <NavLink to='/about'>
              <Button>
                about
              </Button>
            </NavLink>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs>
          <NavLink to='/shop'>
            <Button>
              shop
            </Button>
          </NavLink>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs>
            <NavLink to='/cart'>
            <Button>
              <ShoppingCartIcon style={{ color: 'black' }} />
            </Button>
          </NavLink>
          </Grid>
          <Divider orientation="vertical" flexItem />
      </Stack>
    </Grid>
  </StickyFooter>
  );
}

export default Footer