import { Typography, Link, Button, Box } from "@mui/material";
import { Link as RRLink, useLocation, useNavigate } from "react-router-dom";
import TopNav from "../../common/wrappers/TopNav";
import BrisLogo from "../../common/BrisLogo";
import Hero from "./Hero";
import RespButton from "../../common/RespButton";
import Divider from "../../common/Divider";
import ContactForm from "./ContactForm";
import { useEffect, useRef, useState } from "react";
import CookieModal from "../cookies/CookieModal";
import MultiStepForm from "./MultiStepForm/MultiStepForm";
import { PROVIDER_APPLICATION_FIELDS } from "./MultiStepForm/form_fields";

function setLocal() {
  localStorage.setItem("vetdb-cookies", "accepted");
}

async function sendProviderApplication(
  application: Map<string, string | boolean | string[]>
) {
  const body = JSON.stringify(Object.fromEntries(application));
  await fetch("/api/provider-application", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body,
  });
}

export default function Landing() {
  const [showCookies, setCookies] = useState(false);
  const providerAppRef = useRef(PROVIDER_APPLICATION_FIELDS);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const localState = localStorage.getItem("vetdb-cookies");
    if (localState === "accepted") {
      setCookies(false);
      return;
    }
    setCookies(true);
  }, []);

  return (
    <>
      <CookieModal
        open={showCookies}
        onClose={() => {
          setLocal();
          setCookies(false);
        }}
      />
      <MultiStepForm
        handleClose={() => navigate("/")}
        isOpen={location.pathname.includes("form")}
        handleComplete={async () =>
          await sendProviderApplication(providerAppRef.current)
        }
        formValuesRef={providerAppRef}
      />
      <Box className="flex flex-col min-w-[420px]" id="students">
        <TopNav>
          <Button
            component={RRLink}
            to="/"
          >
            <Typography variant="h5" color="#000000">
              VetDB
            </Typography>
          </Button>
          <Box className="absolute right-5 flex gap-x-4">
            <Box className="flex gap-x-2 items-center">
              <Link underline="none" href="#students">
                Students
              </Link>
              <Link underline="none" href="#providers">
                Providers
              </Link>
              <Link underline="none" href="#contact">
                Contact
              </Link>
            </Box>
            <Button
              variant="contained"
              color="primary"
              component={RRLink}
              to="/login"
            >
              Sign In
            </Button>
          </Box>
        </TopNav>
        <Hero
          className="mt-16"
          src="http://www.bris.ac.uk/media-library/sites/study/undergraduate/images/subject/Vet-Sci_careers.jpg"
        >
          <Box
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/4 left-1/4 
                    flex flex-col text-left items-start w-80 md:w-[50vw]"
          >
            <Typography variant="h1" color="#FFFFFF">
              Need VetMed Placements?
            </Typography>
            <Typography variant="h3" color="#FFFFFF">
              Find one with VetDB
            </Typography>
            <Box className="flex gap-x-4 mt-4">
              <RespButton
                variant="contained"
                color="inherit"
                component={RRLink}
                to="/login"
              >
                log in
              </RespButton>
              <RespButton
                variant="contained"
                color="primary"
                onClick={() => navigate("/student-form/1")}
                component={RRLink}
                to="/register"
              >
                register
              </RespButton>
            </Box>
          </Box>
        </Hero>
        <Box
          id="providers"
          className="w-4/5 h-fit flex flex-col items-center sm:flex-row justify-evenly mx-auto my-2"
        >
          <Typography variant="h3">
            In association with <br /> Veterinary School of:
          </Typography>
          <BrisLogo className="w-48 md:w-52" />
        </Box>
        <Hero
          className="relative"
          src="https://images.unsplash.com/photo-1589922585618-dfd1fcd87c28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        >
          <Box
            className="absolute top-1/2 -translate-y-1/2 -translate-x-2/3 left-2/3 
          flex flex-col text-right items-end w-80 md:w-[50vw]"
          >
            <Typography variant="h1" color="#FFFFFF">
              Want an extra <br />
              assistant?
            </Typography>
            <Typography variant="h3" color="#FFFFFF">
              List on our database to get <br /> VetMed impressions
            </Typography>
            <Box className="flex gap-x-4 mt-4">
              <RespButton
                variant="contained"
                color="inherit"
                onClick={() => navigate("/provider-form/1")}
              >
                apply now
              </RespButton>
            </Box>
          </Box>
        </Hero>
        <Divider />
        <Box className="bg-[#004877]" id="contact">
          <Box className="flex flex-col items-center my-12">
            <Typography variant="h1" color="#ffffff">
              Have a Question?
            </Typography>
            <Typography variant="h3" color="#ffffff">
              Contact our administrators for more details
            </Typography>
            <ContactForm />
          </Box>
        </Box>
        <Divider />
        <Box className="bg-cyan-200 p-4 pl-12">
          <Typography textAlign={'center'}>
            VetDB was created for University of Bristol Computer Science SPE 2022
          </Typography>
        </Box>
      </Box>
    </>
  );
}
