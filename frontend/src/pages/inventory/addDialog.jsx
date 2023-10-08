import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, MenuItem, TextField } from '@mui/material';
//Form components
import { Form, Formik } from "formik";
import * as yup from "yup";
//React
import { useEffect, useState } from 'react';
//Redux
import { useDispatch, useSelector } from 'react-redux';
//Mui theme
import { tokens } from "../../theme.js";
import { useTheme } from '@mui/material/styles';
//Routes and API
import { companyRoutes, productRoutes } from "../../api/config.js";
import {supplierRoutes} from "../../api/config.js"; 

import { Typography, Stack } from '@mui/material';
//Functions
const transformUpperCase = (value) => {
    //Transform first letter
    return value.charAt(0).toUpperCase() + value.slice(1);
}

const productSchema = yup.object().shape({
    codigo: yup.string().required("El código es requerido"),
    nombre: yup.string().required("El nombre es requerido"),
    sku: yup.string().required("El SKU es requerido"),
    lote: yup.string().required("El lote es requerido"),
    categoria: yup.string().required("La categoría es requerida"),
    subCategoria: yup.string(),
    marca: yup.string().required("La marca es requerida"),
    modelo: yup.string().required("El modelo es requerido"),
    detalle: yup.string(),
    color: yup.string(),
    precio: yup.number().required("El precio es requerido"),
    cantidad: yup.number().required("La cantidad es requerida"),
    estado: yup.string(),
    companyOwner: yup.string(),
    supplier: yup.string(),
})

const initialValues = {
    codigo: "", //Definido en este sistema
    nombre: "",
    sku: "", //Dado por el proveedor
    lote: "",
    categoria: "",
    subCategoria: "",
    marca: "",
    modelo: "",
    detalle: "",
    color: "",
    precio: "",
    cantidad: "",
    estado: "",
    companyOwner: "",
    supplier: "",
}

function AddDialog({ open, handleClose }) {
    const user = useSelector(state => state.auth.user);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [company, setCompany] = useState({});
    const [suppliers, setSuppliers] = useState([]);
    initialValues.companyOwner = user.company;
    console.log("compain", company)
    //Obtain all suppliers
    useEffect(() => {
        fetch(supplierRoutes.get, {
            method: 'GET',
        }).then(response => response.json()).
        then(data => {
            setSuppliers(data);
        }).catch(error => console.log(error));
        //Have to obtain categories of company
        fetch(companyRoutes.getCompany, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rut: user.company })
        }).then(response => response.json()).then(data => {
            setCompany(data);
        }).catch(error => console.log(error));
    },[])
    const addProduct = async (values, onSubmitProps) => {
        values.companyOwner = user.company;
        const savedProductResponse = await fetch(productRoutes.register, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        const savedProduct = await savedProductResponse.json();
        if (!savedProduct.error) {
            onSubmitProps.resetForm();
            handleClose();
        } else{
            console.log("error", savedProduct.error);
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        console.log("values", values);
        console.log("entro al form")
        values.estado = 'stock'
        await addProduct(values, onSubmitProps);
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'md'}>
            <DialogTitle id="form-dialog-title">
                <Typography variant="h4" sx={{ color: colors.primary }}>
                    Agregar Producto
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    height={'100%'}
                >
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={productSchema}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            errors,
                            touched,
                            isSubmitting,
                            resetForm,

                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <Box
                                    component={'form'}
                                    sx={{
                                        '& .MuiTextField-root': { m: 1 },
                                    }}
                                    noValidate
                                >
                                    <Stack direction={'row'}  >
                                        <TextField
                                            label='Código'
                                            name='codigo'
                                            value={values.codigo}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.codigo && errors.codigo)}
                                        />
                                        <TextField
                                            label='Nombre'
                                            name='nombre'
                                            value={values.nombre}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.nombre && errors.nombre)}
                                        />
                                        <TextField
                                            label='SKU'
                                            name='sku'
                                            value={values.sku}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.sku && errors.sku)}
                                        />
                                        <TextField
                                            label='Lote'
                                            name='lote'
                                            value={values.lote}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.lote && errors.lote)}
                                            multiline
                                        />
                                    </Stack>
                                    <Stack direction={'row'} >
                                        <TextField
                                            sx={{
                                                width: '24%',
                                            }}
                                            label='Categoría'
                                            name='categoria'
                                            value={values.categoria}
                                            onChange={handleChange}
                                            error={Boolean(touched.categoria && errors.categoria)}
                                            multiline
                                            select>
                                                {/* just show the categories of company */}
                                                {company.datos.productTypes.map((category) => {
                                                    return (
                                                        <MenuItem key={category.name} value={category.name}>
                                                            {/* have to show the first letter in uppercase */}
                                                            {transformUpperCase(category.name)}
                                                        </MenuItem>
                                                    )
                                                })
                                                }
                                        </TextField>
                                        <TextField
                                            label='Subcategoría'
                                            name='subCategoria'
                                            value={values.subCategoria}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.subCategoria && errors.subCategoria)}
                                            multiline>
                                            {/* Agregar posibles sub categorias de cada categoriaa */}
                                        </TextField>
                                        <TextField
                                            label='Marca'
                                            name='marca'
                                            value={values.marca}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.marca && errors.marca)}
                                            multiline />
                                        <TextField
                                            label='Modelo'
                                            name='modelo'
                                            value={values.modelo}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.modelo && errors.modelo)}
                                            multiline />
                                    </Stack>
                                    <Stack direction={'row'}>
                                        <TextField
                                            label='Detalle'
                                            name='detalle'
                                            value={values.detalle}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.detalle && errors.detalle)}
                                            multiline
                                            sx={{
                                                width: '40%',
                                            }}
                                        />
                                        <TextField
                                            label='Color'
                                            name='color'
                                            value={values.color}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.color && errors.color)}
                                            multiline
                                            sx={{
                                                width: '10%',
                                            }}
                                        >
                                        
                                        </TextField>
                                        <TextField
                                            // suppliers
                                            label='Proveedor'
                                            name='supplier'
                                            select
                                            value={values.supplier}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.supplier && errors.supplier)}
                                            multiline
                                            sx ={{
                                                width: '40%',
                                            }}
                                        >
                                            <MenuItem value={''}>
                                                Ninguno
                                            </MenuItem>
                                            {suppliers.map((suppliers) => (
                                                <MenuItem key={suppliers._id} value={suppliers.rut}>
                                                    {suppliers.nombre}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Stack>
                                    <Stack direction={'row'}>
                                        <TextField
                                            id='standard-number'
                                            label='Precio'
                                            name='precio'
                                            type='number'
                                            value={values.precio}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.precio && errors.precio)}
                                            variant='standard'
                                            sx = {{
                                                width: '50%'
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                         <TextField
                                            label='Cantidad'
                                            name='cantidad'
                                            type='number'
                                            value={values.cantidad}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.cantidad && errors.cantidad)}
                                            variant='standard'
                                            sx = {{
                                                width: '50%'
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Stack>
                                </Box>
                                <Button
                                    sx={{
                                        backgroundColor: theme.palette.button.main,
                                        height: '50%',
                                        color: 'white',
                                    }}
                                    type='submit'
                                >
                                    Agregar
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default AddDialog