import { useContext, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { GET_USER_WISHLIST, getCurrentLocation, getDatas,  getNotifications } from "../../redux/actions/UserEcommerceAction";
import { getLoggedInUser, getSendMobile, getUserRole, getUserToken } from "../../services/LocalStorageUser";
import { AD_POST, BOOKMARK, MESSAGE, PROFILE, USER_LOGIN, USER_MESSAGE_LIST, USER_SIGNUP, VIEW_ALL_NOTIFICATION } from "../../services/UserRoutePath";
import Button from "./InputFunction/Button";
import Sidebar from "./Sidebar";
import '../Css/Header.css'
import { UserValAuthContext } from "./Context/UserValContext";
import GlobalSearch from "./InputFunction/GlobalSearch";
import useGeoLocation from "./CustomeHook/useGeoLocation";
import SellBuyNotification from "./Notification/SellBuyNotification";
import MessageNotification from "./Notification/MessageNotification";
import Avatar from '@mui/material/Avatar';
import VerifyNumber from "./Modal/VerifyNumber";
import Category_Header from "./Category_Header";
var pincodeDirectory = require('india-pincode-lookup');


const Header = () => {
    const [toggleSideBar, setToggleSideBar] = useState(false);
    const [search, setSearch] = useState(false);
    const [msg_notificationCount, setMsg_NotificationCount] = useState(0);
    const [openVerifyModal,setOpenVerifyModal] = useState(false);
    const navigate = useNavigate();
    const valContext = useContext(UserValAuthContext);
    const location = useGeoLocation(valContext.setLocationState);

    let token = getUserToken();
    let role = getUserRole();
    let user = getLoggedInUser();
    const dispatch = useDispatch();
    let load = false;

    const [selectLoc, setSelectLoc] = useState(null);
    const [selectName, setSelectName] = useState(null);
    useEffect(() => {
        if (!load && role == "user" && token) dispatch(getDatas(`user/getwishlistCreatedByUser/${user?.id}`,GET_USER_WISHLIST));
        return () => { load = true;}
    }, [])


    useEffect(() => {
        if (location.loaded == true && !location.error) {
            const formdata = new FormData();
            formdata.append('lat', location.cordinates.lat);
            formdata.append('lng', location.cordinates.lng);
            dispatch(getCurrentLocation(formdata))
        }
    }, [location, valContext.LocationState])


    const like = useSelector((d) => d.UserEcommerceReducer.userwishlist)
    useEffect(() => {
        valContext?.setheaderLikeProduct(like);
    }, [like])
    let typeList = useSelector((state) => state.UserEcommerceReducer.usertype);
    const current_loction = useSelector((d) => d.UserEcommerceReducer.curr_location)
    let arr = current_loction.split(',' && ' ');
    let pin = arr[arr?.length - 2];
    let final_pin = pin && pin.substring(0, pin.length - 1);
    var current_city = final_pin && pincodeDirectory.lookup(final_pin);
    var final_current_city = current_city && current_city[0].districtName;

    const handleClick = () => {
        if(token && (user?.mobile_otp_verified == 1)) navigate(AD_POST)
        else if(token && user?.mobile_otp_verified == 0) setOpenVerifyModal(true);
        else if(!token & !mobile) navigate(USER_SIGNUP);
    }
    const handleEnvelop = () => {
        valContext?.setShowEnvelop(!valContext.showEnvelop);
        valContext?.setShowNotify(false);
    }
    const handleNotify = () => {
        valContext?.setShowEnvelop(false);
        valContext?.setShowNotify(!valContext.showNotify)
    }

    let search_location = useSelector((d) => d.UserEcommerceReducer.location);
    let search_all_type = useSelector((d) => d.UserEcommerceReducer.allitemtype);
    const myDefaultOption = valContext.clickCurrLoc && final_current_city ? { name: final_current_city } : valContext.clickCurrLoc && !final_current_city ? { name: user?.citi?.name } : { name: "Current Location" }
    let options1 = search_location.map((option) => {
        return option
    });
    const options2 = search_all_type.map((option) => {
        return option
    });
    const mydefaultoption2 = typeList && typeList.slice(8, 13).map((option) => {
        return option
    });
  
    let pageLoaded = false;
    useEffect(() => {
        if (!pageLoaded && valContext.notifications?.length < 1) {
            valContext?.setNotificationCount(0)
            const formdata = new FormData();
            formdata.append('id', user?.id);
            dispatch(getNotifications(formdata, valContext.setNotifications));
            pageLoaded = true;
        }
    }, [pageLoaded, dispatch])

    const handleLogoClick = () => {
        valContext?.setSubHeaderType([])
        valContext?.setSubHeaderCat([])
        valContext?.setSubCatId([])
        valContext?.setFilterCategoryId([])
        valContext?.setFilterRatings([])
        valContext?.setFilterTypeId([])
        valContext?.setFilterBrandId([])
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {

                    valContext?.setShowNotify(false);
                    valContext?.setShowEnvelop(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const mobile = getSendMobile();
    return (
        <>
        <VerifyNumber open={openVerifyModal} setOpen={setOpenVerifyModal}/>
            <header className="header-part ">
                <div className="container">
                    <div className="row header-content">

                        <div className="col-1 d-lg-block d-md-none d-sm-none d-none header-col-1">
                          
                            <NavLink to='/' className="header-logo " onClick={handleLogoClick}>
                                <img src="/images/main-logo1.png" alt="logo" />
                            </NavLink>

                          
                        </div>
                        <div className="col-12  d-lg-none header-col-12 ">
                            <div className="d-flex  align-item-center justify-content-between">
                                <button type="button" className="header-widget sidebar-btn sidebar-button d-lg-none" onClick={() => setToggleSideBar(true)}><i className="fas fa-align-left" />
                                </button>
                                <NavLink to='/' className="header-logo">
                                    <img src="/images/main-logo1.png" alt="logo" />
                                </NavLink>

                                <button type="button" className="header-widget search-button search-btn" onClick={() => {
                                    if (!search) setSearch(true);
                                    else if (search) setSearch(false);
                                }}><i className={`fas fa-search ${search ? 'fa-times' : ''}`} /></button>
                            </div>
                        </div>
                        <div className={`${user ? 'col-7' : 'col-9'} d-xl-block d-none header-form ${search ? 'd-block w-100 col-12' : ''}`} style={user ? { marginLeft: "-20px" } : {}}>
                            <div className={`d-md-flex d-inline ${user ? 'mx-3' : ''}`}>
                                <div className="w-50 d-md-block d-none mx-1 mb-md-0 mb-2">
                                    <GlobalSearch
                                        id="grouped-demo"
                                        name="getLocation"
                                        options={[myDefaultOption, ...options1]}
                                        value={selectLoc}
                                        setSelectLoc={setSelectLoc}
                                        geolocation={location}
                                        current_loction={valContext.dependentLocationState == "denied" ? { name: 'Current Location' } : final_current_city}
                                         getOptionLabel={(options, value) => options.country_id ? typeof options === "string" ? options : options.name : options?.state ? typeof options === "string" ? options : options.name + " , " + options?.state?.name : typeof options === "string" ? myDefaultOption?.name : myDefaultOption?.name}
                                        label={`${(valContext.gsearchName ? valContext.gsearchName : "Location...")} `}
                                    />
                                </div>
                                <div className="w-100 d-md-none d-block mx-1 mb-md-0 mb-2">
                                    <GlobalSearch
                                        id="grouped-demo"
                                        name="getLocation"
                                        options={[myDefaultOption, ...options1]}
                                        value={selectLoc}
                                        setSelectLoc={setSelectLoc}
                                        geolocation={location}
                                        current_loction={valContext.dependentLocationState == "denied" ? { name: 'Current Location' } : final_current_city}
                                         getOptionLabel={(options, value) => options.country_id ? typeof options === "string" ? options : options.name : options?.state ? typeof options === "string" ? options : options.name + " , " + options?.state?.name : typeof options === "string" ? myDefaultOption?.name : myDefaultOption?.name}
                                        label={`${(valContext.gsearchName ? valContext.gsearchName : "Location...")} `}
                                    />
                                </div>
                                <div className="w-100 mx-1">
                                    <GlobalSearch
                                        id="grouped-demo1"
                                        name="getItemByAllType"
                                        value={selectName}
                                        setSelectName={setSelectName}
                                        options={options2?.length > 0 ? options2 : mydefaultoption2}
                                         getOptionLabel={(options) => typeof options === "string" ? options : options.name}
                                        label={`${valContext.gsearchAllName ? valContext.gsearchAllName : "Search, Whatever you needs..."}`}
                                    />
                                </div>
                                
                            </div>
                        </div>
                        <div className={`${user ? 'col-4' : 'col-2 d-lg-block d-md-none d-sm-none d-none '}`}>
                            <div className="row">
                                {user ?
                                    <div className="col-4 d-lg-block d-md-none d-sm-none d-none list-notify">
                                        <ul className="header-list " ref={wrapperRef}>
                                            <li className="header-item"><NavLink to={BOOKMARK} className="header-widget"><i className="fas fa-heart" /><sup>{like?.length}</sup></NavLink></li>
                                            <li className="header-item" >
                                                <button type="button" className="header-widget" onClick={handleEnvelop}><i className="fas fa-envelope" /><sup>{msg_notificationCount}</sup></button>
                                                <div className={`dropdown-card`} style={{ display: valContext?.showEnvelop ? "block" : "none" }}  >

                                                    <MessageNotification setMsg_NotificationCount={setMsg_NotificationCount} msg_notificationCount={msg_notificationCount} />
                                                    
                                                </div>
                                            </li>

                                            <li className="header-item"><button type="button" onClick={handleNotify} className="header-widget"><i className="fas fa-bell" /><sup>{valContext.notificationCount}</sup></button>
                                                <div className="dropdown-card" style={{ display: valContext?.showNotify ? "block" : "none" }}>
                                                   
                                                    <SellBuyNotification />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    : null}
                                <div className={`${user ? 'col-7' : 'col-12 p-0'} list-notify d-lg-block d-md-none d-sm-none d-none`}>
                                    <Button name={token ? "Post Your Ad" : "Sign up"} icon={token ? "fas fa-plus-circle" : "fas fa-user"} type="submit" link=''  className="btn btn-inline post-btn" event={handleClick} />
                                    

                                </div>
                                {user ?
                                    <div className="col-1  user-show ">
                                            <NavLink to={user ? PROFILE : USER_LOGIN} className="header-widget header-user header-user-div  user-show" >
                                                {!user?.image ? <Avatar>{user?.name?.split(" ")[0]?.charAt(0)?.toUpperCase()}{user?.name?.split(" ")[1]?.charAt(0)?.toUpperCase()}</Avatar> : <img src={`${process.env.REACT_APP_USER_IMAGE_URL}${user?.image}`} alt="user" />}
                                              </NavLink>
                                        </div>
                                    
                                    : null}
                            </div>
                             </div>
                    </div>
                  
                </div>
                
            </header>
          
            <Category_Header setSelectName={setSelectName} setSelectLoc={setSelectLoc}/>
            <Sidebar toggleSideBar={toggleSideBar} setToggleSideBar={setToggleSideBar} setMsg_NotificationCount={setMsg_NotificationCount} msg_notificationCount={msg_notificationCount} like={like} />

            <nav className="mobile-nav">
                <div className="container">
                    <div className="mobile-group">
                        <NavLink to='/' className="mobile-widget ">
                            <i className="fas fa-home"></i><span>home</span>
                        </NavLink>
                        {
                            user ? <NavLink to={user ? PROFILE : USER_LOGIN} className=" mobile-widget mobile-widget-user">
                                {!user?.image ? <Avatar style={{height:"20px" ,width:"20px",fontSize:"12px"}}>{user?.name?.split(" ")[0]?.charAt(0)?.toUpperCase()}{user?.name?.split(" ")[1]?.charAt(0)?.toUpperCase()}</Avatar>  : <img src={`${process.env.REACT_APP_USER_IMAGE_URL}${user?.image}`} alt="user" />}
                               
                                    {!user?.name
                                    ? <span>join me</span> : <span className="mt-1">{user?.name?.split(" ")[0]}</span>}
                            </NavLink> : null
                        }

                        <Button event={handleClick} type="submit" link='' className={`mobile-widget ${user ? "plus-btn" : ""}`} icon='fas fa-plus' name={'ad post'}/>

                            {user ? <NavLink to={user ? MESSAGE : "/login"} state={{ prevPath: USER_MESSAGE_LIST }} className=" mobile-widget">
                            <i className="fas fa-envelope"></i><span>message</span><sup>{msg_notificationCount}</sup>
                        </NavLink>
                            : null}
                        {
                            user ? <NavLink to={VIEW_ALL_NOTIFICATION} className="mobile-widget"><i className="fas fa-bell"></i><span>notify</span><sup>{valContext?.notificationCount}</sup></NavLink> : null

                        }


                    </div>
                </div>
            </nav>


        </>
    )
}
export default Header