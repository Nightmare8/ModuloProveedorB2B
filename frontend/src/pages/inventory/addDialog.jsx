import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, MenuItem, TextField } from '@mui/material';
//Form components
import { Form, Formik } from "formik";
import * as yup from "yup";
//React
import { useState } from 'react';
//Redux
import { useDispatch, useSelector } from 'react-redux';
//Mui theme
import { tokens } from "../../theme.js";
import { useTheme } from '@mui/material/styles';
//Routes and API
import { productRoutes } from "../../api/config.js";
import { Typography } from '@mui/material';
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
    companyOwner: yup.string().required("La empresa es requerida"),
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
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

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
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        await addProduct(values, onSubmitProps);
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'lg'}>
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
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                >
                                    <TextField
                                        label='Código'
                                        name='codigo'
                                        value={values.codigo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.codigo && errors.codigo)}
                                        multiline
                                    />
                                    <TextField
                                        label='Nombre'
                                        name='nombre'
                                        value={values.nombre}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.nombre && errors.nombre)}
                                        multiline
                                    />
                                    <TextField
                                        label='SKU'
                                        name='sku'
                                        value={values.sku}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.sku && errors.sku)}
                                        multiline
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
                                    <TextField
                                        label='Categoría'
                                        name='categoria'
                                        value={values.categoria}
                                        error={Boolean(touched.categoria && errors.categoria)}
                                        multiline
                                        select
                                        defaultValue={'consolas'}>
                                            <MenuItem value={'consolas'}>Consolas</MenuItem>
                                            
                                        </TextField>
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