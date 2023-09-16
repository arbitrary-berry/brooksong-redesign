import React from "react";
import Grid from '@mui/material/Grid';

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
        <Grid item xs={8}>
          <img 
          src="/images/Mini_coffee_styled.jpg" 
          alt="brooksong design mini bag with newspaper and coffee" 
          style={imageStyle} 
          />
          </Grid>
        <Grid item xs={8}>
          <img 
          src="/images/Mini_coffee_styled.jpg" 
          alt="brooksong design mini bag with newspaper and coffee" 
          style={imageStyle}
          />
          </Grid>
        <Grid item xs={8}>
          <img 
          src="/images/Mini_coffee_styled.jpg" 
          alt="brooksong design mini bag with newspaper and coffee" 
          style={imageStyle}
          />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Home;