import React from 'react'
import { Box, Stack } from '@mui/material'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

//Icons
import ApartmentIcon from '@mui/icons-material/Apartment';
import InventoryIcon from '@mui/icons-material/Inventory';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
//Theme
import { tokens } from "../../theme.js";
import { useTheme } from '@mui/material/styles';
import Inventory from './inventory.jsx';

function Index() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //Dialog
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      paddingY={2}
      display='flex'
    >
      {/* Tabs vertical */}
      <TabContext value={value}>
        <Box>
          <Box sx={{ borderRight: 1, borderColor: 'divider' }}  >
            <TabList onChange={handleChange} aria-label="lab API tabs example"
              orientation="vertical"
            >
              <Tab icon={<InventoryIcon />} iconPosition="start" label="Inventario" value={'1'} />
              <Tab icon={<DisplaySettingsIcon />} iconPosition="start" label="Historial" value={'2'} />
              <Tab icon={<AutoAwesomeMotionIcon />} iconPosition="start" label="Abastecimiento" value={'3'} />
            </TabList>
          </Box>
        </Box>
        {/* Content */}
        <Box
          width={'100%'}
        >
          <TabPanel value={'1'}
            sx={{
              width: '100%',
            }}
          >
            <Inventory />
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  )
}

export default Index