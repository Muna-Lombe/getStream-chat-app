import React,{useEffect,useState} from 'react';
import { Avatar,useChatContext } from 'stream-chat-react';

//assets
import {InviteIcon} from "../assets"


// Container for List of user
const ListContainer = ({isCreating, isEditing, children}) => {
    return(
        <div className="user-list__container">
            {(isCreating || isEditing) ?
                <p className='add_member'>Add Members</p>
                : ""
            }
            <div className="user-list__header">
                <p>User</p>
                {/* <p>Invite</p> */}
                {(isEditing || isCreating) && <p>Invite</p>}
            </div>
            <div className="user-list__content">
                {children}
            </div>
            
        </div>
    )
};

//individual users
const  UserItem = ({user, setSelectedUsers, isCreating, isEditing}) => {
    //toggle invited
    const [selected, setSelected] = useState(false)

    // add user to list of selected  users
    const handleSelect = () => {
        if(selected === true){
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))

        }else{
            isEditing
            // ? setSelectedUsers((prevUsers) => prevUsers[user.id] = user)
            // : setSelectedUsers((prevUsers) => prevUsers[user.id] = user.id)
            ? setSelectedUsers((prevUsers) => [...prevUsers, user.id])
            : setSelectedUsers((prevUsers) => [...prevUsers, user.id])
            

        }
    }

    const toggleInvite = () =>{
        setSelected((prevState) => !prevState);
        handleSelect();

    }

    const SetInvite = () => {
        return(
            <div onClick={!( user.joinedStatus === false ) ? toggleInvite : undefined} disabled={( user.joinedStatus === false )}>
                
                { 
                    isCreating ?
                        (selected ? 
                        <InviteIcon /> 
                        : <div className="user-item__invite-empty" />
                        )
                        : ''
                    }
                {
                    isEditing ?
                    (
                        ( user.joinedStatus === false  ) ?
                            <div className="user-item__invite-no-invite">/</div>
                            : selected ?
                                <InviteIcon /> 
                                : <div className="user-item__invite-empty" />
                        
                    )
                    :''
                    
                }
                    
            </div>
        )
    }
    return(
        <div className="user-item__wrapper" >
            <div className="user-item__name-wrapper">
                <Avatar image = {user.image} name={user.fullname || user.id} size={32}/>
                
                <p className="user-item__name">{user.fullName || user.id}</p>
            </div>
            {
                ( user.joinedStatus === false )
                &&
                <p className="user-item__pending-status">Invite pending</p>
            }
            {(isEditing || isCreating) && <SetInvite /> }
        </div>
    )
};

const UserList = ({setSelectedUsers, activeChannelMembers, excludeChannelMembers, isEditing, isCreating}) => {
    const {client,channel} = useChatContext();

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [listEmpty, setListEmpty] = useState(false);
    const [error, setError] = useState(false);
    const [moderator, setModerator] = useState(false);

    
    const isModerator=() =>{
        // console.log("moderator: ", channel?.data?.moderator) 
        // console.log("user: ", client?.userID) 
    }

    // isModerator();


    useEffect(() => {
        const getUsers = async () => {
            if(loading) return;
            setLoading(true);

            try {

                // get users
                const response = await client.queryUsers(
                    { id: { $ne: client.userID}},
                    { id: 1},
                    {limit: 8}
                );
                
                //Check if we have users
                if (response.users.length){
                    let filteredUsers = null
                    
                    // setting channel members
                    if(activeChannelMembers){
                        // only iterate trough
                        // console.log("activ", activeChannelMembers)
                        filteredUsers = response.users.filter((user) => (activeChannelMembers.find((member)=>member.id === user.id)))
                        filteredUsers = filteredUsers.map((user) => (
                            {...user, joinedStatus: activeChannelMembers.find((member) => member.id === user.id).joinedStatus, }
                        ))
                        // console.log(response.users,"filtered users", filteredUsers)
                    }
                    if(isEditing){
                        // console.error("filtered usrs:", filteredUsers,excludeChannelMembers)
                        filteredUsers = response.users.filter((user) => {
                            return !excludeChannelMembers.some((member) => member.id === user.id)
                        })
                        
                        //////////////////////////////////
                        // filteredUsers = response.users.map((user) => {
                        //     // console.log("bo status:", excludeChannelMembers)
                        //     let userHas =  [...excludeChannelMembers].find((member)=>{return member.id === user.id}) || {joinedStatus:"not Invited"}
                        //     // console.log("status", userHas.joinedStatus)
                        //     return {...user, joinedStatus: userHas.joinedStatus }
                        // })
                        //////////////////////////////////
                        //!(excludeChannelMembers.find((member)=>member.id === user.id)))
                        // filteredUsers = response.users
                        // console.log("using",response.users,"exfiltered users from", excludeChannelMembers, "to", filteredUsers)
                    }

                  
                    setUsers(filteredUsers || response.users);
                    // console.log("usrs", users, filteredUsers)
                }else {
                    setListEmpty(true);
                }
                
                //filter out existing channel members
                // if(activeChannelMembers){
                //     console.log("active channel members: ", activeChannelMembers);
                // }
                

                
            } catch (error) {
                console.error("catch error", error)
                setError(true);
            }
            setLoading(false);

        }

        if(client) getUsers();
    }, [activeChannelMembers])
    
    // Error handling
    if(error){
        return(
            <ListContainer>
                <div className="user-list__message">
                    Trouble loading users, please refresh and try again
                </div> 
            </ListContainer>
        )
    };

    if(listEmpty){
        return(
            <ListContainer>
                <div className="user-list__message">
                    It's a little lonely here 😟,
                    no one to talk to.
                </div> 
            </ListContainer>
        )
    };

    return (
        <ListContainer isEditing={isEditing} isCreating={isCreating}>
            {loading 
            ? <div className="user-list__message"> loading users... </div> 
            : (
                users?.map((user, i) => (
                    <UserItem 
                        index={i} 
                        isCreating={isCreating}
                        isEditing={isEditing} 
                        key={user.id} 
                        user={user}
                        setSelectedUsers={ setSelectedUsers } />
                ))
            )}
        </ListContainer>
    )
};

export default UserList;