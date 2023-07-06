import { ADD_USER, ADMIN_LOGOUT, DELETE_USER, EDIT_USER, GET_COMPLETED_LENGTH, GET_DOCS_ADMIN, GET_INVOICE_BY_ID, GET_INVOICE_COMPLETED_LIST, GET_INVOICE_LIST, GET_JOB_LENGTH, GET_JOB_TYPES, GET_JOB_TYPE_LIST, GET_MESSAGE_LIST, GET_NEEDDOC_LENGTH, GET_NEEDPHOTO_LENGTH, GET_NOTIFICATION_LENGTH, GET_NOTIFY_ADMIN, GET_ORDER_LENGTH, GET_ORDER_LIST, GET_OTHER_LENGTH, GET_PAYMENTS, GET_PAYMENT_LIST, GET_PENDING_LENGTH, GET_PHOTOS_ADMIN, GET_PROFIT_LENGTH, GET_REDYINVOICE_LENGTH, GET_REPORTS_LIST, GET_STATUS, GET_STATUS_LIST, GET_STRIPAC_LENGTH, GET_TASK_LENGTH, GET_TEAM_LENGTH, GET_TEAM_LIST, GET_USERS, GET_USERS_LENGTH, GET_USER_LIST } from "../action/AdminAction"


const initialState = {
    userPerPageList: [], user_path: {}, userTotalItemCount: 0,
    invoicePerPageList: [], invoice_path: {}, invoiceTotalItemCount: 0,
    msgATotalItemCount: 0, msgAPerPageList: [], users: [], jobTypePerPageList: [],
    jobTypeTotalItemCount: 0, jobTypes: [], statusPerPageList: [], statusTotalItemCount: 0, status: [],
    paymentPerPageList:[], paymentTotalItemCount:0,payment:[],orderPerPageList:[],orderTotalItemCount:0,
    userLength:0,profitLength:0,completedLength:0,redyLength:0,needphotoLength:0,pendingLength:0,stripacLength:0,
    orderLength:0,needdocLength:0,taskLength:0,jobLength:0,otherLength:0,invoiceId:[],teamPerPageList: [], teamTotalItemCount: 0,
    teamLength:0,notify:[],notifyTotalItemCount: 0,notificationLength:0,invoiceCompTotalItemCount:0,invoice_comp_path:{},invoiceCompPerPageList:[],photos_admin:[],doc_admin:[]
}

const AdminReducer = function (state = initialState, action) {
    switch (action.type) {

        case ADMIN_LOGOUT: {
            return {
                ...state,
            }
        }
        case ADD_USER: {
            return {
                ...state,
            }
        }
        case EDIT_USER: {
            return {
                ...state,
            }
        }
        case DELETE_USER: {
            return {
                ...state,
            }
        }
        case GET_USER_LIST: {
            return {
                ...state,
                userPerPageList: [...action.payload],
                user_path: action.path,
                userTotalItemCount: action.totalItemCount,
            }
        }
        case GET_TEAM_LIST: {
            return {
                ...state,
                teamPerPageList: [...action.payload],
                teamTotalItemCount: action.totalItemCount,
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
        case GET_INVOICE_COMPLETED_LIST: {
            return {
                ...state,
                invoiceCompPerPageList: [...action.payload],
                invoice_comp_path: action.path,
                invoiceCompTotalItemCount: action.totalItemCount,
            }
        }
        case GET_MESSAGE_LIST: {
            return {
                ...state,
                msgAPerPageList: [...action.payload],
                msgATotalItemCount: action.totalItemCount,
            }
        }
        case GET_USERS: {
            return {
                ...state,
                users: [...action.payload]
            }
        }
        case GET_NOTIFY_ADMIN: {
            return {
                ...state,
                notify: [...action.payload],
                notifyTotalItemCount:action.totalItemCount
            }
        }
        case GET_JOB_TYPE_LIST: {
            return {
                ...state,
                jobTypePerPageList: [...action.payload],
                jobTypeTotalItemCount: action.totalItemCount,
            }
        }
        case GET_JOB_TYPES: {
            return {
                ...state,
                jobTypes: [...action.payload]
            }
        }
        case GET_STATUS_LIST: {
            return {
                ...state,
                statusPerPageList: [...action.payload],
                statusTotalItemCount: action.totalItemCount,
            }
        }
        case GET_STATUS: {
            return {
                ...state,
                status: [...action.payload]
            }
        }
        case GET_PAYMENT_LIST: {
            return {
                ...state,
                paymentPerPageList: [...action.payload],
                paymentTotalItemCount: action.totalItemCount,
            }
        }
        case GET_PAYMENTS: {
            return {
                ...state,
                payment: [...action.payload]
            }
        }
        case GET_PHOTOS_ADMIN: {
            return {
                ...state,
                photos_admin: [...action.payload]
            }
        }
        case GET_DOCS_ADMIN: {
            return {
                ...state,
                doc_admin: [...action.payload]
            }
        }
        case GET_ORDER_LIST :{
            return {
                ...state,
             orderPerPageList: [...action.payload],
             orderTotalItemCount: action.totalItemCount,
            }
        }
        case GET_USERS_LENGTH: {
            return {
                ...state,
                userLength: action.payload
            }
        }
        case GET_NEEDDOC_LENGTH: {
            return {
                ...state,
                needdocLength: action.payload
            }
        }
        case GET_TASK_LENGTH: {
            return {
                ...state,
                taskLength: action.payload
            }
        }
        case GET_ORDER_LENGTH: {
            return {
                ...state,
                orderLength: action.payload
            }
        }

        case GET_STRIPAC_LENGTH: {
            return {
                ...state,
                stripacLength: action.payload
            }
        }
        case GET_PENDING_LENGTH: {
            return {
                ...state,
                pendingLength: action.payload
            }
        }
        case GET_NOTIFICATION_LENGTH: {
            return {
                ...state,
                notificationLength: action.payload
            }
        }
        
        case GET_NEEDPHOTO_LENGTH: {
            return {
                ...state,
                needphotoLength: action.payload
            }
        }
        case GET_REDYINVOICE_LENGTH: {
            return {
                ...state,
                redyLength: action.payload
            }
        }
        case GET_COMPLETED_LENGTH: {
            return {
                ...state,
                completedLength: action.payload
            }
        }
        case GET_PROFIT_LENGTH: {
            return {
                ...state,
                profitLength: action.payload
            }
        }
        case GET_JOB_LENGTH: {
            return {
                ...state,
                jobLength: action.payload
            }
        }
        case GET_OTHER_LENGTH: {
            return {
                ...state,
                otherLength: action.payload
            }
        }
        case GET_INVOICE_BY_ID:{
            return{
                ...state,
                invoiceId:action.payload
            }
        }
        case GET_TEAM_LENGTH: {
            return {
                ...state,
                teamLength: action.payload
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }

}
export default AdminReducer