import { React, useState, useContext } from 'react';
import AdminHeader from '../header-sidebar/AdminHeader';
import AdminSideBar from '../header-sidebar/AdminSideBar';
import { ValAuthContext } from '../context/ValContext';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box, Divider, Toolbar, Tooltip } from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import AddIcon from '@mui/icons-material/Add';
import DialogBox from '../Actions/DialogBox';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { GET_BRAND_LIST, getBrandList, getDataList } from '../../redux/actions/EcommerceAction';
import DeleteDialog from '../Actions/DeleteDialog';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
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
import Button from '@mui/material/Button';
import '../css/Pagination.css';
import '../css/Add-Brand.css';
import '../css/All-Products.css';
import { useQuery } from 'react-query';

const useStyles = makeStyles(theme => ({
  hover: {
    background: 'white',
    '&:hover': {
      background: 'rgb(245 250 255)',
    },
  }
}));

const AllBrands = () => {
  const val = useContext(ValAuthContext);
  const dispatch = useDispatch();

  const classes = useStyles();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState('');
  const [action, setAction] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const brandList = useSelector((state) => state.EcommerceReducer.brandList);
  const brandLastPage = useSelector((state) => state.EcommerceReducer.brandlastpage);
  const [deleteItem, setDeleteItem] = useState({ id: '', lastPage: brandLastPage, openDeleteDialog: false });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const fetchData = async () => {
    dispatch(getDataList(`getbrand?page=${currentPage === 0 ? 1 : currentPage}`, GET_BRAND_LIST, val.setOpenLoader));
  };
  const query = useQuery(['brand', currentPage], fetchData);
  const fetchData1 = async () => {
    if (currentPage > brandLastPage && currentPage != 1) {
      dispatch(getDataList(`getbrand?page=${brandLastPage}`, GET_BRAND_LIST, val.setOpenLoader))
      
    }
  };
  const query1 = useQuery(['brandLastPage', (currentPage > brandLastPage && currentPage != 1)], fetchData1);
  return (
    <>

      <SnackBar status={val.status} message={val.message} error={val.error} setStatus={val.setStatus} />
      {open ? <DialogBox obj={{ open: open, setOpen: setOpen, path: location.pathname, name: 'Brand', editItem: editItem, action: action, currentPage: currentPage == 0 ? 1 : currentPage }} /> : null}
      {deleteItem?.openDeleteDialog ? <DeleteDialog deleteItem={deleteItem} setDeleteItem={setDeleteItem} /> : null}
      {val.openLoader ? <Loader obj={{ openLoader: val.openLoader, setOpenLoader: val.setOpenLoader }} /> : null}
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
              / Brands / All Brands
            </Typography>
          </Grid>
          <Grid item xs={12} md={8} lg={10} display='flex' justifyContent={'end'}>
            <Typography sx={{ mb: 2 }} variant="h6" component="div" onClick={() => {
              {
                setAction('add');
                handleClickOpen();
              }
            }}>
              <Button variant="contained" endIcon={<AddIcon />}>
                Add Brand
              </Button>
            </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent='center'>
          <Grid item xs={12} md={8} lg={10}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>No.</strong></TableCell>
                    <TableCell align="left"><strong>Name</strong></TableCell>
                    <TableCell align="center"><strong>Logo</strong></TableCell>
                    <TableCell align="center"><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {brandList && brandList.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      className={classes.hover}
                    >
                      <TableCell component="th" scope="row">
                        <strong>{index + 1}</strong>
                      </TableCell>
                      <TableCell align="left" className='w-25'>{item?.name}</TableCell>
                      <TableCell align="left">
                        {
                          <Box style={{ display: 'flex', justifyContent: 'flex-start', height: '50px', width: '50px', display: 'block', margin: 'auto' }}>
                            {item?.image ? <img src={`${process.env.REACT_APP_BRAND_IMAGE_URL}${item?.image}`} alt="image" className='h-100 w-100' /> : "-"}
                          </Box>
                        }
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title='Delete'>
                          <IconButton edge="end" aria-label="delete" style={{ color: '#ff6363' }} onClick={() => {
                            setDeleteItem({ id: item?.id, lastPage: brandLastPage, openDeleteDialog: true, name: 'brand' });
                          }
                          }>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Edit'>
                          <IconButton edge="end" aria-label="Edit" style={{ marginLeft: '10px', color: '#4a4af3' }} onClick={
                            () => {
                              setAction('edit');
                              setEditItem(item);
                              handleClickOpen();
                            }
                          }>
                            <ModeIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={'16'}>
                      {
                        brandLastPage > 1 ? <List>
                          <ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Stack>
                              <Pagination siblingCount={0} boundaryCount={0} count={brandLastPage} page={currentPage || 1} color="primary" variant="outlined" onChange={(event, value) => setCurrentPage(value)} />
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

export default AllBrands
