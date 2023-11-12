import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
//Components MUI
import {Button, Stack} from '@mui/material';
import {Box} from '@mui/material';
//Components of form
import * as yup from 'yup';
import { Formik, Field, FieldArray} from 'formik';
import {TextField} from '@mui/material';
import Switch from '@mui/material/Switch';
//Api
import {pythonRoutes} from '../../api/config.js';

const validationSchema = yup.object({
    cantidad: yup.number().min(1, 'Se debe pedir al menos una recomendacion').max(30, 'El maximo puede ser 30 recomendaciones').required('Campo requerido'),
    categoria: yup.string().required('Campo requerido'),
    palabrasClaves: yup.array().of(yup.string()),
    stemming: yup.boolean(),
    n_components: yup.number().min(0).max(100),
})

const initialValues = {
    cantidad: '',
    categoria: 'MLC9240',
    palabrasClaves: [],
    stemming: false,
    n_components: 0,
}

const categories = [
    {
        value: 'MLC9240',
        label: 'Cargadores y Fuentes'
    },
    {
        value: 'MLC5068',
        label: 'Baterias'
    },
    {
        value: 'MLC1672',
        label: 'Discos duros y ssd'
    },
    {
        value: 'MLC48906',
        label: 'Pantallas lcd'
    }
]

function DialogRecommendation({open, onClose, addCart, setShowRecommendation, setRecommendationList}) {

    //Funciones de recommendation es para agregar los productos a la lista de recomendacion

    const getRecommendation = async (values, onSubmitProps) => {
        console.log("values in function", values)
        const url = pythonRoutes.getRecommendations;
        console.log(url)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify(values),
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
                            <Stack spacing={2} direction={'column'} marginTop={2} >
                                <Box
                                    sx = {{
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                        marginTop: 2,
                                    }}
                                >
                                    {/* Use a switch */}
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Field
                                            type="checkbox"
                                            component={Switch}
                                            color="primary"
                                            id="stemming"
                                            name="stemming"
                                            checked={values.stemming}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Box sx={{ ml: 1 }}>¿Aplicar Stemming?</Box>
                                    </Box>
                                    <TextField
                                        id='n_components'
                                        name='n_components'
                                        label='Número de componentes'
                                        value={values.n_components}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.n_components && Boolean(errors.n_components)}
                                        helperText={touched.n_components && errors.n_components}
                                    />
                                </Box>
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
                                    <Field as='select' name='categoria' id='categoria' label='Categoria' >
                                        {categories.map((category, index) => (
                                            <option key={index} value={category.value}>{category.label}</option>
                                        ))}
                                    </Field>
                                    
                                </Box>
                                <FieldArray name='palabrasClaves'>
                                    {({insert, remove, push}) => (
                                        <Box>
                                            {values.palabrasClaves.length > 0 && values.palabrasClaves.map((palabra, index) => (
                                                <Box
                                                    sx = {{
                                                        display: 'flex',
                                                        justifyContent: 'space-around',
                                                        marginTop: 2,
                                                    }}
                                                    key={index}
                                                >
                                                    <TextField
                                                        name={`palabrasClaves.${index}`}
                                                        label='Palabra clave'
                                                        value={palabra}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={touched.palabrasClaves && Boolean(errors.palabrasClaves)}
                                                        helperText={touched.palabrasClaves && errors.palabrasClaves}
                                                    />
                                                    <Button
                                                        variant='contained'
                                                        color='secondary'
                                                        onClick={() => remove(index)}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </Box>
                                            ))}
                                            <Button
                                                variant='contained'
                                                color='primary'
                                                onClick={() => push('')}
                                            >
                                                Agregar palabra clave
                                            </Button>
                                        </Box>
                                    )}
                                </FieldArray>
                            </Stack>
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