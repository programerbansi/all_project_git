import { React, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ValAuthContext } from '../context/ValContext';
import { adminLogout } from '../../redux/actions/EcommerceAction';
import { useDispatch } from 'react-redux';
import { getAdminToken } from '../../services/LocalStorage';
import LogoutIcon from '@mui/icons-material/Logout';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import '../css/Admin-Sidebar.css';
import { event } from 'jquery';

const drawerWidth = 240;

const AdminHeader = () => {

  const val = useContext(ValAuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let adminToken = getAdminToken();

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(adminLogout(adminToken, navigate))
  }

  const renderMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}><ModeEditIcon sx={{height:'16px',width:'16px',marginRight:'8px',color:'blue'}}/>Edit Profile</MenuItem>
      <MenuItem onClick={()=>{
        handleLogOut(navigate,adminToken);
        handleClose();
      }}><LogoutIcon sx={{height:'16px',width:'16px',marginRight:'8px',color:'red'}}/>LogOut</MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            width: val.mobileOpen ? { sm: `calc(100% - ${drawerWidth}px)` } : {},
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={val.handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'block' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              {renderMenu}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default AdminHeader