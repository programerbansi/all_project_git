import { GET_REPORTED_ITEMS, getDataList, getReportedItems } from '../../redux/actions/EcommerceAction';
import { React, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import AdminHeader from '../header-sidebar/AdminHeader';
import AdminSideBar from '../header-sidebar/AdminSideBar';
import { ValAuthContext } from '../context/ValContext';
import { Divider, Grid, Toolbar } from '@mui/material';
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
import SnackBar from '../Actions/SnackBar';

const useStyles = makeStyles(theme => ({
    hover: {
        background: 'white',
        '&:hover': {
            background: 'rgb(245 250 255)',
        },
    }
}));

const ReportedItems = () => {

    const val = useContext(ValAuthContext);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [currentPage, setCurrentPage] = useState(1);

    let reportedItems = useSelector((state) => state.EcommerceReducer.reportedItems);
    let reportedItemlastpage = useSelector((state) => state.EcommerceReducer.reportedItemlastpage);

    let listLoaded = false;

    useEffect(() => {
        if (!listLoaded) {
            dispatch(getDataList(`admin/get_all_report?page=${currentPage}`,GET_REPORTED_ITEMS, val.setOpenLoader));
            return(()=>{listLoaded = true;})
        }
    }, [currentPage])

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
                            / Products / Reported Products
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ListItem alignItems="flex-start" sx={{ paddingLeft: '0px' }}>
                            <Typography variant="h6" component="div">
                                Reported Products
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
                                        <TableCell><strong>Report reason</strong></TableCell>
                                        <TableCell><strong>Report comment</strong></TableCell>
                                        <TableCell><strong>Reported by</strong></TableCell>
                                        <TableCell><strong>Reported ad</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reportedItems && reportedItems.map((item, index) => (
                                        <TableRow
                                            key={item.id}
                                            className={classes.hover}
                                        >
                                            <TableCell component="th" scope="row">
                                                <strong>{index + 1}</strong>
                                            </TableCell>
                                            <TableCell>{item?.report}</TableCell>
                                            <TableCell>{item?.report_reason}</TableCell>                                           
                                            <TableCell>{item?.users?.name}</TableCell>                                            
                                            <TableCell>{item?.items?.name}</TableCell>
                                        </TableRow>
                                    ))}
                                    {
                                        reportedItemlastpage > 1 && <TableRow>
                                            <TableCell colSpan={'16'}>
                                                <List>
                                                    <ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                        <Stack>
                                                            <Pagination siblingCount={0} boundaryCount={0} count={reportedItemlastpage} color="primary" variant="outlined" onChange={(event, value) => setCurrentPage(value)} page={currentPage || 1} />
                                                        </Stack>
                                                    </ListItem>
                                                </List>

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

export default ReportedItems
