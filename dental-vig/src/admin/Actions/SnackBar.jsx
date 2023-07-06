import { React, useState, forwardRef, memo } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = ({ status, message, error ,setStatus}) => {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setStatus(false);
    };
    
    return (
        <>
            {message &&
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={status} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}  key={'bottom' + 'right'}>
                        {
                            error && error === true ? <Alert onClose={handleClose} severity="error">{message}</Alert> : <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                {message}
                            </Alert>
                        }
                    </Snackbar>
                </Stack>
            }
        </>
    )
}

export default memo(SnackBar)
