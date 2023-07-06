import { LOGOUT, LOGIN, GET_INVOICE_LIST, ADD_INVOICE, GET_INVOICE_NEED_LIST, GET_SEARCH_LIST, GET_SEARCH_LIST_ARRAY, GET_PHOTO_LIST, GET_DOCUMENT_LIST, GET_MESSAGE_LIST, GET_STATUS, GET_JOB_TYPES, GET_INVOICE_BY_ID, GET_REPORTS_LIST, GET_USER_TEAM_LIST, GET_USER_CARDLIST, GET_USER_BILL_LIST, GET_PAY_AMOUNT, GET_USER_CARDS, GET_NOTIFY_USER, GET_HISTORY, GET_HISTORY_LIST, GET_PHOTOS, GET_DOCUMENTS } from "../action/Action"

const initialState={
    invoicePerPageList:[],invoice_path:{},invoiceTotalItemCount:0,
    needPerPageList:[],needTotalItemCount:0,searchList:[],searchListArray:[],
    photoPerPageList:[],photoTotalItemCount:0,docPerPageList:[],docTotalItemCount:0,
    msgPerPageList:[],msgTotalItemCount:0,jobTypes:[],status:[],invoiceId:{},
    reportPerPageList:[],reportTotalItemCount:0,teamTotalItemCount:0,teamPerPageList:[],notify_user:[],
    cardTotalItemCount:0,cardPerPageList:[],billTotalItemCount:0,billPerPageList:[],pay_amount:0,cards:[],history:[],
    historyTotalItemCount:0,historyPerPageList:[],documents:[],photos:[]
}

const Reducer=function(state=initialState,action){
    switch(action.type)
    {
        case LOGIN: {
            return {
                ...state,
            }
        }
        case LOGOUT: {
            return {
                ...state,
            }
        }
        case GET_INVOICE_LIST: {
            return {
                ...state,
                invoicePerPageList: [...action.payload],
                invoice_path: action.path,
                invoiceTotalItemCount: action.totalItemCount,
            }
        }
        case GET_INVOICE_NEED_LIST: {
            return {
                ...state,
               needPerPageList: [...action.payload],
               needTotalItemCount: action.totalItemCount,
            }
        }
        case GET_PHOTO_LIST: {
            return {
                ...state,
               photoPerPageList: [...action.payload],
               photoTotalItemCount: action.totalItemCount,
            }
        }
        case GET_DOCUMENT_LIST: {
            return {
                ...state,
              docPerPageList: [...action.payload],
              docTotalItemCount: action.totalItemCount,
            }
        }
        case GET_MESSAGE_LIST :{
            return {
                ...state,
              msgPerPageList: [...action.payload],
              msgTotalItemCount: action.totalItemCount,
            }
        }
        case GET_HISTORY_LIST :{
            return {
                ...state,
              historyPerPageList: [...action.payload],
              historyTotalItemCount: action.totalItemCount,
            }
        }
        case GET_SEARCH_LIST: {
            return {
                ...state,
              searchList: [...action.payload],
              
            }
        }
        case GET_PHOTOS: {
            return {
                ...state,
              photos: [...action.payload],
              
            }
        }
        case GET_DOCUMENTS: {
            return {
                ...state,
              documents: [...action.payload],
              
            }
        }
        case GET_HISTORY: {
            return {
                ...state,
              history: [...action.payload],
              
            }
        }
        case GET_SEARCH_LIST_ARRAY: {
            return {
                ...state,
              searchListArray: [...action.payload],
              
            }
        }
        case GET_NOTIFY_USER: {
            return {
                ...state,
              notify_user: [...action.payload],
              
            }
        }
        case ADD_INVOICE: {
            return {
                ...state,
            }
        }
        case GET_STATUS:{
            return{
                ...state,
              status:[...action.payload]
            }
        }
        case GET_JOB_TYPES:{
            return{
                ...state,
                jobTypes:[...action.payload]
            }
        }
        case GET_USER_CARDS:{
            return{
                ...state,
                cards:[...action.payload]
            }
        }
        case GET_INVOICE_BY_ID:{
            return{
                ...state,
                invoiceId:action.payload
            }
        }
        case GET_REPORTS_LIST :{
            return {
                ...state,
              reportPerPageList: [...action.payload],
              reportTotalItemCount: action.totalItemCount,
            }
        }
        case GET_USER_TEAM_LIST: {
            return {
                ...state,
                teamPerPageList: [...action.payload],
                teamTotalItemCount: action.totalItemCount,
            }
        }
        case GET_USER_CARDLIST: {
            return {
                ...state,
                cardPerPageList: [...action.payload],
                cardTotalItemCount: action.totalItemCount,
            }
        }
        case GET_USER_BILL_LIST: {
            return {
                ...state,
                billPerPageList: [...action.payload],
                billTotalItemCount: action.totalItemCount,
            }
        }
        case GET_PAY_AMOUNT: {
            return {
                ...state,
                pay_amount: action.payload,
            }
        }
        default:{
            return{
                ...state,                                                  
            }
        }
    }

}
export default Reducer