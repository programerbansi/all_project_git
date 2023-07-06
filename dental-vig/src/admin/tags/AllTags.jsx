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
import { Divider, Toolbar, Tooltip } from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import AddIcon from '@mui/icons-material/Add';
import DialogBox from '../Actions/DialogBox';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { GET_TAG_LIST, getDataList, getTagList } from '../../redux/actions/EcommerceAction';
import DeleteDialog from '../Actions/DeleteDialog';
import { useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import SnackBar from '../Actions/SnackBar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import '../css/Pagination.css';
import '../css/All-Products.css';
import Loader from '../Actions/Loader';
import Button from '@mui/material/Button';
import { useQuery } from 'react-query';

const useStyles = makeStyles(theme => ({
    hover: {
        background: 'white',
        '&:hover': {
            background: 'rgb(245 250 255)',
        },
    }
}));

const AllTags = () => {

    const val = useContext(ValAuthContext);
    const tagList = useSelector((state) => state.EcommerceReducer.tagList);
    const taglastpage = useSelector((state) => state.EcommerceReducer.taglastpage);

    const classes = useStyles();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteItem, setDeleteItem] = useState({ id: '', lastPage: taglastpage, openDeleteDialog: false });
    const [editItem, setEditItem] = useState('');
    const [action, setAction] = useState('');

    const dispatch = useDispatch();
    const fetchData = async () => {
        dispatch(getDataList(`gettag?page=${currentPage == 0 ? 1 : currentPage}`,GET_TAG_LIST, val.setOpenLoader));
    };
    const query = useQuery(['tag', currentPage], fetchData);
    const fetchData1 = async () => {
        if (currentPage > taglastpage && currentPage != 1) dispatch(getDataList(`gettag?page=${taglastpage}`,GET_TAG_LIST, val.setOpenLoader))
    };
    const query1 = useQuery(['tagLastPage', (currentPage > taglastpage && currentPage != 1)], fetchData1);
    
    let tagListLoaded = false;

    // useEffect(() => {
    //     if (!tagListLoaded) {
    //         if (currentPage > taglastpage && currentPage != 1) {
    //             dispatch(getDataList(`gettag?page=${taglastpage}`,GET_TAG_LIST, val.setOpenLoader))
    //             setCurrentPage(taglastpage)
    //         }
    //         else {
    //             dispatch(getDataList(`gettag?page=${currentPage == 0 ? 1 : currentPage}`,GET_TAG_LIST, val.setOpenLoader));
    //         }
    //        return(()=>{ tagListLoaded = true;})
    //     }

    // }, [ currentPage, (currentPage > taglastpage && currentPage != 1)])

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <AdminHeader />
            <AdminSideBar />
            <SnackBar status={val.status} message={val.message} error={val.error} setStatus={val.setStatus} />
            <DialogBox obj={{ open: open, setOpen: setOpen, path: location.pathname, name: 'Tag', editItem: editItem, action: action, currentPage: currentPage == 0 ? 1 : currentPage }} />
            <DeleteDialog deleteItem={deleteItem} setDeleteItem={setDeleteItem} />
            <Loader obj={{ openLoader: val.openLoader, setOpenLoader: val.setOpenLoader }} />
            <List
                component="main"
                sx={{
                    p: 3,
                    width: val.mobileOpen ? { sm: `calc(100% - ${val.drawerWidth}px)` } : {},
                    ml: val.mobileOpen ? { sm: `${val.drawerWidth}px` } : {},
                    overflowY: "auto",
                }}
            >
                <Toolbar />
                <Grid container space={1} gap={2} justifyContent={'center'}>
                    <Grid item xs={12} md={8} lg={10} display='flex' justifyContent={'end'}>
                        <HomeIcon sx={{ mt: 1, mr: '8px', mb: 1, color: 'rgb(25 118 210)' }} />
                        <Typography sx={{ mt: 1, letterSpacing: '1px' }} variant='h6'>
                            / Tags / All Tags
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8} lg={10} display='flex' justifyContent={'end'}>
                       
                        <Typography sx={{ mb: 2 }} variant="h6" component="div" onClick={() => { setAction('add'); handleClickOpen() }}>
                            <Button variant="contained" endIcon={<AddIcon />}>
                                Add Tag
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
                                        <TableCell><strong>Name</strong></TableCell>
                                        <TableCell align="center"><strong>Actions</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tagList && tagList.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            className={classes.hover}
                                        >
                                            <TableCell component="th" scope="row">
                                                <strong>{index + 1}</strong>
                                            </TableCell>
                                            <TableCell>{item?.name}</TableCell>
                                            <TableCell align="center">
                                                <Tooltip title='Delete'>
                                                    <IconButton edge="end" aria-label="delete" style={{ color: '#ff6363' }} onClick={() => {
                                                        setDeleteItem({ id: item.id, lastPage: taglastpage, openDeleteDialog: true, name: 'tag' });
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
                                    {
                                        taglastpage > 1 && <TableRow>
                                            <TableCell colSpan={'16'}>
                                                <List>
                                                    <ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                        <Stack>
                                                            <Pagination siblingCount={0} boundaryCount={0} count={taglastpage} color="primary" onChange={(event, value) => setCurrentPage(value)} variant="outlined" page={currentPage || 1} />
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

export default AllTags
