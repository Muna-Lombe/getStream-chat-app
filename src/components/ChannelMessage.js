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
  
} from 'stream-chat-react';

import {ReactIcon, MoreIcon, ReplyIcon} from '../assets'
import { ChannelInvite } from './';
// import './CustomMessage.scss';

const ChannelMessage =  () => {
  const {
    isReactionEnabled,
    message,
    reactionSelectorRef,
    showDetailedReactions,
  } = useMessageContext();
  const { client } = useChatContext();
  const [reactionEnabled, setReactionEnabled] = useState(!isReactionEnabled);
  const [detailedReactions, setDetailedReactions] = useState(showDetailedReactions);
  const [channel, setChannel] = useState({id:message.channel_data?.id, name:'Apache'});
  const [inviteSet, setInviteSet] = useState(false);
  const [inviteState, setInviteState] = useState("invited");

  
 
  
    //accept invites to channel
    const acceptInvite = () =>{
        try {
            // let chan
            // // accept the invite 
            (async()=>{
                
                let chan = await updateChannel()
                // &&
                console.log("accepting invite", chan)
                // &&
                await chan.acceptInvite({ 
                    message: { text: `${client.user.name || client.user.name} has joined this channel!` }, 
                })
                // &&
                console.log("accepted!")
                setInviteState("accepted")

        })()
            

            
        } catch (error) {
            console.log(error)
            
        }
    }
    const rejectInvite = ()=>{
        
        try{
        // //rejecting invites
            (async ()=>(
                await updateChannel()
                &&
                console.log("rejecting invite", channel)
                &&
                await channel.rejectInvite()
                &&
                console.log("rejected!")
                &&
                setInviteState("rejected")
            ))()
        } catch (error) {
            console.log(error)
            
        }
    }
    // reject invites to channel
    
    
    /// checking for and setting the channel
    
    const updateChannel = useCallback(
      async () =>{
        const doUpdate = async()=>{
            console.log("curr usr", message.receiver)
            const filters = {id: message.channel_data?.id, type: message.channel_data?.type, members: {$in:[message.receiver.toString()]}};
            // console.log('shit set')
            
            let chans = await client.queryChannels(filters)
            let newChan
            console.log("getChan", chans)
            chans.map((ch)=>{
                console.log("ch", ch.data.id)
                console.log("channel match", ch.id === message.channel_data.id)
                if(ch.id === message.channel_data.id){
                    console.log("setting new channel")
                    setChannel(ch) 
                    newChan = ch
                    console.log("new channel set", channel)

                }
            })
            if(message.isInvite === true && inviteSet === false) {
            console.log("received invite from ", message.user.name)
                setInviteSet(true)
                console.log("new channel", channel)
                console.log(message)
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
        
        
    },
      [message.receiver],
    )
     

    // updateChannel();


//   console.log('isrec:', isReactionEnabled)
//   console.log('show:', showDetailedReactions)
//   console.log('actions ico:', ActionsIcon)
//   console.log('message context:', useMessageContext)
//   console.log('message invite:', message)




  const messageWrapperRef = useRef(null);


  const hasReactions = messageHasReactions(message);

  const RegularMessage = () => {
    return(
        <>
            <MessageText />
            {message.attachments && <Attachment attachments={message.attachments} />}
            {/* displays a reaction that has already been added */}
            {hasReactions && !showDetailedReactions && isReactionEnabled && <SimpleReactionsList />}
            <MessageRepliesCountButton reply_count={message.reply_count} />
        </>
    )
  }

  
    
  return (
        
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

            <div className='str-chat__message-team-actions'>
                <ReactIcon setReactionEnabled={setReactionEnabled}  />

                <ReplyIcon  />

                <MoreIcon setDetailedReactions={setDetailedReactions} />

                
                <MessageOptions 
                    displayLeft={true} 
                    messageWrapperRef={messageWrapperRef} 
                    // ActionsIcon
                    // ReactionIcon
                    // ThreadIcon
                />
                {/* showDetailedReactions &&  */}
                { reactionEnabled && (
                    <div className='message-team-reaction-icon'>
                        <ReactionSelector ref={reactionSelectorRef} />
                    </div>
                )}
                
            </div>
            
            <div className='str-chat__message-team-content str-chat__message-team-content--top str-chat__message-team-content--text'>
                {
                    message.isInvite 
                    ?  <ChannelInvite message={{text: message.text, chanId: channel.id, user: message.user}} acceptInvite={acceptInvite} rejectInvite={rejectInvite} inviteState={inviteState}/> 
    
                    : <RegularMessage/> 
                }   
            </div>

            <div className='str-chat__message-team--received'>
                <MessageStatus />
            </div>
            
            

            {/* <div className='str-chat__message-team-actions'>
                <MessageOptions displayLeft={false} messageWrapperRef={messageWrapperRef} />
            </div> */}
            
            
            
            
        </div>


        
    </div>
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