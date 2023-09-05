import { Box, Container, Typography } from "@mui/material";
import { tokens } from "../../theme.js";
import { styled, useTheme } from '@mui/material/styles';
import Form from "./Form.jsx";

import ImageWelcoming from '../../assets/images/welcoming.svg';

function LoginPage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx = {{
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.background.alt,
        padding: '50px',
      }}
    >
      <Box
        sx = {{
          width: '100%',
          backgroundColor: '#FFFFFF',
        }}
        display={'flex'}
      >
        <Box
          flex={1}
        >
          <img src={ImageWelcoming} alt="" style = {{
            width: '100%',
            height: '100%'
          }} />
        </Box>
        <Box
          flex={2}
          sx = {{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <Box>
            <Typography variant="h2"  fontWeight={'bold'} 
              color={colors.blueAccent[300]}
            >
              Modulo de Proveedor
            </Typography>
          </Box>
          <Box>
            <Form/>
          </Box>
        </Box>
        <Box
          flex = {1}
        >
          <img src={ImageWelcoming} alt="" 
            style = {{
              width: '100%',
              height: '100%'
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default LoginPage  