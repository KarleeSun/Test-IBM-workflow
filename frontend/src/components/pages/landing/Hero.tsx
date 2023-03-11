import { Box } from "@mui/material";
import React from "react";

type HeroProps = {
  src: string;
  imgClasses?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Hero({
  src,
  children,
  imgClasses,
  ...rest
}: HeroProps) {
  const { className, ...props } = rest;
  return (
    <Box
      className={`bg-gradient-to-r from-cyan-900 to-transparent relative ${className}`}
      {...props}
    >
      <img
        src={src}
        alt=""
        className={`block w-full opacity-40 bg-center bg-no-repeat mx-auto ${imgClasses}`}
        id="hero-1"
      />
      {children}
    </Box>
  );
}
