import React, { useEffect, useState } from 'react'
import { Box, Grid, IconButton, Typography } from '@mui/material';
import {productRoutes} from '../../api/config.js';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

//Imagenes productos
import ImagenTelefono from '../../assets/products/telefono.jpg';
import ImagenCamara from '../../assets/products/camara.jpg';
import ImagenNotebook from '../../assets/products/notebook.jpg';
import ImagenTablet from '../../assets/products/tablet.jpg';
import ImagenConsola from '../../assets/products/consolas.jpg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { ColorModeContext, tokens } from "../../theme.js";
import { useTheme } from '@mui/material/styles';
//Redux state
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from './../../state/slices/cartSlice.js';
const filterProducts = (products) => {
  const uniquesNames = new Set();
  const filteredProducts = [];
  products.forEach((product) => {
    if(!uniquesNames.has(product.nombre)){
      uniquesNames.add(product.nombre);
      filteredProducts.push(product);
    }
  });
  return filteredProducts;
}


const getImageProduct = (name) => {
  if (name === 'telefono'){
    return ImagenTelefono;
  } else if (name === 'camara'){
    return ImagenCamara;
  } else if (name === 'notebook'){
    return ImagenNotebook;
  } else if (name === 'tablet'){
    return ImagenTablet;
  } else if (name === 'consola'){
    return ImagenConsola;
  }
}

function Catalog() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  //Obtener todos los productos desde la base de datos
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(productRoutes.get, {
      method: 'GET',
      headers: {  'Content-Type': 'application/json'},
    }).
    then(response => response.json()).
    then(data => setProducts(filterProducts(data))).
    catch(error => console.log("error", error));
  }, [])

  const setFavourite = (product) =>{
    console.log("product", product)
  }
  const addCart = (product, quantity) => {
    //The goal is change the page with information of the product
    dispatch(addProduct({
      product, 
      quantity
    }))
  }
  //No se deben repetir los productos
  return (
    <Box
      paddingY={2}
      paddingX={1}
      display={'flex'}
      flexDirection={'column'}
    >
      <Box>
        Categories
      </Box>
      <Box>
        <Grid container spacing={2}>
          {products.map((item, index) => (
            <Grid item
              xs = {12}
              md = {4}
              lg = {2}
              xl = {1}
              key={index}
            >
              <Card
                sx = {{
                  maxWidth: 300
                }}
              >
                <CardMedia 
                  component={'img'}
                  height={'200'}
                  image={
                    getImageProduct(item.categoria)
                  }
                  alt='imagenTelefono'
                />
                <CardContent
                  sx = {{
                    paddingBottom: 0
                  }}                
                >
                  <Typography variant={'h3'} component={'div'}>
                    $ {item.precio}
                  </Typography>
                  <Typography variant={'h5'}>
                    {item.nombre} {item.marca} {item.modelo}
                  </Typography>
                  <Rating name="read-only" value={item.calificacion} readOnly />
                </CardContent>
                <CardActions
                  sx = {{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <IconButton
                    onClick={() =>
                      setFavourite(item)
                    }
                  >
                    <FavoriteBorderIcon/>
                  </IconButton>
                  <IconButton
                     color='primary'
                    onClick = {() =>
                      addCart(item, 1)
                    }
                  >
                    <AddShoppingCartIcon/>
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default Catalog