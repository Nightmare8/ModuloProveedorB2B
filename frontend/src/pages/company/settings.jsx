import { Box, Button, Divider, Input, InputLabel, Stack, Typography } from "@mui/material"
import TextField from '@mui/material/TextField';
import Header from "../../components/Header";
import { ColorModeContext, tokens } from "../../theme.js";
import { useTheme } from '@mui/material/styles';
import UpdateIcon from '@mui/icons-material/Update';
import { useEffect, useState } from "react";
import FormDialog from "./formDialog.jsx";
import { useSelector } from "react-redux";

const StyledInput = ({label, text, currentValue}) => {
    return (
        <Box
            sx = {{
                width: '100%',
            }}
        >
            <InputLabel htmlFor={label}>{text}</InputLabel>
            <Input id={label} aria-describedby="my-helper-text"
            sx = {{
                width: '100%',
            }}
            value={currentValue}
            />
        </Box>
    )
} 

function Settings({companyDats, setCompanyDats}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const user = useSelector((state) => state.user);
    
    //Form Dialog
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    
    return (
        
        <Box
            sx = {{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'start',
                width: '100%',
            }}
        >
            {/* Formulario */}
            <Box
                display={'flex'}
                justifyContent={'space-between'}
            >
                <Header title='Configuración' subTitle={'De Empresa'}  />
                <Button 
                    variant="contained"
                    startIcon={<UpdateIcon />}
                    onClick={handleClickOpen}
                    sx = {{
                        backgroundColor: theme.palette.button.main,
                        height: '50%',
                    }}
                >
                    Actualizar Datos
                </Button>
                <FormDialog open={open} handleClose={handleClose} />
            </Box>
            <Box
                display={'flex'}
                justifyContent={'space-between'}
                paddingTop={1}
            >
                <Box
                    flexGrow={1}
                    display={'flex'}
                    flexDirection={'column'}
                    sx = {{
                        paddingRight: '2%',
                    }}
                >
                    <Typography variant="h4"  fontWeight={'bold'}>
                        Datos contacto
                    </Typography>
                    <Typography variant='h6'>
                        Datos actuales de la empresa
                    </Typography>
                    <Stack spacing = {1} marginTop={1}>
                        <StyledInput label='name' text='Nombre' currentValue={companyDats.nombre}/>
                        <StyledInput label='rut' text='Rut' currentValue={companyDats.rut} />
                        <StyledInput label='city' text='Ciudad' currentValue={companyDats.ciudad}/>
                        <StyledInput label='direccion' text='Direccion' currentValue={companyDats.direccion}/>
                        <StyledInput label='email' text='Email'currentValue={companyDats.email} />
                    </Stack>
                </Box>
                <Box
                    flexGrow={2}
                >
                    <Typography variant="h4"  fontWeight={'bold'}>
                        Datos Formales
                    </Typography>
                    <Typography variant='h6'>
                        Datos actuales de la empresa
                    </Typography>
                    <Stack spacing = {1} marginTop={1}>
                        <StyledInput label='details' text='Detalle' currentValue={companyDats.detalle} />
                        <StyledInput label='workers' text='Trabajadores' currentValue={companyDats.datos.workers}/>
                        
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default Settings