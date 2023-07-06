import { React, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import AdminHeader from '../header-sidebar/AdminHeader';
import AdminSideBar from '../header-sidebar/AdminSideBar';
import { ValAuthContext } from '../context/ValContext';
import { Divider, Grid, Toolbar, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';
import '../css/All-Products.css';
import Loader from '../Actions/Loader';
import { useEffect } from 'react';
import { GET_ADVERTISE_LIST, approveAdvertisement, getAdvertiseList, getAllProductList, getDataList } from '../../redux/actions/EcommerceAction';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useLocation } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import AdvertiseDialog from '../Actions/AdvertiseDialog';
import SnackBar from '../Actions/SnackBar';
import DeleteDialog from '../Actions/DeleteDialog';

const useStyles = makeStyles(theme => ({
    hover: {
        background: 'white',
        '&:hover': {
            background: 'rgb(245 250 255)',
        },
    }
}));

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Advertisement = () => {
    const val = useContext(ValAuthContext);
    const dispatch = useDispatch();
    const location = useLocation();
    const classes = useStyles();

    const [currentPage, setCurrentPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [switchChecked, setSwitchChecked] = useState(false);

    const [action, setAction] = useState('');
    const [editItem, setEditItem] = useState('');

    let advertiseList = useSelector((state) => state.EcommerceReducer.advertiseList);
    let advertiselastpage = useSelector((state) => state.EcommerceReducer.advertiselastpage);
    const [deleteItem, setDeleteItem] = useState({ id: '', lastPage: advertiselastpage, openDeleteDialog: false });
    let listLoaded = false;

    useEffect(() => {
        if (!listLoaded) {
            if (currentPage > advertiselastpage && currentPage != 1) {
                dispatch(getDataList(`admin/get_all_ads?page=${advertiselastpage}`,GET_ADVERTISE_LIST, val.setOpenLoader));
                setCurrentPage(advertiselastpage);
            }
            else {
                dispatch(getDataList(`admin/get_all_ads?page=${currentPage == 0 ? 1 : currentPage}`,GET_ADVERTISE_LIST, val.setOpenLoader));
            }
           return ()=> listLoaded = true;
        }
    }, [currentPage, (currentPage > advertiselastpage && currentPage != 1)])

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleApproveAdvertise = (id) => {
        const formdata = new FormData();
        formdata.append('id', id)
        dispatch(approveAdvertisement(formdata, `admin/get_all_ads?page=${currentPage == 0 ? 1 : currentPage}`,GET_ADVERTISE_LIST, val.setOpenLoader))
    }
    return (
        <>
            <AdminHeader />
            <AdminSideBar />
            <Toolbar />
            <SnackBar status={val.status} message={val.message} error={val.error} setStatus={val.setStatus} />
            <DeleteDialog deleteItem={deleteItem} setDeleteItem={setDeleteItem} />
            <AdvertiseDialog obj={{ open: open, setOpen: setOpen, path: location.pathname, name: 'Advertise', editItem: editItem, action: action, currentPage: currentPage == 0 ? 1 : currentPage }} />
            <Loader obj={{ openLoader: val.openLoader, setOpenLoader: val.setOpenLoader }} />
            <List
                component="main"
                sx={{
                    p: 3,
                    width: val.mobileOpen ? { sm: `calc(100% - 200px)`, lg: `calc(100% - 400px)` } : {},
                    ml: val.mobileOpen ? { sm: `${val.drawerWidth}px` } : {},
                    overflowY: "auto",
                }}>
                <Grid container space={1} gap={2} justifyContent={'center'}>
                    <Grid item xs={12} md={8} lg={10} display='flex' justifyContent={'end'}>
                        <HomeIcon sx={{ mt: 1, mr: '8px', mb: 1, color: 'rgb(25 118 210)' }} />
                        <Typography sx={{ mt: 1, letterSpacing: '1px' }} variant='h6'>
                            / Advertise / All Advertise
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8} lg={10} display='flex' justifyContent={'end'}>
                        {/* <ListItem alignItems="flex-start" sx={{ paddingLeft: '0px' }}> */}
                        <Typography variant="h6" component="div" sx={{ mb: 2 }} style={{ letterSpacing: '1px' }} onClick={() => {
                            setAction('add');
                            setEditItem('');
                            handleClickOpen()
                        }}>
                            <Button variant="contained" endIcon={<AddIcon />}>
                                Add Advertise
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
                                        <TableCell><strong>Title</strong></TableCell>
                                        <TableCell><strong>Url</strong></TableCell>
                                        <TableCell><strong>Position</strong></TableCell>
                                        <TableCell><strong>Images</strong></TableCell>
                                        <TableCell><strong>Status</strong></TableCell>
                                        <TableCell><strong>Actions</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {advertiseList && advertiseList.map((item, index) => (
                                        <TableRow
                                            key={item.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            className={classes.hover}
                                        >
                                            <TableCell component="th" scope="row">
                                                <strong>{index + 1}</strong>
                                            </TableCell>
                                            <TableCell>{item?.title}</TableCell>
                                            <TableCell>{item?.url}</TableCell>
                                            <TableCell>{item?.position}</TableCell>
                                            <TableCell>
                                                <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                    <img src={`${process.env.REACT_APP_ADVERTISE_IMAGE_URL}/${item?.image}`} style={{ width: '65px', height: '65px', margin: '3px', border: '1px solid #e5dcdc' ,objectFit:'contain'}} key={index}></img>
                                                </Box>
                                                {/* <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                    {
                                                        item?.itemimage.length > 0 ? item?.itemimage.map((file, index) => <img src={`${process.env.REACT_APP_ITEMS_IMAGE_URL}/${file?.image}`} style={{ width: '45px', height: '45px', margin: '3px', border: '1px solid #e5dcdc' }} key={index}></img>) : <img src='/images/image_not1.png' style={{ width: '45px', height: '45px' }} key={index}></img>
                                                    }
                                                </Box> */}
                                            </TableCell>
                                            <TableCell sx={{ width: '70px' }}>{item?.status ?
                                                <Box sx={{ display: 'inline', backgroundColor: 'green', padding: '5px', borderRadius: '8px', color: 'white', textAlign: 'center' }}>Approved</Box>
                                                :
                                                <Box sx={{ display: 'inline', backgroundColor: '#ffe004', padding: '5px', borderRadius: '8px', color: '#858585', textAlign: 'center' }}>pending</Box>
                                            }
                                            </TableCell>
                                            <TableCell align="center" sx={{ width: '160px' }}>
                                                <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                    <Tooltip title='Delete'>
                                                        <IconButton edge="end" aria-label="delete" style={{ color: '#ff6363' }} onClick={() => {
                                                            // setCurrentPage(categoryLastPage)
                                                            setDeleteItem({ id: item.id, lastPage: advertiselastpage, openDeleteDialog: true, name: 'advertise' });
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
                                                    {
                                                        item?.status == 1 ?
                                                            <Tooltip title={'Approved status'}>
                                                                <Box sx={{ display: 'inline' }}>
                                                                    <Switch {...label} checked={true} onChange={() => {
                                                                        setSwitchChecked(!switchChecked);
                                                                        handleApproveAdvertise(item.id);
                                                                    }} />
                                                                </Box>
                                                            </Tooltip>
                                                            :
                                                            <Tooltip title={'Pending status'}>
                                                                <Box sx={{ display: 'inline' }}>
                                                                    <Switch {...label} checked={false} onChange={() => {
                                                                        setSwitchChecked(!switchChecked);
                                                                        handleApproveAdvertise(item.id);
                                                                    }} />
                                                                </Box>
                                                            </Tooltip>
                                                    }
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell colSpan={'16'}>
                                            {
                                                advertiselastpage > 1 ?
                                                    <List>
                                                        <ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                            <Stack>
                                                                <Pagination siblingCount={0} boundaryCount={0} count={advertiselastpage} color="primary" variant="outlined" onChange={(event, value) => setCurrentPage(value)} page={currentPage > advertiselastpage ? advertiselastpage : currentPage || 1} />
                                                            </Stack>
                                                        </ListItem>
                                                    </List> : null
                                            }
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            {/* <Divider />
                            {
                                advertiselastpage > 1 ?
                                    <List>
                                        <ListItem sx={{display:'flex',justifyContent:'flex-end'}}>
                                            <Stack>
                                                <Pagination siblingCount={0} boundaryCount={0} count={advertiselastpage} color="primary" variant="outlined" onChange={(event, value) => setCurrentPage(value)} page={currentPage > advertiselastpage ? advertiselastpage : currentPage || 1} />
                                            </Stack>
                                        </ListItem>
                                    </List> : null
                            } */}
                        </TableContainer>
                    </Grid>
                </Grid>
            </List>
        </>
    )
}

export default Advertisement
