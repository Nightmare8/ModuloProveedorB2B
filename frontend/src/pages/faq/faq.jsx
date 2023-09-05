import Header from '../../components/Header'
import { Box, Typography } from '@mui/material'
import { ColorModeContext, tokens } from "../../theme.js";
import { useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Faq() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      paddingX={2}
    >
      <Header title='Faq' subTitle='In this section you can see the frequent questions'/>
      <Accordion defaultExpanded
        sx = {{
          marginTop: '2%',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon/>} >
          <Typography
            variant='h5'
            color={colors.greenAccent[400]}
          >¿Como registrarse?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='h6' >
            Para registrarse debe ir a la seccion de registro y llenar los campos solicitados
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography
            variant='h5'
            color={colors.greenAccent[400]}
          >
            ¿Como iniciar sesion?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='h6'>
            Para iniciar sesion debe ir a la seccion de inicio de sesion y entrar con su mail y password
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography
            variant='h5'
            color={colors.greenAccent[400]}
          >
            ¿Como comprar un producto?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='h6'>
            Para comprar un producto debe ir a la seccion de catalogo y ver los productos que estan disponibles
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default Faq