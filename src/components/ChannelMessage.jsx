import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Attachment,
  Avatar,
  messageHasReactions,
  MessageOptions,
  MessageRepliesCountButton,
  MessageStatus,
  MessageText,
  MessageTimestamp,
  ReactionSelector,
  SimpleReactionsList,
  useChatContext,
  useMessageContext,
  MessageActionsBox,
  MessageActions,
  Thread,
  useOpenThreadHandler,
  ThreadIcon,
  getGroupStyles,
  ActionsIcon,
  ReactionIcon,
  Message,
  MessageSimple,
  
} from 'stream-chat-react';

import {ReactIcon, MoreIcon, ReplyIcon} from '../assets'
import { ChannelInvite } from '.';
import { useEffect } from 'react';
// import './CustomMessage.scss';

const ChannelMessage =  () => {
  const {
    isReactionEnabled,
    message,
    reactionSelectorRef,
    showDetailedReactions,
    actionsEnabled,
    getMessageActions,
    handleAction,
    handleDelete,
    handleEdit,
    handleReaction,
    handleOpenThread,
    messageListRect
  } = useMessageContext();
  const { client } = useChatContext();
//   const [reactionEnabled, setReactionEnabled] = useState(!isReactionEnabled);
  const [isActionEnabled, setIsActionEnabled] = useState(!actionsEnabled);
  const [inviteState, setInviteState] = useState({status:"invited", ownuser:{name:"$missing"}});
  const [channel, setChannel] = useState({id:message.channel_data?.id, name:'Apache'});
  const [invitee, setInvitee] = useState()
  const [inviteResponse, setInviteResponse] = useState(false)

    
    
    useEffect(() => {
      if(message.isInvite){
        updateInviteState().then(res=>res)
      }
      
    //   return setInviteResponse(false)
    }, [message.receiver])
    
    
    //accept invites to channel
    const acceptInvite = () =>{
        try {
            // let chan
            // // accept the invite 
            (async()=>{
                
                let chan = await updateChannel()
                // &&
                
                if(channel.name === "Apache"){
                    setChannel(chan)
                }
                
                // &&
                await chan.acceptInvite({ 
                    message: { text: `${client.user.name || client.user.name} has joined this channel!` }, 
                })
                // &&
               
                setInviteResponse("accepted")

        })()
            

            
        } catch (error) {
            
            
        }
    }
    const rejectInvite = ()=>{
        
        try{
        // //rejecting invites
            (async ()=>{
                let chan = await updateChannel()
                // &&
                
                
                if (channel.name === "Apache") {
                    setChannel(chan)
                }
                // &&
                await chan.rejectInvite()
                // &&
                
                // &&
                setInviteResponse("rejected")
        })()
        } catch (error) {
            
            
        }
    }
    // reject invites to channel

    //
    
    const memoizedMessage = useMemo(() => ({ text: message.text, chanId: channel.id, user: invitee || message.user }), [message])

    const getChannelFromMsg = useCallback(
        async(filters) =>{
            let defaultFilters = { 
                id: message.channel_data?.id, 
                type: message.channel_data?.type, 
                members: { 
                    $in: [
                        (message.receiver ||
                        client.user.id ||
                        client.userID).toString()
                ] }
            }
    
        const chan = await client.queryChannels(filters||defaultFilters)
        
        setChannel(chan[0])

        return chan[0]

    }, [message.receiver]);
    

    // (async()=>())();
    const updateInviteState = useCallback( () =>{
        return (async()=>{
            // client.user.id.toString() || client.userID.toString()
            const filters = {
                id: message.channel_data?.id,
                type: message.channel_data?.type,
                members: {
                    $in: [
                        (message.receiver ||
                        client.user.id ||
                        client.userID).toString()
                    ]
                }
            }
            
            let inviteState = "invited";
            let ownuser;
            let prom = async () => {

                const chan = await getChannelFromMsg(filters)
                
                const members = chan.state.members
                const thisUser = Object.values(members).filter((m) => m.user_id === message.receiver)[0]
                // setInvitee({id:message.receiver, name:thisUser.user.name})
                ownuser = thisUser
                

                if (
                    (thisUser.invite_accepted_at !== undefined
                        ||
                        (typeof thisUser.invite_accepted_at) !== "undefined"
                    )

                ) {
                    
                    inviteState = "accepted"
                    setInviteState({ status: "accepted" , ownuser})
                    return true
                }
                if (
                    (thisUser.invite_rejected_at !== undefined
                        ||
                        (typeof thisUser.invite_rejected_at) !== "undefined"
                    )

                ) {
                   
                    inviteState = "rejected"
                    setInviteState({ status: "rejected", ownuser })
                    
                    return true
                }
                return setInviteState({ status: "invited", ownuser })
            }


            // Promise.resolve(prom().then(res => res)).then(res=>res)
            
            let resolved = await prom().then(res => true);

            return (resolved === true
                &&
                { status: inviteState, ownuser }); 
        })()
        
    }, [message.receiver])

    // check inviteStatus
    
    /// checking for and setting the channel
    
    const updateChannel = //useCallback(
      async () =>{
        const doUpdate = async()=>{
           
            const filters = {id: message.channel_data?.id, type: message.channel_data?.type, members: {$in:[message.receiver.toString()]}};
            // console.log('shit set')
            
            let chan = channel || await getChannelFromMsg(filters)
            let newChan
            
            
                
                
                if(chan.id === message.channel_data.id){
                    
                    // setChannel(ch) 
                    newChan = chan
                    

                }
            
            if(message.isInvite === true ) {
            };
            return newChan
        }
        try {
            const res = await doUpdate();
            return res
            // return !(JSON.stringify(channel).includes("{id:1, name:'Apache'}"));
        } catch (err) {
            return err;
        }
        
        
    }//,
    //   [channel.id],
    // )

//   console.log('isrec:', isReactionEnabled)
//   console.log('show:', showDetailedReactions)
//   console.log('actions ico:', ActionsIcon)
//   console.log('message context:', useMessageContext)
//   console.log('message invite:', message)



  const openThread = useOpenThreadHandler(message,(message))
  const messageWrapperRef = useRef(null);


  const hasReactions = messageHasReactions(message);
  const Reactions = () =>{
    const [reactionEnabled, setReactionEnabled] = useState(!isReactionEnabled)
    return(
        <div className='str-chat__message-team-actions'>
            <ReactIcon onClick={useCallback(() =>
                setReactionEnabled(prevState => !prevState),
                [setReactionEnabled],
            )
            } />

            <ReplyIcon openThread={handleOpenThread} />
            {/* <Thread /> */}
            {/* <ThreadIcon  /> */}
            <MoreIcon /*setDetailedReactions={setDetailedReactions}*/ />


            <MessageOptions
                displayLeft={true}
                displayReplies={true}
                messageWrapperRef={messageWrapperRef}
            // ActionsIcon={ActionsIcon}
            // ReactionIcon={ReactionIcon}
            // ThreadIcon={ThreadIcon}

            />

            {reactionEnabled && (
                <div className='message-team-reaction-icon'>
                    <ReactionSelector ref={reactionSelectorRef} />
                </div>
            )}

        </div>
    )
  }
  const CustomMessage = ()=>{
    return(
    <div className='str-chat__message-team str-chat__message-team--top str-chat__message-team--regular  str-chat__message-team--received'>
        <div className='str-chat__message-team-meta'>
        
            <Avatar image={message.user?.image} name={message.user?.name} />
            <div className='message-header-timestamp'>
                <MessageTimestamp />
            </div>
        </div>
      
        <div className='str-chat__message-team-group'>
            
            <div className='str-chat__message-team-author'>
                {message.user?.name}
            </div>

            <Reactions/>
            
            <div className='str-chat__message-team-content str-chat__message-team-content--top str-chat__message-team-content--text'>
                {
                    message.isInvite ?
                    <ChannelInvite 
                    message={memoizedMessage} 
                    acceptInvite={acceptInvite} 
                    rejectInvite={rejectInvite} 
                    isReceiver={message.receiver === client.user?.id} 
                    inviteState={ inviteState} 
                    /*inviteState={()=>("invited")}*/ 
                    /> 

                    : <RegularMessage/> 
                } 

                <div className='str-chat__message-team--received'>
                    <MessageStatus />
                </div>
            </div>

            
            
            

            {/* <div className='str-chat__message-team-actions'>
                <MessageOptions displayLeft={false} messageWrapperRef={messageWrapperRef} />
            </div> */}
            
            
            
            
        </div>


        
    </div>
    )
  }
  const RegularMessage = () => {
    return(
        <>
            <MessageText />
            {message.attachments && <Attachment attachments={message.attachments} />}
            {/* displays a reaction that has already been added */}
            {hasReactions && !showDetailedReactions && isReactionEnabled && <SimpleReactionsList />}
            {/* {isActionEnabled && <MessageActions />} */}
            {/* <Thread  /> */}
            <MessageRepliesCountButton reply_count={message.reply_count} />
            {/* <MessageSimple /> */}
        </>
    )
  }

  
    
  return (
        
    
    //    message.isInvite
            // ? <ChannelInvite message={{ text: message.text, chanId: channel.id, user: message.user }} isInviter={message.receiver === client.user?.id} acceptInvite={acceptInvite} rejectInvite={rejectInvite} />

            <CustomMessage /> //<RegularMessage />
       
  );
};
export default ChannelMessage;

// list class
            // str-chat__li str-chat__li--top
        // message container class
            // str-chat__message-team str-chat__message-team--top str-chat__message-team--regular  str-chat__message-team--received 
        // avatar class
            // str-chat__message-team-meta
        // message body class
            // str-chat__message-team-group
        // author class
            // str-chat__message-team-author
        // message text class
            // str-chat__message-team-content str-chat__message-team-content--top str-chat__message-team-content--text
            
        // actions class
            // str-chat__message-team-actions
        // reactions class
            // message-team-reaction-icon