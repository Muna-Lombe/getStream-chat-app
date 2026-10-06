import axios from 'axios'
import React, { useCallback, useRef, useState } from 'react'
import { useMemo } from 'react'
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
    confirmPassword: false,
    phoneNumber:"",
    avatarUrl:"", 
    anyRequiredMissing: true
};

// PROD url---
// let url = "https://getstream-chat-server-2.onrender.com/auth";
// DEV url
let url = "http://localhost:5000/auth";


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
    const { data: res } = await axios.get(`${url}/fetchauthor`)
    console.log("res", res)
    cookies.set('atlas', res);
    s('atlas', res.hash)
    return dc(res)
}

FA().then(res => res);

const Auth =  () => {
    const [form, setForm] = useState(initialState)
    const [[isConfirmedPassword, setIsConfirmedPassword], [hasNoRequiredMissing, setHasNoRequiredMissing]] = [useState(false), useState(false)]
    const [isSignup, setIsSignup] = useState(false);
    const [hasError, setHasError] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    
    
    // const isConfirmedPassword = useCallback((x)=>{
    //     const inputForm = document.forms["login-signup-form"]
    //     return inputForm?.confirmPassword?.value === inputForm?.password?.value
    // }, [document.forms["login-signup-form"]?.confirmPassword?.value])

    // const hasNoRequiredMissing = useCallback((x) => {
    //     const inputForm = document.forms["login-signup-form"]
    //     return Object.values(inputForm).every((el)=> el.value.length > 2)
    // }, [])
    
    
    const handleChange = (event) =>{
        event.preventDefault()
        event.stopPropagation()
        const inputForm = document.forms["login-signup-form"]
        // Object.entries(inputForm).forEach((e)=> console.log(e[1].name, "=>", e[1].value))
        console.log(isConfirmedPassword(), hasNoRequiredMissing())
        
        // setIsConfirmedPassword(document.forms["login-signup-form"]?.confirmPassword?.value === inputForm?.password?.value)
        // setHasNoRequiredMissing(Object.values(inputForm).every((el) => el.value.length > 2))
        if(event.target.name === "confirmPassword"){
            console.log("", event.target.value)
            setIsConfirmedPassword(document.forms["login-signup-form"]?.confirmPassword?.value === inputForm?.password?.value)
            // isConfirmedPassword()
            // hasNoRequiredMissing()
            // return refForm.current[event.target.name] = event.target.value.length > 2 ? form.password === event.target.value : false//setForm({ ...form, [event.target.name]: event.target.value.length> 2 ? form.password === event.target.value : false });
        }
        setHasNoRequiredMissing(Object.values(inputForm).every((el) => el.value.length > 2))

        // if(refForm.current.anyRequiredMissing){
        //     const misnReq = Object.entries(refForm.current).length > 3 ? 
        //         Object.entries(refForm.current)
        //             .filter((el) => el[0] !== "anyRequiredMissing")
        //             .some((el) => el[1].length < 2) 
        //         : true
        //     console.log("misng",misnReq)
        //     // return refForm.current["anyRequiredMissing"] = misnReq

        //     // return setForm({
        //     //     ...form, 
        //     //     "anyRequiredMissing": misnReq
        //     // })

        // }
        // setForm({...form, [event.target.name]: event.target.value});
    };
    // const missingRequiredRef = useRef(false)
    const InputWithRef = ({name, type, placeholder}) => {
        
        const ref = useRef()
        return(
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={handleChange}
                ref={ref}
                value={ref?.current?.value}
                required
            />
        )
    }
    const handleSubmit = async (event) =>{
        event.preventDefault();
        const inputForm = document.forms["login-signup-form"]

        const [ username=username.value, password=password.value, phoneNumber=phoneNumber.value, avatarUrl=avatarUrl.value] = inputForm;
        
        console.log("is beign logged ...")
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
    
    
    const UserNotFound = UserError
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
                        
                    <form name='login-signup-form' onSubmit={()=>{}}>
                        
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input with_signup">
                                <label htmlFor="fullName">Full Name</label>
                                <InputWithRef name={"fullName"} type={"text"} placeholder={"Full name"}/>
                            </div>
                            
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username" >User name</label>
                            
                            <InputWithRef name={"username"} type={"text"} placeholder={"User name"} />

                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input with_signup">
                                <label htmlFor="phoneNumber">Phone number</label>
                                
                                <InputWithRef name={"phoneNumber"} type={"text"} placeholder={"Phone number"} />

                            </div>
                            
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input with_signup">
                                <label htmlFor="avatarUrl">Avatar Url</label>
                                
                                <InputWithRef name={"avatarUrl"} type={"text"} placeholder={"Link to avatar"} />

                            </div>
                            
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Password</label>
                            
                            <InputWithRef name={"password"} type={"password"} placeholder={"Password"} />

                        </div>
                        {isSignup && (
                            <div className={"auth__form-container_fields-content_input with_signup" + (isConfirmedPassword ? " " : " no-match")}>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                
                                <InputWithRef name={"confirmPassword"} type={"password"} placeholder={"Confirm Password"} />

                            </div>
                            
                        )}
                        <div className={"auth__form-container_fields-content_button" + ((isSignup && hasNoRequiredMissing)? " missing-required" : " ")}>
                            <button onClick={handleSubmit} disabled={isSignup && hasNoRequiredMissing}>
                            {isSignup ? "Sign Up" : "Sign In"}
                            </button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                                ? "Already have an account? "
                                : "Don't have an account? "
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
