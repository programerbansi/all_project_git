import React, { memo, useContext } from 'react'
import { UserValAuthContext } from '../Context/UserValContext';

function CheckBoxField({id,name,event,checkFlag,title,className}) {

  return (
   <>
     <div className="product-widget-checkbox"><input type="checkbox" className={className} id={id} onClick={event} name={name} disabled={checkFlag} title={title}/></div>
   </>
  )
}

export default memo(CheckBoxField)