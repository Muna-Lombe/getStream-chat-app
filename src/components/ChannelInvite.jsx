import React, { useState } from 'react'


const ChannelInvite = ({acceptInvite, rejectInvite, message, inviteState, isReceiver, isMyMsg}) => {
   
    
    const IsInviterMessage = () => {
        return(
        <div className="str-chat__invite-card__actions">
            <div className="str-chat__invite-card__actions_filler">
                <p>
                    You invited {inviteState.ownuser.user?.name} to join #{message.chanId}
                </p>
            </div>
        </div>
    )}
    const RegularMessage = () => {
        return(
            <div className="str-chat__invite-card__body">
                {isReceiver ?
                <p>You {inviteState.status === "accepted" ? "joined" : "rejected"} the channel #{message.chanId} </p>
                : <IsInviterMessage />
                }
            </div>
        )
    }
    const InviteMessage = () => (
        <>
            <div className="str-chat__invite-card__body">
                
                {
                    !isReceiver ?
                        <IsInviterMessage />
                        : 
                        <>
                        <p>{message.text}</p>
                        <div className="str-chat__invite-card__actions">
                            <div className="str-chat__invite-card__actions_filler">
                                <div
                                    className="str-chat__invite-card__actions-reject"
                                    onClick={() => (rejectInvite() )}
                                > Reject </div>
                                <div
                                    className="str-chat__invite-card__actions-accept"
                                        onClick={() => (acceptInvite() )}
                                > Accept</div>
                            </div>
                        </div>
                        </>
                        

                }
            </div>
            
            
        </>
    )
    return (
        <div className={'str-chat__invite-card__wrapper'+(isMyMsg ? ' align-right' : '') }>
            <div className="str-chat__invite-card__header">
                <div className="str-chat__invite-card__channel-name">
                    <p> New Channel Invite </p> 
                </div>
                
                    
                
                
            </div>
            {
                (inviteState.status === "invited") ?
                    <InviteMessage />
                : (inviteState.status === "accepted" || inviteState.status === "rejected") && <RegularMessage />
            }
            
            
            
        </div>
        
    )
}

export default ChannelInvite
