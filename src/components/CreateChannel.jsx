import React, { useState } from 'react';
import { useChatContext, useMessageContext } from 'stream-chat-react';





//components
import { UserList, ChannelInvite, ChatError, ChannelNameInput } from '.'

//assest
import { CloseBtn } from '../assets'


// ChannelNameInput

// const ChannelNameInput = ({channelName = '', setChannelName, hasError, errMsg}) => {
//     const InvalidChatId =()=>{
//          return (
//              <div className="channel-name-input__wrapper__error">
//             {hasError && <ChatError classname="InvalidChatId" errMsg={errMsg} />}
//         </div>
//     )};
//     const handleChange = (event) => {
//           event.preventDefault();  
        
//           setChannelName(event.target.value);
//     };
//     return (
//         <div className="channel-name-input__wrapper">
//             <div className="channel-name-input__wrapper__header">
//                 <p>Name</p>
//             </div>
            
//             <InvalidChatId />
//             <div className="channel-name-input__wrapper__input">
//                 <input value = {channelName} onChange={handleChange} placeholder="channel-name (no spaces)" />
//             </div>
            
            
//         </div>
//     )
// };
const CreateChannel = ({createType, isCreating, setIsCreating, setToggleContainer}) => {
    //Setting selected user
    const {client, setActiveChannel} = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);
    const [channelName, setChannelName] = useState('');
    // const [userChannels, setUserChannels] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [errMsg, setErrMsg] = useState('');
 

    //send CreateChannel request
    const createChannel = async(event) => {
        
        event.preventDefault();
        try {
            if(createType === "messaging"){
                let chat = client.getChannelByMembers('messaging', { members: [client.userID, selectedUsers[1]] });
                await chat.create();
                setToggleContainer(prevState => !prevState)
            }
            if( createType === "team"){
                const newChannel = client.channel(
                    createType,
                    channelName,

                    { name: channelName, members: [client.userID], invite: true }
                )

                await newChannel.create();
                console.log('newChannel : ', newChannel)


                // only find target contact if new channel created successfuly
                if (newChannel?.id) {
                    const userChan = async (userId) => {
                        let chat = client.getChannelByMembers('messaging', { members: [client.userID, userId] });
                        await chat.create();

                        console.log('id: ', chat.id)
                        console.log('chanid: ', newChannel?.id)

                        // only send message if channel found or created successfuly
                        if (chat?.id) {
                            await newChannel.inviteMembers([userId.toString()])
                            chat.sendMessage({
                                text: `You were invited to join the channel #${channelName}`,
                                isInvite: true,
                                channel_data: { type: newChannel?.type, id: newChannel?.id },
                                receiver: userId
                            })
                            // why do i need to set user channel?
                            // setUserChannels((prevChans) => [...prevChans, chat])
                        } else {
                            console.log('chat missing, trying again')


                        }
                    };

                    //loop through user id and set channels
                    selectedUsers.forEach(async (userId) => { userId !== client.userID && await userChan(userId) })
                    // console.log('user-channels', userChannels)
                    // await newChannel.watchers();
                }

                //reset fields
                setChannelName('');
                setIsCreating(false);
                setSelectedUsers([client.userID]);
                setActiveChannel(newChannel);

            }
            

        } catch (error) {
            console.log(error.message)
            
            setErrMsg(error.message)
            setHasError(true)
            
            
        }

    };
    
    const CreateChannelHeader = ()=>(
        <div className="create-channel__header">
            <p>{createType === 'team' ? 'Create a New Channel' : 'Send  Direct Message'}</p>
            <CloseBtn setIsCreating={setIsCreating} setToggleContainer={setToggleContainer} />
        </div>
    )
    return (
        <div className="create-channel__container">
            <CreateChannelHeader />
            <div className="create-channel__content">
                {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} hasError={hasError} errMsg={errMsg} />}
                <div className="create-channel__user-list">
                     
                    <UserList  isCreating={isCreating} setSelectedUsers={setSelectedUsers} />
                    <div className="create-channel__button-wrapper">
                        <p onClick={createChannel}>{createType==='team' ? 'Create Channel' : 'Create Message Group' } </p>
                    </div>  
                </div>
                
            </div>
            
        </div>
    )
}


export default CreateChannel
