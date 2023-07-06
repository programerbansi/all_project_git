
import { USER_CITYLIST, USER_STATELIST, USER_COUNTRYLIST, USER_LOGIN, USER_REGISTER, USER_SOCIAL_LOGIN, GET_USER_CATEGORY, GET_USER_BRAND, GET_USER_TAG, USER_ALL_STATELIST, GET_USER_PRODUCTS_BY_CATEGORY, GET_USER_WISHLIST, GET_USER_PRODUCTS_BY_CATEGORY_PRICE, USER_DELETE_WISHLIST, GET_USER_PRODUCT, GET_USER_TYPE, GET_USER_TYPE_TO_CAT, GET_SELECTED_PRODUCT_DETAIL, SET_SELECTED_PRODUCT_DETAIL, USER_MESSAGE, USER_SEND_MOBILENO, USER_SEND_OTP, USER_PROFILE_DETAIL, GET_PRODUCT, USER_MESSAGE_ID, GET_USER_MESSAGE, GET_USER_MESSAGE_LIST, GET_USER_MESSAGE_FROM, GET_USER_CONVERSTAION, GET_USER_ADVERTISEMENT, GET_LOCATION, GET_ITEM_ALL_TYPE, GET_ITEM_ID, DELETE_MESSAGE, GET_CURRENT_LOCATION, GET_RELATED_PRODUCTS, GET_BOUGHT_PRODUCTS, GET_NOTIFICATION_LISTING, GET_MESSAGE_NOTIFICATION_LISTING, GET_REVIEWS, GET_ALL_TYPECAT, GET_HIGH_TO_LOW_REVIEWS, GET_LOW_TO_HIGH_REVIEWS, GET_RECENT_REVIEWS, GET_USER_SUB_CATEGORY, GET_USER_CAT_TO_SUBCAT , GET_ALL_TYPE, GET_USER_CAT_TO_BRAND, LOGIN} from "../actions/UserEcommerceAction";


const initialState = {
    usercategory: [],
    usersubcategory:[],
    userbrand: [],
    usertag: [],
    userproducts: [],
    userproductsbyprice: [],
    countryList: [],
    stateList: [],
    cityList: [],
    allstateList: [],
    itemLastPage: 0,
    itemCurrentPage: 0,
    userwishlist: [],
    itemByPriceLastPage: 0,
    itemByPriceCurrentPage: 0,
    userproduct: [],
    usertype: [],
    usertypetocat: [],
    usercattosubcat:[],
    usercattobrand:[],
    selectedProductDetail: {},
    product: [],
    message: [],
    messageFrom: [],
    conversation_id: null,
    deleteConvId: null,
    newConv: null,
    message_List: [],
    conversation: [],
    totalresult: 0,
    lastpage: 0,
    useradvertisement: [],
    location: [],
    allitemtype: [],
    itemById: [],
    itemview: 0,
    curr_location: "",
    relateProducts: [],
    boughtProducts: [],
    notifications: [],
    msgNotification: [],
    reviews: [],
    alltypecat: [],
    high_to_low_reviews: [],
    low_to_high_reviews: [],
    recent_reviews: [],
    allType: [],
}
const UserEcommerceReducer = function (state = initialState, action) {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
            }
        }
        case USER_PROFILE_DETAIL: {
            return {
                ...state,
            }
        }
        case USER_SOCIAL_LOGIN: {
            return {
                ...state,
            }
        }
        case USER_MESSAGE: {
            return {
                ...state, conversation_id: action.conversation_id, newConv: action.newConv
            }
        }
        case USER_MESSAGE_ID: {
            return {
                ...state,
            }
        }
        case GET_USER_CATEGORY:
            return {
                ...state,
                usercategory: [...action.payload],
            }
        case GET_USER_SUB_CATEGORY:
            return {
                ...state,
                usersubcategory: [...action.payload],
            }
        case GET_USER_BRAND:
            return {
                ...state,
                userbrand: [...action.payload]
            }
        case GET_USER_TAG:
            return {
                ...state,
                usertag: [...action.payload]
            }
        case GET_USER_PRODUCTS_BY_CATEGORY:
            return {
                ...state,
                userproducts: [...action.payload],
                itemLastPage: action.lastPage,
                itemCurrentPage: action.currentPage
            }
        case GET_USER_PRODUCTS_BY_CATEGORY_PRICE:
            return {
                ...state,
                userproducts: [...action.payload],
                itemLastPage: action.lastPage,
                itemCurrentPage: action.currentPage
            }
        case USER_COUNTRYLIST: {
            return { ...state, countryList: [...action.payload] }
        }
        case USER_STATELIST: {
            return { ...state, stateList: [...action.payload] }
        }
        case USER_CITYLIST: {
            return { ...state, cityList: [...action.payload] }
        }
        case USER_ALL_STATELIST: {
            return { ...state, allstateList: [...action.payload] }
        }
        case GET_USER_WISHLIST:
            return {
                ...state,
                userwishlist: [...action.payload]
            }
        case USER_DELETE_WISHLIST: {
            return {
                ...state,
            }
        }
        case GET_USER_PRODUCT:
            return {
                ...state,
                userproduct: [...action.payload]
            }
        case GET_ALL_TYPE:
            return {
                ...state,
               allType: [...action.payload]
            }
        case GET_PRODUCT:
            return {
                ...state,
                product: [...action.payload]
            }
        case GET_USER_TYPE:
            return {
                ...state,
                usertype: [...action.payload]
            }
        case GET_USER_TYPE_TO_CAT:
            return {
                ...state,
                usertypetocat: [...action.payload]
            }
        case GET_USER_CAT_TO_SUBCAT:
            return {
                ...state,
                usercattosubcat: [...action.payload]
            }
        case GET_USER_CAT_TO_BRAND:
            return {
                ...state,
                usercattobrand: [...action.payload]
            }
        case SET_SELECTED_PRODUCT_DETAIL:
            return {
                ...state,
                selectedProductDetail: action.payload
            }
        case GET_SELECTED_PRODUCT_DETAIL:
            return {
                ...state,
                selectedProductDetail: { ...state.selectedProductDetail }
            }
        case USER_SEND_MOBILENO:
            return {
                ...state,
            }
        case USER_SEND_OTP:
            return {
                ...state
            }
        case USER_MESSAGE:
            return {
                ...state, deleteConvId: action.conversation_id
            }
        case GET_USER_MESSAGE:
            return { ...state, message: [...action.payload], conversation_id: action.conversation_id }

        case GET_USER_MESSAGE_LIST:
            return { ...state, message_List: action.payload, conversation_id: action.conversation_id }

        case GET_USER_CONVERSTAION:
            return { ...state, conversation: action.payload, totalresult: action.totalresult, lastpage: action.lastpage }

        case GET_USER_ADVERTISEMENT:
            return {
                ...state,
                useradvertisement: [...action.payload]
            }
        case GET_LOCATION: {
            return { ...state, location: [...action.payload] }
        }
        case GET_CURRENT_LOCATION: {
            return { ...state, curr_location: action.payload }
        }
        case GET_ITEM_ALL_TYPE: {
            return { ...state, allitemtype: [...action.payload] }
        }
        case GET_ITEM_ID:
            return {
                ...state,
                itemById: action.payload,
                itemview: action.itemview
            }
        case GET_RELATED_PRODUCTS: {
            return { ...state, relateProducts: action.payload }
        }
        case GET_BOUGHT_PRODUCTS: {
            return { ...state, boughtProducts: action.payload }
        }
        case GET_NOTIFICATION_LISTING: {
            return { ...state, notifications: action.payload }
        }
        case GET_MESSAGE_NOTIFICATION_LISTING: {
            return { ...state, msgNotification: action.payload }
        }
        case DELETE_MESSAGE: {
            return { ...state }
        }
        case GET_REVIEWS: {
            return { ...state, reviews: action.payload }
        }
        case GET_ALL_TYPECAT: {
            return { ...state, alltypecat: action.payload }
        }
        case GET_HIGH_TO_LOW_REVIEWS: {
            return { ...state, high_to_low_reviews: action.payload }
        }
        case GET_LOW_TO_HIGH_REVIEWS: {
            return { ...state, low_to_high_reviews: action.payload }
        }
        case GET_RECENT_REVIEWS: {
            return { ...state, recent_reviews: action.payload }
        }
        default:
            return { ...state }
    }
}

export default UserEcommerceReducer