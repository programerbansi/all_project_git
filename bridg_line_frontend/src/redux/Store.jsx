import {applyMiddleware, createStore} from 'redux'
import root_Reducer from './Reducer/RootReducer'

import thunk from 'redux-thunk';

const Store =createStore(root_Reducer,applyMiddleware(thunk)
);
export default Store