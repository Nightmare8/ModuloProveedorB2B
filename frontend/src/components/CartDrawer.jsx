import React from 'react'
import { Drawer, Box, Button, Typography, useTheme, Stack, Card, CardMedia, CardContent } from '@mui/material'
import { grey } from "@mui/material/colors";
import { tokens, ColorModeContext } from '../theme';
import { clearCart } from '../state/authSlice';
import { useDispatch, useSelector } from 'react-redux';
//Images
import ImagenTelefono from '../assets/products/telefono.jpg';

function CartDrawer({ stateOpen, toogleDrawer }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    console.log("cart", cart)
    const clear = () => {
        dispatch(clearCart());
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
                            spacing={2}
                            
                        >
                            {/* La idea es dejar aqui los productos y el total */}
                            {cart.map((item, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                    }}
                                >
                                    <CardMedia
                                        component={'img'}
                                        sx={{
                                            width: '100%',
                                            maxWidth: 100,
                                        }}
                                        alt='Product'
                                        image={ImagenTelefono}
                                    />
                                    <Box
                                        width={'100%'}
                                    >
                                        <CardContent
                                            sx = {{
                                                flex: '1 0 auto'
                                            }}
                                        >
                                            <Typography component={'div'} variant='h4' fontWeight={'bold'}>
                                                {item.product.nombre}
                                            </Typography>
                                            <Typography variant='h5'>
                                                {item.product.detalle}
                                            </Typography>
                                            <Stack 
                                                direction={'row'}
                                                justifyContent={'space-between'}
                                            >
                                                <Typography variant='h4'>
                                                    Precio normal
                                                </Typography>
                                                <Typography variant='h4' fontWeight={'bold'}>
                                                    $ {item.product.precio}
                                                </Typography>
                                            </Stack>
                                            <Stack
                                                direction={'row'}
                                                justifyContent={'space-between'}
                                            >
                                                
                                                <Button>
                                                    Eliminar
                                                </Button>
                                                {/* Stack para botones de accion */}
                                            </Stack>
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