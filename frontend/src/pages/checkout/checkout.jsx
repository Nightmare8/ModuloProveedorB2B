
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import { tokens } from "../../theme.js";
import { useTheme } from '@mui/material/styles';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Navigate } from 'react-router-dom';
//Esta pagina sera para el check out de los productos

const steps = [
    'Tus datos',
    'Forma de entrega',
    'Medio de pago',
    'Confirmacion',
];

const initialValues = {
    idProduct: 0,
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
    atributos: [],
}

const validationSchema = Yup.object().shape({
    cantidad: Yup.number()
        .required('Este campo es requerido')
        .positive('Debe ser un numero positivo')
        .integer('Debe ser un numero entero'),
    metodoPago: Yup.string()
        .required('Este campo es requerido'),
    costoEnvio: Yup.number()
        .required('Este campo es requerido')
        .positive('Debe ser un numero positivo')
        .integer('Debe ser un numero entero'),
    dirEnvio: Yup.string()
        .required('Este campo es requerido'),
    otrosDetalles: Yup.string(),
});

function Checkout() {

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    //Hay que preguntar por cantidad, metodoPago, costoEnvio, dirEnvio, otrosDetalles
    //El rut de la compañia compradora se obtiene de la sesion
    return (
        <div>Checkout</div>
    )
}

export default Checkout