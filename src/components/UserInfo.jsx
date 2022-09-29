import axios from 'axios'
import React, { useState } from 'react'
import { Avatar, useChat, useChatContext, useUserHandler } from 'stream-chat-react'
import Cookies from 'universal-cookie'
//assets
import {EditIcon, OnlineStatusIcon,  SaveIcon, CloseBtn, UserIcon}  from '../assets'


const UserInfo = ({setPartialState, setFullState, user, isMobile, ToggleTheme, children}) => {
    const [loading, setLoading] = useState(false)
    const [isOnline, setIsOnline] = useState([user.online])
    const [ canEdit, setCanEdit] = useState([])
    const [showInfo, setShowInfo] = useState(false)
    const [userData, setUserData] = useState(user)

    
    // console.log(isOnline);
    // setIsOnline(onlineStatus);
    // setPartialState && setIsPartial((prevState)=> !prevState);
    const handleShow =()=>{
        if(isMobile) setShowInfo(prevState => !prevState)
        if(showInfo === false) setCanEdit([])
    }
    const DispInfo = () =>{
    
        // updateUser({ id: user.id, })
        const handleUpdate=async (ev)=>{
            ev.preventDefault() 
            console.log("event", ev) 
            const form = document.forms["upsert-user-form"]

            const data = {id: user.id}
            Object.values(form)
            .filter((ip)=> ip.type === "text" && ip.value.length > 2)
            .forEach((ip)=> {
                data['set']={[ip.name]:ip.value}
            })
            console.log("data",data)
            // const newData = await updateUser(data, token)
            const url = sessionStorage.getItem("URL")
            setLoading(true)
            const updatedUser  = await (await axios.post(`${url}/user/update`, data)).data.users[user.id]
            console.error("newData", updatedUser)
            setLoading(false)

            setUserData(updatedUser)
            
            setCanEdit([])
        
        }
        const EditableUserData = () =>(
            <form id="upsert-user-form" action="" onSubmit={(ev) =>handleUpdate(ev)} >
                    <p className="micro-display-user__name">
                        {
                        canEdit?.some((el) => el.div === ("name-text")) ?
                            <input 
                                className="micro-display-user__name-text"
                                name="name" 
                                form='upsert-user-form' 
                                type="text" 
                                defaultValue={userData?.name || user?.name || user?.id}
                            
                            />
                            :
                            <span
                                className="micro-display-user__name-text"
                                contentEditable={canEdit?.div?.includes("name-text")}
                            >
                                {userData?.name || user?.name || user?.id}
                            </span>
                        }
                        
                        <span className="editIcon">
                            {
                                canEdit?.some((el)=>el.div === ("name-text")) ?
                                    (
                                        <label htmlFor="upsert-user-form">
                                            {canEdit.length < 2 ?
                                            <input className="hidden-input" form='upsert-user-form' type="submit" value=""/>
                                                : <input form='upsert-user-form' type="text" value="" disabled  style={{display:"none"}}/>
                                            }
                                           
                                                {canEdit.length < 2 ?
                                                    <SaveIcon size={{ w: 16, h: 16 }} />
                                                : <CloseBtn size={{ w: 16, h: 16 }} onClick={() => setCanEdit(canEdit.filter((el) => !el.div === ("name-text") ))} />
                                                }
                                            
                                        </label>
                                    )
                                : <EditIcon size={{ w: 16, h: 16 }} onClick={() => setCanEdit(prevState => (prevState === false || prevState.length < 2) ? [...prevState, { div: "name-text" }] : [{ div: "name-text" }] )} />
                            }
                           
                        </span>
                    </p>
                    <p className="micro-display-user__name">
                        {
                            canEdit?.some((el) => el.div?.includes("fullname-text")) ?
                                <input
                                    className="micro-display-user__name-text"
                                    name="fullName"
                                    form='upsert-user-form'
                                    type="text"
                                    defaultValue={userData?.fullName || user?.fullName || user?.id}

                                />
                                :
                                <span
                                    className="micro-display-user__name-text"
                                    contentEditable={canEdit?.div?.includes("fullname-text")}
                                >
                                    {userData?.fullName || user?.fullName || user?.id}
                                </span>
                        }

                        <span className="editIcon">
                            {
                                canEdit?.some((el) => el.div?.includes("fullname-text")) ?
                                    (
                                        <label htmlFor="upsert-user-form">
                                            {canEdit.length < 2 ?
                                                <input className="hidden-input" form='upsert-user-form' type="submit" value="" />
                                                : <input form='upsert-user-form' type="text" value="" disabled style={{ display: "none" }} />
                                            }

                                            {canEdit.length < 2 ?
                                                <SaveIcon size={{ w: 16, h: 16 }} />
                                                : <CloseBtn size={{ w: 16, h: 16 }} onClick={() => setCanEdit(canEdit.filter((el) => !el.div === "fullname-text"))} />
                                            }

                                        </label>
                                    )
                                    : <EditIcon size={{ w: 16, h: 16 }} onClick={() => setCanEdit(prevState => (prevState === false || prevState.length < 2) ? [...prevState, { div: "fullname-text" }] : [{ div: "fullname-text" }])} />
                            }

                        </span>
                    </p>
                    <p className="micro-display-user__avatar">
                        {
                        canEdit?.some((el) => el.div === ("avatar-image")) ?
                            <input 
                                className="micro-display-user__avatar-image"
                                name="image" 
                                form='upsert-user-form' 
                                type="text" 
                                defaultValue={userData?.image || user?.image} />
                            :
                            <span
                                className="micro-display-user__avatar-image"
                                contentEditable={canEdit?.div?.includes("avatar-image")}
                            >
                                <Avatar image={userData?.image || user?.image} name={userData?.name || user?.name} size={38} />
                            </span >
                            
                        }
                        <span className="editIcon">
                            {
                            canEdit?.some((el) => el.div?.includes("avatar-image")) ?
                                    (
                                        <label htmlFor="upsert-user-form">
                                        {canEdit.length < 2 ?
                                            <input className="hidden-input" form='upsert-user-form' type="submit" value="" />
                                            : <input form='upsert-user-form' type="text" value="" disabled style={{ display:"none"}} />
                                        }
                                        
                                            {canEdit?.length < 2 ?
                                                <SaveIcon size={{ w: 16, h: 16 }} />
                                                : <CloseBtn size={{ w: 16, h: 16 }} onClick={() => setCanEdit(canEdit.filter((el) => !el.div === "avatar-image"))} />
                                            }
                                    
                                        
                                        </label>
                                    )
                                : <EditIcon size={{ w: 16, h: 16 }} onClick={() => setCanEdit(prevState => (prevState === false || prevState.length <= 2) ? [...prevState, { div: "avatar-image" }] : [{ div: "avatar-image" }] )} />
                            }
                        </span>
                    </p>
                    {canEdit?.length >= 2 ?
                        <input id="batch-save" form='upsert-user-form' type="submit" value="save" />
                        : ""
                    }
                
            </form>
        )
        console.log('user-info:', user);
        return(
            <div 
            className={"micro-display-user"+(canEdit.length ?" editable":"")+(canEdit.length >= 2? " batch-save" : "")}
                onBlur={() => console.log("setShowInfo(false)")}
                onBlurCapture={() => console.log("setShowInfo(false)")}
            >
                <EditableUserData />
                
            </div>
        )
    };
    
    const PartialDiv = () =>(
        <div className={"channel-list__list__user-info__partial-wrapper" + (isMobile ? "__mobile" : "")}>
            
                <div 
                className={"avatar-display" + (isMobile ? "__mobile" : "")}
                
                >
                    <Avatar image={userData?.image || user?.image} name={userData?.name || user?.name} size={isMobile ? 30 : 38}/> 
                    <div style={{ 
                    display:'flex', 
                    justifyContent:'center', 
                    position: 'absolute', 
                    left: '-6px', 
                    width:(isMobile ? '38px':'max-content')}}
                    onClick={() => handleShow()}
                    // onFocusIn={() => setDispUser(prevState => !prevState)}
                    >
                    <OnlineStatusIcon 
                        isOnline={isOnline}
                    />
                    </div>
                    {
                        (isMobile && showInfo) ?
                        <DispInfo />
                        : ""
                    }
                </div>
            
            {
                !isMobile ?
                (<p style={{marginLeft: '2px'}}>{userData?.name || user?.name}</p>)
                : ""
            }
            {isMobile && <ToggleTheme size={isMobile ? { w: 31, h: 31 } : { w: 40, h: 40 }}/>}
        </div>
    )
    
    const FullDiv = () =>{
        return(
            <>
            Full Div
            </>
        )
    };
    if (loading) {
        return (
            <div 
                className="user-info__loading-skeleton"
                style={{
                    display:'flex',
                    justifyContent:'space-around',
                    border:'1px solid black'
                }}
            >
                {loading && 
                    <p className='user-info__loading-text '>
                        <UserIcon size={{w:32, h:32}} disabled={true}/>
                    </p>
                }
            </div>
        )
    }
    if (setFullState) {
        return <FullDiv /> 
    } 
    
    if (setPartialState) {
        return <PartialDiv /> 
    } 

    
    
}

export default UserInfo
