import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'



const channelSearchAdapter = createEntityAdapter()
const initialState = channelSearchAdapter.getInitialState({
    entities:{
        loading : false,
        query : '',
        teamChannels : [],
        directChannels : []
    }
})



const channelSearchSlice = createSlice({
    name: 'channelSearch',
    initialState,
    reducers: {
        setLoading(state,action) {
            console.log('newState', state.ids)
            const newLoading = action.payload
            state.loading = newLoading
        },
        setQuery(state,action) {
            console.log('newState', state.ids)
            const newQuery = action.payload
            state.query = newQuery
        },
        setTeamChannels(state,action) {
            console.log('newState', state.ids)
            const newTeamChannels = action.payload
            state.teamChannels = newTeamChannels
        },
        setDirectChannels(state,action) {
            console.log('newState', state.ids)
            const newDirectChannels = action.payload
            state.directChannels = newDirectChannels
        },
        

    },
    
}) 
export const { setLoading, setQuery, setTeamChannels, setDirectChannels} = channelSearchSlice.actions
export const { selectAll: selectMainEntities } = channelSearchAdapter.getSelectors(state => state.channelSearch)
export const select =(name) => createSelector(
    selectMainEntities,
    state => {
        console.log("...", name, state)
        state.find(i=> i === name)
    }
)
export default channelSearchSlice.reducer