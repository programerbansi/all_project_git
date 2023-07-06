import { React, useState, useContext } from 'react';
import AdminHeader from '../header-sidebar/AdminHeader';
import AdminSideBar from '../header-sidebar/AdminSideBar';
import { ValAuthContext } from '../context/ValContext';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Toolbar, Tooltip } from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import AddIcon from '@mui/icons-material/Add';
import DialogBox from '../Actions/DialogBox';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { GET_SUB_CATEGORY_LIST, getCategoryList, getDataList, getSubCategoryList } from '../../redux/actions/EcommerceAction';
import { useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import '../css/Pagination.css';
import DeleteDialog from '../Actions/DeleteDialog';
import SnackBar from '../Actions/SnackBar';
import Loader from '../Actions/Loader';
import HomeIcon from '@mui/icons-material/Home';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import '../css/All-Products.css';
import { useQuery } from 'react-query';

const useStyles = makeStyles(theme => ({
    hover: {
        background: 'white',
        '&:hover': {
            background: 'rgb(245 250 255)',
        },
    },
}));

const SubCategories = () => {
    const subcategoryList = useSelector((state) => state.EcommerceReducer.subcategoryList);
    const subcategoryLastPage = useSelector((state) => state.EcommerceReducer.subcategorylastpage);

    const classes = useStyles();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteItem, setDeleteItem] = useState({ id: '', lastPage: subcategoryLastPage, openDeleteDialog: false });
    const val = useContext(ValAuthContext);

    const [editItem, setEditItem] = useState('');
    const [action, setAction] = useState('');

    const dispatch = useDispatch();
    const fetchData = async () => {
        dispatch(getDataList(`admin/getsubcat?page=${currentPage == 0 ? 1 : currentPage}`, GET_SUB_CATEGORY_LIST, val.setOpenLoader));
    };
    const query = useQuery(['subCategory', currentPage], fetchData);
    const fetchData1 = async () => {
        if (currentPage > subcategoryLastPage && currentPage != 1) dispatch(getDataList(`admin/getsubcat?page=${subcategoryLastPage}`, GET_SUB_CATEGORY_LIST, val.setOpenLoader));
    };
    const query1 = useQuery(['subCategoryLastPage', (currentPage > subcategoryLastPage && currentPage != 1)], fetchData1);
    // if (query.isLoading) {
    //     return console.log("Loading..")
    // }
    // let categoryListLoaded = false;

    // useEffect(() => {
    //     if (!categoryListLoaded) {
    //         if (currentPage > subcategoryLastPage && currentPage != 1) {
    //             dispatch(getDataList(`admin/getsubcat?page=${subcategoryLastPage}`,GET_SUB_CATEGORY_LIST, val.setOpenLoader));
    //             setCurrentPage(subcategoryLastPage);
    //         }
    //         else {
    //             dispatch(getDataList(`admin/getsubcat?page=${currentPage == 0 ? 1 : currentPage}`,GET_SUB_CATEGORY_LIST, val.setOpenLoader));
    //         }
    //     }
    //     return () => categoryListLoaded = true;
    // }, [currentPage, (currentPage > subcategoryLastPage && currentPage != 1)]);

    const handleClickOpen = () => {
        setOpen(true);
    };
    return (
        <>

            <SnackBar status={val.status} message={val.message} error={val.error} setStatus={val.setStatus} />
            {open ? <DialogBox obj={{ open: open, setOpen: setOpen, path: location.pathname, name: 'SubCategory', editItem: editItem, action: action, currentPage: currentPage == 0 ? 1 : currentPage }} /> : null}
            {deleteItem.openDeleteDialog ? <DeleteDialog deleteItem={deleteItem} setDeleteItem={setDeleteItem} /> : null}
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
                        <HomeIcon sx={{ mt: 1, mr: '4px', mb: 1, color: 'rgb(25 118 210)' }} />
                        <Typography sx={{ mt: 1, letterSpacing: '1px' }} variant='h6'>
                            / Categories / Sub Categories
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8} lg={10} display='flex' justifyContent={'end'}>
                        {/* <ListItem alignItems="flex-start" sx={{ paddingLeft: '0px' }}> */}
                        <Typography variant="h6" component="div" sx={{ mb: 2 }} style={{ letterSpacing: '1px' }} onClick={() => { setAction('add'); handleClickOpen() }}>
                            <Button variant="contained" endIcon={<AddIcon />}>
                                Add Sub Category
                            </Button>
                        </Typography>
                        {/* </ListItem> */}
                    </Grid>
                </Grid>
                <Grid container justifyContent='center'>
                    <Grid item xs={12} md={8} lg={10}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>No.</strong></TableCell>
                                        <TableCell><strong>Name</strong></TableCell>
                                        <TableCell><strong>Category</strong></TableCell>
                                        <TableCell align="center"><strong>Actions</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {subcategoryList && subcategoryList.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            className={classes.hover}
                                        >
                                            <TableCell component="th" scope="row">
                                                <strong>{index + 1}</strong>
                                            </TableCell>
                                            <TableCell align="left">{item?.name}</TableCell>
                                            <TableCell align="left">{item?.cat?.name}</TableCell>
                                            <TableCell align="center">
                                                <Tooltip title='Delete'>
                                                    <IconButton edge="end" aria-label="delete" style={{ color: '#ff6363' }} onClick={() => {                                                     
                                                        setDeleteItem({ id: item.id, lastPage: subcategoryLastPage, openDeleteDialog: true, name: 'category' });
                                                    }}>
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
                                                subcategoryLastPage > 1 ? <List>
                                                    <ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                        <Stack>
                                                            <Pagination siblingCount={0} boundaryCount={0} count={subcategoryLastPage} color="primary" variant="outlined" onChange={(event, value) => setCurrentPage(value)} page={currentPage > subcategoryLastPage ? subcategoryLastPage : currentPage || 1} />
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

export default SubCategories
