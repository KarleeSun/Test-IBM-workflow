import Landing from "./components/pages/landing/Landing";
import GeneralLogin from "./components/pages/logins/generalLogin/GeneralLogin";
import StudentRegistration from "./components/pages/studentRegistration/RegistrationForm";
import RegistrationDashboard from "./components/pages/registrationDashboard/RegistrationDashboard";
import PlacementManagementPage from "./components/pages/placementManagement/placementManagement";
import PlacementSearchPage from "./components/pages/placementSearchPage/PlacementSearchPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "./theme/theme";
import LoginBase from "./components/pages/logins/loginBase/LoginBase";
import BasicDetails from "./components/pages/landing/MultiStepForm/BasicDetails";
import PracticeDetails from "./components/pages/landing/MultiStepForm/PracticeDetails";
import PlacementType from "./components/pages/landing/MultiStepForm/PlacementType";
import AccommodationDetails from "./components/pages/landing/MultiStepForm/AccommodationDetails";
import Agreement from "./components/pages/landing/MultiStepForm/Agreement";
import Confirmation from "./components/pages/landing/MultiStepForm/Confirmation";
import ApplicationManagementPage from "./components/pages/applicationManagement/ApplicationManagement"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    children: [
      {
        path: "provider-form/",
        children: [
          {
            path: "1",
            element: <BasicDetails />,
          },
          {
            path: "2",
            element: <PracticeDetails />,
          },
          {
            path: "3",
            element: <PlacementType />,
          },
          {
            path: "4",
            element: <AccommodationDetails />,
          },
          {
            path: "5",
            element: <Agreement />,
          },
          {
            path: "6",
            element: <Confirmation />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <GeneralLogin />,
    children: [
      {
        path: "students",
        element: <LoginBase type="Student" loginEndpoint="nil" />,
      },
      {
        path: "providers",
        element: <LoginBase type="Provider" loginEndpoint="nil" />,
      },
      {
        path: "admin",
        element: <LoginBase type="Admin" loginEndpoint="nil" />,
      },
    ],
  },
  {
    path: "/registration-dashboard",
    element: <RegistrationDashboard />,
    children: [],
  },
  {

  },
  {
    path: "/register",
    element: <StudentRegistration />,
    children: [],
  },

  {
    path: "/placement-management",
    element: <PlacementManagementPage />,
    children: [],
  },

  {
    path: "/placement-search",
    element: <PlacementSearchPage />,
    children: []
  },

  {
    path: "/application-management",
    element: <ApplicationManagementPage />,
    children: [],
  }

]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
