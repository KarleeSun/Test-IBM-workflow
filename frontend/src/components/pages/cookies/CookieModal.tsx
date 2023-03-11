import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface CookieProps {
  onClose: () => void;
  open: boolean;
}

export default function CookieModal({ onClose, open }: CookieProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="cookie-modal-title"
      aria-describedby="cookie-modal-body"
    >
      <DialogTitle id="cookie-modal-title">Cookies</DialogTitle>
      {/* Needed to change msg because we need cookies for login system*/}
      <DialogContent>
        <DialogContentText id="cookie-modal-body">
          We use cookies for essential services such as user identification. By
          using our website, you agree to our use of cookies.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={onClose} variant="contained" size="large">
          ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
