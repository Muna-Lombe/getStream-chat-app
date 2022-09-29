import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, darkModeTheme } from 'stream-chat-react';
import Cookies from 'universal-cookie/es6';
import {ChannelContainer, ChannelListContainer, Auth} from './components';
// import { useTheme } from 'stream-chat-react';
// import {api} from "../../trial_extender/streamData.json";
//CSS imports
import 'stream-chat-react/dist/css/index.css'
import './App.css';
import { dc, FA } from './components/Auth';
import { useEffect } from 'react';

//get cookies
const cookies = new Cookies();

// local stream apikey//

// const apiKey= '8tpzrxya45e2';// prod server
const apiKey = cookies.get("atlas") ? dc(cookies.get("atlas")) :  FA().then(r=>r); //dev server
const authToken = cookies.get("token");



// stream chat instance
const client = StreamChat.getInstance(apiKey);
// export const serverUrl = 'http://localhost:5001/wise-sphere-355719/us-central1/app';
// export const serverUrl = 'http://localhost:5000';


//create user instance
if(authToken){
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarUrl'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber')
    }, authToken)
}

const App = () => {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [toggleDark, setToggleDark] = useState(false)
    const [toggleContainer, setToggleContainer] = useState(true)
    const [isMobile, setIsMobile] = useState(false)


    
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            setIsMobile((window.innerWidth <= 960))
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); 
    
  

    

    //fetch list of channels
    const getChans = async()=>{
        const fetchedChannels = await client.queryChannels({
            members: {$in: [client.userID]}
        });
        console.log(fetchedChannels)
    };

	// getChans();
    if (!authToken) return <Auth/>
    return (
        <div className='app__wrapper'>
            <Chat client={client} theme='team light' darkMode={toggleDark}>
                <ChannelListContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    setShowInfo={setShowInfo}
                    setToggleDark={setToggleDark}
                    setToggleContainer={setToggleContainer}
                    toggleContainer={toggleContainer}
                    isMobile={isMobile}
                />
                <ChannelContainer
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    showInfo={showInfo}
                    setShowInfo={setShowInfo}
                    createType = {createType}
                    setToggleContainer={setToggleContainer}
                    toggleContainer={toggleContainer}
                    isMobile={isMobile}
                />

            </Chat>
        </div>
    );
}

export default App