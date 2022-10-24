import React from 'react'
import { useDispatch } from 'react-redux';
import { Avatar, useChatContext } from 'stream-chat-react'
import { setIsCreating, setIsEditing, setToggleContainer } from '../redux/slices/main/mainSlice';


const TeamChannelPreview = ({setActiveChannel,  channel, type}) => {
    const {channel: activeChannel, client} = useChatContext();
    const dispatch = useDispatch()
    const ChannelPreview = () =>{
        return(
            <p className="channel-preview__item">
                # {channel?.data?.name || channel?.data?.id}
            </p>
        )
    } ;

    const DirectPreview = ()=>{

        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID )
        
        return(
            <div className="channel-preview__item single">
                <Avatar
                    // className = {type === "messaging" ? 'channel-empty__avatars' : ''}
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName}
                    size={24}
                />
                <p>{members[0]?.user?.name || members[0].user?.id}</p>

            </div>
        )

    }


    return (
        <div 
            className={
                channel.id === activeChannel?.id 
                    ? 'channel-preview__wrapper__selected'
                    : 'channel-preview__wrapper'
            }
            onClick={() =>{
                setActiveChannel(channel)
                dispatch(setIsCreating(false));
                dispatch(setIsEditing(false));
                
                if(setToggleContainer){
                    dispatch(setToggleContainer(false))
                }
            }}


        >
            {type === 'team' ? <ChannelPreview/> : <DirectPreview/>}

        </div>
    )
}

export default TeamChannelPreview
