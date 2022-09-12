import React from 'react'


  export const UserError = (errMsg, switchMode) => {
    return (
      errMsg
        ? <p>{errMsg}</p>
        : <p >
          You do not have an account yet, <span onClick={() => switchMode()}>create an account</span> to and login
        </p>
    )
  }
  export const ChatError = (errMsg) => {
    return (
      errMsg
        ? <p>{errMsg}</p>
        : <p >
          Chat can not include spaces. Only letters, numbers and "!-_" are allowed.
        </p>
    )
  }


// export default ErrorType;