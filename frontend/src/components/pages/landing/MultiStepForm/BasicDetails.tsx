import { Field, Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  ButtonGroup,
  DialogContent,
  MenuItem,
  Typography,
} from "@mui/material";
import FormikField from "../../../common/wrappers/forms/FormikField";
import TitleWithClose from "../../../common/wrappers/forms/TitleWithClose";
import { useMultiStepForm } from "./MultiStepForm";
import { PROVIDER_BASIC_DETAILS } from "./form_fields";
import { useNavigate } from "react-router-dom";
import useFormFill from "../../../../hooks/useFormFill";

interface DetailsInfo {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  telephoneNumber: string;
}
const phoneRegEx =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const schema = yup.object({
  title: yup.string().required("Title is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  contactNumber: yup
    .string()
    .matches(phoneRegEx, "Contact number is invalid")
    .required("Phone number is required"),
  telephoneNumber: yup
    .string()
    .matches(phoneRegEx, "Telephone number is invalid"),
});

export default function BasicDetails() {
  const { changeDetails, handleClose } = useMultiStepForm();
  const navigate = useNavigate();
  const { overwriteSaved, useFormFillEffect } = useFormFill<DetailsInfo>({
    storeLocation: "basic-details",
    defaultValues: PROVIDER_BASIC_DETAILS,
  });
  const values = useFormFillEffect();

  return (
    <>
      <TitleWithClose onClose={handleClose} returnURL="/">
        Basic Contact Details
      </TitleWithClose>
      <Typography className="px-20">
        This is just so that we can get to know you. Students will also see and
        use this information to apply.
      </Typography>
      <DialogContent sx={{ height: "70vh", my: "1rem", px: "6rem" }}>
        <Formik
          enableReinitialize
          initialValues={values}
          validationSchema={schema}
          onSubmit={(
            values: DetailsInfo,
            formikHelpers: FormikHelpers<DetailsInfo>
          ) => {
            overwriteSaved(JSON.stringify(values));
            changeDetails(new Map(Object.entries(values)));
            navigate("/provider-form/2");
            formikHelpers.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form
              className="flex gap-y-4 flex-col mt-4"
              onSubmit={props.handleSubmit}
            >
              <Box className="w-40 h-16">
                <Field
                  as="select"
                  name="title"
                  label="Title*"
                  variant="outlined"
                  size="large"
                  component={FormikField}
                  select
                  defaultValue="Mr."
                >
                  <MenuItem value="Mr.">Mr</MenuItem>
                  <MenuItem value="Mrs.">Mrs</MenuItem>
                  <MenuItem value="Miss">Miss</MenuItem>
                  <MenuItem value="Ms">Ms</MenuItem>
                  <MenuItem value="Dr">Dr</MenuItem>
                  <MenuItem value="Mx">Mx</MenuItem>
                </Field>
              </Box>
              <Box className="w-80 h-16">
                <Field
                  name="firstName"
                  variant="outlined"
                  size="large"
                  label="First name*"
                  component={FormikField}
                />
              </Box>
              <Box className="w-80 h-16">
                <Field
                  name="lastName"
                  variant="outlined"
                  size="large"
                  label="Last name*"
                  component={FormikField}
                />
              </Box>
              <Box className="w-80 h-16">
                <Field
                  name="email"
                  variant="outlined"
                  size="large"
                  label="Email*"
                  component={FormikField}
                />
              </Box>
              <Box className="w-60 h-16">
                <Field
                  name="contactNumber"
                  variant="outlined"
                  size="large"
                  label="Contact Number*"
                  component={FormikField}
                />
              </Box>
              <Box className="w-60 h-16">
                <Field
                  name="telephoneNumber"
                  variant="outlined"
                  size="large"
                  label="Telephone Number"
                  component={FormikField}
                />
              </Box>
              <ButtonGroup
                variant="contained"
                aria-label="next"
                size="large"
                className="flex justify-center"
                sx={{ boxShadow: "none" }}
              >
                <Button type="submit">Next</Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </>
  );
}
