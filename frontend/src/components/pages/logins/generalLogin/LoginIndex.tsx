import { ChevronRightOutlined } from "@mui/icons-material";
import { Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginIndex() {
  return (
    <Box className="flex flex-col items-center justify-around py-12 w-full h-full">
      <Typography variant="h2" className="text-center">
        Login
      </Typography>
      <Typography>Please click on the respective buttons to sign in</Typography>
      <Button
        component={Link}
        to="/login/students"
        variant="contained"
        className="h-16 w-64"
        endIcon={<ChevronRightOutlined />}
      >
        Student sign in
      </Button>
      <Button
        component={Link}
        to="/login/providers"
        variant="contained"
        className="h-16 w-64"
        endIcon={<ChevronRightOutlined />}
      >
        Provider sign in
      </Button>
      <Button
        component={Link}
        to="/login/admin"
        variant="contained"
        className="h-16 w-64"
        endIcon={<ChevronRightOutlined />}
      >
        Admin sign in
      </Button>
    </Box>
  );
}
