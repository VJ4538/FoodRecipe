import React from 'react'
import {
    Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorBar({errorState,handleClose}) {
    // console.log(errorState)
    return (
        <Snackbar open={errorState.open}  autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {errorState.msg}
        </Alert>
    </Snackbar>
    )
}
