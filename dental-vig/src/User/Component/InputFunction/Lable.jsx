import React, { memo } from 'react'

function Lable({className1,className2,className3,name,number,event}) {
  return (
    <>
     <label className={className1} onClick={event}><span className={className2}>{name}</span><span className={className3}>{number}</span></label>
      </>
  )
}

export default memo(Lable)