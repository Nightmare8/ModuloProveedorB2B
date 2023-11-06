import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
//Components MUI
import Button from '@mui/material/Button';
import { Box, TextField } from '@mui/material';
function DialogRegister({ open, onClose }) {

    //La idea es cargar los datos de los registros en un dialogo
    //Y llamar a la funcion para registrar los datos en la base de datos
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Para cargar los datos de los registros, se le pedirá cargar el acceso a la aplicacion de MERCADO LIBRE"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Permites que ATOMPOS acceda a tu cuenta de MERCADO LIBRE? Con el fin de cargar los datos de los registro y poder aplicar el sistema de recomendacion. Para ello, debe conectarse a este link: <a href="https://auth.mercadolibre.cl/authorization?response_type=code&client_id=4980080115367661&redirect_uri=https://glacier-luminous-giant.glitch.me" target='_blank' rel='noopener noreferrer' >Link</a> y luego agregar el la url resultante aca:
                </DialogContentText>
                <Box
                    sx = {{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: '2%',
                    }}
                >
                    <TextField id='outlined-basic' label='Url resultante' variant='outlined' />

                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Salir</Button>
                <Button onClick={onClose} autoFocus>
                    Subir registros
                </Button>
            </DialogActions>
        </Dialog>
    )
}

//How to fix the missing in props validations
//https://stackoverflow.com/questions/61040696/react-props-validation-with-typescript
DialogRegister.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default DialogRegister