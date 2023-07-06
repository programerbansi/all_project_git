import { combineReducers } from 'redux';
import EcommerceReducer from './EcommerceReducer';
import UserEcommerceReducer from './UserEcommerceReducer';
const RootReducer = combineReducers({EcommerceReducer,UserEcommerceReducer});

export default RootReducer;