import { React, memo } from 'react';
import Button from '@mui/material/Button';

const ButtonInput = (props) => {

  const obj = props.obj;
  return (
    <>
      {/* <Button size='medium' variant='outlined' onClick={()=> {
          obj.buttonName == 'Cancel'? obj.handleClose():obj.handleAddData()}}>{obj.buttonName}</Button> */}
      {
        obj.type == 'submit' ?
          <Button size='medium' variant='outlined' type={obj.type}>{obj.buttonName}</Button>
          : <Button size='medium' variant='outlined' onClick={() => {obj.handleClose()}}>{obj.buttonName}</Button>
      }

    </>
  )
}

export default memo(ButtonInput)
