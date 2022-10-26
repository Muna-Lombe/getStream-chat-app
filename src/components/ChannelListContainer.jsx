import React, {useMemo, useState} from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChannelList, darkModeTheme, useChatContext} from 'stream-chat-react';
import { ChannelSearch, TeamChannelList, TeamChannelPreview, UserInfo} from '.';
import { HospitalIcon, LogoutIcon } from '../assets';

import { ToggleTheme } from '../assets/ToggleTheme';
import { select, setCreateType, setIsCreating, setIsEditing, setToggleContainer, setToggleDark } from '../redux/slices/main/mainSlice';


const Sidebar = ({setToggleContainer, logout, isMobile, children, setToggleDark}) => (
    <div className={"channel-list__sidebar"+(isMobile ? "__mobile" : "")}>
        
        <HospitalIcon onClick={() => setToggleContainer(prevState => !prevState)} size={isMobile ? {w:32,h:32}: false}/>
        <LogoutIcon size={isMobile ? {w:32,h:32}: false}/>

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

                            
const ChannelListContent = ({isMobile}) => {
    const { client } = useChatContext();

   

    const filters = { members: {$in: [client.userID]}, joined: {$eq: true} }
    if(isMobile){
        let children =(
            <>
            <UserInfo setPartialState={true} user={client.user} isMobile={isMobile}  ToggleTheme={ToggleTheme} />
            
            </>
            
        )
        return(
            <>
                <Sidebar setToggleContainer={setToggleContainer} setToggleDark={setToggleDark} children={children} isMobile={isMobile} />
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
                                />
                            )}
                            Preview={(previewProps) => (
                                <TeamChannelPreview
                                    {...previewProps}
                                    type="team"
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
                                    

                                />
                            )}
                            Preview={(previewProps) => (
                                <TeamChannelPreview
                                    {...previewProps}
                                    type="messaging"
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
            <Sidebar setToggleContainer={setToggleContainer} />
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
                                // isCreating={isCreating}
                                // setIsCreating={setIsCreating}
                                // setCreateType={setCreateType}
                                // setIsEditing={setIsEditing}
                                // setToggleContainer={setToggleContainer}

                            />
                        )}
                        Preview={(previewProps) => (
                            <TeamChannelPreview
                                {...previewProps}
                                type="team"
                                // setIsCreating={setIsCreating}
                                // setIsEditing={setIsEditing}
                                // setToggleContainer={setToggleContainer}

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
                            />
                        )}
                        Preview={(previewProps) => (
                            <TeamChannelPreview
                                {...previewProps}
                                type="messaging"   
                            />
                        )}
                    />
                </div>
                
                <UserInfo setPartialState={true} user={client.user} />
            </div>
        </>
    );
}

const ChannelListContainer = (/*{ setCreateType, setIsCreating, setIsEditing, setToggleDark, toggleContainer, setToggleContainer, isMobile}*/) => {
    // Empty array ensures that effect is only run on mount
    const isMobile = useSelector(select.isMobile)
    const toggleContainer = useSelector(select.toggleContainer)
    const isCreating = useSelector(select.isCreating)
    const isEditing = useSelector(select.isEditing)
    const dispatch = useDispatch()
    useEffect(() => {
        function handleDelayedRender(){
            let waitToRender = setTimeout(() => {
                if(document.readyState === "complete"){
                    clearTimeout(waitToRender)
                }
            }, 300);
        }
        
        document.addEventListener("readystatechange", handleDelayedRender);
        return document.removeEventListener("readystatechange", handleDelayedRender)
    }, [])
    
    console.log("isMobile", isMobile)
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
                            <ChannelListContent isMobile={isMobile}/>
                        </div>
                        <div className="channel-list__container-responsive__clickable-space" onClick={() => (toggleContainer ? dispatch(setToggleContainer(false)) : "")}>

                        </div>
                    </div>
                )
                : (
                    <div className="channel-list__container">
                        <ChannelListContent/>
                    </div>
                )
            }
            
            
        </>
    )
}
export default ChannelListContainer
