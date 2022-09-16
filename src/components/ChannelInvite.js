import React from 'react'


const ChannelInvite = ({acceptInvite, rejectInvite, message, inviteState}) => {
    console.log(message, inviteState)
    const RegularMessage = () => {
        return(
            <div className="str-chat__invite-card__body">
                <p>You {inviteState === "accepted" ? "joined" : "rejected"} the channel #{message.chanId} </p>
            </div>
        )
    }
    const InviteMessage = () => (
        <>
            <div className="str-chat__invite-card__body">
                <p>{message.text}</p>
            </div>
            <div className="str-chat__invite-card__actions">
                <div className="str-chat__invite-card__actions_filler">
                    <div 
                        className="str-chat__invite-card__actions-reject"
                        onClick={()=>(rejectInvite())}
                    > Reject </div>
                    <div  
                        className="str-chat__invite-card__actions-accept"
                        onClick={()=>(acceptInvite())}
                    > Accept</div>
                </div>
                

            </div>
        </>
    )
    return (
        <div className='str-chat__invite-card__wrapper'>
            <div className="str-chat__invite-card__header">
                <div className="str-chat__invite-card__channel-name">
                    <p> #{message.chanId} </p> 
                </div>
                
                    
                
                
            </div>
            {(inviteState === "accepted" || inviteState === "rejected") && <RegularMessage />}
            {(inviteState === "invited") && <InviteMessage />}
            
            
        </div>
        
    )
}

export default ChannelInvite
