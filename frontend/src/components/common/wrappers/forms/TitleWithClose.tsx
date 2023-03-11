import { DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useNavigate } from "react-router-dom";

interface DialogTitleProps {
  children?: React.ReactNode;
  onClose: undefined | ((value: boolean) => void);
  returnURL?: string;
}

export default function TitleWithClose({
  children,
  onClose,
  returnURL,
}: DialogTitleProps) {
  const navigate = useNavigate();
  return (
    <DialogTitle textAlign="center" position="relative">
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={() => {
            onClose(false);
            if (returnURL) navigate(returnURL);
          }}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
