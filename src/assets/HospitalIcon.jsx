import React from 'react'
import Icon from '../assets/hospital.png'

export const HospitalIcon = ({ onClick, size = { w: null, h: null } }) => {
  return (
    <div className={"hospital-icon"+(size?.w ?" mobile" : "")}>
      <div className={"icon-inner" + (size?.w ? " mobile" : "")}>
            <img src={Icon} alt="Hospital" width={size?.w-10 || "30"} onClick={onClick} />
        </div>
    </div>
        
  )
}
