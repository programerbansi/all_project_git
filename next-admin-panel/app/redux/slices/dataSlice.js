import { createSlice } from "@reduxjs/toolkit";
import { getBrands, getCategories, getTypes } from "../actions/dataAction";

const initialState = {
    loading: false,
    categories: [],
    categorylastpage: null,
    brandlastpage: null,
    typelastpage: null,
    error: '',
    brands: [],
    types: [],
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    extraReducers: {
        [getCategories.pending || getBrands.pending]: (state, { payload }) => {
            state.loading = true
        }
        ,
        [getCategories.fulfilled]: (state,  {payload} ) => {
            state.categories = payload.data,
            state.loading = false,
            state.categorylastpage = payload.categorylastpage
        },
        [getBrands.fulfilled]: (state, { payload }) => {
            state.brands = payload.data,
            state.loading = false,
            state.brandlastpage = payload.brandlastpage
        },
        [getTypes.fulfilled]: (state, { payload }) => {
            state.types = payload.data,
                state.typelastpage = payload.typelastpage
        },

    }
})

// export const {setProfileData} = dataSlice.actions
export default dataSlice.reducer