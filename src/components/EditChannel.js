import axios from 'axios';
import React, {useState} from 'react'
import { useChatContext } from 'stream-chat-react'

import { UserList, ChannelInvite ,ChannelNameInput} from "./"


// const ChannelNameInput = ({channelName = '', setChannelName}) => {
    

//     const handleChange = (event) => {
//           event.preventDefault();  
        
//           setChannelName(event.target.value);
//     };
//     return (
//         <div className="channel-name-input__wrapper">
//            <p>Name</p>
//            <input value = {channelName} onChange={handleChange} placeholder="channel-name (no spaces)" />
//         </div>
//     )
// };

const EditChannel = ({setIsEditing, excludeChannelMembers, isEditing}) => {
    const { channel,client} = useChatContext();
    const [channelName, setChannelName] = useState(channel?.data?.name);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [userChannels, setUserChannels] = useState([])
    const [submitError, setSubmitError] = useState(false)
    const [unclearError, setUnclearError] = useState(false)
    const [hasError, setHasError] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    // console.log('curr-user',client)
    


    //send editChannel request
    const saveEdit = async(event) => {
        const updateMsg = `Channel Name Changed by ${channel._client?.user?.fullName || channel._client?.user?.name} !\n`;
        const addMemMsg = `${selectedUsers} has joined the channel, say hi to welcome them`;
        event.preventDefault();
        setSubmitError(false)
        setUnclearError(false)
        
        try {
            // console.log("all members: ", selectedUsers )
            // console.log('curr-user',client.getChannelByMembers('messaging', {members:['63e9f556b3609c8e5524295114ce14f4']} )  )
            
            if(selectedUsers.length > 0 || channelName !== channel.data.name){
                // channelName !== channel.data.name  && await channel.update({ name: channelName}, {text: updateMsg});
                // selectedUsers.length > 0 && await channel.addMembers(selectedUsers, {text: addMemMsg});
                if(selectedUsers.length){

                }
                if(channelName !== channel.data.name){

                }
                const options = {invite:'pending'};

                
                // fetch or set channel to send invite to
                const userChan = async (userId) => {
                    let chat = client.getChannelByMembers('messaging', {members:[client.user?.id, userId]})
                    chat.watch()
                    console.log("new chat members", chat)
                    // chat = chat.id ? chat : await client.channel('messaging', {invites:[client.user?.id,userId], options})
                    // chan
                    // chan.create();
                    await channel.inviteMembers([userId.toString()])
                    chat.sendMessage({ 
                            text: `You were invited to join the channel #${channelName}`,
                            isInvite:true,
                            channel_data: {type: channel?.type, id: channel?.id},
                            receiver:userId
                        })
                    // chan.sendMessage({ 
                    //     text: `You were invited to join the channel #${channelName} `, 
                    //     receiver: userId
                    // })
                    // console.log('id: ',chan?.id)
                    
                    setUserChannels((prevChans) => [...prevChans, chat])
                    // chat.stopWatching()
                };

                //loop through user id and set channels
                console.log("su", selectedUsers)
                selectedUsers.forEach((user)=> userChan(user))
                console.log('user-channels', userChannels)

                // setIsEditing(false);
                setChannelName('');
                setSelectedUsers([]);


            }else{
                setSubmitError((prevState) => !prevState)
            }
            
            ///////////////////////////////////////////////////////////////
            // sending invites
            // const invite = client.channel('messaging', 'awesome-chat', { 
            //     name: 'Founder Chat', 
            //     members: ['thierry', 'tommaso'], 
            //     invites: ['nick'], 
            // }); 
            
            // await invite.create();
            ///////////////////////////////////////////////////////////////

            //////////////////////////////////////////////////////////////
            // const rejected = client.queryChannels({ 
            //     invite: 'pending', 
            // }); 
             
            // //server side (query invites for user rob) 
            // const invites = await client.queryChannels({ 
            //     invite: 'pending', 
            // },{},{'user_id':'rob'});
            /////////////////////////////////////////////////////////////

            // // initialize the channel 
            // const channel = client.channel('messaging', 'awesome-chat'); 
            
            // // accept the invite 
            // await channel.acceptInvite({ 
            //     message: { text: 'Nick joined this channel!' }, 
            // }); 
            
            // // accept the invite server side  
            // await channel.acceptInvite({'user_id':'nick'});

            // //rejecting invites
            // await channel.rejectInvite(); 
 
            // //server side  
            // await channel.rejectInvite({'user_id':'rob'});


            //reset fields
            // setChannelName('');
            // setSelectedUsers([client.userID ])
            // setActiveChannel(newChannel)

        } catch (error) {
            console.log("error", error)
            setUnclearError((prevState) => !prevState)
            setErrMsg(error.message)
            setHasError(true)
        }

    };


    //Error handling
    const PrintSubmitError = () => {
        var opacity = 1;  // initial opacity
        var display = "";
        var filter = "";
        var errorDiv =(display, opacity,filter) => {  
            var timer =  setInterval(function () {
                if (opacity <= 0.1){
                    clearInterval(timer);
                    setSubmitError(false)
                    display = 'none';
                    
                }
                // opacity ;
                filter = 'alpha(opacity=' + opacity * 100 + ")";
                opacity -= opacity * 0.1;
            }, 100)
            return (
                    <div className="edit-channel__error-wrapper" style={{display:display, opacity:opacity, filter:filter}}>
                        <p>Please make changes or close the page to exit</p>
                    </div>
                )
        }
        
        return (errorDiv(display,opacity,filter))
    }
    
    const PrintUnclearError = () => {
        
        return (
            <div className="edit-channel__header" style={{justifyContent:'space-around'}}>
                <p>Something went wrong, please refresh the page and try again🔌 </p>
            </div>
        )
        
        
        
    }

    const NormalDiv = () =>{
        return(
            <>
                <UserList 
                setSelectedUsers={setSelectedUsers} 
                isEditing={isEditing} 
                excludeChannelMembers={excludeChannelMembers} 
                />
                {submitError && <PrintSubmitError />}
                <div className="edit-channel__button-wrapper" onClick={saveEdit}>
                    <p>Save</p>
                </div>
            </>       
        )
    }
    const EditChannelHeader =()=> (
         <div className="edit-channel__header">
            <p>
                Edit Channel
            </p>
        </div>
)
    return (
        <div className='edit-channel__container'>
            <EditChannelHeader/>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName} hasError={hasError} errMsg={errMsg}  />
            <UserList 
                setSelectedUsers={setSelectedUsers} 
                isEditing={isEditing} 
                excludeChannelMembers={excludeChannelMembers} 
            />
            {submitError && <PrintSubmitError />}
            <div className="edit-channel__button-wrapper" onClick={saveEdit}>
                <p>Save</p>
            </div>
            
        </div>
    )
}

export default EditChannel
