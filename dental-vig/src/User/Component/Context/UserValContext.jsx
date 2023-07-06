import React ,{createContext,useState} from 'react';
import { getLoggedInUser } from '../../../services/LocalStorageUser';

export const UserValAuthContext = createContext();

const UserAuthProvider = ({children})=>{
     const [selectedCountry,setSelectedCountry] = useState({});
     const [selectedState,setSelectedState] = useState({});
     
     const [selectedCity,setSelectedCity] = useState({});
     const [check2,setCheck2]=useState(false)
     const [radioval,setRadioval]=useState("");

     const [categoryId,setCategoryId] = useState([]);
     const [itemList,setItemList] = useState([]);
     const [priceRange,setPriceRange] = useState([10,10000000000]);
     const [priceSubmitFlag,setPriceSubmitFlag] = useState(false);
     const [hideCategory,setHidecategory]=useState(true);
     const [hideSubCategory,setHideSubCategory]=useState(true);
     const [hideBrand,setHideBrand] = useState(false)
     const [filteredArray,setFilteredArray] = useState([]);
     const [forgotEmail,setForgotEmail] = useState();
     const [flagOtp,setFlagOtp]=useState(false);
     const [sendmobile,setSendMobile]=useState();
     const [userBlock,setUserBlock]=useState(false);
     const [userImage,setUserImage]=useState();
     const [userName,setUserName]=useState();

     const [gsearchType,setGSearchType]=useState();
     const [gsearchId,setGSearchId]=useState();
     const [gsearchName,setGSearchName]=useState();
     const [gsearchAllType,setGSearchAllType]=useState();
     const [gsearchAllName,setGSearchAllName]=useState();
     const [selectCity,setSelectCity]=useState();
     const [detailSlug,setDetailSlug]=useState();
     const [currLocation,setCurrLocation]=useState();
     const[locationState,setLocationState]=useState();
     const [clickCurrLoc,setClickCurrLoc]=useState(false);
     const [soldProduct,setSoldProduct] = useState({});
     const [seenMessageClicked,setSeenMessageClicked] = useState(false);
     const [seenMessageWithoutClicked,setseenMessageWithoutClicked] = useState(false);
     const [msgNotifications,setMsgNotifications] = useState(false);
     const [msgNotifications2,setMsgNotifications2] = useState([]);
     const [msg_notifications, setMsg_Notifications] = useState([]);
     const [subheadertype,setSubHeaderType]=useState([]);
     const [subheadercat,setSubHeaderCat]=useState([]);
     const [subCat_id,setSubCatId]=useState([]);
     const [showEnvelop, setShowEnvelop] = useState(false)
     const [showNotify, setShowNotify] = useState(false);
     const [showdelete,setShowdelete]=useState(false);
     const [notificationCount, setNotificationCount] = useState(0);
     const [notifications, setNotifications] = useState([]);

     const [headerLikeProduct,setheaderLikeProduct]=useState();
     const [stateconvFromItem,setStateconvFromItem]=useState();
     const [selectedval,setSelectedVal]=useState(null);
     const [filterCategoryId, setFilterCategoryId] = useState([]);
     const [filterBrandId, setFilterBrandId] = useState([]);
     const [filterTypeId, setFilterTypeId] = useState([]);
     const [filterRatings, setFilterRatings] = useState([]);
    return <UserValAuthContext.Provider value={{subCat_id,setSubCatId,notifications, setNotifications,notificationCount, setNotificationCount,selectedCountry,setSelectedCountry,selectedState,setSelectedState,selectedCity,setSelectedCity,check2,setCheck2,radioval,setRadioval,itemList,setItemList,categoryId,setCategoryId,priceRange,setPriceRange,priceSubmitFlag,setPriceSubmitFlag,filteredArray,setFilteredArray,hideCategory,setHidecategory,setHideSubCategory,hideSubCategory,setHideBrand,hideBrand,forgotEmail,setForgotEmail,flagOtp,setFlagOtp,sendmobile,setSendMobile,userBlock,setUserBlock,userName,setUserName,userImage,setUserImage,gsearchId,setGSearchId,gsearchType,setGSearchType,gsearchAllType,setGSearchAllType,gsearchAllName,setGSearchAllName,gsearchName,setGSearchName,detailSlug,setDetailSlug,selectCity,setSelectCity,currLocation,setCurrLocation,clickCurrLoc,setClickCurrLoc,setSoldProduct,soldProduct,locationState,setLocationState,setSeenMessageClicked,seenMessageClicked,setMsgNotifications,msgNotifications,seenMessageWithoutClicked,setseenMessageWithoutClicked,msgNotifications2,setMsgNotifications2,msg_notifications, setMsg_Notifications,subheadercat,setSubHeaderCat,subheadertype,setSubHeaderType,showNotify, setShowNotify,showEnvelop, setShowEnvelop,showdelete,setShowdelete,headerLikeProduct,setheaderLikeProduct,stateconvFromItem,setStateconvFromItem,selectedval,setSelectedVal,filterRatings, setFilterRatings,filterTypeId, setFilterTypeId,filterBrandId, setFilterBrandId,filterCategoryId, setFilterCategoryId}}>{children}</UserValAuthContext.Provider>
}
export default UserAuthProvider