import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useChatContext } from 'stream-chat-react'
import Cookies from 'universal-cookie/es6'

// useChatContext

import { UserList } from "."
import { EditChannel } from "."
import { CloseBtn } from '../assets'
import { EditIcon } from '../assets'
import { BackIcon } from '../assets'
import { select, setShowInfo, setIsEditing} from '../redux/slices/main/mainSlice';

const ChannelInfo = () => {
    const { channel,client} = useChatContext();
    const isEditing = useSelector(select.isEditing)
    const showInfo = useSelector(select.showInfo)
    const dispatch = useDispatch()
    const [ activeChannelMembers, setActiveChannelMembers] = useState(
        Object.values(channel.state.members).map((member) => {
            if (
                member.user_id === channel.data.created_by.id
                ||
                (
                    (member.invite_accepted_at !== undefined || (typeof member.invite_accepted_at) !== "undefined")
                    || 
                    (member.invite_rejected_at !== undefined || (typeof member.invite_rejected_at) !== "undefined" )
                )
                
                ){
                    
                    return {id: member.user.id, joinedStatus: true}
                }
            if (
                (
                    (member.invite_accepted_at === undefined || (typeof member.invite_accepted_at) === "undefined")
                    && 
                    (member.invite_rejected_at === undefined || (typeof member.invite_rejected_at) === "undefined" )
                )
                ){
                    
                    return {id: member.user.id, joinedStatus: false}
                }
            
            return member
            

        })
        )

    // console.log("isediting", isEditing)
    // console.log("channel: ", channel)

    //leave channel
    const leaveChannel = async () => {
        // console.log("leaving channel...")
        
    
        try {
             await channel.removeMembers([client.userID]);
           
            window.alert("You successfuly left the channel!")
            window.location.reload();
        } catch (error) {
            console.error(error);
        } 
     };

     /////////////////////////////////////////////////////////////
     ///////////  WARNING! THIS METHOD IS FOR TESTING ONLY //////
     //////////   SHOULD NOT EXIST IN PRODUCTION ///////////////

     const deleteChannel = async(req,res) =>{
         const cids = [channel.cid]
         try {
            await client.deleteChannels(cids,{options: {hard_delete: true}});
            console.log('delete res: ', res)
            setShowInfo((prevState) => !prevState)
         } catch (error) {
            console.log('delete eror: ', error)
             
         }
         
     }
     ////////////////////////////////////////////////////////////
     ////////////////////////////////////////////////////////////

    return (
        <div className='channel-info__container'>
            <div className="channel-info__header">

                <p>
                    <span onClick={() => dispatch(setShowInfo(!showInfo))} >
                        <BackIcon />   
                    </span>
                </p>
                <p>
                    Channel info
                </p>
                <p>
                    <span onClick={deleteChannel} style={{color:'red', textDecorationLine:'underline', cursor:'pointer'}}>
                        DelChan
                    </span>
                </p>
                <p>

                    
                    {
                        !isEditing
                        ? <span style={{ display: 'flex' }} onClick={() => dispatch(setIsEditing(!isEditing))}>
                            <EditIcon />
                        </span> //
                        : <CloseBtn onClick={()=>dispatch(setIsEditing(!isEditing))} />
                    }
                </p>
                
            </div>
            {
                isEditing
                ?  <EditChannel setIsEditing={(state)=>dispatch(setIsEditing(state))} isEditing={isEditing} excludeChannelMembers={activeChannelMembers}/>
                :  <UserList activeChannelMembers={activeChannelMembers} />

            }
            { !isEditing 
                &&  <div className="edit-channel__button-wrapper" onClick={leaveChannel}>
                            <p style={{backgroundColor:'var(--alert-color)'}}>Leave</p>
                    </div>
            }
        </div>
    )
}

export default ChannelInfo
