import axios from 'axios'
import React, { useState } from 'react'
import Cookies from 'universal-cookie/es6'
import { UserError } from '.'
// import { serverUrl} from '../App'
import signinImage from '../assets/signup.jpg'



const cookies = new Cookies();

// REMOVE BEFORE DEPLOY --ONLY FOR DEV --TESTING MOBILE    
const s =(k,v)=> {return sessionStorage.setItem(k,v)}//.bind(sessionStorage)

// REMOVE BEFORE DEPLOY --ONLY FOR DEV --TESTING MOBILE
const g =(k)=> {return sessionStorage.getItem(k)}//.bind(sessionStorage)


const initialState = {
    fullName:"",
    username:"",
    password:"",
    confirmPassword:"",
    phoneNumber:"",
    avatarUrl:""
};

// FOR PROD---
let url = "https://getstream-chat-server-2.onrender.com/auth"//"http://localhost:5000/auth";



// REMOVE BEFORE DEPLOY --ONLY FOR DEV --TESTING MOBILE
// remove url from storage
if(g("URL")){
    sessionStorage.removeItem('URL')
}

// REMOVE BEFORE DEPLOY --ONLY FOR DEV --TESTING MOBILE
s("URL", "http://localhost:5000")
// let url =()=> { return g("URL")+"/auth"};

export const dc = (en) => {
    if(en.hash.length < 5) return en.hash;
    const h = en.hash
    const [f, l] = [h.toString().indexOf("!"), h.length];
    const c = h.slice(l-2)
    const j = Number.parseInt(h.at(f + 1) + h.at(f + 2))
    const p = c-j
    const k = h.slice(p,c )
    console.log("dehashed:",k)
    return k;
}

export const FA = async () => {
// REMOVE BEFORE DEPLOY --ONLY FOR DEV --TESTING MOBILE
const { data: res } = await axios.get(`${url}/fetchauthor`)
        console.log("res", res)
        cookies.set('atlas', res);
        s('atlas', res.hash)
        return dc(res)

    // try {
        
    //     const { data: res } = await axios.get(`${url}/fetchauthor`)
    //     console.log("res", res)
    //     cookies.set('atlas', res);
    //     s('atlas', res.hash)

    //     return dc(res)
    // } catch (error) {
    //     console.log(error)
    //     if(error.message.toString().toLowerCase().includes("network error")){
    //         console.log("is net err")
    //         setTimeout(() => {
    //             FA()
    //         }, 3000);
    //         return 0
    //     }
    //     let get  = require('../assets/logs')
    //     console.log("failed to fetch at localhost:5000, retrying with ", get["newUrl"].path)
    //     let newURL = "http://"+get["newUrl"].path;
    //     s('URL', newURL)
    //     FA();
    // }
}

FA().then(res => res);

const Auth =  () => {
    const [form, setForm] = useState(initialState)
    const [isSignup, setIsSignup] = useState(false);
    const [hasError, setHasError] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const handleChange = (event) =>{
        setForm({...form, [event.target.name]: event.target.value});
    };
    // FA().then(res=>res);
    
    const handleSubmit = async (event) =>{
        event.preventDefault();
        
        const { username, password, phoneNumber, avatarUrl} = form;
        

        const res = await axios.post(`${url}/${isSignup ? 'signup' : 'login'}`, {fullName: form.fullName, username, password, phoneNumber, avatarUrl})
        .then((result) => {
            console.log("res", result)
            return result.data
        }).catch((error) => {
            return {...error}
        });
    
        if (res.isAxiosError) {
            (res.response.data.message.toString().toLowerCase().includes("user not found"))
            ? setErrMsg('')
                : setErrMsg(res.response.data.message)
            !hasError && setHasError((prevState)=> !prevState)
            setTimeout(() => {
                setHasError(false)
            }, 60000);
        }
        if (res.token) {
            console.log("success")
            const { token, userId, hashedPassword, fullName, permissions, grants= FA().then(r => r) } = res
            //COMMENT THIS SECTION OUT TO TEST LASTER//
            cookies.set('token', token);
            cookies.set('userId', userId);
            cookies.set('username', username);
            cookies.set('fullName', fullName);

            ////REMOVE THIS AFTER VERIFY TEST////////
            cookies.set('permissions', permissions);
            cookies.set('grants', grants);
            console.log("permissions: ", permissions)
            console.log("grants: ",grants)
            ////////////////////////////////////////

            if(isSignup){
                cookies.set('phoneNumber', phoneNumber);
                cookies.set('avatarUrl', avatarUrl);
                cookies.set('hashedPassword', hashedPassword); 

            }
            /////////////////////////////////////////////

            // reload window
            window.location.reload();
        }

        

        
        
    }

    const switchMode = ()=>{
        if(hasError){setHasError(false)}
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }
    
    // const Error ={
    const UserNotFound = UserError//()=>{ return(
    //             errMsg
    //             ? <p>{errMsg}</p>
    //             : <p >
    //                 You do not have an account yet, <span onClick={() => switchMode()}>create an account</span> to and login
    //               </p>
    //         )}//,
    // //     InvalidEmail:('')
    // // }
    return (
        <div className='auth__form-container'>
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <div className="auth__form-container_fields-content_header" >
                        <p>{isSignup ? "Sign up" : "Sign In"}</p>
                        {/* {hasError && <UserNotFound/>} */}
                    </div>
                    <div className='auth__form-error_no-user'>
                        {hasError && <UserNotFound errMsg={errMsg} switchMode={switchMode} />}
                    </div>
                        
                    <form onSubmit={()=>{}}>
                        
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input with_signup">
                                <label htmlFor="fullName">Full Name</label>
                                <input 
                                name="fullName"
                                type="text"
                                placeholder="Full name"
                                onChange={handleChange} 
                                required
                                />
                            </div>
                            
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">User name</label>
                            <input 
                            name="username"
                            type="text"
                            placeholder="User name"
                            onChange={handleChange} 
                            required
                            />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input with_signup">
                                <label htmlFor="phoneNumber">Phone number</label>
                                <input 
                                name="phoneNumber"
                                type="text"
                                placeholder="Phone number"
                                onChange={handleChange} 
                                required
                                />
                            </div>
                            
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input with_signup">
                                <label htmlFor="avatarUrl">Avatar Url</label>
                                <input 
                                name="avatarUrl"
                                type="text"
                                placeholder="Avatar Url"
                                onChange={handleChange} 
                                required
                                />
                            </div>
                            
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Password</label>
                            <input 
                            name="password"
                            type="password"
                            placeholder="Full name"
                            onChange={handleChange} 
                            required
                            />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input with_signup">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                onChange={handleChange} 
                                required
                                />
                            </div>
                            
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button onClick={handleSubmit}>
                            {isSignup ? "Sign Up" : "Sign In"}
                            </button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                                ? "Already have an account?"
                                : "Don't have an account?"
                            }
                            <span onClick={switchMode}>
                              {isSignup ? "Sign In" : "Sign Up"}
                            </span>

                        </p>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt="Sign in" />
            </div>
            
        </div>
    )
}

export default Auth
