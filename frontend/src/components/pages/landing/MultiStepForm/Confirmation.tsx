import { Check } from "@mui/icons-material";
import { Box, DialogContent, Typography } from "@mui/material";
import React from "react";
import RespButton from "../../../common/RespButton";
import TitleWithClose from "../../../common/wrappers/forms/TitleWithClose";
import { useMultiStepForm } from "./MultiStepForm";

export default function Confirmation() {
  const { handleClose, handleComplete } = useMultiStepForm();
  return (
    <>
      <TitleWithClose onClose={handleClose} returnURL="/"></TitleWithClose>
      <DialogContent
        sx={{ height: "70vh", my: "1rem", px: "6rem" }}
        className="flex flex-col gap-y-4 items-center"
      >
        <Check sx={{ fontSize: "15rem", fill: "#4CAF50" }} />
        <Typography variant="h3">Application Received!</Typography>
        <Typography textAlign="center">
          Thanks! We'll aim to give you a response within 5 business days.
        </Typography>
        <Box className="w-80">
          <RespButton
            variant="contained"
            fullWidth
            onClick={() => {
              handleComplete();
              handleClose();
            }}
          >
            finish
          </RespButton>
        </Box>
      </DialogContent>
    </>
  );
}
