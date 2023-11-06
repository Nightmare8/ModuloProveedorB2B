import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
//Components MUI
import {Button} from '@mui/material';
import {Box} from '@mui/material';
//Components of form
import * as yup from 'yup';
import {Form, Formik} from 'formik';
import {TextField} from '@mui/material';
//Api
import {pythonRoutes} from '../../api/config.js';

const validationSchema = yup.object({
    cantidad: yup.number().min(1, 'Se debe pedir al menos una recomendacion').max(20).required('Campo requerido'),
    categoria: yup.string().required('Campo requerido'),
})

const initialValues = {
    cantidad: '',
    categoria: 'MLC9240',
}


function DialogRecommendation({open, onClose, addCart, setShowRecommendation, setRecommendationList}) {

    //Funciones de recommendation es para agregar los productos a la lista de recomendacion

    const getRecommendation = async (values, onSubmitProps) => {
        console.log("values in function", values)
        const url = pythonRoutes.getRecommendations + values.cantidad + '/' + values.categoria;
        console.log(url)
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        // const data = await response.json();
        // console.log("data", data);
        onSubmitProps.resetForm();
        return response;
    }

    const handleFormSubmit = (values, onSubmitProps) => {
        console.log("values", values)
        let data;
        //Alert para mostrar que se esta obteniendo recomendacion
        //Llamar a la api
        getRecommendation(values, onSubmitProps).then(response => {
            data = response.json();
            return data;
        }).then(data => {
            console.log("data", data)
            setRecommendationList(data.productos);
            setShowRecommendation(true);
            onClose();
        }).catch(error => console.log("error", error));
    }
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title"
            aria-describedby='alert-dialog-description'
            fullWidth
        >
            <DialogTitle id="form-dialog-title">Obtener recomendaciones</DialogTitle>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    errors,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Si desea obtener recomendacion de productos, por favor ingrese la cantidad de productos que desea visualizar, ademas si desea agregarle prioridad según su importancia. <strong>¡OJO!, que se tendrá en cuenta la prioridad que se definió en la encuesta inicial, si desea configurarla, vaya a la sección de configuración de compañia.</strong>
                            </DialogContentText>
                            <Box
                                sx = {{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    marginTop: 2,
                                }}
                            >
                                <TextField 
                                    id='cantidad'
                                    name='cantidad'
                                    label='Cantidad de productos'
                                    value={values.cantidad}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.cantidad && Boolean(errors.cantidad)}
                                    helperText={touched.cantidad && errors.cantidad}
                                />
                                <TextField
                                    
                                    id='categoria'
                                    name='categoria'
                                    label='Categoria'
                                    value={values.categoria}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.categoria && Boolean(errors.categoria)}
                                    helperText={touched.categoria && errors.categoria}
                                />

                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onClose}>Salir</Button>
                            <Button type='submit' >
                                Obtener recomendacion
                            </Button>
                        </DialogActions>
                    </form>
                )}
            </Formik>
        </Dialog>
    )
}

DialogRecommendation.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    addCart: PropTypes.func.isRequired,
}

export default DialogRecommendation