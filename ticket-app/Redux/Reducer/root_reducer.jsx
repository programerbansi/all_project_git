import { combineReducers } from "redux";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";

const root_reducer = combineReducers({userReducer,adminReducer});

export default root_reducer;