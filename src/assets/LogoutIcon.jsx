import React from 'react'
import Icon from '../assets/logout.png'

export const LogoutIcon = ({ onClick, size = { w: null, h: null } }) => {
  return (
    <div className={"logout-icon"+(size?.w ? " mobile" : "") }>
      <div className={"icon-inner" + (size?.w ? " mobile" : "")} onClick={onClick}>
        <img src={Icon} alt="Logout" width={size?.w-10 || "32"} />
      </div>
    </div>
  )
}
