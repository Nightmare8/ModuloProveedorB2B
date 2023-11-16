import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
//Mui Componentes
import Button from '@mui/material/Button';
import { Card } from '@mui/material';
import { useState } from 'react';
//La idea de este componente es mostrar todos los datos del producto, tanto de su proveedor como sus calificaciones
//Imagenes
//Imagenes productos
import ImagenTelefono from '../../assets/products/telefono.jpg';
import ImagenCargadores from '../../assets/products/cargadores.webp';
import ImagenBaterias from '../../assets/products/bateriasCelular.jpg';
import ImagenDiscos from '../../assets/products/discosSSD.webp';

const handleImageCategory = (category) => {
    if (category === 'MLC9240') {
        return ImagenCargadores;
    } else if (category === 'MLC5068') {
        return ImagenBaterias;
    } else if (category === 'MLC1672') {
        return ImagenDiscos;
    } else {
        return ImagenTelefono;
    }
}

function DialogProduct({ open, handleClose, addCart, product }) {

    // //Se mostrara estos datos
    // const { titulo, descripcion, precio, tags, opiniones, reviewPromedio } = product.info;
    // //Datos de proveedor
    // const { nombre, ciudad, tagsVendedor, reputación, completadas, total, ratingPositivo, ratingNeutral, RatingNegativo, ventas, reclamos, cancelaciones } = product.info;
    console.log(product)
    const [quantity, setQuantity] = useState(1);
    console.log(Object.keys(product).length)
    if (Object.keys(product).length === 0) {
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Cargando...</DialogTitle>
            </Dialog>
        )
    } else{
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{product.info.titulo}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {product.info.descripcion}
                    </DialogContentText>
                    <DialogContentText>
                        {product.info.precio}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                    <Button onClick={() => {
                        addCart(product, quantity);
                        handleClose();
                    }}>Agregar al carrito</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

DialogProduct.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    addCart: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}

DialogProduct.defaultProps = {
    open: false,
    handleClose: () => { },
    addCart: () => { },
    product: {}
}
export default DialogProduct