import { React, useContext } from 'react'
import { ValAuthContext } from '../context/ValContext'
import { useLocation, useNavigate } from 'react-router-dom'
import AdminHeader from '../header-sidebar/AdminHeader'
import AdminSideBar from '../header-sidebar/AdminSideBar'
import List from '@mui/material/List'
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import { Card, CardContent, Divider, Grid, Tooltip,Toolbar, Typography } from '@mui/material'
import Box from '@mui/material/Box';
import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import HomeIcon from '@mui/icons-material/Home'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import '../css/User-Detail.css'
import Moment from 'react-moment'
import { ALL_USERS } from '../../services/AdminRoutePath'

const UserDetail = () => {
    const val = useContext(ValAuthContext);
    let location = useLocation();
    const navigate  = useNavigate();
    const [user, setUser] = useState(location?.state)
    return (
        <>
            <AdminHeader />
            <AdminSideBar />
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
                <Grid container spacing={3} >
                    <Grid item xs={6}>
                        <ListItem alignItems="flex-start" sx={{ paddingLeft: '0px'}}>
                            <Typography variant="h6" component="div">
                                <Tooltip title='Go Back' sx={{marginRight:'8px',marginLeft:'0px'}}>
                                    <IconButton edge="end" aria-label="Add" style={{ marginLeft: '10px', color: 'secondary' }} onClick={()=>{
                                       navigate(ALL_USERS) 
                                    }}>
                                        <KeyboardBackspaceIcon />
                                    </IconButton>
                                </Tooltip>
                                User Detail
                            </Typography>
                        </ListItem>
                    </Grid>
                    <Grid item xs={6} display='flex' justifyContent={'end'}>
                        <HomeIcon sx={{ mt: 1, mr: 2, mb: 1, color: 'rgb(25 118 210)' }} />
                        <Typography sx={{ mt: 1, letterSpacing: '1px' }} variant='h6'>
                            / All Users / User-Detail
                        </Typography>
                    </Grid>
                    <Grid item lg={5} md={6} sm={12} xs={12} >
                        <Card sx={{ px: 3, py: 1 }} style={{ background: 'linear-gradient(160deg, #1976d2 1%, rgba(0, 0, 0, 0)40%)' }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Avatar
                                    alt={user.email}
                                    src={`${process.env.REACT_APP_USER_IMAGE_URL}/${user.image}`}
                                    sx={{ width: 100, height: 100, display: 'flex', marginLeft: 'auto', marginRight: 'auto' }}
                                />
                                <Divider sx={{ marginTop: 1 }} />
                                <Typography className='mt-3'><strong>Name</strong></Typography>
                                {/* <Typography>{user?.firstname && user?.lastname ? (user?.firstname + ' ' + user?.lastname) : '--'}</Typography> */}
                                <Typography>{user?.name ? (user?.name) : '--'}</Typography>
                                <Divider sx={{ marginTop: 1 }} />
                                <Typography className='mt-3'><strong>Date of Birth</strong></Typography>
                                <Typography>{user?.dob ? user.dob : '--'}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={7} md={6} sm={12} xs={12} >
                        <Grid item xs={12} margin='10px'>
                            <Card sx={{ px: 3, py: 0 }}>
                                <CardContent sx={{ textAlign: 'start' }}>
                                    <Typography sx={{wordBreak:'break-word'}}><strong>Email Id</strong> : {user?.email ? user?.email : '--'}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} margin='10px'>
                            <Card sx={{ px: 3, py: 0 }}>
                                <CardContent sx={{ textAlign: 'start' }}>
                                    <Typography><strong>Phone-Number</strong> : {user?.phone ? user.phone : '--'}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} margin='10px'>
                            <Card sx={{ px: 3, py: 0 }}>
                                <CardContent sx={{ textAlign: 'start' }}>
                                    <Typography><strong>Address</strong> : {user?.address ? user.address : '--'}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} margin='10px' marginBottom='0px'>
                            <Card sx={{ px: 3, py: 0 }}>
                                <CardContent sx={{ textAlign: 'start' }}>
                                    <Typography><strong>Pincode</strong> : {user?.pincode ? user.pincode : '--'}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Card sx={{ px: 3, py: 1 }}>
                            <CardContent sx={{ textAlign: 'start' }}>
                                <Typography className=''><strong>State : </strong>{user?.state?.name ? user?.state?.name : '--'}</Typography>
                                <Divider sx={{ marginTop: 1 }} />
                                <Typography className=''><strong>City : </strong>{user?.citi?.name ? user?.citi?.name: '--'}</Typography>
                                <Divider sx={{ marginTop: 1 }} />
                                <Typography className='mt-3'><strong>Account created at : </strong>{user?.updated_at ? (<Moment>{user?.updated_at}</Moment>) : '--'}</Typography>
                                <Divider sx={{ marginTop: 1 }} />
                                <Typography className=''><strong>Last LoggedIn : </strong>{user?.last_login ? (<Moment>{user?.last_login}</Moment>) : '--'}</Typography>
                                <Divider sx={{ marginTop: 1 }} />
                                <Typography component={"div"} className='mt-3'><strong>Email verification : </strong>{user?.is_email_verified ?
                                    <Box sx={{ display: 'inline', backgroundColor: 'green', padding: '5px', borderRadius: '8px', color: 'white', marginLeft: '10px', textAlign: 'center', paddingBottom: '0px' }}>verified</Box>
                                    :
                                    <Box sx={{ display: 'inline', backgroundColor: '#ffe004', padding: '5px', borderRadius: '8px', color: '#858585', marginLeft: '10px', textAlign: 'center', paddingBottom: '0px' }}>pending</Box>}
                                </Typography>
                                <Divider sx={{ marginTop: 1 }} />
                                <Typography component={"div"} className='mt-3'><strong>Profile Completion : </strong>{user?.is_profile_completed ?
                                    <Box sx={{ display: 'inline', backgroundColor: 'green', padding: '5px', borderRadius: '8px', color: 'white', marginLeft: '10px', textAlign: 'center', paddingBottom: '0px' }}>completed</Box>
                                    :
                                    <Box sx={{ display: 'inline', backgroundColor: '#ffe004', padding: '5px', borderRadius: '8px', color: '#858585', marginLeft: '10px', textAlign: 'center', paddingBottom: '0px' }}>pending</Box>}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </List>
        </>
    )
}

export default UserDetail