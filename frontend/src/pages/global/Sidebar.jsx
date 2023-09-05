import { Link, NavLink } from 'react-router-dom';
import { Sidebar as SideBar2, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { ColorModeContext, tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import InventoryIcon from '@mui/icons-material/Inventory';
import ArticleIcon from '@mui/icons-material/Article';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useState } from 'react';
//Img User
import ImgUser from './../../assets/user.png';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      component={<NavLink to={to} />}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>

    </MenuItem>
  );
};

function Sidebar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  //Which component is selected
  const[selected, setSelected] = useState('dashboard');
  return (
    <Box 
      sx={{ 
        background: `${colors.primary[400]}`,
      }}

    >
      <SideBar2 
      collapsed={isCollapsed}
      backgroundColor={colors.primary[400]}
      transitionDuration={100}
      rootStyles={{
        borderRightStyle: 'none',
      }}
      >
        <Menu  
          menuItemStyles={{
            icon:{
              backgroundColor: 'transparent',
            },
            button: {
              padding: "5px 35px 5px 20px",
              [`&.hover`]: {
                color: "#868dfb"
              },
              [`&.active`]: {
                color: '#6870fa',
              },
            },
          }} 
        >
          {!isCollapsed ? (
            <Box 
              display='flex'
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
              mt="15px"
            >
              <Typography variant='h3' color={colors.grey[100]}>
                ADMIN
              </Typography>
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)} >
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          ):(
            <Box 
              display='flex'
              justifyContent="center"
              alignItems="center"
              ml="15px"
              mt="15px"
            >
             <IconButton onClick={() => setIsCollapsed(!isCollapsed)} >
                <MenuOutlinedIcon />
              </IconButton> 
            </Box>
          )}
          {!isCollapsed &&(
            <Box mb='25px' >
              <Box display='flex' justifyContent='center' alignItems='center' >
                <img 
                  alt='profile-user'
                  width='100px'
                  height='100px'
                  src={ImgUser}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '50%',
                  }}
                />
              </Box>
              <Box textAlign='center'>
                <Typography variant='h2' color={colors.grey[100]} fontWeight='bold' sx={{
                  m: '10px 0 0 0'
                }}>
                  JP 
                </Typography>
                <Typography variant='h5' color={colors.greenAccent[500]}>
                  Vp Fancy Admin
                </Typography>
              </Box>
            </Box>
          )}
          {/* Menu Items */}
          <Box
            paddingLeft={!isCollapsed ? undefined : "10%"}
            textAlign='start'
          >
            <Item
              title="Dashboard"
              to="/home"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
            {!isCollapsed && (
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "5px 0px 5px 25px" }}
              >
                Products
              </Typography>
            )}
            <Item
              title="Supplier Catalog"
              to="/bar"
              icon={<MenuBookIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Registers"
              to="/pie"
              icon={<ArticleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Inventory"
              to="/line"
              icon={<InventoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {!isCollapsed && (
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "5px 0px 5px 25px" }}
              >
                Settings
              </Typography>
            )}
            <Item
              title="Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Company"
              to="/company"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </SideBar2>
    </Box>
  )
}

export default Sidebar