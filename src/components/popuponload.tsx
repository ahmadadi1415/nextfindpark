import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const SimpleDialog = () =>
{
    const [open, setOpen] = useState(true)
    
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open = {open}>
        <DialogContent>
          <DialogContentText>
            Apakah kamu parkir disini ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Ya, Benar
          </Button>
          <Button onClick={handleClose} autoFocus>
            Tidak, saya tidak parkir disini
          </Button>
        </DialogActions>
    </Dialog>
  )
}
export default SimpleDialog;