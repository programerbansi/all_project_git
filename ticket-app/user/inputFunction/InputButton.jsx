import React from 'react'

function InputButton(props) {
    const {handleClick,name,className,icon}=props;
  return (
   <>
      <button onClick={handleClick} className={className}>{icon}{name}</button>
   </>
  )
}

export default InputButton