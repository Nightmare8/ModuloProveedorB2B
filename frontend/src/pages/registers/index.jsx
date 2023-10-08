import React from 'react'
import { Box, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
//Icons
import InventoryIcon from '@mui/icons-material/Inventory';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import Register from './register';
//Components

function Index() {
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //Have to fetch the dats of server
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
              <Tab icon={<InventoryIcon />} iconPosition="start" label="Registros" value={'1'} />
              <Tab icon={<DisplaySettingsIcon />} iconPosition="start" label="Historial" value={'2'} />
              <Tab icon={<AutoAwesomeMotionIcon />} iconPosition="start" label="Proveedores" value={'3'} />
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
            <Register />
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  )
}

export default Index