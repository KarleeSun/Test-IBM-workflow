import { Dialog } from "@mui/material";
import { RefObject } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

interface MultiStepProps {
  handleClose: () => void;
  isOpen: boolean;
  handleComplete: () => void;
  formValuesRef: RefObject<Map<string, string | boolean | string[]>>;
}

type MultiStepContext = {
  changeDetails: (additions: Map<string, string | boolean>) => void;
  handleClose: () => void;
  handleComplete: () => void;
};

export function useMultiStepForm() {
  return useOutletContext<MultiStepContext>();
}

export default function MultiStepForm({
  handleClose,
  isOpen,
  handleComplete,
  formValuesRef,
}: MultiStepProps) {
  const changeDetails = (details: Map<string, string | boolean>) => {
    if (formValuesRef.current) {
      details.forEach((v, k) => {
        formValuesRef.current?.set(k, v);
      });
    }
  };

  return (
    <Dialog open={isOpen} scroll="paper" className="relative">
      <Outlet context={{ changeDetails, handleClose, handleComplete }} />
    </Dialog>
  );
}
