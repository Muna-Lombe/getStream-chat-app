import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { MessageList, MessageInput, Thread, Window, useChannelActionContext, Avatar, useChannelStateContext, useChatContext, VirtualizedMessageList, MessageInputFlat, MessageInputSmall, MessageInputContextProvider, MessageSimple } from 'stream-chat-react';
import { ChannelMessage} from '.'
//assets
import { BackIcon, ChannelInfo } from '../assets';
import { select, setShowInfo, setIsEditing, setToggleContainer } from '../redux/slices/main/mainSlice';

export const GiphyContext = React.createContext({});

const ChannelInner = () => {
  const [giphyState, setGiphyState] = useState(false);
  const { sendMessage } = useChannelActionContext();
  

  


  
  const overrideSubmitHandler = (message) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };
    
    if (giphyState) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }
    
    if (sendMessage) {
      sendMessage(updatedMessage);
      setGiphyState(false);
    }
  };

  

  let isFirstOrSingleton = [];
  const groupingStyle=(msg, prevMsg, nxtMsg, noGrp, one, two, three)=>{
    // console.log("....////....", prevMsg, msg, nxtMsg, noGrp, one, two, three, "....\\\....")
    try {
      if(noGrp) return "none";
      let prevId,msgId,nxtId,singleton,group;
      let first, firstInGrp, middleInGrp, lastInGrp;
      prevId = (prevMsg === undefined) ? false : (prevMsg?.type === "regular" ? prevMsg?.created_at : prevMsg?.date?.id)
      msgId = (msg === undefined) ? false : (msg?.type === "regular" ? msg?.created_at : msg?.date?.id)
      nxtId = (nxtMsg === undefined) ? false : (nxtMsg?.type === "regular" ? nxtMsg?.created_at : nxtMsg?.date?.id)
      singleton = ((prevMsg?.user?.id !== msg?.user?.id) && (msg?.user?.id !== nxtMsg?.user?.id))
      group = true||((prevMsg?.user?.id === msg?.user?.id) && (msg?.user?.id === nxtMsg?.user?.id))
      firstInGrp = ((prevMsg?.user?.id !== msg?.user?.id) && (msg?.user?.id === nxtMsg?.user?.id))
      middleInGrp = ((prevMsg?.user?.id === msg?.user?.id) && (msg?.user?.id === nxtMsg?.user?.id))
      lastInGrp = ((prevMsg?.user?.id === msg?.user?.id) && (msg?.user?.id !== nxtMsg?.user?.id))

      // console.log(`msgs:`, "\n prev-", prevMsg, "\n msg-", msg, "\n nxt-", nxtMsg, "\n noGrp-", noGrp, "\n")

      
      if (singleton) {
        // console.log("single")

        isFirstOrSingleton.push({id: msg.id, isSingleton: true})
        return "single"
      }
      
        if ((!prevId && msgId) || firstInGrp){
          // console.log("top")
          isFirstOrSingleton.push({ id: msg.id, isFirstInGroup: true })
          return "top"
        }
        if ((prevId === msgId && msgId  === nxtId) || middleInGrp) {
          // console.log("middle")
          return "middle"
        }
        if ((prevId && msgId && !nxtId) || lastInGrp) {
          // console.log("bottom")
          isFirstOrSingleton.push({id:msg.id, isSingleton:false})
          return "bottom"
        }
      
      
      
    } catch (error) {
      console.log(error)
    }
    return 0
  }
  
  const CustomMessageInput = () =>{
    const FileUploadBtn =()=>(
      <div class="rfu-file-upload-button">
        <label>
          <input aria-label="File input" type="file" class="rfu-file-input" multiple="" />
          <span class="str-chat__input-flat-fileupload">
            <svg height="14" width="14" xmlns="http://www.w3.org/2000/svg">
              <title>
                Attach files
              </title>
              <path d="M1.667.333h10.666c.737 0 1.334.597 1.334 1.334v10.666c0 .737-.597 1.334-1.334 1.334H1.667a1.333 1.333 0 0 1-1.334-1.334V1.667C.333.93.93.333 1.667.333zm2 1.334a1.667 1.667 0 1 0 0 3.333 1.667 1.667 0 0 0 0-3.333zm-2 9.333v1.333h10.666v-4l-2-2-4 4-2-2L1.667 11z" fill-rule="nonzero">
              </path>
            </svg>
          </span>
        </label>
      </div>
    )
    const ImagePreviewerThumbnailOverlay =()=> (
      <div class="rfu-thumbnail__overlay">
        <button type="button" data-testid="cancel-upload-button" aria-label="Cancel upload" class="rfu-icon-button">
          <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" xmlns-xlink="http://www.w3.org/1999/xlink">
            <defs>
              <path d="M465 5c5.53 0 10 4.47 10 10s-4.47 10-10 10-10-4.47-10-10 4.47-10 10-10zm3.59 5L465 13.59 461.41 10 460 11.41l3.59 3.59-3.59 3.59 1.41 1.41 3.59-3.59 3.59 3.59 1.41-1.41-3.59-3.59 3.59-3.59-1.41-1.41z" id="b">
              </path>
              <filter x="-30%" y="-30%" width="160%" height="160%" filterUnits="objectBoundingBox" id="a">
                <feOffset in="SourceAlpha" result="shadowOffsetOuter1">
                </feOffset>
                <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1">
                </feGaussianBlur>
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" in="shadowBlurOuter1">
                </feColorMatrix>
              </filter>
            </defs>
            <g transform="translate(-451 -1)" fill-rule="nonzero" fill="none">
              <use fill="#000" filter="url(#a)" xlink-href="#b">
              </use>
              <use fill="#FFF" fill-rule="evenodd" xlink-href="#b">
              </use>
            </g>
          </svg>
        </button>
      </div>
    )
    const ImageUploadBtn =()=>(
      <div class="rfu-image-upload-button">
        <label>
          <input aria-label="Image input" type="file" class="rfu-image-input" accept="image/*" multiple="" />
          <div class="rfu-thumbnail-placeholder">
            <svg width="14" height="15" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 8.998H8v6H6v-6H0v-2h6v-6h2v6h6z" fill="#A0B2B8" fill-rule="nonzero">
              </path>
            </svg>
          </div>
        </label>
      </div>
    )
    const ImagePreviewer =()=>(
      <div class="rfu-image-previewer">
        <div class="rfu-image-previewer__image rfu-image-previewer__image--loaded">
          <div class="rfu-thumbnail__wrapper" style={{width: "100px", height: "100px"}}>
            <ImagePreviewerThumbnailOverlay/>
            <img src="https://ohio.stream-io-cdn.com/1209907/images/9c0121ac-81ab-40a2-aa61-3d3bd8d5fc7c.monitor%20%282%29.jpg?Key-Pair-Id=APKAIHG36VEWPDULE23Q&amp;Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9vaGlvLnN0cmVhbS1pby1jZG4uY29tLzEyMDk5MDcvaW1hZ2VzLzljMDEyMWFjLTgxYWItNDBhMi1hYTYxLTNkM2JkOGQ1ZmM3Yy5tb25pdG9yJTIwJTI4MiUyOS5qcGc~Km9oPTI4MDMqb3c9MzczNyoiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2NjU0ODU2MjN9fX1dfQ__&amp;Signature=ZlTN~KYzEgJ7b-IohrFfDEmBcQ~hgvqA32KwnvQeHPSZrhT4o-ZRPzApmo1e1CktxS3IJZdy3wxJ7u1GDPLNpLY2xVOxZcXfTjlKkNNPc-TuOg0ktWT4OelU3LvbfAdUUdfDHWho2ULcuoUJb2qpVo-hppSrij-xOUeSKB3SqZeKL0A5BNFSdoNhrOgaWpUxsR-qkk9lRokngRN8v4OL5kIOpEiTn7qOlJlBW5UOUp8y~l2EWNh0mngxC0z0zbT8msforIwA8sQ4boxZx9juST5~OUlY6q5yXL4SCTPT5e457LdWgvmBzg3fDKQSxTz-y-yn4-ZjUXd-aKW1dYRK6g__&amp;oh=2803&amp;ow=3737" class="rfu-thumbnail__image" alt="" />

          </div>
        </div>
        <ImageUploadBtn/>
      </div>
    )
    const EmojiSelector = ()=>(
      <div class="str-chat__emojiselect-wrapper">
        <div class="str-chat__tooltip">
          Open emoji picker
        </div>
        <button aria-label="Emoji picker" class="str-chat__input-flat-emojiselect">
          <svg height="28" width="28" xmlns="http://www.w3.org/2000/svg">
            <title>
              Open emoji picker
            </title>
            <g clip-rule="evenodd" fill-rule="evenodd">
              <path d="M14 4.4C8.6 4.4 4.4 8.6 4.4 14c0 5.4 4.2 9.6 9.6 9.6c5.4 0 9.6-4.2 9.6-9.6c0-5.4-4.2-9.6-9.6-9.6zM2 14c0-6.6 5.4-12 12-12s12 5.4 12 12s-5.4 12-12 12s-12-5.4-12-12zM12.8 11c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8s1.8.8 1.8 1.8zM18.8 11c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8s1.8.8 1.8 1.8zM8.6 15.4c.6-.4 1.2-.2 1.6.2c.6.8 1.6 1.8 3 2c1.2.4 2.8.2 4.8-2c.4-.4 1.2-.6 1.6 0c.4.4.6 1.2 0 1.6c-2.2 2.6-4.8 3.4-7 3c-2-.4-3.6-1.8-4.4-3c-.4-.6-.2-1.2.4-1.8z">
              </path>
            </g>
          </svg>
        </button>
      </div>
    )
    const InputTextArea = () => (
      <div class="rta  str-chat__textarea custom-input">
        <textarea data-testid="message-input" aria-label="Type your message" placeholder="Type your message" rows="1" class="rta__textarea str-chat__textarea__textarea" style={{ height: "57px !important" }}>
        </textarea>
      </div>
    )
    const FileUploadWrapper =() =>(
      <div class="str-chat__fileupload-wrapper custom-input" data-testid="fileinput">
        <div class="str-chat__tooltip">
          Attach files
        </div>
        <FileUploadBtn />
      </div>
    )
    const TextAreaWrapper = ()=> (
      <div class="str-chat__input-flat--textarea-wrapper">
        <EmojiSelector />
        <InputTextArea/>
        <FileUploadWrapper/>
      </div>
    )
   
    const SendBtn =()=>(
      <button aria-label="Send" class="str-chat__send-button">
        <svg height="17" viewBox="0 0 18 17" width="18" xmlns="http://www.w3.org/2000/svg">
          <title>Send</title>
          <path d="M0 17.015l17.333-8.508L0 0v6.617l12.417 1.89L0 10.397z" fill="#006cff" fill-rule="evenodd">
          </path>
        </svg>
      </button>
    )
    
    return(
      <div class="str-chat__input-flat-wrapper">
        
        <div className="str-chat__input-flat-wrapper custom-input has-attachment">
          <ImagePreviewer/>
        </div>
        <div className="str-chat__input-flat-wrapper custom-input">
          <TextAreaWrapper/>
          <SendBtn/>
        </div>
        
      </div>
    )
  }
  // MessageSimple

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div style={{ display: 'flex', width: '100%' }}>
        <Window>
          <TeamChannelHeader/>
          {/* <MessageList   /> */}
          {/* groupStyles={groupingStyle} */}
          {/* <MessageList noGroupByUser={false} Message={(messageProps, i) => <MessageSimple key={i} {...messageProps} />} /> */}
          <MessageList  noGroupByUser={false} groupStyles={groupingStyle}  Message={ (messageProps,i) => <ChannelMessage key={i} {...messageProps} keepAvtr={isFirstOrSingleton}   />}  />
          {/* <VirtualizedMessageList shouldGroupByUser={true} /> */}
          {/* <VirtualizedMessageList shouldGroupByUser={true} Message={(messageProps, i) => <ChannelMessage key={i} {...messageProps} keepAvtr={messageProps.firstOfGroup} /> } /> */}
          {/* Message={ (messageProps,i) => <ChannelMessage key={i} {...messageProps} /> }  */}
          
          {/* {hasChannelInvite && <ChannelInvite setChannel={setChannel} setAccept={setAccept} setReject={setReject} setInvite={setInvite}/>} */}
          {/* <CustomMessageInput /> */}
          {/* <MessageInput Input={(messageInputProps) => <CustomMessageInput {...messageInputProps} />}  overrideSubmitHandler={overrideSubmitHandler} /> */}
          <MessageInput  overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  );
};

const TeamChannelHeader = () => {
    const { channel, watcher_count } = useChannelStateContext();
    const { client } = useChatContext();
    
    const isMobile = useSelector(select.isMobile)
    const toggleContainer = useSelector(select.toggleContainer)
    const showInfo = useSelector(select.showInfo)
    const dispatch = useDispatch()
    const MessagingHeader = () => {
    
      let members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID );
      const additionalMembers = members.length - 3;
      
      if(channel.type === 'messaging') {
        return (
          <div className='team-channel-header__channel_name-wrapper'>
            {/* <div className="team-channel-header__channel-wrapper_left"> */}
              {
                isMobile ?
                <BackIcon forceleft={true} toggleAction={()=> dispatch(setToggleContainer(!toggleContainer)) } />
                :""
              }
              
              {/* <p className='team-channel-header__chanel_name'># {channel.data.name}</p> */}
            {/* </div> */}

            {members.map(({ user }, i) => (
              <div key={i} className='team-channel-header__channel_name-multi'>
                <Avatar image={user.image} name={user.fullName || user.id} size={38} />
                {
                  members.length < 2 ?
                  <p className='team-channel-header__chanel_name user'>{user.fullName || user.id}</p>
                  : ""
                }
                
              </div>
            ))}
  
            {additionalMembers > 0 && <p className='team-channel-header__channel_name user'>and {additionalMembers} more</p>}
          </div>
        );
      }
  
      return (
        <div className='team-channel-header__channel-wrapper'>
          <div className="team-channel-header__channel-wrapper_left"
          style={{display: "flex", }}
          >
            {
              isMobile ?
                <BackIcon forceleft={true} toggleAction={() => dispatch(setToggleContainer(!toggleContainer))} />
                : ""
            }

            <p className='team-channel-header__channel_name'># {channel.data.name}</p>
          </div>
          <span style={{ display: 'flex' }} onClick={() => dispatch(setShowInfo(!showInfo))}>
            <ChannelInfo />
          </span>
        </div>
      );
    };
  
    const getWatcherText = (watchers) => {
      if (!watchers) return 'No users online';
      if (watchers === 1) return ' user online';
      return `${watchers} users online`;
    };
  
    return (
      <div className='team-channel-header__container'>
        <MessagingHeader />
        <div className='team-channel-header__right'>
          <p className='team-channel-header__right-text'>{getWatcherText(watcher_count)}</p>
        </div>
      </div>
    );
  };

  export default ChannelInner;