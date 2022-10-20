import React, {useMemo, useState} from 'react'
import { useEffect } from 'react';
import { ChannelList, darkModeTheme, useChatContext} from 'stream-chat-react';
import Cookies from 'universal-cookie/es6';

import { ChannelSearch, TeamChannelList, TeamChannelPreview, UserInfo} from '.';
import { HospitalIcon, LogoutIcon } from '../assets';

import { ToggleTheme } from '../assets/ToggleTheme';


const cookies = new Cookies();



const Sidebar = ({setToggleContainer, logout, isMobile, children, setToggleDark}) => (
    <div className={"channel-list__sidebar"+(isMobile ? "__mobile" : "")}>
        
        <HospitalIcon size={isMobile ? {w:32,h:32}: false}/>
        <LogoutIcon onClick={logout} size={isMobile ? {w:32,h:32}: false}/>

        {
            isMobile
            &&
            children
        }
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
        // &&
        // channel.
        ))
    // console.log(`team channels: `,teamChannels)
    
    return teamChannels
}

const customChannelMessagingFilter=(channels) => {
    const messagingChannels = channels.filter((channel) => channel.type === 'messaging')
    // console.log(`messagin channels: `,messagingChannels)

    return messagingChannels
}

                            
const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer, setShowInfo, isMobile, setToggleDark }) => {
    const { client } = useChatContext();

    const logout = () =>{
        const allCookies = Object.keys(cookies.getAll());
        allCookies.map((cookie)=> cookies.remove(`${cookie}`))
        window.location.reload();
    };

    const filters = { members: {$in: [client.userID]}, joined: {$eq: true} }
    if(isMobile){
        let children =(
            <>
            <UserInfo setPartialState={true} user={client.user} isMobile={isMobile}  ToggleTheme={ToggleTheme} />
            
            </>
            
        )
        return(
            <>
                <Sidebar setToggleContainer={setToggleContainer} setToggleDark={setToggleDark} logout={logout} children={children} isMobile={isMobile} />
                <div className={"channel-list__list__wrapper"}>
                    <div style={{ width: '100%' }}>
                        <CompanyHeader />
                        <ChannelSearch setToggleContainer={setToggleContainer} />
                        {/* teams channels */}
                        <ChannelList
                            filters={filters}
                            channelRenderFilterFn={customChannelTeamFilter}
                            List={(listProps) => (
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
                            List={(listProps) => (
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

                    
                </div>
            </>
        )
    }
    return (
        <>
            <Sidebar setToggleContainer={setToggleContainer} logout={logout} />
            <div className={"channel-list__list__wrapper"}>
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

const ChannelListContainer = ({ setCreateType, isCreating, setIsCreating, isEditing,setIsEditing, setToggleDark, toggleContainer, setToggleContainer, isMobile}) => {
    // Empty array ensures that effect is only run on mount
    
    
    return(
        <> 
            {
                isMobile ?
                (
                    <div className="channel-list__container-responsive" 
                            style={{ left: (toggleContainer && (!isCreating || !isEditing)) ? "0%":"-100%"   }}
                            // style={{left: "0%", backgroundColor: "#005fff"}}
                    >
                        {/* <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)} /> */}
                        <div className="channel-list__container-responsive__mask"
                        // style={{ left: toggleContainer ? "0%" : "-100%", backgroundColor: "#ffff", border: "1px solid rgb(120 117 117 / 47 %)" }}
                        >
                            <ChannelListContent
                                setIsCreating={setIsCreating}
                                setCreateType={setCreateType}
                                setIsEditing={setIsEditing}
                                setToggleContainer={setToggleContainer}
                                containerToggled={toggleContainer}
                                isMobile={isMobile}
                                setToggleDark={setToggleDark}
                            />
                        </div>
                        <div className="channel-list__container-responsive__clickable-space" onClick={() => (toggleContainer ? setToggleContainer(false): "")}>
                            
                        </div>
                    </div>
                )
                : (
                    <div className="channel-list__container">
                        <ChannelListContent
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setToggleDark={setToggleDark}
                            setIsEditing={setIsEditing}
                        />
                    </div>
                )
            }
            
            
        </>
    )
}
export default ChannelListContainer
