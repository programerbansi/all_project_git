import { combineReducers } from "redux";
import Reducer from "../Reducer/Reducer";
import AdminReducer from "./AdminReducer";
const root_Reducer=combineReducers({Reducer,AdminReducer});

export default root_Reducer