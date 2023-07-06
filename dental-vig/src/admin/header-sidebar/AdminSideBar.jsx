import { React, useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CategoryIcon from '@mui/icons-material/Category';
import TagIcon from '@mui/icons-material/Tag';
import BentoIcon from '@mui/icons-material/Bento';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import InventoryIcon from '@mui/icons-material/Inventory';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import PeopleIcon from '@mui/icons-material/People';
import { ValAuthContext } from '../context/ValContext';
import { useLocation, useNavigate } from 'react-router-dom';
import CampaignIcon from '@mui/icons-material/Campaign';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { ALL_PRODUCTS, ALL_CATEGORIES, ALL_BRANDS, ALL_TAGS, ALL_TYPES, ALL_USERS, ADVERTISEMENTS, REPORTED_ITEMS, CONTACT_US, SUB_CATEGORIES } from '../../services/AdminRoutePath';
import '../css/Admin-Sidebar.css';

const AdminSideBar = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
    const val = useContext(ValAuthContext);
    const [tag, setTag] = useState(false);
    const [category, setCategory] = useState(false);
    const [subCategory,setSubCategory] = useState(false)
    const [brand, setBrand] = useState(false);
    const [type, setType] = useState(false);
    const [productList, setProductList] = useState(false);
    const [userList, setUserList] = useState(false);
    const [advertisement, setAdvertisement] = useState(false);
    const [reportedItemList, setReportedItemList] = useState(false);
    const [contactUsList, setContactUsList] = useState(false);
    const { window } = props;

    useEffect(() => {

        switch (location.pathname) {
            case ALL_PRODUCTS:
                setProductList(true)
                val?.setMobileOpen(false)
                break;
            case ALL_CATEGORIES:
                setCategory(true)
                val?.setMobileOpen(false)
                break;
            case SUB_CATEGORIES:
                setSubCategory(true)
                val?.setMobileOpen(false)
                break;
            case ALL_BRANDS:
                setBrand(true)
                val?.setMobileOpen(false)
                break;
            case ALL_TAGS:
                setTag(true)
                val?.setMobileOpen(false)
                break;
            case ALL_TYPES:
                setType(true)
                val?.setMobileOpen(false)
                break;
            case ALL_USERS:
                setUserList(true)
                val?.setMobileOpen(false)
                break;
            case ADVERTISEMENTS:
                setAdvertisement(true)
                val?.setMobileOpen(false)
                break;
            case REPORTED_ITEMS:
                setReportedItemList(true)
                val?.setMobileOpen(false)
                break;
            case CONTACT_US:
                setContactUsList(true)
                val?.setMobileOpen(false)
                break;
            default:
                setTag(false);
                setBrand(false);
                setCategory(false);
                setType(false);
                setProductList(false);
                setUserList(false);
                setAdvertisement(false);
                setReportedItemList(false);
                setContactUsList(false);
                break;
        }

    }, [location.pathname])

    const drawer = (<div>
        <Toolbar>
            <ListItemText className='text-primary'>
                {/* <img src={require('../../assets/dental_logo3.png')} alt="logo" style={{width:'auto',height:'45px'}}/> */}
                <img src='/images/main-logo1.png' alt="logo" style={{ width: 'auto', height: '57px' }} />
            </ListItemText>
        </Toolbar>
        <Divider />
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">

                </ListSubheader>
            }
        >

            {/*--------------------------------- PRODUCTS COLLAPSE -------------------------------------------*/}

            <ListItemButton onClick={() => { setReportedItemList(!reportedItemList) }} style={reportedItemList ? { borderLeft: '3px solid #1976d2', backgroundColor: 'rgb(245 250 255)' } : {}}>
                <ListItemIcon style={{ color: "rgb(25 118 210)" }}>
                  <InventoryIcon/>
                </ListItemIcon>
                <ListItemText primary="Products" />
                {reportedItemList ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={reportedItemList} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => navigate(ALL_PRODUCTS)}>
                        <ListItemIcon>
                            <HorizontalRuleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Product List" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => navigate(REPORTED_ITEMS)}>
                        <ListItemIcon>
                            <HorizontalRuleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Reported Products" />
                    </ListItemButton>
                </List>
            </Collapse>


            {/*--------------------------------- TAGS ------------------------------------------ */}

            <ListItemButton onClick={() => { setTag(!tag) }} style={tag ? { borderLeft: '3px solid #1976d2', backgroundColor: 'rgb(245 250 255)' } : {}}>
                <ListItemIcon style={{ color: "rgb(25 118 210)" }}>
                    <TagIcon />
                </ListItemIcon>
                <ListItemText primary="Tages" />
                {tag ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={tag} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => navigate(ALL_TAGS)}>
                        <ListItemIcon>
                            <HorizontalRuleIcon />
                        </ListItemIcon>
                        <ListItemText primary="All Tages" />
                    </ListItemButton>
                </List>
            </Collapse>

            {/*--------------------------------- TYPES -------------------------------------------*/}

            <ListItemButton onClick={() => { setType(!type) }} style={type ? { borderLeft: '3px solid #1976d2', backgroundColor: 'rgb(245 250 255)' } : {}}>
                <ListItemIcon style={{ color: "rgb(25 118 210)" }}>
                    <BentoIcon />
                </ListItemIcon>
                <ListItemText primary="Types" />
                {type ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={type} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => navigate(ALL_TYPES)}>
                        <ListItemIcon>
                            <HorizontalRuleIcon />
                        </ListItemIcon>
                        <ListItemText primary="All Types" />
                    </ListItemButton>
                </List>
            </Collapse>

            {/*--------------------------------- CATEGORY ------------------------------------------- */}

            <ListItemButton onClick={() => { setCategory(!category) }} style={category ? { borderLeft: '3px solid #1976d2', backgroundColor: 'rgb(245 250 255)' } : {}}>
                <ListItemIcon style={{ color: "rgb(25 118 210)" }}>
                    <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Categories" />
                {category ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={category} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => navigate(ALL_CATEGORIES)}>
                        <ListItemIcon>
                            <HorizontalRuleIcon />
                        </ListItemIcon>
                        <ListItemText primary="All Categories" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => navigate(SUB_CATEGORIES)}>
                        <ListItemIcon>
                            <HorizontalRuleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sub Categories" />
                    </ListItemButton>
                </List>
            </Collapse>

            {/*---------------------------------  BRAND ------------------------------------------- */}

            <ListItemButton onClick={() => { setBrand(!brand) }} style={brand ? { borderLeft: '3px solid #1976d2', backgroundColor: 'rgb(245 250 255)' } : {}}>
                <ListItemIcon style={{ color: "rgb(25 118 210)" }}>
                    <BubbleChartIcon />
                </ListItemIcon>
                <ListItemText primary="Brands" />
                {brand ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={brand} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => navigate(ALL_BRANDS)}>
                        <ListItemIcon>
                            <HorizontalRuleIcon />
                        </ListItemIcon>
                        <ListItemText primary="All Brands" />
                    </ListItemButton>
                </List>
            </Collapse>

            {/*---------------------------------  USERS ------------------------------------------- */}

            <ListItemButton onClick={() => { setUserList(!userList) }} style={userList ? { borderLeft: '3px solid #1976d2', backgroundColor: 'rgb(245 250 255)' } : {}}>
                <ListItemIcon style={{ color: "rgb(25 118 210)" }}>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
                {userList ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={userList} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => navigate(ALL_USERS)}>
                        <ListItemIcon>
                            <HorizontalRuleIcon />
                        </ListItemIcon>
                        <ListItemText primary="All Users" />
                    </ListItemButton>
                </List>
            </Collapse>

            {/* ---------------------------------  ADVERTISEMENTS ------------------------------------------- */}

            <ListItemButton onClick={() => { setAdvertisement(!advertisement) }} style={advertisement ? { borderLeft: '3px solid #1976d2', backgroundColor: 'rgb(245 250 255)' } : {}}>
                <ListItemIcon style={{ color: "rgb(25 118 210)" }}>
                    <CampaignIcon />
                </ListItemIcon>
                <ListItemText primary="Advertise" />
                {advertisement ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={advertisement} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => navigate(ADVERTISEMENTS)}>
                        <ListItemIcon>
                            <HorizontalRuleIcon />
                        </ListItemIcon>
                        <ListItemText primary="All Advertise" />
                    </ListItemButton>
                </List>
            </Collapse>

            {/* ----------------------------------------- CONTACT US-------------------------------------------------- */}
            
            <ListItemButton onClick={() => { setContactUsList(!contactUsList) }} style={contactUsList ? { borderLeft: '3px solid #1976d2', backgroundColor: 'rgb(245 250 255)' } : {}}>
                <ListItemIcon style={{ color: "rgb(25 118 210)" }}>
                    <ContactPageIcon/>
                </ListItemIcon>
                <ListItemText primary="Contact Us" />
                {contactUsList ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={contactUsList} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => navigate(CONTACT_US)}>
                        <ListItemIcon>
                            <HorizontalRuleIcon />
                        </ListItemIcon>
                        <ListItemText primary="All Contact" />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    </div>);

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <div className={`${val.mobileOpen ? 'd-block ' : 'd-none'}`}>
            <Box
                sx={{ display: val.mobileOpen ? 'block' : 'none' }}
            >
                <CssBaseline />
                <Box
                    component="nav"
                    sx={{ width: { sm: val.drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={val.mobileOpen}
                        onClose={val.handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: val.drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: val.drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
            </Box>
        </div>
    )
}

export default AdminSideBar
