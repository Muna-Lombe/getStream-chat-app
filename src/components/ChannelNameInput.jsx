import React from 'react'
import { ChatError } from './ErrorType';

const ChannelNameInput = ({channelName = '', setChannelName, hasError, errMsg}) => {
    const InvalidChatId =()=>{
         return (
             <div className="channel-name-input__wrapper__error">
            {hasError && <ChatError classname="InvalidChatId" errMsg={errMsg} />}
        </div>
    )};
    const handleChange = (event) => {
          event.preventDefault();  
        
          setChannelName(event.target.value);
    };
    return (
        <div className="channel-name-input__wrapper">
            <div className="channel-name-input__wrapper__header">
                <p>Name</p>
            </div>
            
            <InvalidChatId />
            <div className="channel-name-input__wrapper__input">
                <input value = {channelName} onChange={handleChange} placeholder="channel-name (no spaces)" />
            </div>
            
            
        </div>
    )
};

export default ChannelNameInput