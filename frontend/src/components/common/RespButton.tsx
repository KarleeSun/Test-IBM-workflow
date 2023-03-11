import React from "react";
import { useMediaQuery } from "@mui/material";
import { Button, ButtonProps } from "@mui/material";

export default function RespButton<C extends React.ElementType>(
  props: ButtonProps<C, { component?: C }>
) {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMdScreen = useMediaQuery("(max-width:900px)");
  return (
    <Button
      {...props}
      component={props.component}
      size={isSmallScreen ? "small" : isMdScreen ? "medium" : "large"}
    />
  );
}
