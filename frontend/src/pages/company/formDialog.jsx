import { Button, Box, Typography, TextField, Select, FormGroup, FormControlLabel, Alert } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { tokens } from "../../theme.js";
import { useTheme } from '@mui/material/styles';
import { useSelector } from "react-redux";
//Card components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import ImgEnterprise from '../../assets/enterprise.png';
import ImgSupplier from '../../assets/supplier.png';
//Rating
import Rating from '@mui/material/Rating';
import Checkbox from '@mui/material/Checkbox';
//Form components
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import StepperStyled from './stepperStyled.jsx';
import { useDispatch } from 'react-redux';
import { updateLogin } from '../../state/slices/authSlice.js';
import { Navigate } from 'react-router-dom';
//Routes
import {companyRoutes} from '../../api/config.js' 
const initialValues = {
    rut: "",
    razonSocial: "",
    nombre: "",
    detalle: "",
    giro: "",
    actEco: 0,
    email: "",
    // emailUser: "",
    comuna: "",
    ciudad: "",
    direccion: "",
    telefono: "",
    precio: 1,
    velocidad: 1,
    confianza: 1,
    calidad: 1,
    variedad: 1,
    workers: 1,
    telefonos: false,
    tablet: false,
    notebook: false,
    consolas: false,
    camaras: false,
}

const companySchema = yup.object().shape({
    rut: yup.string().required("Required"),
    razonSocial: yup.string().required("Required"),
    nombre: yup.string().required("Required"),
    detalle: yup.string().required("Required"),
    giro: yup.string(),
    actEco: yup.number(),
    email: yup.string().email("Invalid email").required("Required"),
    // emailUser: yup.string().email("Invalid email").required("Required"),
    comuna: yup.string(),
    ciudad: yup.string().required("Required"),
    direccion: yup.string().required("Required"),
    telefono: yup.number().required("Required"),
    // Rankings
    precio: yup.number().min(1, 'Debes dar un valor').max(5, 'El valor maximo es 5')
        .required("Required"),
    velocidad: yup.number().min(1, 'Debes dar un valor').max(5, 'El valor maximo es 5')
        .required("Required"),
    confianza: yup.number().min(1, 'Debes dar un valor').max(5, 'El valor maximo es 5')
        .required("Required"),
    calidad: yup.number().min(1, 'Debes dar un valor').max(5, 'El valor maximo es 5')
        .required("Required"),
    variedad: yup.number().min(1, 'Debes dar un valor').max(5, 'El valor maximo es 5')
        .required("Required"),
    //Still number
    workers: yup.number().min(1, 'Debes dar un valor')
        .required("Required"),
    // Checkbox
    telefonos: yup.boolean(),
    tablet: yup.boolean(),
    notebook: yup.boolean(),
    consolas: yup.boolean(),
    camaras: yup.boolean(),
});
const steps = [
    'Tipo de Industria',
    'Datos Formales',
    'Datos Contacto',
    'Cantidad Empleados',
    'Tipos de productos',
    'Prioridades Compra'
];

function FormDialog({ open, handleClose }) {
    //Stepper
    const [activeStep, setActiveStep] = useState(0);
    const afterStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
    const nextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    const dispatch = useDispatch();

    const updateUser = (company, companyName) => {
        console.log("update user is called");
        dispatch(updateLogin({
            company: company,
            companyName: companyName,
        }));
    }
    const user = useSelector((state) => state.auth.user);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("");
    const [typeIndustry, setTypeIndustry] = useState("pyme");
    
    const handleIndustry = (type) => {
        setTypeIndustry(type);
        nextStep();
    }
    const addCompany = async (values, onSubmitProps) => {
        console.log("user", user);
        values.emailUser = user.email;
        const savedCompanyResponse = await fetch(companyRoutes.registerCompany, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
        const savedCompany = await savedCompanyResponse.json();
        onSubmitProps.resetForm();
        if (!savedCompany.error) {
            return savedCompany;
        } else {
            setAlertMessage(savedCompany.error);
            setAlertSeverity("error");
        }
    }

    const handleFormSubmit = (values, onSubmitProps) => {
        console.log("values", values);
        addCompany(values, onSubmitProps).
        then(() => {
            setAlertMessage("Registro satisfactorio");
            setAlertSeverity("success");
            handleClose();
            updateUser(values.rut, values.nombre);
            <Navigate to='/home'/>  
        }).
        catch((error) => {
            console.log("error", error);
        })
    }
    return (
        <Dialog open={open} fullWidth={true} maxWidth={'lg'} >
            <DialogTitle>
                <Typography variant='h4' fontWeight={'bold'}>
                    Entrevista Inicial
                </Typography>
            </DialogTitle>
            <DialogContent>
                {/* Aca ira el formulario y stepper */}
                <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='space-between'
                    height='100%'
                    alignItems='center'
                >
                    {alertMessage && (
                        <Alert severity={alertSeverity}>
                            {alertMessage}
                        </Alert>
                    )}
                    <Box>
                        {/* Formulario */}
                        <Formik
                            onSubmit={handleFormSubmit}
                            initialValues={initialValues}
                            validationSchema={companySchema}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                touched,
                                errors,
                                setFieldValue,
                            }) => (

                                <form onSubmit={handleSubmit}>
                                    <Box>
                                        {activeStep === 0 && (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    width: '100%',
                                                    marginBottom: '1rem',
                                                }}
                                            >
                                                <Typography variant='h5' fontWeight={'bold'}
                                                    sx={{
                                                        alignSelf: 'center',
                                                        marginBottom: '3rem',
                                                    }}
                                                >
                                                    Seleccione su tipo de Industria
                                                </Typography>
                                                <Box
                                                    display='grid'
                                                    gridTemplateColumns='1fr 1fr'
                                                    gap='1rem'
                                                >
                                                    {/* Enterpirse Card */}
                                                    <Card sx={{ maxWidth: 345, marginRight: '2%' }}>
                                                        <CardActionArea
                                                            onClick={() => handleIndustry("enterprise")}
                                                        >
                                                            <CardMedia
                                                                component="img"
                                                                height="80%"
                                                                width="80%"
                                                                image={ImgEnterprise}
                                                                alt="Enterprise"
                                                            />
                                                            <CardContent>
                                                                <Typography gutterBottom variant="h5" component="div">
                                                                    Pequeña Empresa o Pyme
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    Empresa con menos de 200 trabajadores y ventas anuales menores a 100.000 UF
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                    </Card>
                                                    {/* Supplier Card */}
                                                    <Card sx={{ maxWidth: 345, marginRight: '2%' }}>
                                                        <CardActionArea
                                                            onClick={() => handleIndustry("supplier")}
                                                        >
                                                            <CardMedia
                                                                component="img"
                                                                height="80%"
                                                                width="80%"
                                                                image={ImgSupplier}
                                                                alt="Enterprise"
                                                            />
                                                            <CardContent>
                                                                <Typography gutterBottom variant="h5" component="div">
                                                                    Proveedor
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    Empresa que provee productos o servicios a otras empresas
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                    </Card>
                                                </Box>
                                            </Box>
                                        )}
                                        {activeStep === 1 && (
                                            <Box>
                                                <Typography variant='h5' fontWeight={'bold'}>
                                                    Paso 2: Datos Formales
                                                </Typography>
                                                <Box>
                                                    <TextField
                                                        label="Rut"
                                                        id="rut"
                                                        name="rut"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.rut}
                                                        error={touched.rut && Boolean(errors.rut)}
                                                        helperText={touched.rut && errors.rut}
                                                    />
                                                    <TextField
                                                        label="Nombre"
                                                        id="nombre"
                                                        name="nombre"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.nombre}
                                                        error={touched.nombre && Boolean(errors.nombre)}
                                                        helperText={touched.nombre && errors.nombre}
                                                    />
                                                    <TextField
                                                        label="Detalle"
                                                        id="detalle"
                                                        name="detalle"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.detalle}
                                                        error={touched.detalle && Boolean(errors.detalle)}
                                                        helperText={touched.detalle && errors.detalle}
                                                    />
                                                    <TextField
                                                        label="Razon Social"
                                                        id="razonSocial"
                                                        name="razonSocial"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.razonSocial}
                                                        error={touched.razonSocial && Boolean(errors.razonSocial)}
                                                        helperText={touched.razonSocial && errors.razonSocial}
                                                    />
                                                    <TextField
                                                        label="Giro"
                                                        id="giro"
                                                        name="giro"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.giro}
                                                        error={touched.giro && Boolean(errors.giro)}
                                                        helperText={touched.giro && errors.giro}
                                                    />
                                                    <TextField
                                                        label="Actividad Economica"
                                                        id="actEco"
                                                        name="actEco"
                                                        type="number"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.actEco}
                                                        error={touched.actEco && Boolean(errors.actEco)}
                                                        helperText={touched.actEco && errors.actEco}
                                                    />
                                                </Box>
                                            </Box>
                                        )}
                                        {activeStep === 2 && (
                                            <Box>
                                                <Typography variant='h5' fontWeight={'bold'}>
                                                    Paso 3: Datos de contacto
                                                </Typography>
                                                <Box>
                                                    <TextField
                                                        label="Email"
                                                        id="email"
                                                        name="email"
                                                        type='email'
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.email}
                                                        error={touched.email && Boolean(errors.email)}
                                                        helperText={touched.email && errors.email}
                                                    />
                                                    <TextField
                                                        label="Ciudad"
                                                        id="ciudad"
                                                        name="ciudad"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.ciudad}
                                                        error={touched.ciudad && Boolean(errors.ciudad)}
                                                        helperText={touched.ciudad && errors.ciudad}
                                                    />
                                                    <TextField
                                                        label="Comuna"
                                                        id="comuna"
                                                        name="comuna"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.comuna}
                                                        error={touched.comuna && Boolean(errors.comuna)}
                                                        helperText={touched.comuna && errors.comuna}
                                                    />
                                                    <TextField
                                                        label="Dirección"
                                                        id="direccion"
                                                        name="direccion"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.direccion}
                                                        error={touched.direccion && Boolean(errors.direccion)}
                                                        helperText={touched.direccion && errors.direccion}
                                                    />
                                                    <TextField
                                                        label="Telefono"
                                                        id="telefono"
                                                        name="telefono"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.telefono}
                                                        error={touched.telefono && Boolean(errors.telefono)}
                                                        helperText={touched.telefono && errors.telefono}
                                                    />
                                                </Box>
                                            </Box>
                                        )}
                                        {activeStep === 3 && (
                                            <Box>
                                                <Typography variant='h5' fontWeight={'bold'}>
                                                    Cantidad de trabajadores que existe en su empresa
                                                </Typography>
                                                <Box>
                                                    <TextField
                                                        label="Cantidade de trabajadores"
                                                        id="workers"
                                                        name="workers"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        type='number'
                                                        value={values.workers}
                                                        error={touched.workers && Boolean(errors.workers)}
                                                        helperText={touched.workers && errors.workers}
                                                    />
                                                </Box>
                                            </Box>
                                        )}
                                        {activeStep === 4 && (
                                            <Box>
                                                <Typography variant='h5' fontWeight={'bold'}>
                                                    Tipos de productos que maneja tu empresa
                                                </Typography>
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={<Checkbox
                                                            checked={values.telefonos}
                                                            name='telefonos'
                                                            onChange={handleChange}
                                                            value={values.telefonos}
                                                        />}
                                                        label="Telefonos"
                                                    />
                                                    <ErrorMessage name='telefonos' component={'div'} />
                                                    <FormControlLabel
                                                        control={<Checkbox
                                                            checked={values.tablet}
                                                            value={values.tablet}
                                                            name='tablet'
                                                            onChange={handleChange}
                                                        />}
                                                        label="Tablet"
                                                    />
                                                    <ErrorMessage name='tablet' component={'div'} />
                                                    <FormControlLabel
                                                        control={<Checkbox
                                                            checked={values.notebook}
                                                            name='notebook'
                                                            onChange={handleChange}
                                                            value={values.notebook}

                                                        />}
                                                        label="Notebooks"
                                                    />
                                                    <ErrorMessage name='notebook' component={'div'} />
                                                    <FormControlLabel
                                                        control={<Checkbox
                                                            checked={values.consolas}
                                                            name='consolas'
                                                            onChange={handleChange}
                                                            value={values.consolas}

                                                        />}
                                                        label="Consolas"
                                                    />
                                                    <ErrorMessage name='consolas' component={'div'} />
                                                    <FormControlLabel
                                                        control={<Checkbox
                                                            checked={values.camaras}
                                                            name='camaras'
                                                            onChange={handleChange}
                                                            value={values.camaras}
                                                        />}
                                                        label="Camaras"
                                                    />
                                                </FormGroup>
                                            </Box>
                                        )}
                                        {activeStep === 5 && (
                                            <Box>
                                                <Typography variant='h5' fontWeight={'bold'}>
                                                    Seleccione las prioridades que tiene usted al momento de comprar
                                                </Typography>
                                                <Box>
                                                    <Typography component='legend'>
                                                        Precio del producto
                                                    </Typography>
                                                    <Rating
                                                        name='precio'
                                                        value={values.precio}
                                                        onChange={(event, newValue) => {
                                                            setFieldValue('precio', newValue);
                                                        }}
                                                    />
                                                    <ErrorMessage name='precio' component={'div'} />
                                                    <Typography component='legend'>
                                                        Velocidad de entrega
                                                    </Typography>
                                                    <Rating
                                                        name='velocidad'
                                                        value={values.velocidad}
                                                        onChange={(event, newValue) => {
                                                            setFieldValue('velocidad', newValue);
                                                        }}
                                                    />
                                                    <ErrorMessage name='velocidad' component={'div'} />
                                                    <Typography component='legend'>
                                                        Confianza del proveedor
                                                    </Typography>
                                                    <Rating
                                                        name='confianza'
                                                        value={values.confianza}
                                                        onChange={(event, newValue) => {
                                                            setFieldValue('confianza', newValue);
                                                        }}
                                                    />
                                                    <ErrorMessage name='confianza' component={'div'} />
                                                    <Typography component='legend'>
                                                        Calidad del producto
                                                    </Typography>
                                                    <Rating
                                                        name='calidad'
                                                        value={values.calidad}
                                                        onChange={(event, newValue) => {
                                                            setFieldValue('calidad', newValue);
                                                        }}
                                                    />
                                                    <ErrorMessage name='calidad' component={'div'} />
                                                    <Typography component='legend'>
                                                        Variedad de productos
                                                    </Typography>
                                                    <Rating
                                                        name='variedad'
                                                        value={values.variedad}
                                                        onChange={(event, newValue) => {
                                                            setFieldValue('variedad', newValue);
                                                        }}
                                                    />
                                                    <ErrorMessage name='variedad' component={'div'} />
                                                </Box>

                                            </Box>
                                        )}

                                    </Box>
                                    <Box>
                                        <StepperStyled activeStep={activeStep} />
                                    </Box>
                                    <DialogActions>
                                        {
                                            activeStep !== 0 && (
                                                <Button onClick={afterStep}>Atras</Button>
                                            )
                                        }
                                        {
                                            activeStep === steps.length ? (
                                                <Button type='submit'>Finalizar</Button>
                                            )
                                                :
                                            (
                                                <Button onClick={nextStep}>Siguiente</Button>
                                            )
                                        }

                                    </DialogActions>
                                </form>
                            )}
                        </Formik>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default FormDialog