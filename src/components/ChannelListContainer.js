import React, {useState} from 'react'
import { ChannelList, useChatContext} from 'stream-chat-react';
import Cookies from 'universal-cookie/es6';

import { ChannelSearch, TeamChannelList, TeamChannelPreview, UserInfo} from './';
import HospitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'


const cookies = new Cookies();



const Sidebar = ({logout}) => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src={HospitalIcon} alt="Hospital" width="30" />
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={logout}>
                <img src={LogoutIcon} alt="Logout" width="30" />
            </div>
        </div>
    </div>
);

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">
            Simple Chat App
        </p>
    </div>
);

const customChannelTeamFilter=(channels) => {
    const teamChannels = channels.filter((channel) => (
        channel.type === 'team' 
        ))
    // console.log(`team channels: `,teamChannels)

    return teamChannels
}

const customChannelMessagingFilter=(channels) => {
    const messagingChannels = channels.filter((channel) => channel.type === 'messaging')
    // console.log(`messagin channels: `,messagingChannels)

    return messagingChannels
}

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer,setShowInfo}) => {
    const { client } = useChatContext();

    const logout = () =>{
        const allCookies = Object.keys(cookies.getAll());
        allCookies.map((cookie)=> cookies.remove(`${cookie}`))
        window.location.reload();
    };

    const filters = { members: {$in: [client.userID]}, joined: {$eq: true} }
    return (
        <>
            <Sidebar logout={logout} />
            <div className="channel-list__list__wrapper">
                <div style={{width:'100%'}}>
                    <CompanyHeader />
                    <ChannelSearch setToggleContainer={setToggleContainer} />
                    {/* teams channels */}
                    <ChannelList 
                        filters={filters}
                        channelRenderFilterFn={customChannelTeamFilter}
                        List={(listProps)=>(
                            <TeamChannelList
                                {...listProps}
                                type="team"
                                isCreating={isCreating}
                                setIsCreating={setIsCreating}
                                setCreateType={setCreateType}
                                setIsEditing={setIsEditing}
                                setToggleContainer={setToggleContainer}

                            />
                        )}
                        Preview={(previewProps) => (
                            <TeamChannelPreview
                                {...previewProps}
                                type="team"
                                setIsCreating={setIsCreating}
                                setIsEditing={setIsEditing}
                                setToggleContainer={setToggleContainer}

                            />
                        )}
                    />
                    {/* direct messaging channels */}
                    <ChannelList 
                        filters={filters}
                        channelRenderFilterFn={customChannelMessagingFilter}
                        List={(listProps)=>(
                            <TeamChannelList
                                {...listProps}
                                type="messaging"
                                isCreating={isCreating}
                                setIsCreating={setIsCreating}
                                setCreateType={setCreateType}
                                setIsEditing={setIsEditing}
                                setToggleContainer={setToggleContainer}
                                setShowInfo={setShowInfo}

                            />
                        )}
                        Preview={(previewProps) => (
                            <TeamChannelPreview
                                {...previewProps}
                                type="messaging"
                                setIsCreating={setIsCreating}
                                setIsEditing={setIsEditing} 
                                setToggleContainer={setToggleContainer}
                                setShowInfo={setShowInfo}
                                    
                            />
                        )}
                    />
                </div>
                
                <UserInfo setPartialState={true} user={client.user} />
            </div>
        </>
    );
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing}) => {
    const [toggleContainer, setToggleContainer] = useState(false)

    return(
        <>
            <div className="channel-list__container">
                <ChannelListContent
                     setIsCreating={setIsCreating}
                     setCreateType={setCreateType}
                     setIsEditing={setIsEditing}
                />
            </div>
            <div className="channel-list__container-responsive" 
                    style={{left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}
            >
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)} />
                <ChannelListContent
                     setIsCreating={setIsCreating}
                     setCreateType={setCreateType}
                     setIsEditing={setIsEditing}
                     setToggleContainer={setToggleContainer}
                />
            </div>
        </>
    )
}
export default ChannelListContainer
