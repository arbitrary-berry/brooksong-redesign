import React, { useState, useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useCart } from '../context/CartContext';
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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "../index.css";

function ProductDetail() {
  const [products, setProducts] = useState([]);
  const { id } = useParams()
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [color, setColor] = useState(true);
  const [quantity, setQuantity] = useState(false);
  const carouselRef = useRef(null);
  const { addToCart} = useCart();

  const handleColorChange = (e) => {
    setColor(e.target.checked)
  }

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  }

  const handleCarouselPrev = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };
  
  const handleCarouselNext = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  function handleSubmit(e){
    e.preventDefault()

    const selectedProduct = products.find((product) => product.id === id);

    fetch('http://localhost:3000/order_items', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({
        name: selectedProduct.name,
        price: selectedProduct.price,
        color, 
        quantity,
    })
    })
    .then(response => response.json())
    .then(newOrderItem => { 
      addToCart({    
        name: selectedProduct.name,
        price: selectedProduct.price,
        color, 
        quantity,
    });
    })
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
  }));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handleCarouselPrev();
      } else if (e.key === 'ArrowRight') {
        handleCarouselNext();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    fetch("/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={6}>
          <ImageList variant="masonry" cols={2} gap={8}>
              {products.map((product, index) => (       
                <ImageListItem key={product.name}>
                  {Array.from({ length:5}, (_, i) =>
                  <img
                    key={`photo-${i}`}
                    src={`${product[`photo${i + 1}`]}?w=248&fit=crop&auto=format`}
                    srcSet={`${product[`photo${i + 1}`]}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={`${i + 1}`}
                    onClick={() => openLightbox(index)}
                  />
                  )}
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
          <Grid item xs={12} md={6}>
            {products.map((product, index) =>
            <Card sx={{ maxWidth: 350, boxShadow: 'none' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <h1>{product.name}</h1>
                  <p><h2>{product.price}</h2></p>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <p>{product.description}</p>
                </Typography>
              </CardContent>
              <CardActions>
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
                      <StyledButton onClick={handleSubmit}>add to cart</StyledButton>
                <Accordion elevation={0}>
                  <AccordionSummary
                    expandIcon={<AddIcon style={{ color: 'black' }}/>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>material</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <p>All of the bags and accessories are made with love in a small attic studio in Portland, Oregon. I use 100% high-quality Italian leather, strong YKK zippers, and solid brass hardware. If you don’t see the color you want, let me know and I can do a custom order.</p>
                      <p>Since leather is a natural resource, not all bags will be identical. Due to normal variances in dye lots and screen resolutions, the color of the product you receive may vary slightly.</p>
                      <p>Each brooksong design is handmade and thus unique!</p>
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
            )}
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
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                  hasPrev && (
                    <button
                      type="button"
                      onClick={() => {
                        handleCarouselPrev();
                        onClickHandler();
                      }}
                      title={label}
                      style={{ ...customCarouselStyles, left: '0' }}
                    >
                      <ArrowBackIcon />
                    </button>
                  )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                  hasNext && (
                    <button
                      type="button"
                      onClick={() => {
                        handleCarouselNext();
                        onClickHandler();
                      }}
                      title={label}
                      style={{ ...customCarouselStyles, right: '0' }}
                    >
                      <ArrowForwardIcon />
                    </button>
                  )
                }
                showStatus={false}
                ref={carouselRef}
              >
                {products.map((product) => (
                  <div key={product.img} style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      src={product.img}
                      alt="Enlarged"
                      style={{ maxHeight: '80vh', width: 'auto' }}
                    />
                  </div>
                ))}
              </Carousel>
            </DialogContent>
          </Dialog>
        </div>
);
}

export default ProductDetail;