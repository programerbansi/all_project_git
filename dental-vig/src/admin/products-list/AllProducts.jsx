import { React, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import AdminHeader from '../header-sidebar/AdminHeader';
import AdminSideBar from '../header-sidebar/AdminSideBar';
import { ValAuthContext } from '../context/ValContext';
import { Button, Divider, Grid, Toolbar, Tooltip } from '@mui/material';
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
import { GET_PRODUCT_LIST, approveAd, getAllProductList, getDataList, rejectAd } from '../../redux/actions/EcommerceAction';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import SnackBar from '../Actions/SnackBar';


const useStyles = makeStyles(theme => ({
    hover: {
        background: 'white',
        '&:hover': {
            background: 'rgb(245 250 255)',
        },
    }
}));

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const AllProducts = () => {

    const val = useContext(ValAuthContext);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [currentPage, setCurrentPage] = useState(1);
    const [switchChecked, setSwitchChecked] = useState(false);

    let productList = useSelector((state) => state.EcommerceReducer.productList);
    let productLastPage = useSelector((state) => state.EcommerceReducer.productlastpage);
    let listLoaded = false;
    useEffect(() => {
        if (!listLoaded) {
            dispatch(getDataList(`getallitem?page=${currentPage}`,GET_PRODUCT_LIST, val.setOpenLoader));
           return(()=>{ listLoaded = true;})
        }
    }, [currentPage])

    const handleApproveAd = (id, status) => {
        const formdata = new FormData();
        formdata.append('id', id);
        formdata.append('status', status == 1 ? 0 : 1);
        dispatch(approveAd(formdata, `getallitem?page=${currentPage}`,GET_PRODUCT_LIST, val.setOpenLoader));
    }

    const handleRejectAd = (id) => {
        const formdata = new FormData();
        formdata.append('id', id);
        formdata.append('status', 2);
        dispatch(rejectAd(formdata, `getallitem?page=${currentPage}`,GET_PRODUCT_LIST, val.setOpenLoader, val.setMessage, val.setError, val.setStatus));
    }

    return (
        <>
            <AdminHeader />
            <AdminSideBar />
            <SnackBar status={val.status} message={val.message} error={val.error} setStatus={val.setStatus} />
            <Toolbar />
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
                    <Grid item xs={12} display='flex' justifyContent={'end'}>
                        <HomeIcon sx={{ mt: 1, mr: '8px', mb: 1, color: 'rgb(25 118 210)' }} />
                        <Typography sx={{ mt: 1, letterSpacing: '1px' }} variant='h6'>
                            / Products / Product List
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ListItem alignItems="flex-start" sx={{ paddingLeft: '0px' }}>
                            <Typography variant="h6" component="div">
                                Product List
                            </Typography>
                        </ListItem>
                    </Grid>
                    <Grid item xs={5}>
                    </Grid>
                </Grid>
                <Grid container justifyContent='center'>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>No.</strong></TableCell>
                                        <TableCell><strong>Name</strong></TableCell>
                                        <TableCell><strong>Description</strong></TableCell>
                                        <TableCell><strong>Type</strong></TableCell>
                                        <TableCell><strong>Category</strong></TableCell>
                                        <TableCell><strong>Brand</strong></TableCell>
                                        <TableCell><strong>Tags</strong></TableCell>
                                        <TableCell><strong>Price</strong></TableCell>
                                        <TableCell><strong>Condition</strong></TableCell>
                                        <TableCell><strong>State</strong></TableCell>
                                        <TableCell><strong>City</strong></TableCell>
                                        <TableCell><strong>Neighbourhood</strong></TableCell>
                                        <TableCell><strong>Status</strong></TableCell>
                                        <TableCell><strong>Images</strong></TableCell>
                                        <TableCell><strong>Approve Ad</strong></TableCell>
                                        <TableCell><strong>Reject Ad</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productList && productList.map((item, index) => (
                                        <TableRow
                                            key={item.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: item?.status == 2 ? 'rgb(247 243 243)' : 'white', pointerEvents: (item?.status == 2 || item?.status == 3) ? 'none' : '', opacity: (item?.status == 2 || item?.status == 3) ? 0.5 : 1 }}
                                            className={classes.hover}
                                        >
                                            <TableCell component="th" scope="row">
                                                <strong>{index + 1}</strong>
                                            </TableCell>
                                            <TableCell>{item?.name}</TableCell>
                                            <TableCell>{item?.description}</TableCell>
                                            <TableCell>{item?.types?.name}</TableCell>
                                            <TableCell>{item?.category?.name}</TableCell>
                                            <TableCell>{item?.brand?.name}</TableCell>
                                            <TableCell>
                                                {
                                                    <Box>
                                                        {
                                                            item?.tags.length > 0 && item?.tags.map((tag, index) => {
                                                                return <>
                                                                    {tag?.name}
                                                                    <br />
                                                                </>
                                                            })
                                                        }
                                                    </Box>
                                                }
                                            </TableCell>
                                            <TableCell>₹{new Intl.NumberFormat('en-IN').format(item?.price)}</TableCell>
                                            <TableCell>{item?.item_condition}</TableCell>
                                            <TableCell>{item?.location?.citi?.name}</TableCell>
                                            <TableCell>{item?.location?.state?.name}</TableCell>
                                            <TableCell>{item?.location?.neighbourhood}</TableCell>
                                            <TableCell>{item?.status == 1 ?
                                                <Box sx={{ display: 'inline', backgroundColor: 'green', padding: '8px', borderRadius: '8px', color: 'white', textAlign: 'center' }}>Approved</Box>
                                                :
                                                item?.status == 0 ? <Box sx={{ display: 'inline', backgroundColor: '#ffe004', padding: '8px', borderRadius: '8px', color: '#858585', textAlign: 'center' }}>pending</Box> :
                                                    item?.status == 3 ? <Box sx={{ display: 'inline', backgroundColor: 'gray', padding: '8px', borderRadius: '8px', color: '#f8f9fa', textAlign: 'center' }}>sold-out</Box> :
                                                        <Box sx={{ display: 'inline', backgroundColor: '#ff1b30', padding: '8px', borderRadius: '8px', color: '#fcfbfb', textAlign: 'center' }}>Rejected</Box>
                                            }</TableCell>
                                            <TableCell sx={{ width: '300px' }}>
                                                <Box style={{ display: 'inline-block', maxWidth: '200px' }}>
                                                    <Grid container gap={1} >
                                                        {
                                                            item?.itemimage.length > 0 ?
                                                                item?.itemimage.map((file, index) =>
                                                                    <Grid item xs={12} md={6} lg={4} key={index}>
                                                                        <img src={`${process.env.REACT_APP_ITEMS_IMAGE_URL}/${file?.image}`} style={{ width: '100%', height: '100%', border: '1px solid #e5dcdc' }} key={index}></img>
                                                                    </Grid>) :
                                                                <Grid item xs={12} md={4} lg={3} key={index}><img src={require('../Assets/image_not1.png')} style={{ width: '45px', height: '45px' }} key={index}></img>
                                                                </Grid>
                                                        }
                                                    </Grid>
                                                    {/* {
                                                        item?.itemimage.length > 0 ? item?.itemimage.map((file, index) => <img src={`${process.env.REACT_APP_ITEMS_IMAGE_URL}/${file?.image}`} style={{ width: '45px', height: '45px', margin: '3px', border: '1px solid #e5dcdc' }} key={index}></img>) : <img src='/images/image_not1.png' style={{ width: '45px', height: '45px' }} key={index}></img>
                                                    } */}
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    item?.status == 1 ?
                                                        <Tooltip title={'Approved'}>
                                                            <Box sx={{ display: 'inline' }}>
                                                                <Switch {...label} checked={true} onChange={() => {
                                                                    setSwitchChecked(!switchChecked);
                                                                    handleApproveAd(item.id, item.status);
                                                                }} />
                                                            </Box>
                                                        </Tooltip>
                                                        :
                                                        item?.status == 0 && <Tooltip title={'Approval Pending'}>
                                                            <Box sx={{ display: 'inline' }}>
                                                                <Switch {...label} checked={false} onChange={() => {
                                                                    setSwitchChecked(!switchChecked);
                                                                    handleApproveAd(item.id, item.status);
                                                                }} />
                                                            </Box>
                                                        </Tooltip>
                                                }

                                            </TableCell>
                                            <TableCell>
                                                {
                                                    (item?.status !== 2 && item?.status !== 3) && <Button variant="outlined" color="error" onClick={() => handleRejectAd(item?.id)}>
                                                        Reject
                                                    </Button>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {
                                        productLastPage > 1 && <TableRow>
                                            <TableCell colSpan={'16'}>
                                                {
                                                    productLastPage > 1 ?
                                                        <List>
                                                            <ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                <Stack>
                                                                    <Pagination siblingCount={0} boundaryCount={0} count={productLastPage} color="primary" variant="outlined" onChange={(event, value) => setCurrentPage(value)} page={currentPage || 1} />
                                                                </Stack>
                                                            </ListItem>
                                                        </List> : null
                                                }
                                            </TableCell>
                                        </TableRow>
                                    }

                                </TableBody>
                            </Table>
                           
                        </TableContainer>
                    </Grid>
                </Grid>
            </List>
        </>
    )
}

export default AllProducts
