import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControl } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';


function MeganBag({ onNewOrder }) {

  const [color, setColor] = useState(true);
  const [quantity, setQuantity] = useState(false);

  const handleColorChange = (e) => {
    setColor(e.target.checked)
  }

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault()
    fetch('http://localhost:3000/order_items', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({ color, quantity})
    })
    .then(response => response.json())
    .then(newOrder => { onNewOrder(newOrder)
    })
  }
  
  return (
    <div>
    <Box sx={{ width: '100%' }}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={6}>
      <ImageList variant="masonry" cols={2} gap={8}>
        {itemData.map((item) => (
      <ImageListItem key={item.img}>
        <img
          src={`${item.img}?w=248&fit=crop&auto=format`}
          srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={item.title}
          loading="lazy"
        />
      </ImageListItem>
      ))}
      </ImageList>
      </Grid>
      <Grid item xs={6}>
        <h1>Megan Bag</h1>
        <p><h2>$340</h2></p>
        <p>An everyday slouchy shoulder bag to have all you need at your fingertips. Natural edge flap makes every bag one-of-a-kind.</p>
        <p></p>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">color</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="red"
              name="radio-buttons-group"
              >
        <FormControlLabel value="red" control={<Radio
            onChange={handleColorChange}
            onSubmit={handleSubmit}/>} label="red" />
        <FormControlLabel value="grey" control={<Radio />} label="grey" />
        <FormControlLabel value="yellow" control={<Radio />} label="yellow" />
        <FormControlLabel value="black" control={<Radio />} label="black" />
      </RadioGroup>
    </FormControl>
    <FormControl sx={{ m: 1, minWidth: 80 }}>
    <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={quantity}
        label="quantity"
        onChange={handleQuantityChange}
      >
    <MenuItem value={1}>1</MenuItem>
    <MenuItem value={2}>2</MenuItem>
    <MenuItem value={3}>3</MenuItem>
    <MenuItem value={4}>4</MenuItem>
    <MenuItem value={5}>5</MenuItem>
  </Select>
</FormControl>
    <p><Button onClick={handleSubmit}>add to cart</Button></p>
  
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>details+</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <p>10 ½” l x 14 ½” w x 5” d</p>
          <p>35” l x 1” w strap attached with either brass or nickel rivets.</p>
          <p>Pocket under flap: 6 ⅜” l x 7 ⅜” w</p>
          <p>Fish hook keyring attached to bag, so you can always find your keys!</p>
          <p>Will fit an 11" laptop.</p>
          <p>Comes in:</p>
          <p>sunshine & brass</p>
          <p>cherry & nickel</p>
          <p>blackout & brass</p>
          <p>graphite & brass</p>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>material +</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <p>All of the bags and accessories are made with love in a small attic studio in Portland, Oregon. I use 100% high-quality Italian leather, strong YKK zippers, and solid brass hardware. If you don’t see the color you want, let me know and I can do a custom order.</p>
          <p>Since leather is a natural resource, not all bags will be identical. Due to normal variances in dye lots and screen resolutions, the color of the product you receive may vary slightly.</p>
          <p>Each brooksong design is handmade and thus unique!</p>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>leathercare +</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          You can easily clean all brooksong designs with mild soap and a damp towel. If your design gets wet, wipe the moisture away immediately and set it aside to air-dry. Avoid sun or heat, as these can cause cracking and accelerate the aging process.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>production time +</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Please allow 3+ weeks for production, as each item is handmade to order.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>free shipping +</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Shipping is FREE and all items are shipped USPS. Once the design is made you will be emailed with tracking. Currently, I'm only shipping within the United States.
          </Typography>
        </AccordionDetails>
      </Accordion>
      </Grid>
    </Grid>
    <h1>10% of profits go to destigmatizing mental illness and the suicide prevention lifeline</h1>
  </Box>

  </div>
);
}

const itemData = [
  {
    img: '/images/Brooksong_Design_Megan_bag_hero.jpg',
  },
  {
    img: '/images/Brooksong_Design_Megan_bag_front.jpg',
  },
  {
    img: '/images/Brooksong_Design_Megan_bag_back.jpg',
  },
  {
    img: '/images/Brooksong_Design_Megan_bag_inner.jpg',
  },
  {
    img: '/images/Brooksong_Design_Megan_bag_props.jpg',
  },
  {
    img: '/images/Brooksong_Design_Megan_bag_swatches.jpg'
  }

];

export default MeganBag;