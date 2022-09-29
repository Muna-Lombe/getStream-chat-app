import React from 'react';

export const CloseBtn = ({ setIsCreating, setIsEditing, value, setToggleContainer, onClick, size={w:null, h:null} }) => {
  const Fallback =()=>(
  <p>
    <svg
      width={size.w||"32"} height={size.h||"32"}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onClick={() => {
        if (setIsCreating) setIsCreating(false);
        if (setIsEditing) setIsEditing(false);
        if (setToggleContainer) setToggleContainer(prevState => !prevState)
        if (onClick) onClick()
      }}
    >
      {
        value
        ? <p style={{backgroundColor: "blue", color: "white"}}>{value}</p> 
        : <path
            d='M6.10042 6.10051C0.633603 11.5673 0.633603 20.4327 6.10042 25.8995C11.5672 31.3663 20.4326 31.3663 25.8994 25.8995C31.3662 20.4327 31.3662 11.5673 25.8994 6.10051C20.4326 0.633686 11.5672 0.633685 6.10042 6.10051ZM22.3639 11.0503L17.4141 16L22.3639 20.9497L20.9497 22.364L15.9999 17.4142L11.0502 22.364L9.63596 20.9497L14.5857 16L9.63596 11.0503L11.0502 9.63604L15.9999 14.5858L20.9497 9.63604L22.3639 11.0503Z'
            fill='#005fff'
          />
      }
      
    </svg>
  </p>
)
const CancelBtn=()=>(
  <p
  style={{ margin: '0px 0px 0px 2px' }}
  >
    <svg 
      fill="#005fff" 
      xmlns="http://www.w3.org/2000/svg"  
      viewBox="0 0 50 50" 
      width={size.w||"32"} height={size.h||"32"}
      onClick={() => {
        if (setIsCreating) setIsCreating(false);
        if (setIsEditing) setIsEditing(false);
        if (setToggleContainer) setToggleContainer(prevState => !prevState)
         if (onClick) onClick()
      }}
      >
      {
        value
        ? <p style={{backgroundColor: "blue", color: "white"}}>{value}</p> 
        : <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z"/>
      }
      
      </svg>
  </p>
)

return(
  <CancelBtn />
)

};
