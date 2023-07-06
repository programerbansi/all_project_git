
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { AD_POST, BOOKMARK, DASHBOARD, LIST_PAGE, MESSAGE, MY_ADS, MY_ORDERS, PROFILE, SETTINGS, SHOW_ALL_ADS, USER_LOGIN, USER_MESSAGE_LIST, VIEW_ALL_NOTIFICATION, VIEW_ALL_REVIEWS } from "../../services/UserRoutePath"
import Ad_List from "./Ad-List/Ad_List"
import DetailPage from "./DetailPages/DetailPage"
import Footer from "./Footer"
import Header from "./Header"
import AdPost from "./Post-Ad/AdPost"
import BookMark from "./Post-Ad/BookMark"
import Dashboard from "./Post-Ad/Dashboard"
import MyAds from "./Post-Ad/MyAds"
import Profile from "./Post-Ad/Profile"
import swal from 'sweetalert';
import { getLoggedInUser, getUserToken, removeLoggedInUser, removeMobileNo, removeSendMobile, removeUserRole, removeUserToken } from "../../services/LocalStorageUser"
import { useContext } from "react"
import { UserValAuthContext } from "./Context/UserValContext"
import { useEffect } from "react"
import "../Css/InputFunction.css"
import Settings from "./Post-Ad/Settings"
import Message from "./Post-Ad/Messager/Message"
import ConversationUserList from "./Post-Ad/Messager/ConversationUserList"
import TopAds from "./Advertisement/TopAds"
import { useDispatch, useSelector } from "react-redux"
import { GET_USER_ADVERTISEMENT, getDatas } from "../../redux/actions/UserEcommerceAction"
import FooterAds from "./Advertisement/FooterAds"
import MyOrders from "./Post-Ad/MyOrders"
import ViewAllNotification from "./Notification/ViewAllNotification"
import AllReviews from "./DetailPages/ProductPage/ProductRightSide/Reviews/AllReviews"
import ContactUs from "./InputFunction/ContactUs";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {slug} = useParams();
  const userVal = useContext(UserValAuthContext);
  let pageLoaded = false;
  let loggedInUser = getLoggedInUser();
  let token = getUserToken();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userVal?.userBlock == true) {
      swal({
        title: "Your account has been blocked!",
        confirmButtonColor: '#0044bb',
        icon: "error",
        closeOnConfirm: false,
        closeOnClickOutside: false,
      }).then(function () {
        navigate(USER_LOGIN);
        removeLoggedInUser();
        removeMobileNo();
        removeUserRole();
        removeUserToken();
        removeSendMobile();
        userVal?.setUserBlock(false);
      });
    }
   
  }, [dispatch, userVal])

  useEffect(()=>{
    if (!pageLoaded) {
        dispatch(getDatas(`get_all_ads_byuser`,GET_USER_ADVERTISEMENT));
    }
    return ()=>{pageLoaded=true}
  },[])
  const advertisement = useSelector((state) => state.UserEcommerceReducer.useradvertisement)
  const top_ads = advertisement.filter((item) => {
    return item.position == "header" && item.status == 1
  })
  const footer_ads = advertisement.filter((item) => {
    return item.position == "footer" && item.status == 1
  })
  const left_ads = advertisement.filter((item) => {
    return item.position == "left" && item.status == 1
  })
  const right_ads = advertisement.filter((item) => {
    return item.position == "right" && item.status == 1
  })

  

  return (
    <div className="bg-white">
      <Header />
    
     
      <TopAds top_ads={top_ads} />

      {location.pathname == "/" ? <><Ad_List left_ads={left_ads} right_ads={right_ads} /></> : null}
      {location.pathname == AD_POST ? <AdPost left_ads={left_ads} right_ads={right_ads} /> : null}
      {location.pathname == PROFILE ? <Profile left_ads={left_ads} right_ads={right_ads} /> : null}
      {location.pathname == MY_ADS ? <MyAds left_ads={left_ads} right_ads={right_ads} /> : null}
      {location.pathname == SETTINGS ? <Settings left_ads={left_ads} right_ads={right_ads} /> : null}
      {location.pathname == BOOKMARK ? <BookMark left_ads={left_ads} right_ads={right_ads} /> : null}
      {location.pathname == MY_ORDERS ? <MyOrders left_ads={left_ads} right_ads={right_ads} /> : null}
      {location.pathname == DASHBOARD ? <Dashboard left_ads={left_ads} right_ads={right_ads} /> : null}      
      {location.pathname == VIEW_ALL_NOTIFICATION ? <ViewAllNotification left_ads={left_ads} right_ads={right_ads} /> : null}
      {location.pathname == VIEW_ALL_REVIEWS ? <AllReviews left_ads={left_ads} right_ads={right_ads} /> : null}
      {location.pathname == `/${slug}` ? <DetailPage left_ads={left_ads} right_ads={right_ads} /> :  null}
      {location.pathname == LIST_PAGE || location.pathname == SHOW_ALL_ADS ? <Ad_List left_ads={left_ads} right_ads={right_ads} /> : null}
       {location.pathname == MESSAGE ? <Message left_ads={left_ads} right_ads={right_ads} /> : null}
      {location.pathname == USER_MESSAGE_LIST ? <ConversationUserList left_ads={left_ads} right_ads={right_ads} /> : null}
      {
        loggedInUser && token && <ContactUs/>
      }
      <FooterAds footer_ads={footer_ads} />
      <Footer />
    </div>
  )
}
export default Home