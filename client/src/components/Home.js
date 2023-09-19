import React from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const containerStyle ={
  width: '100%',
  height: 'auto',
};
const containerStyle2 ={
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const imageStyle = {
  maxwidth: '100px',
  height: 'auto'
}

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

function Home() {

  return (
    <div >
      <img src="/images/Mini_coffee_styled.jpg" alt="brooksong design mini bag with newspaper and coffee" style={containerStyle}/>
      <div style={containerStyle2}>
        <h1>handmade italian leather accessories</h1>
      </div>
      <div style={containerStyle2}>
          <h1>just for you</h1>
      </div>
      <div>
        <Grid container spacing ={2}>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 250, boxShadow: 'none' }}>
            <CardMedia
              component="img"
              alt="Megan Bag hero" 
              height="140"
              image="/images/Brooksong_Design_Megan_bag_hero.jpg"
              style={imageStyle}
            />
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="body1" color="black" style={{ marginBottom: 'auto' }}>
                $340
              </Typography>
              <CardActions>
                <NavLink to="/products/1">
                  <StyledButton>megan bag</StyledButton>
                </NavLink>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
        <Card sx={{ maxWidth: 250, boxShadow: 'none' }}>
            <CardMedia
              component="img"
              alt="Mini bag hero" 
              height="140"
              image="/images/Brooksong_Design_Mini_bag_hero.jpg"
              style={imageStyle}
            />
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="body1" color="black" style={{ marginBottom: 'auto' }}>
                $175
              </Typography>
              <CardActions>
                <NavLink to="/products/2">
                  <StyledButton>mini bag</StyledButton>
                </NavLink>
              </CardActions>
            </CardContent>
          </Card>
          </Grid>
        <Grid item xs={4}>
        <Card sx={{ maxWidth: 250, boxShadow: 'none' }}>
            <CardMedia
              component="img"
              alt="Christa clutch hero" 
              height="140"
              image="/images/Brooksong_Design_Christa_clutch_hero.jpg"
              style={imageStyle}
            />
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="body1" color="black" style={{ marginBottom: 'auto' }}>
                $124
              </Typography>
              <CardActions>
                <NavLink to="/products/3">
                  <StyledButton>christa clutch</StyledButton>
                </NavLink>
              </CardActions>
            </CardContent>
          </Card>
          </Grid>
        </Grid>
      </div>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <img src="/images/Red_Megan_bag_cafe.jpg" alt="brooksong design megan bag at a cafe" style={containerStyle}/>
            <div style={containerStyle2}></div>
        </Grid>
        <Grid item xs={4}>
          <h2>The bag that started it all</h2>
          <p>It all began with my sister-in-law Megan and her bulging, tattered shoulder bag.</p>
          <p>The bag had seen better days: It was stuffed to the brim and the strap was literally hanging on by a thread.</p>
          <p>Girl, no! I thought.</p>
          <p>Her birthday was coming up and I wanted to surprise her. I thought about her preferences, unique style, and designed a new bag out of heavy canvas. She loved it!</p>
          <p>And the seed to start a business was planted.</p>
          <p>A few years later, I had the chance to explore a friend’s leather studio and try my hand at leatherwork. Having the design for Megan’s bag already drafted I decided to make one out of leather. And the seed to start brooksong design began to bloom.</p>
          <p>The <NavLink to='/meganbag'>Megan bag</NavLink>, named after my sister-in-law, became my flagship product.</p>
          <NavLink to="/story">
            <StyledButton>story</StyledButton>
          </NavLink>
        </Grid>
      </Grid>
    </Box>
    <ImageList sx={{ width: '100%', height: 'auto' }} cols={3} gap={8}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
            style={{ width: '100%', height: 'auto' }}
          />
        </ImageListItem>
      ))}
    </ImageList>
    <div style={{ textAlign: 'center' }}>
      <h2>our products</h2>
      <p>I combine the beauty and sophistication of Italian leather with the durability of American-made hardware. Every piece is intended to be a one-of-a-kind expression of your individuality and confidence.</p>
      <p>Each bespoke item is thoughtfully designed and handcrafted by me, Alyssa, in my attic-turned-studio in Portland, Oregon.</p>
    </div>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <img src="/images/Yellow_Megan_bag_coffee.jpg" alt="yellow megan bag at cafe" style={containerStyle}/>
            <div style={containerStyle2}></div>
        </Grid>
        <Grid item xs={5}>
          <div style={{ textAlign: 'center' }}>
            <h2>our goal:</h2>
            <h2>destigmatizing mental illness</h2>
            <h2>10% of Profits go to the</h2>
            <h2>Suicide Prevention Lifeline</h2>
          </div>
        </Grid>

      </Grid>
    </Box>
  </div>
);
}

const itemData = [
  {
    img: '/images/Red_Megan_bag_coffee.jpg',
    title: 'Breakfast',
  },
  {
    img: '/images/Black_mini_bag_logo.jpg',
    title: 'Burger',
  },
  {
    img: '/images/mini_bag_fence.jpg',
    title: 'Camera',
  },
];

export default Home;