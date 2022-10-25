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
  ReactionsList,
  showMessageActionsBox,
  
} from 'stream-chat-react';

import {ReactIcon, MoreIcon, ReplyIcon} from '../assets'
import { ChannelInvite } from '.';
import { useEffect } from 'react';
// import './CustomMessage.scss';

const ChannelMessage =  ({keepAvtr}) => {
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
    messageListRect,
    isMyMessage,
  } = useMessageContext();
  const { client } = useChatContext();
//   const [reactionEnabled, setReactionEnabled] = useState(!isReactionEnabled);
//   const [isActionEnabled, setIsActionEnabled] = useState(!actionsEnabled);
  const [inviteState, setInviteState] = useState({status:"invited", ownuser:{name:"$missing"}});
  const [channel, setChannel] = useState({id:message.channel_data?.id, name:'Apache'});
  const [invitee, setInvitee] = useState()
  const [inviteResponse, setInviteResponse] = useState(false)

    // console.log("keep", keepAvtr)
    
    useEffect(() => {
      if(message.isInvite){
        if(document.readyState === "complete"){
            updateInviteState().then(res=>res)
        }
        
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
    const messageReceiver = useMemo(() => message.receiver, [message.receiver])

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

        }, [messageReceiver]);
    

    const updateInviteState = useCallback( async() =>{
        let prom = async (filters, ownuser) => {

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
                setInviteState({ status: "accepted", ownuser })
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
        let ownuser = '';
        let resolved = await prom(filters, ownuser).then(res => true);

        return (
            resolved === true
            &&
            { status: inviteState, ownuser }
        ); 
        
        
    }, [messageReceiver])

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
    }




  const messageWrapperRef = useRef(null)
  const hasReactions = messageHasReactions(message);

  const Reactions = () =>{
    const [reactionEnabled, setReactionEnabled] = useState(!isReactionEnabled)
    const handleOpenReactions = useCallback(() =>
        setReactionEnabled(prevState => !prevState),
        [isReactionEnabled],
    )
  
    const ReactIconWrapper = () => (
        <ReactIcon onClick={() => setReactionEnabled(prevState => !prevState)} />
    )
    const DelayedReactionSelector = ()=>{
        setTimeout(() => {
        }, 5000)
        return(
            <div className='message-team-reaction-icon'>
                <ReactionSelector detailedView={false} ref={null} />
            </div>
        )
    }
    return(
        <>
            <MessageOptions 
                messageWrapperRef={messageWrapperRef} 
                // ActionsIcon={MoreIcon}
                // ReactionIcon={ReactIconWrapper}
                // ThreadIcon={ReplyIcon}
            />
            {/* <DelayedReactionSelector /> */}
            {reactionEnabled && <DelayedReactionSelector />}
        </>
        
    )
  }
  const CustomMessage = ({keepAvtr})=>{
    const Usrname = () => (
        <div className={'str-chat__message-team-author'}>
            {message.user?.name}
        </div>
    )
    const Timestamp = () => (
        <div className='str-chat__message-header-timestamp'>
            <MessageTimestamp />
        </div>    
    )
    const AvtrComp  =()=> (
        <div className='str-chat__message-team-meta'>
            {
                keepAvtr.some((el) => el.id === message.id && !el.isFirstInGroup ) ? 
                <>
                    <Avatar image={message.user?.image} name={message.user?.name} />
                    <Usrname />
                    
                </>
                :""

            }
            
            
        </div>
    )
    const MsgComp =()=>{
        return (
            <div className={'str-chat__message-team-group' + (isMyMessage() ? ' align-right' : ' ')}>

                {
                    keepAvtr.some((el) => (el.id === message.id && el.isFirstInGroup) || (el.id === message.id && el.isSingleton)) 
                    ? 
                    <Timestamp /> : ''
                }

                <Reactions />

                <div className={'str-chat__message-team-content str-chat__message-team-content--top str-chat__message-team-content--text'+(isMyMessage() ? ' align-invite-right' : '')}>
                    {
                        message.isInvite ?
                            <ChannelInvite
                                message={memoizedMessage}
                                acceptInvite={acceptInvite}
                                rejectInvite={rejectInvite}
                                isReceiver={message.receiver === client.user?.id}
                                inviteState={inviteState}
                                // isMyMsg={isMyMessage}
                            /*inviteState={()=>("invited")}*/
                            />

                            : <RegularMessage />
                    }

                    
                </div>
            </div>
    )}
    const MsgAvtr = () => (
        <>
            <AvtrComp />
            <MsgComp />
        </>
    )
    const MsgAvtrReversed = () => (
        <>
            <MsgComp />
            <AvtrComp /> 
        </>

    )
    const MsgAvtrComp = () => {
        return (
            
            isMyMessage() ?
                <MsgAvtrReversed/>
                :<MsgAvtr/>
        )
    }
    return(
        <div className={'str-chat__message-team str-chat__message-team--top str-chat__message-team--regular  str-chat__message-team--received' + (!keepAvtr.some((el) => el.id === message.id) ? " in-group" : "") + (keepAvtr.some((el) => el.id === message.id && el.isFirstInGroup) ? " first-in-group" : "") + (keepAvtr.some((el) => el.id === message.id && !el.isFirstInGroup) ? " last-in-group" : "")}>
        <MsgAvtrComp/>
        <div className={'str-chat__message-team--received'}>
            <MessageStatus />
        </div>
    </div>
    )
  }
  const RegularMessage = () => {
    const alignRightClass = `str-chat__message-text-inner${(isMyMessage() ? "--align-right" : "")} str-chat__message-simple-text-inner${(isMyMessage() ? "--align-right" : "") }`;

    return(
        <>
            <MessageText customInnerClass={alignRightClass}  />
            {message.attachments && <Attachment attachments={message.attachments} />}
            {/* displays a reaction that has already been added */}
            {hasReactions && 
                !showDetailedReactions && 
                isReactionEnabled && 
                <SimpleReactionsList/>
            }
            
            <MessageRepliesCountButton  onClick={handleOpenThread} reply_count={message.reply_count} />
            {/* <MessageSimple /> */}
        </>
    )
  }

  

  return (
        
            <CustomMessage keepAvtr={keepAvtr}/> //<RegularMessage />
       
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