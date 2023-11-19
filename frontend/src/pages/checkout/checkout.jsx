import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { grey } from "@mui/material/colors";
import * as yup from "yup";
import { tokens } from "../../theme.js";
import { useTheme } from '@mui/material/styles';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Navigate } from 'react-router-dom';
//Esta pagina sera para el check out de los productos
import { Box, Stepper, Step, StepLabel, Stack, Typography, Button, Divider } from '@mui/material';
import { Card, CardHeader, CardContent, CardMedia, IconButton, TextField } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { removeProduct, sumProduct, restProduct, clearCart } from '../../state/slices/cartSlice.js';
import { useNavigate } from "react-router-dom";
//Api
import { companyRoutes, purchaseRoutes } from '../../api/config.js';
//Icon
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const haveInfo = (item) => {
    //Verify if item.product have the info of the product
    return item.product?.info ? item.product.info : item.product;
}

const handleStock = (stock) => {
    if (stock == 1) {
        return 50
    } else if (stock == 50) {
        return 100
    } else if (stock == 100) {
        return 150
    } else if (stock == 150) {
        return 200
    } else if (stock == 200) {
        return 250
    } else if (stock == 250) {
        return 300
    } else if (stock == 500) {
        return 5000
    } else if (stock == 5000) {
        return 50000
    } else if (stock == 50000) {
        return 99999
    } else {
        return 1
    }
}

const calculateTotal = (cart) => {
    let total = 0;
    cart.forEach(item => {
        total += haveInfo(item).precio * item.quantity;
    });
    return total;
}
const totalProducto = (item) => {
    return haveInfo(item).precio * item.quantity;
}


const steps = [
    'Tus datos',
    'Forma de entrega',
    'Medio de pago',
    'Confirmacion',
];

const initialValues = {
    idProducto: 0,
    titulo: '',
    precio: 0,
    cantidad: 0,
    tags: '',
    imagen: '',
    link: '',
    region: '',
    ciudad: '',
    cantidadReviews: 0,
    unaEstrella: 0,
    dosEstrellas: 0,
    tresEstrellas: 0,
    cuatroEstrellas: 0,
    cincoEstrellas: 0,
    reviewPromedio: 0,
    opiniones: '',
    likes: 0,
    dislikes: 0,
    metodoPago: '',
    estadoPago: 'Pagado',
    estadoEnvio: 'Enviado',
    costoEnvio: 0,
    dirEnvio: '',
    otrosDetalles: '',
    fechaOrden: new Date(),
    fechaEntrega: new Date(),
    companyBuyer: '',
    idVendedor: 0,
    nombre: '',
    tagsVendedor: '',
    email: '',
    telefono: '',
    regionVendedor: '',
    ciudadVendedor: '',
    reputacion: 0,
    reputacionEstrellas: 0,
    completadas: 0,
    canceladas: 0,
    total: 0,
    ratingPositivo: 0,
    ratingNegativo: 0,
    ratingNeutral: 0,
    ventas: 0,
    reclamos: 0,
    entregasRetrasadas: 0,
    cancelaciones: 0,
    atributos: [], //nombre, valor
}

const validationSchema = yup.object().shape({
    // cantidad: yup.number()
    //     .required('Este campo es requerido')
    //     .positive('Debe ser un numero positivo')
    //     .integer('Debe ser un numero entero'),
    metodoPago: yup.string(),
    // costoEnvio: yup.number()
    //     .required('Este campo es requerido')
    //     .positive('Debe ser un numero positivo')
    //     .integer('Debe ser un numero entero'),
    // dirEnvio: yup.string()
    //     .required('Este campo es requerido'),
    otrosDetalles: yup.string(),
});

function Checkout() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const removeItem = (item) => {
        dispatch(removeProduct(item));
    }
    const restItem = (item, quantity) => {
        if (quantity > 1) {
            dispatch(restProduct(item));
        } else {
            dispatch(removeProduct(item));
        }
    }
    const sumItem = (item) => {
        console.log("item", item)
        const stock = handleStock(haveInfo(item).stock);
        console.log("stock", stock)
        if (stock > item.quantity) {
            dispatch(sumProduct(item));
            
        } else {
            alert("No hay mas stock de este producto");
        }
    }
    //user
    const cart = useSelector(state => state.cart.cart);
    console.log("cart", cart)
    const user = useSelector((state) => state.auth.user);
    console.log("user", user)
    const [companyDats, setCompanyDats] = useState({})
    console.log("companyDats", companyDats)
    useEffect(() => {
        const url = companyRoutes.getCompany;
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rut: user.company })
        }).
            then(response => response.json()).
            then(data => {
                setCompanyDats(data);
            }).
            catch(error => console.log(error));
    }, [])
    const [activeStep, setActiveStep] = useState(0);
    const beforeStep = () => {
        setActiveStep(activeStep - 1);
    }
    const nextStep = () => {
        setActiveStep(activeStep + 1);
    }
    const dispatch = useDispatch();
    const buyItem = async (values, item) => {
        console.log("values", values)
        console.log("item", item)
        const url = purchaseRoutes.buyProduct;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })
        const data = await response.json();
        console.log("data", data)
        if (data.status === 'success') {
            dispatch(removeProduct(item));
            alert("Compra realizada con exito")
            navigate('/catalog')
        } else {
            alert("No se pudo realizar la compra")
        }
    }
    //Hay que preguntar por cantidad, metodoPago, costoEnvio, dirEnvio, otrosDetalles
    //El rut de la compañia compradora se obtiene de la sesion
    const handleFormSubmit = (values, onSubmitProps) => {
        console.log(values);
        console.log("entro a la llamada")
        cart.forEach(item => {
            console.log("item", item)
            values = {
                idProducto: haveInfo(item).idProducto,
                titulo: haveInfo(item).titulo,
                precio: haveInfo(item).precio,
                cantidad: item.quantity,
                categoria: haveInfo(item).categoria,
                tags: haveInfo(item).tags,
                imagen: haveInfo(item).imagen,
                link: haveInfo(item).link,
                region: haveInfo(item).region,
                ciudad: haveInfo(item).ciudad,
                cantidadReviews: haveInfo(item).cantidadReviews,
                unaEstrella: haveInfo(item).unaEstrella,
                dosEstrellas: haveInfo(item).dosEstrellas,
                tresEstrellas: haveInfo(item).tresEstrellas,
                cuatroEstrellas: haveInfo(item).cuatroEstrellas,
                cincoEstrellas: haveInfo(item).cincoEstrellas,
                reviewPromedio: haveInfo(item).reviewPromedio,
                opiniones: haveInfo(item).opiniones,
                likes: haveInfo(item).likes,
                dislikes: haveInfo(item).dislikes,
                metodoPago: 'Boleta',
                estadoPago: 'Pagado',
                estadoEnvio: 'Enviado',
                costoEnvio: 0,
                dirEnvio: 'Constitucion 284',
                otrosDetalles: '',
                fechaOrden: new Date(),
                fechaEntrega: new Date(),
                companyBuyer: user.company,
                idVendedor: haveInfo(item).idVendedor,
                nombre: haveInfo(item).nombre,
                tagsVendedor: haveInfo(item).tagsVendedor,
                email: user.email,
                regionVendedor: haveInfo(item).regionVendedor,
                ciudadVendedor: haveInfo(item).ciudadVendedor,
                reputacion: haveInfo(item).reputacion,
                reputacionEstrellas: haveInfo(item).reputacionEstrellas,
                completadas: haveInfo(item).completadas,
                canceladas: haveInfo(item).canceladas,
                total: haveInfo(item).total,
                ratingPositivo: haveInfo(item).ratingPositivo,
                ratingNegativo: haveInfo(item).ratingNegativo,
                ratingNeutral: haveInfo(item).ratingNeutral,
                ventas: haveInfo(item).ventas,
                reclamos: haveInfo(item).reclamos,
                entregasRetrasadas: haveInfo(item).entregasRetrasadas,
                cancelaciones: haveInfo(item).cancelaciones,
            }
            //Debo encontrar los atributos, estos son totalmente mayusculas
            //Debo recorerr todas las llaves del json y solamente identificar los atributos
            //Estos atributos deben ser agregados a un array
            //Este array debe ser agregado a values.atributos
            values.atributos = []
            for (const key in haveInfo(item.product)) {
                if (key === key.toUpperCase()) {
                    console.log("key", key)
                    values.atributos.push({ nombre: key, valor: item.product[key] })
                }
            }
            console.log(values)
            buyItem(values, item).then(() => {
                console.log("se agrego el producto")
            }).catch((error) => {
                console.log(error)
            })
        })
    }
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
                sx={{
                    width: '100%',
                }}
            >
                <CheckOutStep activeStep={activeStep} beforeStep={beforeStep} nextStep={nextStep} />
            </Box>
            <Box>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                >
                    {({
                        handleFormSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        errors,
                        setFieldValue,
                    }) => (
                        <Form>
                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                                gap={2}
                            >
                                <Box
                                    display={'flex'}
                                    flexDirection={'row'}
                                    gap={2}
                                >
                                    {activeStep === 0 && (
                                        <Box
                                            flexGrow={2}
                                            display={'flex'}
                                            flexDirection={'column'}
                                            gap={2}
                                        >
                                            <Box>
                                                <Typography variant="h3" fontWeight={'bold'} color={colors.blueAccent[200]}>
                                                    Tus datos
                                                </Typography>
                                                <Typography variant="h4" fontWeight={'bold'} color={colors.blueAccent[100]}>
                                                    Datos para envio de notificaciones de la compra
                                                </Typography>
                                            </Box>
                                            <Box
                                                display={'flex'}
                                                flexDirection={'column'}
                                                gap={1}
                                            >
                                                <Typography variant="h3" fontWeight={'bold'} color={colors.blueAccent[200]}>
                                                    Empresa
                                                </Typography>
                                                <Typography variant="h4" fontWeight={'bold'} color={colors.blueAccent[100]}>
                                                    {companyDats.nombre}
                                                </Typography>
                                                <Divider />
                                                <Typography variant="h4" fontWeight={'bold'} color={colors.blueAccent[100]}>
                                                    Usuario Encargado
                                                </Typography>
                                                <Typography variant="h4" fontWeight={'bold'} color={colors.blueAccent[100]}>
                                                    {user.name}
                                                </Typography>
                                                <Divider />
                                                <Typography variant="h4" fontWeight={'bold'} color={colors.blueAccent[100]}>
                                                    Email a notificar
                                                </Typography>
                                                <Typography variant="h4" fontWeight={'bold'} color={colors.blueAccent[100]}>
                                                    {user.email}
                                                </Typography>
                                            </Box>
                                            {/* Boton para continuar */}
                                            <Box
                                                display={'flex'}
                                                flexDirection={'row'}
                                                justifyContent={'center'}
                                                alignContent={'center'}

                                            >
                                                <Button variant="contained"
                                                    sx={{
                                                        backgroundColor: theme.palette.button.main,
                                                        height: '100%',
                                                        width: '20%',
                                                        fontSize: '1rem',
                                                    }}
                                                    size='small'
                                                    onClick={nextStep}
                                                >
                                                    Continuar
                                                </Button>
                                            </Box>
                                        </Box>
                                    )}
                                    {activeStep === 1 && (
                                        <Box
                                            flexGrow={2}
                                            display={'flex'}
                                            flexDirection={'column'}
                                            gap={2}
                                        >
                                            <Box
                                                display={'flex'}
                                                flexDirection={'column'}
                                                gap={1}
                                            >
                                                <Typography variant="h3" fontWeight={'bold'} color={colors.blueAccent[200]}>
                                                    Forma de Entrega
                                                </Typography>
                                                <Typography variant="h4" fontWeight={'bold'} color={colors.blueAccent[100]}>
                                                    Elige una opción:
                                                </Typography>
                                                {/* Botones para seleccionar la forma de entrega */}
                                                <Box
                                                    display={'flex'}
                                                    flexDirection={'row'}
                                                    justifyContent={'flex-start'}
                                                    alignContent={'center'}
                                                    gap={1}
                                                >
                                                    <Button variant="contained"
                                                        sx={{
                                                            backgroundColor: theme.palette.button.main,
                                                            height: '100%',
                                                            fontSize: '1rem',
                                                        }}
                                                        size='small'
                                                    >
                                                        Retiro en tienda
                                                    </Button>
                                                    <Button variant="contained"
                                                        sx={{
                                                            backgroundColor: theme.palette.button.main,
                                                            height: '100%',
                                                            fontSize: '1rem',
                                                        }}
                                                        size='small'
                                                    >
                                                        Envio a domicilio
                                                    </Button>
                                                </Box>
                                            </Box>
                                            <Box
                                                display={'flex'}
                                                flexDirection={'row'}
                                                justifyContent={'space-between'}
                                                alignContent={'center'}
                                                sx={{
                                                    width: '50%'
                                                }}
                                            >
                                                <Button
                                                    sx={{
                                                        color: theme.palette.button.main,
                                                    }}
                                                    size='small'
                                                    onClick={beforeStep}
                                                    startIcon={<ArrowBackIcon />}
                                                >
                                                    Volver
                                                </Button>
                                                <Button variant="contained"
                                                    sx={{
                                                        backgroundColor: theme.palette.button.main,
                                                        height: '100%',
                                                        width: '20%',
                                                        fontSize: '1rem',
                                                    }}
                                                    size='small'
                                                    onClick={nextStep}
                                                >
                                                    Continuar
                                                </Button>
                                            </Box>
                                        </Box>
                                    )}
                                    {activeStep === 2 && (
                                        <Box
                                            flexGrow={2}
                                            display={'flex'}
                                            flexDirection={'column'}
                                            gap={2}
                                        >
                                            <Box
                                                display={'flex'}
                                                flexDirection={'column'}
                                                gap={1}
                                            >
                                                <Typography variant="h3" fontWeight={'bold'} color={colors.blueAccent[200]}>
                                                    Metodo de pago
                                                </Typography>
                                                <Typography variant="h4" fontWeight={'bold'} color={colors.blueAccent[100]}>
                                                    Elige una opción:
                                                </Typography>
                                                {/* Botones para seleccionar la forma de entrega */}
                                                <Box
                                                    display={'flex'}
                                                    flexDirection={'row'}
                                                    justifyContent={'flex-start'}
                                                    alignContent={'center'}
                                                    gap={1}
                                                >
                                                    <Button variant="contained"
                                                        sx={{
                                                            backgroundColor: theme.palette.button.main,
                                                            height: '100%',
                                                            fontSize: '1rem',
                                                        }}
                                                        size='small'
                                                    >
                                                        Boleta
                                                    </Button>
                                                    <Button variant="contained"
                                                        sx={{
                                                            backgroundColor: theme.palette.button.main,
                                                            height: '100%',
                                                            fontSize: '1rem',
                                                        }}
                                                        size='small'
                                                    >
                                                        Factura
                                                    </Button>
                                                </Box>
                                            </Box>
                                            <Box
                                                display={'flex'}
                                                flexDirection={'row'}
                                                justifyContent={'space-between'}
                                                alignContent={'center'}
                                                sx={{
                                                    width: '50%'
                                                }}
                                            >
                                                <Button
                                                    sx={{
                                                        color: theme.palette.button.main,
                                                    }}
                                                    size='small'
                                                    onClick={beforeStep}
                                                    startIcon={<ArrowBackIcon />}
                                                >
                                                    Volver
                                                </Button>
                                                <Button variant="contained"
                                                    sx={{
                                                        backgroundColor: theme.palette.button.main,
                                                        height: '100%',
                                                        width: '20%',
                                                        fontSize: '1rem',
                                                    }}
                                                    size='small'
                                                    onClick={nextStep}
                                                >
                                                    Continuar
                                                </Button>
                                            </Box>
                                        </Box>
                                    )}
                                    {activeStep === 3 && (
                                        <Box
                                            flexGrow={2}
                                            display={'flex'}
                                            flexDirection={'column'}
                                            gap={2}
                                        >
                                            <Box
                                                display={'flex'}
                                                flexDirection={'column'}
                                                gap={1}
                                            >
                                                <Typography variant="h3" fontWeight={'bold'} color={colors.blueAccent[200]}>
                                                    Confirmación
                                                </Typography>
                                                <Typography variant="h4" fontWeight={'bold'} color={colors.blueAccent[100]}>
                                                    Resumen de compra
                                                </Typography>
                                                {/* Botones para seleccionar la forma de entrega */}
                                                
                                            </Box>
                                            <Box
                                                display={'flex'}
                                                flexDirection={'row'}
                                                justifyContent={'space-between'}
                                                alignContent={'center'}
                                                sx={{
                                                    width: '50%'
                                                }}
                                            >
                                                <Button
                                                    sx={{
                                                        color: theme.palette.button.main,
                                                    }}
                                                    size='small'
                                                    onClick={beforeStep}
                                                    startIcon={<ArrowBackIcon />}
                                                >
                                                    Volver
                                                </Button>
                                                <Button variant="contained"
                                                    sx={{
                                                        backgroundColor: theme.palette.button.main,
                                                        height: '100%',
                                                        width: '20%',
                                                        fontSize: '1rem',
                                                    }}
                                                    size='small'
                                                    onClick={nextStep}
                                                >
                                                    Continuar
                                                </Button>
                                            </Box>
                                        </Box>
                                    )}
                                    <Box
                                        display={'flex'}
                                        flexDirection={'column'}
                                        justifyContent={'flex-start'}
                                        gap={2}
                                        flexGrow={1}
                                        sx={{
                                            backgroundColor: grey,
                                            height: '100%',
                                        }}
                                    >
                                        <Typography variant="h3" fontWeight={'bold'} color={colors.blueAccent[200]}>
                                            Resumen ({cart.length} producto)
                                        </Typography>
                                        <Divider />

                                        <Stack
                                            direction={'column'}
                                            spacing={1}

                                        >
                                            {/* La idea es dejar aqui los productos y el total */}
                                            {cart.map((item, index) => (
                                                <Card
                                                    key={index}
                                                    sx={{
                                                        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                                                    }}
                                                    paddingX={1}
                                                    paddingY={1}
                                                >
                                                    <CardHeader
                                                        title={haveInfo(item).titulo}
                                                    />
                                                    <Box
                                                        sx={{
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
                                                                image={haveInfo(item).imagen}
                                                            />
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
                                                                    Precio unidad
                                                                </Typography>
                                                                <Typography variant='h5' fontWeight={'bold'} color={theme.palette.button.main}>
                                                                    $ {haveInfo(item).precio}
                                                                </Typography>
                                                            </Stack>
                                                            <Stack
                                                                direction={'row'}
                                                                justifyContent={'space-between'}
                                                            >
                                                                <Typography variant='h4'>
                                                                    Precio total
                                                                </Typography>
                                                                <Typography variant='h5' fontWeight={'bold'} color={theme.palette.button.main}>
                                                                    {item.quantity} x $ {totalProducto(item)}
                                                                </Typography>
                                                            </Stack>

                                                        </CardContent>
                                                    </Box>
                                                </Card>
                                            ))}
                                        </Stack>
                                        <Typography variant="h4" fontWeight={'bold'} color={colors.blueAccent[200]}>
                                            Total: $ {calculateTotal(cart)}
                                        </Typography>
                                        {activeStep === 3 ? (
                                            <Button variant="contained"
                                                sx={{
                                                    backgroundColor: theme.palette.button.main,
                                                    height: '50%',
                                                    fontSize: '1rem',
                                                }}
                                                type='submit'
                                            >
                                                Pagar
                                            </Button>
                                        ) : (
                                            <Button variant="contained"
                                                sx={{
                                                    backgroundColor: theme.palette.button.main,
                                                    height: '50%',
                                                    fontSize: '1rem',
                                                }}
                                                disabled
                                            >
                                                Pagar
                                            </Button>
                                        )}

                                    </Box>
                                </Box>


                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    )
}

const CheckOutStep = ({ activeStep, beforeStep, nextStep }) => {
    return (
        <Stepper activeStep={activeStep} alternativeLabel
            sx={{
                width: '100%',
            }}
        >
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    )
}


export default Checkout
