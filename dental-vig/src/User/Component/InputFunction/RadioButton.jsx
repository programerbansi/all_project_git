import React, { memo } from 'react'
import { useContext } from 'react'
import { UserValAuthContext } from '../Context/UserValContext'


const RadioButton = ({id,name,value,event,event2}) => {
  const val=useContext(UserValAuthContext)
  const handleclick=(e)=>{
    if(name == "condition")
    {
      var check=document.getElementById(id);
      val.setCheck2(check.checked);
      val.setRadioval(e.target.value);
    }
    
  }
  return (
     <>
      <div className="product-widget-checkbox"><input type="radio" id={id} name={name} value={value} onClick={(e)=>handleclick(e)} onChange={event} onBlur={event2}/></div>
   
     </>
  )
}

export default memo(RadioButton)