import React, { memo, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@material-ui/core';

function TextFieldInput({obj}) {

    // const obj = props.obj;
    return (
        <div>
            {
                obj.type=='file'?
                <TextField id="standard-basic" label={obj?.label} type={obj?.type} variant="standard" fullWidth style={{ marginTop: '10px' }} name={obj.name} onChange={obj.handleChange} onBlur={obj.handleBlur}/> :

                <TextField autoFocus={obj?.autoFocus} id="standard-basic" label={obj?.label} type={obj?.type} variant="standard" fullWidth style={{ marginTop: '10px' }} name={obj.name} onChange={obj.handleChange} onBlur={obj.handleBlur}  value={obj.value}/>

            }
            {obj.error && obj.touch ?<Box component="div" display="inline" style={{color:'red'}}>{obj.error}</Box>:null}
        </div>
    )
}

export default memo(TextFieldInput)
