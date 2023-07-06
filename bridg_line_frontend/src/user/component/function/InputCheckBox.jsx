import React from 'react'

function InputCheckBox({id,name,event,className}) {

  return (
   <>
     <input type="checkbox" className={className} id={id} onClick={event} name={name}/>
   </>
  )
}

export default InputCheckBox