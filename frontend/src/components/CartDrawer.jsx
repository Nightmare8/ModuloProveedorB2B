import React from 'react'
import { Drawer, Box, Button, Typography, useTheme, Stack, Card, CardMedia, CardContent, CardHeader, IconButton, TextField } from '@mui/material'
import { grey } from "@mui/material/colors";
import { tokens, ColorModeContext } from '../theme';
//Redux
import { removeProduct, sumProduct, restProduct, clearCart } from '../state/slices/cartSlice.js';
import { useDispatch, useSelector } from 'react-redux';
//Icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
//Imagenes productos
import ImagenTelefono from '../assets/products/telefono.jpg';
import ImagenCamara from '../assets/products/camara.jpg';
import ImagenNotebook from '../assets/products/notebook.jpg';
import ImagenTablet from '../assets/products/tablet.jpg';
import ImagenConsola from '../assets/products/consolas.jpg';


const getRightImage = (name) => {
    if (name === 'telefono') {
        return ImagenTelefono;
    } else if (name === 'camara') {
        return ImagenCamara;
    } else if (name === 'notebook') {
        return ImagenNotebook;
    } else if (name === 'tablet') {
        return ImagenTablet;
    } else if (name === 'consola') {
        return ImagenConsola;
    }
}

function CartDrawer({ stateOpen, toogleDrawer }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const clear = () => {
        dispatch(clearCart());
    }

    const removeItem = (item) => {
        dispatch(removeProduct(item));
    }
    const restItem = (item, quantity) => {
        if (quantity > 1) {
            dispatch(restProduct(item));
        } else{
            dispatch(removeProduct(item));
        }
    }
    const sumItem = (item) => {
        dispatch(sumProduct(item));
    }
    return (
        <Box>
            <Drawer
                anchor="right"
                open={stateOpen}
                onClose={toogleDrawer(false)}
            >
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'space-between'}
                    sx={{
                        width: 'min(100%, 500px)',
                        height: '100%',
                    }}
                    padding={2}
                >
                    <Stack
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'flex-start'}
                        spacing={1}
                        sx={{
                            backgroundColor: grey,
                        }}
                    >
                        <Typography variant="h4" fontWeight={'bold'} color={colors.blueAccent[200]}>
                            Resumen
                        </Typography>
                        <Stack
                            direction={'column'}
                            spacing={1}
                        >
                            {/* La idea es dejar aqui los productos y el total */}
                            {cart.map((item, index) => (
                                <Card
                                    key={index}
                                    sx = {{
                                        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                                    }}
                                >
                                    <CardHeader
                                        title={item.product.nombre}
                                        subheader={item.product.detalle}
                                    />
                                    <Box
                                        sx = {{
                                            display: 'flex',
                                            flexDirection: 'row',
                                        }}
                                    > 
                                        <Stack
                                            direction={'column'}
                                            alignContent={'center'}
                                        >
                                            <CardMedia
                                                component={'img'}
                                                sx={{
                                                    width: '100%',
                                                    maxWidth: 100,
                                                    borderRadius: 1,
                                                }}
                                                alt='Product'
                                                image={getRightImage(item.product.categoria)}
                                            />
                                            <Button
                                                sx = {{
                                                    color: theme.palette.button.main,
                                                }}
                                                onClick={
                                                    () => removeItem(item)
                                                }
                                            >
                                                Eliminar
                                            </Button>
                                        </Stack>
                                        <CardContent
                                            sx={{
                                                flex: '1 0 auto'
                                            }}
                                        >
                                            <Stack
                                                direction={'row'}
                                                justifyContent={'space-between'}
                                            >
                                                <Typography variant='h4'>
                                                    Precio normal
                                                </Typography>
                                                <Typography variant='h5' fontWeight={'bold'} color={theme.palette.button.main}>
                                                    $ {item.product.precio}
                                                </Typography>
                                            </Stack>
                                            <Box
                                                sx = {{
                                                    paddingTop: 1,
                                                }}
                                            >
                                                <IconButton
                                                    onClick={() => restItem(item, item.quantity)}
                                                >
                                                    <RemoveIcon />
                                                </IconButton>
                                                <TextField
                                                    label="Cantidad"
                                                    variant='outlined'
                                                    value={item.quantity}
                                                    type='number'
                                                    sx={{
                                                        width: 100,
                                                        textAlign: 'center',
                                                    }}
                                                    size='small'
                                                />
                                                <IconButton
                                                    onClick={() => sumItem(item)}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>

                                        </CardContent>

                                    </Box>
                                    
                                </Card>
                            ))}
                        </Stack>
                    </Stack>
                    <Stack
                        direction={'row'}
                        justifyContent={'space-around'}
                        alignItems={'center'}
                        spacing={2}
                    >
                        <Button variant="contained"
                            sx={{
                                backgroundColor: theme.palette.button.main,
                                height: '50%',
                                padding: '20px 50px',
                                fontSize: '1rem',
                            }}
                            onClick={clear}
                        >
                            Limpiar Carro
                        </Button>
                        <Button variant="contained"
                            sx={{
                                backgroundColor: theme.palette.button.main,
                                height: '50%',
                                padding: '20px 50px',
                                fontSize: '1rem',
                            }}
                        >
                            Iniciar Pago
                        </Button>
                    </Stack>
                </Box>
            </Drawer>
        </Box>
    )
}

export default CartDrawer