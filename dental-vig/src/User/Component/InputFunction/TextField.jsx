import React, { memo } from 'react'

function TextField({ name, placeholder, className, type, error, event, event1, touch, value,multi,accept}) {
 
  return (
    <>
      {
        type == 'file' ?
          <input name={name} type={type} placeholder={placeholder} className={className} onChange={event} onBlur={event1} multiple={multi} accept={accept || "image/png, image/jpg, image/jpeg"} />
          :
          type == 'date' ? <input autoComplete='false' value={value} name={name} type={type} placeholder={placeholder} className={className} onChange={event} onBlur={event1} />
          
          : <input autoComplete='false' value={value} name={name} type={type} placeholder={placeholder} className={className} onChange={event} onBlur={event1} />
      }

      {error && touch ? (<span className='text-danger'>{error}</span>) : null}
    </>
  )
}
export default memo(TextField)