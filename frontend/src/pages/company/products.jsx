import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import Header from "../../components/Header";
import UpdateIcon from '@mui/icons-material/Update';
import { ColorModeContext, tokens } from "../../theme.js";
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ImagenTelefono from '../../assets/products/telefono.jpg';
import ImagenTablet from '../../assets/products/tablet.jpg';
import ImagenNotebook from '../../assets/products/notebook.jpg';

const getDetails = (productType) => {
    const data = {
        imagen : '',
        description: '',
    }
    if (productType === 'telefonos'){
        data.imagen = ImagenTelefono;
        data.description = 'La empresa maneja telefonos en su stock';
    } else if (productType === 'notebook'){
        data.imagen = ImagenNotebook;
        data.description = 'La empresa maneja notebooks en su stock';
    } else if (productType === 'tablet'){
        data.imagen = ImagenTablet;
        data.description = 'La empresa maneja tablets en su stock';
    } else if(productType === 'consolas'){
        data.imagen = ImagenTelefono;
        data.description = 'La empresa maneja consolas en su stock';
    } else if(productType === 'camaras'){
        data.imagen = ImagenTelefono;
        data.description = 'La empresa maneja camaras en su stock';
    }
    return data;
}

const StyledCard = ({title}) => {
    const details = getDetails(title);
    //The first letter of title have to be uppercase 
    title = title.charAt(0).toUpperCase() + title.slice(1);
    return (
        <Card sx={{ maxWidth: 345, width: '100%' }}>
            <CardHeader
                title={title}
                subheader={details.description} />
            <CardMedia
                component="img"
                height="310"
                objectFit="cover"
                image={details.imagen}
                alt="Paella dish" />
        </Card>
    )
}

function Products({companyDats, setCompanyDats}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const productTypes = companyDats.datos.productTypes;
    console.log(productTypes)
    return (
        <Box
            sx = {{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'start',
            }}
        >
            <Box
                display={'flex'}
                justifyContent={'space-between'}
            >
                <Header title='Tipos de Productos' subTitle={'De La Empresa'}  />   
                <Button 
                        variant="contained"
                        startIcon={<UpdateIcon />}
                        sx = {{
                            backgroundColor: theme.palette.button.main,
                            height: '50%',
                        }}
                    >
                        Actualizar Datos
                </Button>
            </Box>
            <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'flex-start'}
                alignItems = {'center'}
                flexWrap={'wrap'}
                gap={2}
            >
                {productTypes.map((productType, index) => (
                    <StyledCard 
                        key={index}
                        title={productType.name}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default Products