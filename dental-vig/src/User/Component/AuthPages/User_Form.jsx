import React from 'react'
import Login from './Login'
import SignUp from './SignUp'
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Register from './Register';
import { USER_LOGIN, USER_SIGNUP } from '../../../services/UserRoutePath';
import { getLoggedInUser, getUserToken } from '../../../services/LocalStorageUser';
const User_Form = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const token = getUserToken();
    const user = getLoggedInUser();
    return (
        <>
            <section className="user-form-part">
                <div className="user-form-banner">
                    <div className="user-form-content">
                        <NavLink to='/'>
                            <img src="/images/main-logo1.png" alt="logo" />
                        </NavLink>

                        <h1>Advertise your assets <span>Buy what are you needs.</span></h1>
                        <p>Biggest Online Advertising Marketplace in the World.</p>
                    </div>
                </div>
                <div className="user-form-category">
                    <div className="user-form-header">
                        <NavLink to='/'>
                            <img src="/images/main-logo1.png" alt="logo" />
                        </NavLink>
                        <NavLink to={'/'}><i className="fas fa-arrow-left" /></NavLink>
                      </div>
                    <div className="user-form-category-btn">
                        <ul className="nav nav-tabs">
                            {
                               <>
                                    <li><a href="#register-tab" className={`nav-link ${location.pathname == USER_SIGNUP ? "active" : ""}`} data-toggle="tab" onClick={() => navigate(USER_SIGNUP)}>sign up</a></li>
                                    <li><a href="#login-tab" className={`nav-link ${location.pathname == USER_LOGIN ? "active" : ""}`} data-toggle="tab" onClick={() => navigate(USER_LOGIN)}>sign in</a></li>
                                </>
                            }
                        </ul>
                    </div>
                    {
                            <>
                                <div className={`tab-pane ${location.pathname == USER_SIGNUP ? "active" : ""}`} id="register-tab">
                                    <SignUp />
                                </div>
                                <div className={`tab-pane ${location.pathname == USER_LOGIN ? "active" : ""}`} id="login-tab">
                                    <Login />
                                </div>
                            </>
                    }
                </div>
            </section>
        </>
    )
}

export default User_Form