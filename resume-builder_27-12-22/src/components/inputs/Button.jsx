import React from 'react'

const Button = ({className,name,event,icon,type}) => {
    return (
        <>
            <button style={{backgroundColor:'#005DBF',fontFamily:'Ubuntu'}} className={`btn btn-primary text-capitalize ${className}`} type={type} onClick={event}>{icon?icon:''}{name}</button>
        </>
    )
}

export default Button