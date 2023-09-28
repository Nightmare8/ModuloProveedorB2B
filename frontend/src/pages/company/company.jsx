import { Box } from "@mui/material"
import { useState, useEffect } from "react";
import { tokens } from "../../theme.js";
import { useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
//Icons
import ApartmentIcon from '@mui/icons-material/Apartment';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
//Views
import Settings from "./settings.jsx";
import Preferences from "./preferences.jsx";
import Products from "./products.jsx";
//User
import { useSelector } from "react-redux";
import Users from "./users.jsx";

function Company() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Get the dats of the company, and pass to the other components
  const user = useSelector((state) => state.auth.user);
  const [companyDats, setCompanyDats] = useState({
    nombre: '',
    rut: '',
    ciudad: '',
    direccion: '',
    email: '',
    detalle: '',
    datos: {
        workers: 0,
    }
  });

  useEffect(() => {
    const url = 'http://localhost:3000/company/';
    fetch(url,{
        method: 'POST',
        headers: {  'Content-Type': 'application/json'},
        body: JSON.stringify({rut: user.company})
    }).
    then(response => response.json()).
    then(data => {
        setCompanyDats(data);
    }).
    catch(error => console.log(error));
  },[])

  return (
    <Box
      paddingY={2}
      display='flex'
    >
      {/* Tabs vertical */}
      <TabContext value={value}>
      <Box>
          <Box  sx= {{borderRight: 1, borderColor: 'divider'  }}  >
            <TabList onChange={handleChange} aria-label="lab API tabs example"
              orientation="vertical"
            >
              <Tab  icon={<ApartmentIcon/>} iconPosition="start" label="Compañia" value={'1'} />
              <Tab icon={<DisplaySettingsIcon/>} iconPosition="start" label="Preferencias" value={'2'}/>
              <Tab icon={<AutoAwesomeMotionIcon/>} iconPosition="start" label="Productos" value={'3'}/>
              <Tab icon={<SupervisedUserCircleIcon/>} iconPosition="start" label="Usuarios" value={'4'} />
            </TabList>
          </Box>

      </Box>
      {/* Content */}
      <Box
        sx = {{
          width: '100%',
        }}
      >
        <TabPanel value={'1'}
          sx = {{
            width: '100%',
          }}
        >
          <Settings  companyDats={companyDats} setCompanyDats={setCompanyDats}/>
        </TabPanel>
        <TabPanel value={'2'}
          sx = {{
            width: '100%',
          }}
        >
          <Preferences companyDats = {companyDats} setCompanyDats={setCompanyDats}  />
        </TabPanel>
        <TabPanel value={'3'}
          sx = {{
            width: '100%',
          }}
        >
          <Products companyDats = {companyDats} setCompanyDats={setCompanyDats} />
        </TabPanel>
        <TabPanel value={'4'}
          sx = {{
            width: '100%',
          }}
        >
          <Users companyDats = {companyDats} setCompanyDats={setCompanyDats} />
          
        </TabPanel>
      </Box>
      </TabContext>
    </Box>
  )
}

export default Company