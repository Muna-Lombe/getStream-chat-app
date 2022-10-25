import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import {AddChannel} from '../assets'
import { setIsCreating, setIsEditing, setToggleContainer, setCreateType, select } from '../redux/slices/main/mainSlice';

const TeamChannelList = ({children,  error=false, loading, type,}) => {
    const isCreating = useSelector(select.isCreating)
    const isEditing = useSelector(select.isEditing)
    const toggleContainer = useSelector(select.toggleContainer)
   const dispatch = useDispatch()
    if(error){
        console.log(error)
        return type === 'team' ? (
            <div className="team-channel-list">
                <p className="team-channel-list__message">
                    <strong>Connection error ⚠️</strong>
                    <br />
                    please wait a moment and try again!
                </p>
            </div>
        ) : null
    }

    if(loading){
        return  (
            <div className="team-channel-list">
                <p className="team-channel-list__message loading">
                    {type === 'team' ? "Channels" : "Messages"} loading...
                </p>
            </div>
        ) 
    }
    
    return (
        <div className='team-channel-list'>
            <div className="team-channel-list__header">
                <p className="team-channel-list__header__title">
                    {type === 'team' ? "Channels" : "Direct Messages"}
                </p>
                <AddChannel
                    type = {type === 'team' ? 'team' : 'messaging'}
                    isCreating={isCreating}
                    setIsCreating={() => dispatch(setIsCreating(!isCreating))}
                    setCreateType={() => dispatch(setCreateType(type))}
                    setIsEditing={() => dispatch(setIsEditing(!isEditing))}
                    setToggleContainer={() => dispatch(setToggleContainer(!toggleContainer))}

                />
            </div>
            {children}
        </div>
    )
}

export default TeamChannelList
