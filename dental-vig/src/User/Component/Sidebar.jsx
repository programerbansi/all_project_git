import Button from "./InputFunction/Button";
import { NavLink, useNavigate } from 'react-router-dom';
import { getLoggedInUser, getMobileNo, getUserRole, getUserToken } from '../../services/LocalStorageUser';
import { AD_POST, BOOKMARK, DASHBOARD, DETAIL_PAGE, MESSAGE, MY_ADS, PROFILE, SETTINGS, USER_LOGIN, USER_MESSAGE_LIST, USER_REGISTER, USER_SIGNUP, VIEW_ALL_NOTIFICATION } from '../../services/UserRoutePath';
import { GET_USER_WISHLIST, GetUserWishList, getDatas, userLogout } from '../../redux/actions/UserEcommerceAction';
import { useDispatch } from 'react-redux';
import React, { useState, useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { UserValAuthContext } from "./Context/UserValContext";
import { app_name } from "../../services/LocalStorage";
import { list, ListItems, SidebarList } from "./CompServices/Comp";
import { Avatar } from "@mui/material";
import VerifyNumber from "./Modal/VerifyNumber";

const Sidebar = ({ toggleSideBar, setToggleSideBar, like, setNotificationCount, notificationCount, setMsg_NotificationCount, msg_notificationCount }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    let token = getUserToken();
    const mobile = getMobileNo();
    const user_detail = getLoggedInUser();
    const val = useContext(UserValAuthContext);
    const dispatch = useDispatch();

    const [openVerifyModal,setOpenVerifyModal] = useState(false);
    const showSubList = (num) => {
        var id = document.getElementById(`list${num}`);
        for (let i = 1; i <= 5; i++) {
            var listId = document.getElementById(`list${i}`);
            if (i == num) continue
            else if (listId.classList.contains('d-block')) {
                listId.classList.remove('d-block');
                listId.classList.add('d-none');
            }
        }
        if (id.classList.contains('d-block')) {
            id.classList.remove('d-block');
            id.classList.add('d-none');
        }
        else if (!id.classList.contains('d-block')) {
            id.classList.remove('d-none');
            id.classList.add('d-block');
        }
    }
    const handleClick = () => {
        if (user_detail && user_detail?.role == "user") navigate(AD_POST)
        else if (user_detail && user_detail?.role == "user" && !mobile)  setOpenVerifyModal(true);
        else navigate(USER_LOGIN)
        setToggleSideBar(false)
    }
    const handleLogout = () => {
        const formdata = new FormData();
        formdata.append('id', user_detail?.id);
        setLoading(true);
        dispatch(getDatas(`user/getwishlistCreatedByUser/${user_detail?.id}`,GET_USER_WISHLIST));
        dispatch(userLogout(formdata, navigate, setLoading, user_detail?.id));
        setToggleSideBar(false);
    }
    return (
        <>
            <VerifyNumber open={openVerifyModal} setOpen={setOpenVerifyModal} />
            <aside className={`sidebar-part ${toggleSideBar ? 'active' : ''}`}>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <div className="sidebar-body">
                    <div className="sidebar-header">
                        <NavLink to='/' className="sidebar-logo " onClick={() => setToggleSideBar(false)}>
                            <img src="/images/main-logo1.png" alt="logo" className='w-100' />
                        </NavLink>
                        <button className="sidebar-cross" onClick={() => setToggleSideBar(false)}><i className="fas fa-times" /></button></div>
                    <div className="sidebar-content">
                        <div className="sidebar-profile">
                             <div className={user_detail ? 'd-block' : 'd-none'}>
                                <NavLink to={user_detail ? PROFILE : USER_SIGNUP} className="sidebar-avatar" onClick={() => setToggleSideBar(false)}>
                                    {user_detail?.image ? <img src={`${process.env.REACT_APP_USER_IMAGE_URL}${user_detail?.image}`} alt="avatar" /> : <Avatar style={{ height: '114px', width: '114px' }}>{user_detail?.name?.split(" ")[0]?.charAt(0)?.toUpperCase()}{user_detail?.name?.split(" ")[1]?.charAt(0)?.toUpperCase()}</Avatar>}
                                </NavLink>
                            </div>

                            <h4 className={user_detail ? 'd-block' : 'd-none'}>
                                <NavLink to={user_detail ? PROFILE : USER_SIGNUP} className="sidebar-name" onClick={() => setToggleSideBar(false)}>
                                    {!user_detail
                                        ? <span>Join me</span> :
                                        <span>{user_detail?.name}</span>
                                    }
                                </NavLink>
                               
                            </h4>
                            <Button name="post your ad" icon="fas fa-plus-circle" type="submit" link="" className="btn btn-inline post-btn" event={handleClick} />

                        </div>
                        <div className="sidebar-menu">
                            <ul className="nav nav-tabs">
                                <li><a href="#main-menu" className="nav-link active" data-toggle="tab">Main Menu</a></li>
                                <li><a href="#author-menu" className="nav-link" data-toggle="tab">Author Menu</a></li>
                            </ul>
                            <div className="tab-pane active" id="main-menu">
                                <ul className="navbar-list">
                                    <li className="navbar-item"><NavLink to="/" className="navbar-link" onClick={() => setToggleSideBar(false)}>Home</NavLink></li>
                                    <li className="navbar-item navbar-dropdown" onClick={() => showSubList('1')}><a className="navbar-link" href="#" ><span>Categories</span><i className="fas fa-plus" /></a>
                                        <ul className="dropdown-list" id='list1'>
                                            <li><a className="dropdown-link" href="#">category list</a></li>
                                            <li><a className="dropdown-link" href="#">category details</a></li>
                                        </ul>
                                    </li>
                                    <li className="navbar-item navbar-dropdown" onClick={() => showSubList('2')}><a className="navbar-link" href="#" ><span>Advertise
                                        List</span><i className="fas fa-plus" /></a>
                                        <ul className="dropdown-list" id='list2'>
                                            <li><a className="dropdown-link" href="#">ad list column 3</a></li>
                                            <li><a className="dropdown-link" href="#">ad list column 2</a></li>
                                            <li><a className="dropdown-link" href="#">ad list column 1</a></li>
                                        </ul>
                                    </li>
                                    <li className="navbar-item navbar-dropdown" onClick={() => showSubList('3')}><a className="navbar-link" href="#"><span>Advertise
                                        details</span><i className="fas fa-plus" /></a>
                                        <ul className="dropdown-list" id='list3'>
                                            <li><a className="dropdown-link" href="#">ad details grid</a></li>
                                            <li><a className="dropdown-link" href="#">ad details left</a></li>
                                            <li><a className="dropdown-link" href="#">ad details right</a></li>
                                        </ul>
                                    </li>
                                    <li className="navbar-item navbar-dropdown" onClick={() => showSubList('4')}><a className="navbar-link" href="#"><span>Pages</span><i className="fas fa-plus" /></a>
                                        <ul className="dropdown-list" id='list4'>
                                            <li><a className="dropdown-link" href="#">About Us</a></li>
                                            <li><a className="dropdown-link" href="#">Ad Compare</a></li>
                                            <li><a className="dropdown-link" href="#">Ad by Cities</a></li>
                                            <li><a className="dropdown-link" href="#">Pricing Plan</a></li>
                                            <li><a className="dropdown-link" href="#">User Form</a></li>
                                            <li><a className="dropdown-link" href="#">404</a></li>
                                        </ul>
                                    </li>
                                    <li className="navbar-item navbar-dropdown" onClick={() => showSubList('5')}><a className="navbar-link" href="#"><span>blogs</span><i className="fas fa-plus" /></a>
                                        <ul className="dropdown-list" id='list5'>
                                            <li><a className="dropdown-link" href="#">Blog list</a></li>
                                            <li><a className="dropdown-link" href="#">blog details</a></li>
                                        </ul>
                                    </li>
                                    <li className="navbar-item"><a className="navbar-link" href="#">Contact</a></li>
                                </ul>
                            </div>

                            <div className="tab-pane" id="author-menu">
                                <ul className="navbar-list">
                                    {
                                        list.map((item, index) => <li key={index} className='navbar-item'><NavLink state={{ sidebar: true }} className='navbar-link' onClick={() => setToggleSideBar(false)} to={user_detail ? item.path : USER_SIGNUP}>{item.name}</NavLink></li>)
                                    }
                                    
                                    <li className="navbar-item navbar-dropdown">
                                        <NavLink state={{ sidebar: true }} className="navbar-link" to={user_detail ? BOOKMARK : USER_SIGNUP} onClick={() => setToggleSideBar(false)}><span>Bookmark</span><span>{like?.length}</span></NavLink>

                                      </li>
                                    <li className="navbar-item navbar-dropdown">
                                        <NavLink state={{ prevPath: DETAIL_PAGE, sidebar: true }} to={user_detail ? MESSAGE : USER_SIGNUP} className='navbar-link' onClick={() => setToggleSideBar(false)}><span>Message</span><span>{msg_notificationCount}</span></NavLink>

                                       
                                    </li>
                                    <li className="navbar-item navbar-dropdown">
                                        <NavLink state={{ sidebar: true }} to={user_detail ? VIEW_ALL_NOTIFICATION : USER_SIGNUP} className='navbar-link' onClick={() => setToggleSideBar(false)}><span>Notification</span><span>{val?.notificationCount}</span></NavLink>

                                       
                                    </li>
                                    {user_detail && <li className="navbar-item">
                                        <button id='logout' type="button" className="navbar-link border-0 text-danger w-100" onClick={handleLogout}>Logout</button>
                                    </li>}
                                </ul>
                            </div>
                        </div>
                        <div className="sidebar-footer">
                            <p>All Rights Reserved By <a href="#">{app_name}</a></p>
                            <p>Developed By <a href="https://cuotainfotech.com/" target="_blank" rel="noopener noreferrer">Cuotainfotech</a></p>
                        </div>
                    </div>
                </div>
            </aside>
            
        </>
    )
}

export default React.memo(Sidebar)