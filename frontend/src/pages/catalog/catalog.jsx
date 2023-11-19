import { useEffect, useState } from 'react'
import { Box, Grid, IconButton, Snackbar, Stack, Typography, Button, CardActionArea } from '@mui/material';
import { productRoutes } from '../../api/config.js';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
//Dialog
import DialogRecommendation from './dialogRecommendation.jsx';
import DialogProduct from './dialogProduct.jsx';
//Tab
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//Select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//Imagenes productos
import ImagenTelefono from '../../assets/products/telefono.jpg';
import ImagenCamara from '../../assets/products/camara.jpg';
import ImagenNotebook from '../../assets/products/notebook.jpg';
import ImagenTablet from '../../assets/products/tablet.jpg';
import ImagenConsola from '../../assets/products/consolas.jpg';
import ImagenCargadores from '../../assets/products/cargadores.webp';
import ImagenBaterias from '../../assets/products/bateriasCelular.jpg';
import ImagenDiscos from '../../assets/products/discosSSD.webp';
//Icons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import UpdateIcon from '@mui/icons-material/Update';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AssistantIcon from '@mui/icons-material/Assistant';
import RecommendIcon from '@mui/icons-material/Recommend';
import AdbIcon from '@mui/icons-material/Adb';
import AodIcon from '@mui/icons-material/Aod';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
//Theme
import { tokens } from "../../theme.js";
import { useTheme } from '@mui/material/styles';
//Redux state
import { useDispatch } from "react-redux";
import { addProduct } from './../../state/slices/cartSlice.js';
import Header from '../../components/Header.jsx';
//Api
import { pythonRoutes } from '../../api/config.js';

const filterProducts = (products) => {
  const uniquesNames = new Set();
  const filteredProducts = [];
  console.log("products", products)
  products.forEach((product) => {
    if (product.estado === 'Disponible') {
      if (!uniquesNames.has(product.nombre)) {
        uniquesNames.add(product.nombre);
        product.stock = 1;
        filteredProducts.push(product);
      } else {
        const index = filteredProducts.findIndex((item) => item.nombre === product.nombre);
        filteredProducts[index].stock++;
      }
    }
  });
  console.log("filteredProducts", filteredProducts)
  return filteredProducts;
}

// const getImageProduct = (name) => {
//   if (name === 'telefono') {
//     return ImagenTelefono;
//   } else if (name === 'camara') {
//     return ImagenCamara;
//   } else if (name === 'notebook') {
//     return ImagenNotebook;
//   } else if (name === 'tablet') {
//     return ImagenTablet;
//   } else if (name === 'consola') {
//     return ImagenConsola;
//   }
// }

// const handleImageCategory = (category) => {
//   if (category === 'MLC9240') {
//     return ImagenCargadores;
//   } else if (category === 'MLC5068') {
//     return ImagenBaterias;
//   } else if (category === 'MLC1672') {
//     return ImagenDiscos;
//   } else {
//     return ImagenTelefono;
//   }
// }

const handleStock = (stock) => {
  if (stock == 1) {
    return 'Entre 1 y 50'
  } else if (stock == 50) {
    return 'Entre 50 y 100'
  } else if (stock == 100) {
    return 'Entre 100 y 150'
  } else if (stock == 150) {
    return 'Entre 150 y 200'
  } else if (stock == 200) {
    return 'Entre 200 y 250'
  } else if (stock == 250) {
    return 'Entre 250 y 300'
  } else if (stock == 500) {
    return 'Entre 500 y 1000'
  } else if (stock == 5000) {
    return 'Entre 5000 y 10000'
  } else if (stock == 50000) {
    return 'Entre 50000 y 100000'
  } else {
    return '1'
  }
}
const haveInfo = (item) => {
  console.log("item info", item)
  if (item.product.info) {
      return item.product.info
  } else {
      return item.product
  }
}

const categorias = [{
  id: 'MLC9240',
  name: 'Cargadores y Fuentes',
  icon: AdbIcon
}, {
  id: 'MLC5068',
  name: 'Baterias',
  icon: BatteryChargingFullIcon
}, {
  id: 'MLC1672',
  name: 'Discos duros',
  icon: ScreenSearchDesktopIcon
}, {
  id: 'MLC48906',
  name: 'Pantallas lcd',
  icon: AodIcon
}]

const transformPorcentaje = (value) => {
  return value * 100;
}

function Catalog() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  //Obtener todos los productos desde la base de datos
  const [products, setProducts] = useState([]);
  const [productsAux, setProductsAux] = useState([]);
  //Filtrar productos
  const [selected, setSelected] = useState('');
  //Snack bar state
  const [open, setOpen] = useState(false);
  const setFavourite = (product) => {
    console.log("product", product)
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }
  const addCart = (product, quantity) => {
    //The goal is change the page with information of the product
    dispatch(addProduct({
      product,
      quantity
    }))
    setOpen(true)
  }
  //Obtener recomendacion
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendationList, setRecommendationList] = useState([{}]);
  console.log("recommendationList", recommendationList)
  //Dialog functions
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  //Dialog product
  const [showProduct, setShowProduct] = useState({});
  const [openDialogProduct, setOpenDialogProduct] = useState(false);
  const handleOpenDialogProduct = () => {
    console.log("product", showProduct)
    setOpenDialogProduct(true);
  }
  const handleCloseDialogProduct = () => setOpenDialogProduct(false);
  
  //Tab definitions
  const [visibleProducts, setVisibleProducts] = useState(20)
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    console.log("newValue", newValue)
    setValue(newValue);
  }
  useEffect(() => {
    const url = pythonRoutes.getProductsCategories + '/' + categorias[value].id;
    console.log(url)
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log("response", response)
      return response.json();
    }).then((data) => {
      console.log("data", data)
      setProducts(data);
      setProductsAux([].concat(data));
      setShowRecommendation(false);
    }).catch((error) => {
      console.log("error", error)
    })
  }, [value])
  console.log(products[0])
  return (
    <Box
      paddingY={2}
      paddingX={3}
      display={'flex'}
      flexDirection={'column'}
      gap={2}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
      >
        <Header title='Catalogo' subTitle={'De Productos'} />
        {/* Seccion para categorias de catalogo */}
        <Box>
          <Tabs value={value} onChange={handleChange} textColor={'primary'} indicatorColor={'primary'}>
            {categorias.map((item, index) => (
              <Tab key={index} icon={<item.icon />} label={item.name} />
            ))}
          </Tabs>
        </Box>
        <Stack direction={'row'} spacing={2}>
          {/* Filtros */}
          <FilterSmall selected={selected} setSelected={setSelected} products={products} productsAux={productsAux} setProducts={setProducts} showRecommendation={showRecommendation} recommendationList={recommendationList} setRecommendationList={setRecommendationList}/>
          <Button
            variant="contained"
            startIcon={<RecommendIcon />}
            sx={{
              backgroundColor: theme.palette.button.main,
              height: '50%',
            }}
            onClick={handleOpenDialog}
          >
            Obtener recomendación
          </Button>
          <Button
            variant="contained"
            startIcon={<UpdateIcon />}
            sx={{
              backgroundColor: theme.palette.button.main,
              height: '50%',
            }}
          >
            Actualizar Catalogo
          </Button>
        </Stack>
        <DialogRecommendation open={openDialog} onClose={handleCloseDialog} addCart={addCart} setShowRecommendation={setShowRecommendation} setRecommendationList={setRecommendationList} />
        <DialogProduct open={openDialogProduct} handleClose={handleCloseDialogProduct} addCart={addCart} product={showProduct} />
      </Box>
      <Box>
        {showRecommendation &&
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 2,
            }}
          >
            <Typography variant={'h3'} sx={{ color: colors.primary.main }} fontWeight={'bold'} >
              Recomendaciones
            </Typography>
          </Box>
        }
        <Grid container spacing={2}>
          {showRecommendation ?
            recommendationList.map((item, index) => (
              <Grid item
                xs={12}
                md={4}
                lg={2}
                xl={1}
                key={index}
              >
                <Card
                  sx={{
                    maxWidth: 400,
                    width: '100%'
                  }}
                >
                  <CardActionArea onClick={() => {
                    setShowProduct(item);
                    handleOpenDialogProduct();
                  }}   >
                    <CardMedia
                      component={'img'}
                      height={'200'}
                      image={
                        item.info.imagen
                      }
                      alt='imagenTelefono'
                    />
                    <CardContent
                      sx={{
                        paddingBottom: 0
                      }}
                    >
                      <Typography variant={'h3'} component={'div'}>
                        $ {item.info.precio}
                      </Typography>
                      <Typography variant={'h5'}>
                        {item.info.titulo} {item.info.BRAND} {item.info.MODEL}
                      </Typography>
                      <Typography variant={'h5'} >
                        Disponibles: {handleStock(item.info.stock)}
                      </Typography>
                      <Typography variant={'h5'} fontWeight={'bold'} >
                        {/* Mostrar solo dos decimales */}
                        Similitud con usuario: {transformPorcentaje(item.similitud.toFixed(2))} %
                      </Typography>
                      {/* <Rating name="read-only" value={item.calificacion} readOnly /> */}
                    </CardContent>
                  </CardActionArea>
                  <CardActions
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <IconButton
                      onClick={() =>
                        setFavourite(item)
                      }
                    >
                      <FavoriteBorderIcon />
                    </IconButton>
                    <IconButton
                      color='primary'
                      onClick={() =>
                        addCart(item, 1)
                      }
                    >
                      <AddShoppingCartIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            )) : products.slice(0, visibleProducts).map((item, index) => (
              <Grid item
                xs={12}
                md={4}
                lg={2}
                xl={1}
                key={index}
              >
                <Card
                  sx={{
                    maxWidth: 300
                  }}
                >
                  <CardActionArea onClick={() => {
                    setShowProduct(item);
                    handleOpenDialogProduct();
                  }}   >
                    <CardMedia
                      component={'img'}
                      height={'200'}
                      image={
                        item.imagen
                      }
                      alt='imagenTelefono'
                    />
                    <CardContent
                      sx={{
                        paddingBottom: 0
                      }}
                    >
                      <Typography variant={'h3'} component={'div'}>
                        $ {item.precio}
                      </Typography>
                      <Typography variant={'h5'}>
                        {item.titulo} {item.BRAND} {item.LINE}
                      </Typography>
                      <Typography variant={'h5'}>
                        Disponibles: {handleStock(item.stock)}
                      </Typography>
                      {/* <Rating name="read-only" value={item.calificacion} readOnly /> */}
                    </CardContent>
                  </CardActionArea>
                  <CardActions
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <IconButton
                      onClick={() =>
                        setFavourite(item)
                      }
                    >
                      <FavoriteBorderIcon />
                    </IconButton>
                    <IconButton
                      color='primary'
                      onClick={() =>
                        addCart(item, 1)
                      }
                    >
                      <AddShoppingCartIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))
          }
          {visibleProducts < products.length && !showRecommendation && (
            <Grid item xs={12} container justifyContent={'center'}>
              <Button
                variant="contained"
                startIcon={<KeyboardDoubleArrowDownIcon />}
                sx={{
                  backgroundColor: theme.palette.button.main,
                  height: '100%',
                }}
                onClick={() => setVisibleProducts(visibleProducts + 20)}
              >
                Ver mas productos
              </Button>
            </Grid>
          )}
        </Grid>

      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Producto agregado al carrito" />
    </Box>
  )
}

const FilterSmall = ({selected, setSelected, products,productsAux, setProducts, showRecommendation, recommendationList, setRecommendationList}) => {
  const optionsSor = ['Precio de menor a mayor', 'Precio de mayor a menor', 'Stock de menor a mayor', 'Stock de mayor a menor', 'ascCalificacion', 'descCalificacion']
  console.log("filterSmall", products)
  console.log(productsAux)
  console.log(products)
  const handleChange =(event) => {
    setSelected(event.target.value);
    console.log(event.target.value)
    if (event.target.value === 'Sin Filtro') {
      if (showRecommendation) {
        setRecommendationList(recommendationList);
      }
      setProducts(productsAux);
    }
    if (event.target.value === 'Precio de menor a mayor') {
      if (showRecommendation) {
        const productsSorted = recommendationList.sort((a, b) => a.info.precio - b.info.precio);
        setRecommendationList(productsSorted);
      } else{
        const productsSorted = products.sort((a, b) => a.precio - b.precio);
        setProducts(productsSorted);
      }
    } else if (event.target.value === 'Precio de mayor a menor') {
      if (showRecommendation) {
        const productsSorted = recommendationList.sort((a, b) => b.info.precio - a.info.precio);
        setRecommendationList(productsSorted);
      } else{
        const productsSorted = products.sort((a, b) => b.precio - a.precio);
        setProducts(productsSorted);
      }
    } else if (event.target.value === 'Stock de menor a mayor') {
      if (showRecommendation) {
        const productsSorted = recommendationList.sort((a, b) => a.info.stock - b.info.stock);
        setRecommendationList(productsSorted);
      } else{
        const productsSorted = products.sort((a, b) => a.stock - b.stock);
        setProducts(productsSorted);
      }
    } else if (event.target.value === 'Stock de mayor a menor') {
      if (showRecommendation) {
        const productsSorted = recommendationList.sort((a, b) => b.info.stock - a.info.stock);
        setRecommendationList(productsSorted);
      } else{
        const productsSorted = products.sort((a, b) => b.stock - a.stock);
        setProducts(productsSorted);
      }
    } else if (event.target.value === 'ascCalificacion') {
      const productsSorted = products.sort((a, b) => a.calificacion - b.calificacion);
      setProducts(productsSorted);
    } else if (event.target.value === 'descCalificacion') {
      const productsSorted = products.sort((a, b) => b.calificacion - a.calificacion);
      setProducts(productsSorted);
    }
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">Ordenar</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={selected}
        label="Ordenar"
        onChange={handleChange}
      >
        <MenuItem value="Sin Filtro">
          <em>Sin Filtro</em>
        </MenuItem>
        {optionsSor.map((item, index) => (
          <MenuItem key={index} value={item}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default Catalog