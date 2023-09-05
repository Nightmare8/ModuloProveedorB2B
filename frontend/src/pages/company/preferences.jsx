import { Box, Typography, Rating } from '@mui/material'
//Header
import Header from "../../components/Header";
//MUI
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ImagePrice from '../../assets/images/price.svg';
import ImageQuality from '../../assets/images/quality.svg';
import ImageTrust from '../../assets/images/trust.svg';
import ImageVariety from '../../assets/images/variety.svg';
import ImageVelocity from '../../assets/images/velocity.svg';

const StyledCard = ({title, subtitle, image, content, rating, actions}) => {
    return (
        <Card sx={{ maxWidth: 345, width: '100%' }}>
            <CardHeader
                title={title}
                subheader={subtitle} />
            <CardMedia
                component="img"
                height="194"
                
                image={image}
                alt="Paella dish" />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
                <Rating name="size-large" value={rating} size="large" />
            </CardContent>
        </Card>
    )
}

function Preferences({companyDats, setCompanyDats}) {

    //The goal is to have a lot of card to show the preferences by the user
    const preferences = companyDats.datos.priority;
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
                <Header title='Preferencias' subTitle={'De Empresa'}  />
            </Box>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
            >
                {/* Price */}
                <StyledCard 
                    title="Precio"
                    subtitle="¿Qué tan importante es el precio para la empresa?"
                    image={ImagePrice}
                    content="El precio es un factor importante para la empresa, ya que se busca que el producto sea de calidad y a un precio accesible."
                    rating={preferences[0].rating}
                />
                {/* Velocidad */}
                <StyledCard
                    title="Velocidad"
                    subtitle="¿Qué tan importante es la velocidad para la empresa?"
                    image={ImageVelocity}
                    content="La velocidad es un factor importante para la empresa, ya que se busca que el producto sea entregado en el menor tiempo posible."
                    rating={preferences[1].rating}

                />
                {/* Confianza */}
                <StyledCard
                    title="Confianza"
                    subtitle="¿Qué tan importante es la confianza para la empresa?"
                    image={ImageTrust}
                    content="La confianza es un factor importante para la empresa, ya que se busca que el producto sea entregado en el menor tiempo posible."
                    rating={preferences[2].rating}
                />
                {/* Calidad */}
                <StyledCard
                    title="Calidad"
                    subtitle="¿Qué tan importante es la calidad para la empresa?"
                    image={ImageQuality}
                    content="La calidad es un factor importante para la empresa, ya que se busca que el producto sea entregado en el menor tiempo posible."
                    rating={preferences[3].rating}
                />
                {/* Variedad */}
                <StyledCard
                    title="Variedad"
                    subtitle="¿Qué tan importante es la variedad para la empresa?"
                    image={ImageVariety}
                    content="La variedad es un factor importante para la empresa, ya que se busca que el producto sea entregado en el menor tiempo posible."
                    rating={preferences[4].rating}
                />
            </Box>
        </Box>
    )
}

export default Preferences