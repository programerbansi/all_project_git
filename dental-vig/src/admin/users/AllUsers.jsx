import { React, useState, useContext } from 'react';
import AdminHeader from '../header-sidebar/AdminHeader';
import AdminSideBar from '../header-sidebar/AdminSideBar';
import { ValAuthContext } from '../context/ValContext';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Divider, Switch, Toolbar, Tooltip } from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import DialogBox from '../Actions/DialogBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { GET_USER_LIST, approveUser, getAllUserList, getBrandList, getDataList } from '../../redux/actions/EcommerceAction';
import DeleteDialog from '../Actions/DeleteDialog';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import SnackBar from '../Actions/SnackBar';
import Loader from '../Actions/Loader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import '../css/Pagination.css';
import '../css/Add-Brand.css';
import '../css/All-Products.css';
import { USER_DETAIL } from '../../services/AdminRoutePath';
import { UserValAuthContext } from '../../User/Component/Context/UserValContext';
import { useQuery } from 'react-query';

const useStyles = makeStyles(theme => ({
  hover: {
    background: 'white',
    '&:hover': {
      background: 'rgb(245 250 255)',
    },
  }
}));

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const AllUsers = () => {

  const val = useContext(ValAuthContext);
  const userVal = useContext(UserValAuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const classes = useStyles();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState('');
  const [action, setAction] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const userList = useSelector((state) => state.EcommerceReducer.userList);
  const userLastPage = useSelector((state) => state.EcommerceReducer.userlastpage);
  const [deleteItem, setDeleteItem] = useState({ id: '', lastPage: userLastPage, openDeleteDialog: false });
  const [switchChecked, setSwitchChecked] = useState(false)

  const fetchData = async () => {
    dispatch(getDataList(`admin/getuser?page=${currentPage === 0 ? 1 : currentPage}`,GET_USER_LIST, val.setOpenLoader))
};
const query = useQuery(['user', currentPage], fetchData);
const fetchData1 = async () => {
    if  (currentPage > userLastPage && currentPage != 1) dispatch(getDataList(`admin/getuser?page=${userLastPage}`,GET_USER_LIST, val.setOpenLoader))
};
const query1 = useQuery(['userLastPage',  (currentPage > userLastPage && currentPage != 1)], fetchData1);


  // let userListLoaded = false;
  // useEffect(() => {
  //   if (!userListLoaded) {
  //     if (currentPage > userLastPage && currentPage != 1) {
  //       dispatch(getDataList(`admin/getuser?page=${userLastPage}`,GET_USER_LIST, val.setOpenLoader))
  //       setCurrentPage(userLastPage)
  //     }
  //     else {
  //       dispatch(getDataList(`admin/getuser?page=${currentPage === 0 ? 1 : currentPage}`,GET_USER_LIST, val.setOpenLoader));
  //     }
  //    return(()=>{ userListLoaded = true;})
  //   }
  // }, [currentPage, (currentPage > userLastPage && currentPage != 1)]);

  const handleUserStatus = (id, status, email) => {
    const formdata = new FormData();
    formdata.append('id', id);
    formdata.append('status', status == 1 ? 0 : 1);
    formdata.append('email', email);
    dispatch(approveUser(formdata, `admin/getuser?page=${currentPage}`,GET_USER_LIST, val.setOpenLoader))
  }
  return (
    <>
      
      <SnackBar status={val.status} message={val.message} error={val.error} setStatus={val.setStatus} />
     {open ? <DialogBox obj={{ open: open, setOpen: setOpen, path: location.pathname, name: 'User', editItem: editItem, action: action, currentPage: currentPage == 0 ? 1 : currentPage }} /> :null} 
      {deleteItem.openDeleteDialog ? <DeleteDialog deleteItem={deleteItem} setDeleteItem={setDeleteItem} />:null}
      {val.openLoader ? <Loader obj={{ openLoader: val.openLoader, setOpenLoader: val.setOpenLoader }} /> :null}
      <List
        component="main"
        sx={{
          p: 3,
          width: val.mobileOpen ? { sm: `calc(100% - 200px)`, lg: `calc(100% - 400px)` } : {},
          ml: val.mobileOpen ? { sm: `${val.drawerWidth}px` } : {},
          overflowY: "auto",
        }}
      >
        <Toolbar />
        <Grid container space={1} gap={2} justifyContent={'center'}>
          <Grid item xs={12} md={8} lg={10} display='flex' justifyContent={'end'}>
            <HomeIcon sx={{ mt: 1, mr: '8px', mb: 1, color: 'rgb(25 118 210)' }} />
            <Typography sx={{ mt: 1, letterSpacing: '1px' }} variant='h6'>
              / Users / All Users
            </Typography>
          </Grid>
        </Grid>
        <Toolbar />
        <Grid container justifyContent='center'>
          <Grid item xs={12} md={8} lg={10}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>No.</strong></TableCell>
                    <TableCell align="left"><strong>Profile Image</strong></TableCell>
                    <TableCell align="left"><strong>Name</strong></TableCell>
                    <TableCell align="left"><strong>Email</strong></TableCell>
                    <TableCell align="center"><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userList && userList.map((user, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      className={classes.hover}
                    >
                      <TableCell component="th" scope="row">
                        <strong>{index + 1}</strong>
                      </TableCell>
                      <TableCell align="left">
                        <ListItemAvatar>
                          <Avatar alt={user.email}
                            src={`${process.env.REACT_APP_USER_IMAGE_URL}${user.image}`} >
                          </Avatar>
                        </ListItemAvatar>
                      </TableCell>
                      <TableCell align="left">{user?.name ? user?.name : ' -- '}</TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="center" sx={{ minWidth: '140px', paddingRight: '0px' }}>
                        <Tooltip title='Delete'>
                          <IconButton edge="end" aria-label="delete" style={{ color: '#ff6363' }} onClick={() => {
                            setDeleteItem({ id: user.id, lastPage: userLastPage, openDeleteDialog: true, name: 'user' });
                          }
                          }>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>                
                        <Tooltip title='View info.'>
                          <IconButton edge="end" aria-label="View info." style={{ marginLeft: '10px', color: 'rgb(74 157 243 / 4)' }}
                            onClick={() => {
                              navigate(USER_DETAIL, { state: user });
                            }}
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                        {
                          user?.status == 1 ?
                            <Tooltip title={'activated'}>
                              <Box sx={{ display: 'inline' }}>
                                <Switch {...label} checked={true} onChange={() => {
                                  setSwitchChecked(!switchChecked);
                                  handleUserStatus(user.id, user.status, user.email);
                                }} />
                              </Box>
                            </Tooltip>
                            :
                            <Tooltip title={'not activated'}>
                              <Box sx={{ display: 'inline' }}>
                                <Switch {...label} checked={false} onChange={() => {
                                  setSwitchChecked(!switchChecked);
                                  handleUserStatus(user.id, user.status, user.email);
                                }} />
                              </Box>
                            </Tooltip>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={'16'}>
                      {
                        userLastPage > 1 ? <List>
                          <ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Stack>
                              <Pagination siblingCount={0} boundaryCount={0} count={userLastPage} page={currentPage || 1} color="primary" variant="outlined" onChange={(event, value) => setCurrentPage(value)} />
                            </Stack>
                          </ListItem>
                        </List> : null
                      }
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>             
            </TableContainer>
          </Grid>
        </Grid>
      </List>
    </>
  )
}

export default AllUsers
