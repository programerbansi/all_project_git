import { GET_CONTACT_ITEMS, getContactItems, getDataList, getReportedItems } from '../../redux/actions/EcommerceAction';
import { React, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import AdminHeader from '../header-sidebar/AdminHeader';
import AdminSideBar from '../header-sidebar/AdminSideBar';
import { ValAuthContext } from '../context/ValContext';
import { Button, Divider, Grid, IconButton, Toolbar, Tooltip } from '@mui/material';
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
import { approveAd, getAllProductList, rejectAd } from '../../redux/actions/EcommerceAction';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import SnackBar from '../Actions/SnackBar';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import DialogBox from '../Actions/DialogBox';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';

const useStyles = makeStyles(theme => ({
    hover: {
        background: 'white',
        '&:hover': {
            background: 'rgb(245 250 255)',
        },
    }
}));

const ContactUs = () => {

    const val = useContext(ValAuthContext);
    const dispatch = useDispatch();
    const classes = useStyles();
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState('');
    const [selectedItem, setSelectedItem] = useState('');

    let contactItems = useSelector((state) => state.EcommerceReducer.contactItems);
    let contactItemlastpage = useSelector((state) => state.EcommerceReducer.contactItemlastpage);
    const fetchData = async () => {
        dispatch(getDataList(`admin/get_all_contactus?page=${currentPage}`,GET_CONTACT_ITEMS,val.setOpenLoader));
    };
    const query = useQuery(['contact', currentPage], fetchData);
    
    const handleReply = (item) => {
        setAction('reply');
        setOpen(true);
        setSelectedItem(item?.email)
    }

    return (
        <>
           {open ? <DialogBox obj={{ open: open, setOpen: setOpen, path: location?.pathname, name: 'Contact-Us', action: action, currentPage: currentPage == 0 ? 1 : currentPage, editItem: selectedItem }} /> :null} 
            <SnackBar status={val.status} message={val.message} error={val.error} setStatus={val.setStatus} />
            <Toolbar />
            {val.openLoader ?<Loader obj={{ openLoader: val.openLoader, setOpenLoader: val.setOpenLoader }} />:null}
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
                            / Contact Us / All Contact
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ListItem alignItems="flex-start" sx={{ paddingLeft: '0px' }}>
                            <Typography variant="h6" component="div">
                                All Contact
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
                                        <TableCell><strong>Email</strong></TableCell>
                                        <TableCell><strong>Phone No</strong></TableCell>
                                        <TableCell><strong>Message</strong></TableCell>
                                        <TableCell><strong>Actions</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {contactItems && contactItems.map((item, index) => (
                                        <TableRow
                                            key={item.id}
                                            className={classes.hover}
                                        >
                                            <TableCell component="th" scope="row">
                                                <strong>{index + 1}</strong>
                                            </TableCell>
                                            <TableCell>{item?.email}</TableCell>
                                            <TableCell>{item?.phone}</TableCell>
                                            <TableCell>{item?.message}</TableCell>
                                            <TableCell>
                                                <Tooltip title='reply'>
                                                    <IconButton edge="end" aria-label="reply" style={{ color: 'rgb(25 118 210)' }} onClick={() => handleReply(item)}>
                                                        <QuickreplyIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell colSpan={'16'}>
                                            {
                                                contactItemlastpage > 1 ?
                                                    <List>
                                                        <ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                            <Stack>
                                                                <Pagination siblingCount={0} boundaryCount={0} count={contactItemlastpage} color="primary" variant="outlined" onChange={(event, value) => setCurrentPage(value)} page={currentPage || 1} />
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
                                contactItemlastpage > 1 ?
                                    <List>
                                        <ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Stack>
                                                <Pagination siblingCount={0} boundaryCount={0} count={contactItemlastpage} color="primary" variant="outlined" onChange={(event, value) => setCurrentPage(value)} page={currentPage || 1} />
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

export default ContactUs
