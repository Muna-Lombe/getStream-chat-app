import React from 'react'
import Cookies from 'universal-cookie/es6';
import Icon from '../assets/logout.png'

export const LogoutIcon = ({  size = { w: null, h: null } }) => {
  const cookies = new Cookies();
  const logout = () => {
    const allCookies = Object.keys(cookies.getAll());
    allCookies.map((cookie) => cookies.remove(`${cookie}`))
    window.location.reload();
  };
  return (
    <div className={"logout-icon"+(size?.w ? " mobile" : "") }>
      <div className={"icon-inner" + (size?.w ? " mobile" : "")} onClick={logout}>
        <img src={Icon} alt="Logout" width={size?.w-10 || "32"} />
      </div>
    </div>
  )
}
