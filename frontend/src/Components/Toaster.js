import { Snackbar,Alert,IconButton } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

function Toaster({message}) {

  const [open,setOpen]=useState(true);
  function handleClose(event,reason){
    if(reason==='clickaway'){
      return
    }
    setOpen(false);
  }
return (
<div>
<Snackbar
  anchorOrigin={{ vertical:"top", horizontal:'right' }}
  open={open} onClose={handleClose}
  autoHideDuration={3000} variant='warning'
  message={message}
 contentProps={{'aria-describedby':'message-id'}}
  action={[
    <IconButton key='close' onClick={handleClose}>
     <CloseIcon/>
    </IconButton>
  ]}>
<Alert onClose={handleClose} severity='warning' sx={{width:'30vw'}}>
  {message}</Alert>
  </Snackbar>
</div>
)
}

export default Toaster