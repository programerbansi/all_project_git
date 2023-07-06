import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import client, { token,headers } from "../client";

const GET_CATEGORIES = 'data/getCategories'
const GET_BRANDS = 'data/getBrands'
const GET_TYPES = 'data/getTypes'
 
const DELETE_CATEGORY = 'data/deleteCategory'
const DELETE_BRAND = 'data/deleteBrand'
const DELETE_TYPE = 'data/deleteType'
const ADD_CATEGORY = 'data/addCategory'
const ADD_BRAND = 'data/addBrand'
const ADD_TYPE = 'data/addType'

export const APP_URL = 'https://api-dentalvig.cuotainfotech.com/api/'

export const getCategories = createAsyncThunk(GET_CATEGORIES, (currentPage) => {
    return client.get(`getcat?page=${currentPage}`).then((res)=>{
        return {data:res.data.data.data,categorylastpage:res.data.data.last_page}
    })
})

export const getBrands = createAsyncThunk(GET_BRANDS, (currentPage) => {
    return client.get(`getbrand?page=${currentPage}`).then((res) => { return { data: res.data.data.data, brandlastpage: res.data.data.last_page } }).catch((error) => error)
})

export const getTypes = createAsyncThunk(GET_TYPES, (currentPage) => {
    return client.get(`gettype?page=${currentPage}`).then((res) => { return { data: res.data.data.data, typelastpage: res.data.data.last_page } }).catch((error) => error)
})

export const deleteCategory = createAsyncThunk(DELETE_CATEGORY, (id) => {
     client.delete(`admin/delete-cat/${id}`).then((res) => console.log(res)).catch((error) => console.log(error))
})

export const deleteBrand = createAsyncThunk(DELETE_BRAND, (id) => {
    client.delete(`admin/delete-brand/${id}`).then((res) => console.log(res)).catch((error) => console.log(error))
})

export const deleteType = createAsyncThunk(DELETE_TYPE,(id)=>{
    client.delete(`admin/delete-type/${id}`).then((res) => console.log(res)).catch((error) => console.log(error))
})

export const addCategory = createAsyncThunk(ADD_CATEGORY, (category,handleClose) => {
    return client.post(`admin/addcat`,category).then((res)=>handleClose()).catch((error)=>console.log(error))
    // axios.post(`${APP_URL}admin/addcat`, category, { headers}).then((res) => console.log(res)).catch((error) => console.log(error))
})

export const addBrand = createAsyncThunk(ADD_BRAND, (brand,handleClose) => {
    client.post(`admin/addbrand`, brand).then((res) => {console.log(res);handleClose()}).catch((error) => console.log(error))
})

export const addType = createAsyncThunk(ADD_TYPE, (type,handleClose) => {
    client.post(`admin/addtype`, type).then((res) => handleClose()).catch((error) => console.log(error))
})               