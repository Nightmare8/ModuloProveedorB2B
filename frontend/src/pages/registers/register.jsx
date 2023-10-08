import { useEffect, useState } from 'react';
//Mui theme
import { ColorModeContext, tokens } from "../../theme.js";
import { useTheme } from '@mui/material/styles';
//Componets
import { Box, Button, Stack } from '@mui/material';
import Header from '../../components/Header'
//Redux
import { useSelector } from "react-redux";
//Icons
import AddBoxIcon from '@mui/icons-material/AddBox';

const filterProducts = (products) => {
    const uniquesNames = new Set();
    const filteredProducts = [];
    products.forEach((product) => {
        if (product.estado === 'stock') {
            if (!uniquesNames.has(product.nombre)) {
                uniquesNames.add(product.nombre);
                product.stock = 1;
                filteredProducts.push(product);
            } else {
                const index = filteredProducts.findIndex((item) => item.nombre === product.nombre);
                filteredProducts[index].stock++;
            }
        }
    });
    return filteredProducts;
}

const headCells = [
    {
        id: 'codigo',
        numeric: false,
        label: 'Codigo',
    },{
        id: 'nombre',
        numeric: false,
        label: 'Nombre',
    },
    {
        id: 'total',
        numeric: false,
        label: 'Precio Total',
    },
    {
        id: 'cantidadProductos',
        numeric: false,
        label: 'Cantidad',
    },
    {
        id: 'proveedor',
        numeric: false,
        label: 'Proveedor',
    },{
        id: 'fecha',
        numeric: false,
        label: 'Fecha',
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
    //Obtain de registers
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
            </Box>
            <Box
                display={'flex'}
                justifyContent={'space-between'}
                paddingTop={1}
                width={'100%'}
            >
                
            </Box>
        </Box>
    )
}

export default Register