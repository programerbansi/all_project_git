import React from 'react'
import { Button, Spinner } from 'react-bootstrap'

const InputButtonLoad = ({classname,name}) => {
  return (
   <>
   <Button className={classname}><Spinner className='' size="sm"/> {name}</Button>
   </>
  )
}

export default InputButtonLoad