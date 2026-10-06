import React, { useState } from 'react'
import { Channel, useChatContext, MessageTeam, ComponentContext } from 'stream-chat-react'
import { select } from '../redux/slices/main/mainSlice';

import {ChannelInner, CreateChannel, ChannelInfo} from '.'
import { useSelector } from 'react-redux';

const ChannelContainer = (/*{ isCreating, setIsCreating, createType, isEditing, setIsEditing, showInfo, setShowInfo, toggleContainer, setToggleContainer, isMobile }*/) => {
    const { channel,client } = useChatContext();
    

    const isCreating = useSelector(select.isCreating)
    const isEditing = useSelector(select.isEditing)
    const showInfo = useSelector(select.showInfo)
    const toggleContainer = useSelector(select.toggleContainer)
    const isMobile = useSelector(select.isMobile)
    const createType = useSelector(select.createType)

    if (isCreating){
        return(
            <div className="channel__container">
                <CreateChannel
                />
            </div>
        )
    }

    if (showInfo){
        return(
            <div className="channel__container">
                <ChannelInfo />
            </div>
            
        )
    }
    
    const EmptyState = () =>{
        return(
            <div className="channel-empty__container">
                <p className="channel-empty__first">This is the beginning of your chat history</p>
                <p className="channel-empty__second">Send messages,attachments, links and more.</p>
            </div>
        )
        
    }
    return (
        <div className='channel__container'>
           <Channel
                EmptyStateIndicator={EmptyState}
                Message={ (messageProps,i) => <MessageTeam key={i} {...messageProps} /> }
           
           >
            <ChannelInner />
               
           </Channel>
        </div>
    )
}

export default ChannelContainer
