import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Alert = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"What is that?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Sorry, the function you tried is not implemented by the author. Maybe
          coming soon...
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          autoFocus
          variant="outlined"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Alert;
