import { ADD_BRAND_TO_BRANDLIST, ADD_CATEGORY_TO_CATEGORYLIST, ADD_TAG_TO_TAGLIST, ADMIN_LOGIN, DELETE_BRAND, DELETE_CATEGORY, GET_ADVERTISE_LIST, GET_BRAND_LIST, GET_CATEGORY_LIST, GET_CONTACT_ITEMS, GET_PRODUCT_LIST, GET_REPORTED_ITEMS, GET_TYPE_LIST ,GET_SUB_CATEGORY_LIST} from "../actions/EcommerceAction";
import { GET_TAG_LIST, DELETE_TAG ,GET_USER_LIST} from './../actions/EcommerceAction';

const initialState = {
    categoryList: [],
    subcategoryList:[],
    categorylastpage:0,
    subcategorylastpage:0,
    brandList: [],
    brandlastpage:0,
    productList:[],
    productlastpage:0,
    tagList:[],
    taglastpage:0,
    typeList:[],
    typelastpage:0,
    advertiseList:[],
    advertiselastpage:0,
    userList:[],
    userlastpage:0,
    reportedItems:[],
    reportedItemlastpage :0,
    contactItems:[],
    contactItemlastpage:0,
};
const EcommerceReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORY_LIST: {
            return {
                ...state,
                categoryList: [...action.payload],
                categorylastpage:action.lastPage
            };
        }
        case GET_SUB_CATEGORY_LIST: {
            return {
                ...state,
                subcategoryList: [...action.payload],
                subcategorylastpage:action.lastPage
            };
        }
        case GET_BRAND_LIST: {
            return {
                ...state,
                brandList: [...action.payload],
                brandlastpage:action.lastPage
            };
        }
        case GET_TAG_LIST: {
            return {
                ...state,
                tagList: [...action.payload],
                taglastpage:action.lastPage
            };
        }
        case GET_TYPE_LIST: {
            return {
                ...state,
                typeList: [...action.payload],
                typelastpage:action.lastPage
            };
        }
        case GET_ADVERTISE_LIST: {
            return {
                ...state,
                advertiseList: [...action.payload],
                advertiselastpage:action.lastPage
            };
        }
        case GET_PRODUCT_LIST:{
            return {
                ...state,
                productList:[...action.payload],
                productlastpage:action.lastPage
            }
        }
        case GET_REPORTED_ITEMS:{
            return {
                ...state,
                reportedItems:[...action.payload],
                reportedItemlastpage:action.lastPage
            }
        }
        case GET_CONTACT_ITEMS:{
            return {
                ...state,
                contactItems:[...action.payload],
                contactItemlastpage:action.lastPage
            }
        }
        case GET_USER_LIST:{
            return {
                ...state,
                userList:[...action.payload],
                userlastpage:action.lastPage
            }
        }
        case ADD_BRAND_TO_BRANDLIST: {
            return {
              ...state,
              brandList: [...state.brandList,action.payload],
            };
          }
        case ADD_CATEGORY_TO_CATEGORYLIST:{
            return {
                ...state,
                categoryList:[...state.categoryList,action.payload]
            }
        }
        case ADD_TAG_TO_TAGLIST:{
            return {
                ...state,
                tagList:[...state.tagList,action.payload]
            }
        }
        case DELETE_CATEGORY:{
            return {
                ...state,
            }
        }
        case DELETE_BRAND:{
            return {
                ...state,
            }
        }
        case DELETE_TAG:{
            return {
                ...state,
            }
        }
        case ADMIN_LOGIN:{
            return {
                ...state,
            }
        }
        default:
            return {...state}
    }
}

export default EcommerceReducer
