import { Box, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Hero from "../../landing/Hero";
import BrisLogo from "../../../common/BrisLogo";
import LoginIndex from "./LoginIndex";

const LOGIN_BACKGROUNDS = {
  MAIN: "http://www.bristol.ac.uk/media-library/sites/vetscience/images/Slider%20AVMA.jpg",
  PROVIDER:
    "https://cdn.pixabay.com/photo/2016/11/13/21/46/sheep-1822137_960_720.jpg",
  ADMIN:
    "https://wallpapercrafter.com/th800/249895-cow-cows-cattle-and-farm-hd.jpg",
  STUDENT:
    "https://cdn.pixabay.com/photo/2018/10/14/20/16/horses-3747374_1280.jpg",
};

const chooseBackground = (pathname: String): string => {
  if (pathname.includes("/login/admin")) {
    return LOGIN_BACKGROUNDS.ADMIN;
  }
  if (pathname.includes("/login/providers")) {
    return LOGIN_BACKGROUNDS.PROVIDER;
  }
  if (pathname.includes("/login/students")){
    return LOGIN_BACKGROUNDS.STUDENT;
  }
  return LOGIN_BACKGROUNDS.MAIN;
};

export default function GeneralLogin() {
  const location = useLocation();
  const smPositioning = " left-1/2 -translate-x-1/2 lg:left-3/4";
  const index =
    location.pathname === "/login" || location.pathname === "/login/";

  return (
    <Box className="h-screen relative min-w-[400px] ">
      <Hero
        imgClasses="opacity-100 h-full object-cover bg-left object-center"
        src={chooseBackground(location.pathname)}
        className="h-full"
      >
        <Box className="hidden lg:block absolute top-8 left-8 z-10">
          <BrisLogo className="w-60 pb-2" />
          <Typography variant="subtitle1">Bristol Veterinary School</Typography>
        </Box>
        <Box
          id="login-box"
          className={
            "-translate-y-1/2 top-1/2 absolute z-10 bg-white w-[25rem] h-full xs:h-3/4 " +
            smPositioning
          }
        >
          {index ? <LoginIndex /> : <Outlet />}
        </Box>
      </Hero>
    </Box>
  );
}
