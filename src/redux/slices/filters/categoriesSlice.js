import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import React from 'react'
import Get from '../../../assets/tests/Get'


const categoriesAdapter = createEntityAdapter()

const initialState = categoriesAdapter.getInitialState({
    entities: {
         1:  'bg-[#FFA601]',
         2:  'bg-[#2967FF]',
         3:  'bg-[#58CF18]',
         4:  'bg-[#FF7CB4]',
         5:  'bg-[#FFA601]',
         6:  'bg-[#FF2D87]'
    }
})
const categorieSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
    },
    
}) 
export const { selectAll: selectcategories } = categoriesAdapter.getSelectors(state => state.categories)


export default categorieSlice.reducer