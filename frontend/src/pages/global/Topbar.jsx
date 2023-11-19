import { Box, IconButton, useTheme, Alert, Stack, Typography, styled, Badge, Drawer, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AppsIcon from '@mui/icons-material/Apps';
import HelpIcon from '@mui/icons-material/Help';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartDrawer from "../../components/CartDrawer";
//Menu
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//Redux state
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../state/slices/authSlice";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";


const StyledTabs = styled((Tabs))(({ theme }) => ({
  ".MuiTabs-indicator": {
    backgroundColor: theme.palette.tab.main,
  }
}));
const StyledTab = styled((Tab))(({ theme }) => ({
  fontSize: '0.9rem',
  fontWeight: 'bold',
  ".MuiTab-textColorInherit.Mui-selected": {
    color: theme.palette.tab.main,
  }
}));
function Topbar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);
  console.log("cart", cart)
  //Tab component
  const [value, setValue] = useState(0);
  const handleChange = (event ,newValue) =>{
    setValue(newValue);
  }
  //Drawer component
  const [stateOpen, setStateOpen] = useState(false);
  
  const toogleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
      return;
    }
    setStateOpen(open);
  }
  
  //Menu component 
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);
  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleClose2 = () => {
    setAnchorEl2(null);
  }
  const handleClose3 = () => {
    setAnchorEl3(null);
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  }
  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  }
  const LogOut = () => {
    dispatch(setLogout());
    navigate('/');
  }

  return (
    // Box component allow write css directly
    <Box display='flex' justifyContent='space-between' p={2}
      sx = {{
        borderBottom: `1px solid ${colors.primary[500]}`,
      }}
    >
      
      <Stack direction={'row'} spacing={2} >
        <IconButton
          id="moduls"
          aria-controls={open2 ? 'moduls' : undefined}
          aria-haspopup="true"
          aria-expanded={open2 ? 'true' : undefined}
          onClick={handleClick2}
        >
          <AppsIcon fontSize="large" />
        </IconButton>
        <Menu
          id="moduls"
          anchorEl={anchorEl2}
          open={open2}
          onClose={handleClose2}
          MenuListProps={{
            'aria-labelledby': 'moduls'
          }}
        >
          <MenuItem onClick={handleClose2}>Sistema Punto y Venta</MenuItem>
          <MenuItem onClick={handleClose2}>Modulo Proveedor</MenuItem>
        </Menu>
        {/* Icons of the business */}
        <Box
          sx = {{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" fontWeight={'bold'} color={colors.blueAccent[200]}>
            M. Proveedor
          </Typography>
        </Box>
        {/* Tabs for nav */}
        <Box
          sx = {{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <StyledTabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="primary"
          >
            <StyledTab label="Inicio" component={Link} to="/home" />
            <StyledTab label="Catalogo" component={Link} to="/catalog"/>
            <StyledTab label="Registros" component={Link} to="/register"/>
            <StyledTab label="Inventario" component={Link} to="/inventory"/>
            <StyledTab label="Compañia" component={Link} to="/company"/>
          </StyledTabs>
        </Box>
      </Stack>
      <Box sx={{display: 'flex',
      }}>
        <IconButton>
          <NotificationsActiveIcon fontSize="large"  />
        </IconButton>
        <IconButton
          size="large"
        >
          <Badge badgeContent={
            cart === null ? 0 : cart.length
          } color="error">
            <IconButton
              onClick={toogleDrawer(true)}
            >
              <ShoppingCartIcon fontSize="large" />
            </IconButton>
          </Badge>
        </IconButton>
        {/* Drawer component */}
        <CartDrawer stateOpen={stateOpen} setStateOpen={setStateOpen} toogleDrawer={toogleDrawer} />
        <IconButton
          id="setting"
          aria-controls={open3 ? 'setting' : undefined}
          aria-haspopup="true"
          aria-expanded={open3 ? 'true' : undefined}
          onClick={handleClick3}
        >
          <SettingsIcon fontSize="large"  />
        </IconButton>
        <Menu
          id="setting"
          anchorEl={anchorEl3}
          open={open3}
          onClose={handleClose3}
          MenuListProps={{
            'aria-labelledby': 'setting'
          }}
        >
          <Stack spacing={0}>
            <Typography variant="h6" fontWeight={'bold'} color={'#1364CC'}
              sx = {{
                alignSelf: 'center',
              }}
            >
              Settings
            </Typography>
            <MenuItem onClick={() => {
              handleClose3();
              navigate('/company');
            }}>Business Setting</MenuItem>
            <MenuItem onClick={handleClose3}></MenuItem>
          </Stack>
        </Menu>
        <IconButton>
          <HelpIcon fontSize="large"  />
        </IconButton>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'light' ? <LightModeIcon /> : <DarkModeIcon fontSize="large"  />}
        </IconButton>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <ManageAccountsIcon fontSize="large" />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={LogOut}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}

export default Topbar