import React from "react";
import { AppBar, Toolbar } from "@mui/material";

interface TopNavProps {
  children: React.ReactNode;
}

export default function TopNav({ children }: TopNavProps) {
  return (
    <AppBar
      sx={{ backgroundColor: "white" }}
      className="h-16 flex justify-center fixed"
    >
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
}
