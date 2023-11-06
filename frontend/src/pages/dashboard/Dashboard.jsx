import { useEffect } from 'react'
import Header from '../../components/Header'
import { Box, Typography, IconButton } from '@mui/material'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { ColorModeContext, tokens } from "../../theme.js";
import { useTheme } from '@mui/material/styles';
import StatBox from '../../components/StatBox';
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import LineChart from '../../components/LineChart';

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const styles ={
    item :{
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
        <Header title='Panel de control' subTitle='Bienvenido a tu panel de control'/>
        <Box>
          <Button 
            variant="contained"
            startIcon={<DownloadOutlinedIcon />}
            sx = {{
              backgroundColor: theme.palette.button.main,
            }}
          >
            Download Reports
          </Button>
        </Box>
      </Box>
      <Grid
        container
        sx = {{
          marginTop: '2%',
        }}
        rowGap={1}
        columnGap={1}
      >
        {/* Row 1 */}
        <Grid 
          item 
          xs={6}
          sm={6}
          md={4}
          lg={3}
          sx = {styles.item}
        >
          <StatBox
          title="12,361"
          subtitle="Emails Sent"
          progress="0.75"
          increase="+14%"
          icon = {
            <EmailIcon 
              sx = {{
                color: colors.blueAccent[400],
                fontSize: '3rem',
              }}
            />
          }
          />
        </Grid>
        <Grid 
          item 
          xs={6}
          sm={6}
          md={4}
          lg={3}
          sx = {styles.item}
        >
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.blueAccent[400], fontSize: "26px" }}
              />
            }
          />
        </Grid>
        <Grid 
          item 
          xs={6}
          sm={6}
          md={4}
          lg={3}
          sx = {styles.item}
        >
          <StatBox
          title="12,361"
          subtitle="Emails Sent"
          progress="0.75"
          increase="+14%"
          icon = {
            <EmailIcon 
              sx = {{
                color: colors.blueAccent[400],
                fontSize: '3rem',
              }}
            />
          }
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={8}
          sx = {styles.item}
        >
          <Box
            display="flex "
            alignItems="flex-start"
            flexDirection='column'
            width='100%'
            height='100%'
          >
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              width='100%'
            >
              <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
              >
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.blueAccent[100]}
                >
                  Revenue Generated
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.redAccent[300]}
                >
                  $59,342.32
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlinedIcon
                    sx={{ fontSize: "26px", color: colors.blueAccent[300] }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box height="220px" width='100%'>
              <LineChart isDashboard={true} />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={3}
          lg={3}
          sx = {styles.item}
        >
          <Box
            display="flex"
            flexDirection={"column"}
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard