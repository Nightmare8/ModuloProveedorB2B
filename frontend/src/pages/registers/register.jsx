import { useEffect, useState } from 'react';
//Mui theme
import { ColorModeContext, tokens } from "../../theme.js";
import { useTheme } from '@mui/material/styles';
//Componets
import { Box, Button, Stack } from '@mui/material';
import Header from '../../components/Header'
import DialogRegister from './dialogRegister.jsx';
import TabBody from '../../components/TabBody';
//Redux
import { useSelector } from "react-redux";
//Icons
import AddBoxIcon from '@mui/icons-material/AddBox';
//Api
import { purchaseRoutes } from '../../api/config.js';

const headCells = [
    {
        id: 'fechaOrden',
        numeric: false,
        label: 'Fecha',
    },{
        id: 'companySeller',
        numeric: false,
        label: 'Proveedor',
    },{
        id: 'cantidadProductos',
        numeric: false,
        label: 'Cantidad Productos',
    },{
        id: 'total',
        numeric: false,
        label: 'Total',
    },{
        id: 'estadoPago',
        numeric: false,
        label: 'Estado Pago',
    },{
        id: 'estadoEnvio',
        numeric: false,
        label: 'Estado Envio',
    },
]
function Register() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    //User 
    const user = useSelector((state) => state.auth.user);
    //Stock
    const [rows, setRows] = useState([]);
    console.log("rows", rows)
    //Obtain de registers
    useEffect(() => {
        const url = purchaseRoutes.getPurchase + user.company;
        console.log("url", url)
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log("data", data)
                setRows(data)
            })
            .catch((error) => console.log(error));
    }, [])
    //Dialog for charge registers
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'start',
                width: '100%',
            }}
        >
            <Box
                display={'flex'}
                justifyContent={'space-between'}
            >
                {/* Agregar producto */}
                <Header title='Registros' subTitle={'De Empresa'} />
                <Stack direction={'row'} spacing={2}>
                    <Button
                        variant="contained"
                        startIcon={<AddBoxIcon />}
                        sx={{
                            backgroundColor: theme.palette.button.main,
                            height: '50%',
                        }}
                        onClick={handleOpen}
                    >
                        Cargar registros
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<AddBoxIcon />}
                        sx={{
                            backgroundColor: theme.palette.button.main,
                            height: '50%',
                        }}
                    >
                        Editar registros
                    </Button>
                    
                </Stack>
                <DialogRegister open={open} onClose={handleClose} />
            </Box>
            <Box
                display={'flex'}
                justifyContent={'space-between'}
                paddingTop={1}
                width={'100%'}
            >
                <TabBody headCells={headCells} rows={rows} headCellsAux={headCells}/>
            </Box>
        </Box>
    )
}

export default Register