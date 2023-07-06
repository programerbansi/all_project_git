import React, { memo, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { GET_USER_PRODUCT, GetUserProduct, getDatas } from '../../../redux/actions/UserEcommerceAction';
import { getLoggedInUser } from '../../../services/LocalStorageUser';
import { SimpleLoader } from '../Action/SkeltonLoader';
import { AD_POST, BOOKMARK, DASHBOARD, MESSAGE, MY_ADS, MY_ORDERS, PROFILE, SETTINGS, USER_MESSAGE_LIST, VIEW_ALL_NOTIFICATION } from '../../../services/UserRoutePath';
import Avatar from '@mui/material/Avatar';
const AddPostTabs = () => {

    const [heading, setHeading] = useState('Ad-Post');
    const location = useLocation();
    const [loader, setLoader] = useState(location?.state?.sidebar);
    const dispatch = useDispatch();
    const user_detail = getLoggedInUser();

    useEffect(() => {
        window.scrollTo({ top: 200 })
    }, [heading])


    useEffect(() => {
        if (location?.state?.sidebar !== (null || false)) {
            setTimeout(() => { setLoader(false) }, 1000)
        }
    }, [location?.state?.sidebar])

    useEffect(() => {
        const headings = {
          [PROFILE]: "Profile",
          [DASHBOARD]: "Dashboard",
          [AD_POST]: "AdPost",
          [MY_ADS]: "Myads",
          [BOOKMARK]: "BookMark",
          [MESSAGE]: "Message",
          [MY_ORDERS]: "Orders",
          [SETTINGS]: "Settings",
          [VIEW_ALL_NOTIFICATION]: "Activity",
        };
      
        setHeading(headings[location.pathname]);
      }, []);
    let load=false;
    useEffect(()=>{
        if (user_detail?.role && !load) { dispatch(getDatas(`user/getitemCreated_by_user/${user_detail?.id}`,GET_USER_PRODUCT)) }
        return ()=>{load=true}
    },[])
    let userProduct = useSelector((d) => d.UserEcommerceReducer.userproduct);
    let linkArray = [
        { title: "dashboard", link: DASHBOARD, state: '' },
        { title: "ad post", link: AD_POST, state: '' },
        { title: "message", link: MESSAGE, state: { prevPath: USER_MESSAGE_LIST } },
        { title: "my ads", link: MY_ADS, state: '' },
        { title: "Orders", link: MY_ORDERS, state: '' },
        { title: "BookMark", link: BOOKMARK, state: '' },
        { title: "Profile", link: PROFILE, state: '' },
        { title: "settings", link: SETTINGS, state: '' },
        { title: "activity", link: VIEW_ALL_NOTIFICATION, state: '' },
    ]
    return (
        <>
            {loader && <SimpleLoader />}
            <div >

                <section className="single-banner dashboard-banner">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="single-content">
                                    <h2>{heading}</h2>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><NavLink to='/'>Home</NavLink></li>
                                        <li className="breadcrumb-item active" aria-current="page">{heading}</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                <section className="dash-header-part">
                    <div className="container">
                        <div className="dash-header-card">
                            <div className="row">
                                <div className="col-lg-5">
                                    <div className="dash-header-left">
                                        <div className="dash-avatar">
                                            <a style={{ height: "120px", width: "120px" }}>

                                                {!user_detail?.image ? <Avatar style={{ height: "100%", width: "100%" }}>{user_detail?.name?.split(" ")[0]?.charAt(0)?.toUpperCase()}{user_detail?.name?.split(" ")[1]?.charAt(0)?.toUpperCase()}</Avatar> : <img src={`${process.env.REACT_APP_USER_IMAGE_URL}${user_detail?.image}`} alt="avatar" style={{ height: "100%", width: "100%" }} />}

                                            </a></div>
                                        <div className="dash-intro">
                                            <h4><a href="#">{user_detail?.name}</a></h4>
                                            <h5>new seller</h5>
                                            <ul className="dash-meta">
                                                <li><i className="fas fa-phone-alt" /><span>{user_detail?.phone}</span></li>
                                                <li><i className="fas fa-envelope" /><span>{user_detail?.email}</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className="dash-header-right">
                                        <div className="dash-focus dash-list">
                                            <h2>{userProduct?.length}</h2>
                                            <p>listing ads</p>
                                        </div>
                                        <div className="dash-focus dash-book">
                                            <h2>0</h2>
                                            <p>total follower</p>
                                        </div>
                                        <div className="dash-focus dash-rev">
                                            <h2>0</h2>
                                            <p>total review</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="dash-header-alert alert fade show">
                                        <p>From your account dashboard. you can easily check &amp; view your recent orders, manage your
                                            shipping and billing addresses and Edit your password and account details.</p><button data-dismiss="alert"><i className="fas fa-times" /></button>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="dash-menu-list">
                                        <ul className='nav nav-tabs'>
                                            {
                                                linkArray && linkArray.map((i, idx) => {
                                                    return <li key={idx}><NavLink to={i.link} state={i.state} >{i.title}</NavLink></li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default memo(AddPostTabs)
