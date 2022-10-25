import React, { useCallback, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux'
import { select, setIsCreating, setIsMobile } from './redux/slices/main/mainSlice';
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
if (authToken && !client._hasConnectionID()){
    console.log("has con", client._hasConnectionID())
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
    // const [createType, setCreateType] = useState('');
    // const [isCreating, setIsCreating] = useState(false);
    // const [isEditing, setIsEditing] = useState(false);
    // const [showInfo, setShowInfo] = useState(false);
    // const [toggleDark, setToggleDark] = useState(false)
    // const [toggleContainer, setToggleContainer] = useState(true)
    const [isMobile, setMobile] = useState((window.innerWidth <= 960))
    
    const dispatch  = useDispatch()
    

    // Handler to call on window resize
    useEffect(() => {
        
        function handleResize() {
            setMobile((window.innerWidth <= 960))
            // dispatch(setIsMobile((isMobile)))
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        // handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); 
    
    //Updates mobile status only on value difference
    (useCallback(()=>{
        let action = setIsMobile({ isMobile })
        dispatch(action)
    }, [isMobile]))()

    
    

    //fetch list of channels
    const getChans = async()=>{
        const fetchedChannels = await client.queryChannels({
            members: {$in: [client.userID]}
        });
        console.log(fetchedChannels)
    };
    
    const toggleDark = useSelector(select.toggleDark)
	// getChans();
    if (!authToken) return <Auth/>
    return (
        <div className='app__wrapper'>
            <Chat client={client} theme='team light' darkMode={toggleDark}>
                <ChannelListContainer />
                <ChannelContainer/>

            </Chat>
        </div>
    );
}

export default App