import React, { useState, useRef, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import { useCart } from '../context/CartContext';
import Cart from "./Cart";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControl } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Carousel } from 'react-responsive-carousel';
import AddIcon from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { CustomerAuthContext } from "../context/CustomerAuthProvider";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "../index.css";


function ProductDetail() {
  const [productObj, setProductObj] = useState(null);
  const { id } = useParams()
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [skuObj, setSkuObj] = useState(null);
  const [quantity, setQuantity] = useState(false);

  const { customer }= useContext(CustomerAuthContext)

  const carouselRef = useRef(null);
  const { addToCart } = useCart();

  const handleSkuChange = (e) => {
    setSkuObj(e.target.value)
  }

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  }

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(productObj);
    console.log('Selected Product: selectedProduct');
  
    fetch('/order_items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_id: customer.current_cart.id,
        quantity,
        sku_id: skuObj,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
          return response.json();
      })
      .then((newOrderItem) => {
        console.log('New Order Item:', newOrderItem);
  
        addToCart(newOrderItem); 
      })
      .catch((error) => console.error('Error:', error));
  }

  const customCarouselStyles = {
    position: 'absolute',
    top: '50%',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    color: 'black',
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

  useEffect(() => {
    fetch(`/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProductObj(data)
        setSkuObj(data.skus[0])})
      .catch((error) => console.error("Error fetching productObj:", error));
  }, []);
  if (!productObj) return (<h1>loading</h1>)
  
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={6}>
          <ImageList variant="masonry" cols={2} gap={8}>
    {Array.from({ length: 5 }, (_, i) => (
      <ImageListItem key={`photo-${i + 1}`}>
        <img
          src={`${productObj[`photo${i + 1}`]}?w=500&fit=crop&auto=format`}
          srcSet={`${productObj[`photo${i + 1}`]}?w=500&fit=crop&auto=format&dpr=2 2x`}
          alt={`${i + 1}`}
          onClick={() => openLightbox(i)}
        />
      </ImageListItem>
    ))}
            </ImageList>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ maxWidth: 350, boxShadow: 'none' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <h1>{productObj.name}</h1>
                  <h2>{productObj.price}</h2>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {productObj.description}
                </Typography>
              </CardContent>
              <Box component="form" onSubmit={handleSubmit}>
                <CardActions>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">color</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={productObj.skus[0].id} 
                        name="radio-buttons-group"
                        onChange={handleSkuChange}
                      >
                        {productObj.skus.map((sku) => (
                          <FormControlLabel
                            key={sku.id}
                            value={sku.id}
                            control={<Radio />}
                            label={sku.color}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-label">quantity</InputLabel>
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
                </CardActions>
                      <StyledButton type='submit'>add to cart</StyledButton>
                  </Box>
                <Accordion elevation={0}>
                  <AccordionSummary
                    expandIcon={<AddIcon style={{ color: 'black' }}/>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>material</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                  <Typography  variant="body1">
                    All of the bags and accessories are made with love in a small attic studio in Portland, Oregon. I use 100% high-quality Italian leather, strong YKK zippers, and solid brass hardware. If you don’t see the color you want, let me know and I can do a custom order.
                  </Typography>
                  <Typography variant="body1">
                    Since leather is a natural resource, not all bags will be identical. Due to normal variances in dye lots and screen resolutions, the color of the product you receive may vary slightly.
                  </Typography> 
                  <Typography>
                    Each brooksong design is handmade and thus unique!
                  </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion elevation={0}>
                  <AccordionSummary
                    expandIcon={<AddIcon style={{ color: 'black' }}/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>leathercare</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      You can easily clean all brooksong designs with mild soap and a damp towel. If your design gets wet, wipe the moisture away immediately and set it aside to air-dry. Avoid sun or heat, as these can cause cracking and accelerate the aging process.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion elevation={0}>
                  <AccordionSummary
                    expandIcon={<AddIcon style={{ color: 'black' }}/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>production time</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Please allow 3+ weeks for production, as each item is handmade to order.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion elevation={0}>
                  <AccordionSummary
                    expandIcon={<AddIcon style={{ color: 'black' }}/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>free shipping</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Shipping is FREE and all items are shipped USPS. Once the design is made you will be emailed with tracking. Currently, I'm only shipping within the United States.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Card>
            </Grid>
            </Grid>
            <h1>10% of profits go to destigmatizing mental illness and the suicide prevention lifeline</h1>
          </Box>
          <Dialog open={lightboxOpen} onClose={closeLightbox} maxWidth="lg">
            <DialogContent>
              <Carousel
                selectedItem={selectedImageIndex}
                showArrows={true}
                dynamicHeight={false}
                infiniteLoop={true}
                showThumbs={false}
                style={customCarouselStyles}
                showStatus={false}
                ref={carouselRef}
              >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={productObj.photo1}
                    alt="product"
                    style={{ maxHeight: '80vh', width: 'auto' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={productObj.photo2}
                    alt="product"
                    style={{ maxHeight: '80vh', width: 'auto' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={productObj.photo3}
                    alt="product"
                    style={{ maxHeight: '80vh', width: 'auto' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={productObj.photo4}
                    alt="product"
                    style={{ maxHeight: '80vh', width: 'auto' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={productObj.photo5}
                    alt="product"
                    style={{ maxHeight: '80vh', width: 'auto' }}
                  />
                </div>
              </Carousel>
            </DialogContent>
          </Dialog>
          <Cart addToCart={addToCart} />
        </div>
);
}

export default ProductDetail;