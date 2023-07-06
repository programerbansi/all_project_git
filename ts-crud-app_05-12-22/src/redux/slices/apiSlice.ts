import { Data, GetUsersResponse, post } from './../../components/model';
import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import { postState } from "../../components/model";
import axios from 'axios'

let JSON_API_URL:string = 'https://jsonplaceholder.typicode.com/posts?_limit=10'

const initialState:postState = {
   list:[],
   data:[],
   loading:false
}

export const getPosts = createAsyncThunk('api/getPosts',()=>{
    return axios.get<GetUsersResponse>(JSON_API_URL).then((res)=>res.data).catch((error)=>console.log(error,'----------error-------'))
})
const apiSlice = createSlice({
    name:'api',
    initialState,
    reducers:{
        addTodo:(state,{payload})=>{
            state.list = [...state.list,payload];
        }
    },
    extraReducers:{
        [getPosts.pending.toString()]:(state,action:PayloadAction<post[]>)=>{
            state.loading = true;
            state.data = action.payload
        }
        ,
        [getPosts.fulfilled.toString()]:(state,action:PayloadAction<post[]>)=>{
            state.data = action.payload;
            state.loading = false;
        }
    }
})

export const {addTodo} = apiSlice.actions;
export default apiSlice.reducer;