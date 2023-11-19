import { useEffect } from 'react'
import Header from '../../components/Header'
import { Box, Typography, IconButton } from '@mui/material'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { ColorModeContext, tokens } from "../../theme.js";
import { useTheme } from '@mui/material/styles';
import EmailIcon from "@mui/icons-material/Email";
//Components
import LineChartComponent from '../../components/LineChart.jsx';
import PieChartComponent from '../../components/PieChart.jsx';

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const styles = {
    item: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary[400],
      borderRadius: '10px',
      padding: '1%',
    }
  }
  return (
    <Box
      paddingX={2}
      paddingY={2}
    >
      <Box
        display='flex'
        justifyContent={'space-between'}
        alignContent={'center'}
      >
        <Header title='Panel de control' subTitle='Bienvenido a tu panel de control' />
        <Box>
          <Button
            variant="contained"
            startIcon={<DownloadOutlinedIcon />}
            sx={{
              backgroundColor: theme.palette.button.main,
            }}
          >
            Download Reports
          </Button>
        </Box>
      </Box>
      <Grid
        container
        sx={{
          marginTop: '2%',
          height: '80%',
        }}
        rowGap={1}
        columnGap={1}
      >
        {/* Row 1 */}
        <Grid
          item
          xs={12}
          sm={8}
          md={8}
          lg={8}
          sx={styles.item}
        >
          <LineChartComponent />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          lg={3}
          sx={styles.item}
        >
          <PieChartComponent />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard