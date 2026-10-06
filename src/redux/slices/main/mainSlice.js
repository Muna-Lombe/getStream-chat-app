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
        isMobile: false,
        channelHasContent: false
    }
    
})



const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setCreateType(state,action) {
            console.log('newState', state.ids)
            const oldEntityState = state.entities['createType']
            state.entities['createType'] = action.payload.state //|| !oldEntityState

        },
        setIsCreating(state,action) {
            console.log('newState', state.ids)
            const oldEntityState = state.entities['isCreating']
            state.entities['isCreating'] = action.payload.state //|| !oldEntityState
        },
        setIsEditing(state,action) {
            console.log('newState', state.ids)
            const oldEntityState = state.entities['isEditing']
            state.entities['isEditing'] = action.payload.state //|| !oldEntityState
        },
        setShowInfo(state,action) {
            console.log('newState', state.ids)
            const oldEntityState = state.entities['showInfo']
            state.entities['showInfo'] = action.payload.state //|| !oldEntityState
        },
        setToggleDark(state,action) {
            console.log('newState', state.ids)
            const oldEntityState = state.entities['toggleDark']
            state.entities['toggleDark'] = action.payload.state //|| !oldEntityState
        },
        setToggleContainer(state,action) {
            console.log('newState', state.ids)
            const oldEntityState = state.entities['toggleContainer']
            state.entities['toggleContainer'] = action.payload.state //|| !oldEntityState
        },
        setIsMobile(state,action) {
            const oldEntityState = state.entities['isMobile']
            state.entities['isMobile'] = action.payload.state //|| !oldEntityState
            
        },
        setChannelhasContent( state, action) {
            const oldEntityState = state.entities['channelHasContent']
            state.entities['channelHasContent'] = action.payload.state //|| !oldEntityState
        }
    },
    
}) 
export const { setCreateType,setIsCreating,setIsEditing,setShowInfo,setToggleContainer,setToggleDark, setIsMobile, setChannelhasContent} = mainSlice.actions
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
    channelHasContent: selector('channelHasContent')
    // all: (function (){
    //     return ['setCreateType', 'setIsCreating', 'setIsEditing', 'setToggleDark', 'toggleContainer', 'setToggleContainer', 'isMobile'].map(k=>{
    //         return selector(k)
    //     })
    // })()
}





export default mainSlice.reducer