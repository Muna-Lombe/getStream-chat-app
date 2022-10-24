import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { channelReducer } from 'stream-chat-react/dist/components/Channel/channelState'
import channelSearchSlice from './slices/channelSearch/channelSearchSlice'
import mainSlice from './slices/main/mainSlice'

const reduxStore = configureStore({
    reducer: {
        main: mainSlice,
        // channel: channelReducer,
        channelSearch:channelSearchSlice
        // reduce
        
    }
})



export default reduxStore ;