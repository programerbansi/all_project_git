import React, { memo } from 'react'
import { useNavigate, NavLink } from "react-router-dom";
function Button({name,icon,link,className,location,type,event,id,userEvent,dataTarget,dataToggle,dataDismiss,disable}) {
  return (
    <>
     {type=="submit"?<button id={id}  type={type}  className={`${className}`} onClick={event} disabled={disable} data-dismiss={dataDismiss?dataDismiss:""}><i className={icon}/><span>{name}</span></button>:
     userEvent == 'button' ? <button id={id} type={type}  disabled={disable} className={`btn ${className} `} onClick={event} data-toggle={dataToggle} data-target={dataTarget} data-dismiss={dataDismiss}><i className={icon}/><span>{name}</span></button> :
     <NavLink to={link} className={`btn ${className}`}><i className={icon} /><span>{name}</span></NavLink>}
    </>                 
  )
}

export default memo(Button)