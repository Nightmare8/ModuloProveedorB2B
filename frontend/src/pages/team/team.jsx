import Header from '../../components/Header'
import { Box, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { ColorModeContext, tokens } from "../../theme";
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import {mockDataTeam} from './../../data/mockData.js'
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

const CustomToolbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton 
        sx = {{
          color: colors.grey[100],
        }}
      />
      <GridToolbarFilterButton 
        sx = {{
          color: colors.grey[100],
        }}
      />
      <GridToolbarDensitySelector 
        sx = {{
          color: colors.grey[100],
        }}
      />
      <GridToolbarExport
        sx = {{
          color: colors.grey[100],
        }}
      />
    </GridToolbarContainer>
  )
}

function Team() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const columns = [
    {
      field: "id", headerName: "ID"
    },
    {
      field: 'name', headerName: 'Name', flex: 1, cellClassName: 'name-column--cell'
    },
    {
      field: 'email', headerName: 'Email', flex: 1
    },
    {
      field: 'phone', headerName: 'Phone Number', flex: 1
    },
    {
      field: 'access', headerName: 'Access Level', flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'company', headerName: 'Company',
    }
  ];
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='flex-start'
      paddingLeft={2}
      paddingRight={2}
    >
      <Header title='Team' subTitle='Managin team members'/>
      <Box
        width='100%'
        marginTop={2}
        sx = {{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[100],
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
          },
        }}
      >
        <DataGrid 
          rows = {mockDataTeam}
          columns = {columns}
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      </Box>
    </Box>
  )
}

export default Team