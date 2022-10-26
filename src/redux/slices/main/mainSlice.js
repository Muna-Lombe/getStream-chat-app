import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import React from 'react'


const mainAdapter = createEntityAdapter()
const initialState = mainAdapter.getInitialState({
    entities:{
        createType: '',
        isCreating: false,
        isEditing: false,
        showInfo: false,
        toggleDark: false,
        toggleContainer: true,
        isMobile: false
    }
    
})



const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setCreateType(state,action) {
            console.log('newState', state.ids)
            const newCreateType = action.payload
            state.entities['createType'] = newCreateType
        },
        setIsCreating(state,action) {
            console.log('newState', state.ids)
            const newIsCreating = action.payload
            state.entities['isCreating'] = newIsCreating
        },
        setIsEditing(state,action) {
            console.log('newState', state.ids)
            const newIsEditing = action.payload
            state.entities['isEditing'] = newIsEditing
        },
        setShowInfo(state,action) {
            console.log('newState', state.ids)
            const newShowInfo = action.payload
            state.entities['showInfo']= newShowInfo
        },
        setToggleDark(state,action) {
            console.log('newState', state.ids)
            const newToggleDark = action.payload
            state.entities['toggleDark'] = newToggleDark
        },
        setToggleContainer(state,action) {
            console.log('newState', state.ids)
            const newToggleContainer = action.payload
            state.entities['toggleContainer'] = newToggleContainer
        },
        setIsMobile(state,action) {
            const newIsMobile = action.payload.isMobile
            state.entities['isMobile'] = newIsMobile
            
        },
    },
    
}) 
export const { setCreateType,setIsCreating,setIsEditing,setShowInfo,setToggleContainer,setToggleDark, setIsMobile} = mainSlice.actions
export const { selectEntities: selectMainEntities,  } = mainAdapter.getSelectors(state => state.main)
const selector =(name) => createSelector(
        selectMainEntities,
        state => {
            return state[name]
        }
    )
export const select ={
    
    createType: selector('createType'),
    isCreating: selector('isCreating'),
    isEditing: selector('isEditing'),
    showInfo: selector('showInfo'),
    toggleDark: selector('toggleDark'),
    toggleContainer: selector('toggleContainer'),
    isMobile: selector('isMobile'),
    // all: (function (){
    //     return ['setCreateType', 'setIsCreating', 'setIsEditing', 'setToggleDark', 'toggleContainer', 'setToggleContainer', 'isMobile'].map(k=>{
    //         return selector(k)
    //     })
    // })()
}





export default mainSlice.reducer