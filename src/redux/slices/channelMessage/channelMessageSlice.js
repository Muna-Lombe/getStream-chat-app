import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'



// const channelMessageAdapter = createEntityAdapter()
// const initialState = channelMessageAdapter.getInitialState({
//     createType: '',
//     isCreating: false,
//     isEditing: false,
//     showInfo: false,
//     toggleDark: false,
//     toggleContainer: true,
//     isMobile: false
// })



// const channelMessageSlice = createSlice({
//     name: 'entities',
//     initialState,
//     reducers: {
//         setCreateType(state,action) {
//             console.log('newState', state.ids)
//             const newCreateType = action.payload
//             state.createType = newCreateType
//         },
//         setIsCreating(state,action) {
//             console.log('newState', state.ids)
//             const newIsCreating = action.payload
//             state.isCreating = newIsCreating
//         },
//         setIsEditing(state,action) {
//             console.log('newState', state.ids)
//             const newIsEditing = action.payload
//             state.isEditing = newIsEditing
//         },
//         setShowInfo(state,action) {
//             console.log('newState', state.ids)
//             const newShowInfo = action.payload
//             state.showInfo = newShowInfo
//         },
//         setToggleDark(state,action) {
//             console.log('newState', state.ids)
//             const newToggleDark = action.payload
//             state.toggleDark = newToggleDark
//         },
//         setToggleContainer(state,action) {
//             console.log('newState', state.ids)
//             const newToggleContainer = action.payload
//             state.toggleContainer = newToggleContainer
//         },
//         setIsMobile(state,action) {
//             console.log('newState', state.ids)
//             const newIsMobile = action.payload
//             state.isMobile = newIsMobile
//         }

//     },
    
// }) 
// export const { setCreateType,setIsCreating,setIsEditing,setShowInfo,setToggleContainer,setToggleDark} = channelMessageSlice.actions
// export const { selectAll: selectMainEntities } = channelMessageAdapter.getSelectors(state => state.entities)

// export default channelMessageSlice.reducer