import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface PopupProps {
  onActionYes: any
}

const SimpleDialog = ({ onActionYes }: PopupProps) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = () => {
    handleClose()
    onActionYes()
  }
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          bgcolor: "white",
          color: "red",
          maxWidth: "revert",
          width: 500,
        },
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle variant="h4" id="responsive-dialog-title">
        {"Konfirmasi Parkiran"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText variant="h6">
          Apakah kamu parkir disini ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleClose}>
          Tidak
        </Button>
        <Button variant="outlined" color="primary" onClick={handleYes}>
          Ya
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default SimpleDialog;
