import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { GetUserWishList, userLogout } from '../../../redux/actions/UserEcommerceAction';
import { getLoggedInUser, removeLoggedInUser, removeUserRole, removeUserToken } from '../../../services/LocalStorageUser'
import Button from '../InputFunction/Button';
import AddPostTabs from './AddPostTabs'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { SETTINGS } from '../../../services/UserRoutePath';
import RightAds from '../Advertisement/RightAds';
import LeftAds from '../Advertisement/LeftAds';
const Profile = ({left_ads,right_ads}) => {
    const user_detail = getLoggedInUser();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const handleLogout = () => {
        const formdata = new FormData();
        formdata.append('id', user_detail?.id);
        setLoading(true);
        // dispatch(GetUserWishList(user_detail?.id));
        dispatch(userLogout(formdata, navigate, setLoading, user_detail?.id));
    }
    const obj=[
        {title:"Full Name",data:user_detail?.name},
        {title:"Email",data:user_detail?.email},
        {title:"Mobile No",data:user_detail?.phone},
        {title:"Joined Date",data:user_detail?.created_at.substring(0, 10)},
    ]
    return (
        <div style={{backgroundColor:"#f0f0f0"}}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <AddPostTabs />
            <section className="profile-part pt-5">
                <div className='container-fluid'>

                    <div className='row'>

                        <div className='col'>
                            <LeftAds left_ads={left_ads} />
                        </div>                     
                        <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="account-card">
                                <div className="account-title">
                                    <h3>Profile</h3><NavLink to={SETTINGS}>Edit</NavLink>
                                </div>
                                <ul className="account-card-list">
                                    {obj && obj.map((i,idx)=>{
                                        return   <li key={idx}>
                                        <h5>{i.title}</h5>                                   
                                        <p>{i.data}</p>
                                    </li>
                                    })}
                                    <li>
                                        <h5></h5>
                                        <p><Button type="submit" className="btn btn-inline bg-danger border-danger py-1 px-2" name="Logout" event={handleLogout} /></p>
                                    </li>
                                </ul>
                            </div>
                           
                        </div>
                    </div>
              
                        </div>
                        <div className='col'>
                            <RightAds right_ads={right_ads} />
                        </div>

                    </div>
                </div>
              
            </section>
        </div>
    )
}

export default Profile
