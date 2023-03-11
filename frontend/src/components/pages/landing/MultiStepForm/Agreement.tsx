import {
  Box,
  Button,
  ButtonGroup,
  DialogContent,
  FormGroup,
  FormHelperText,
  Typography,
} from "@mui/material";
import { Field, Formik, FormikHelpers } from "formik";
import React from "react";
import { Form, useNavigate } from "react-router-dom";
import TitleWithClose from "../../../common/wrappers/forms/TitleWithClose";
import { CONTRACT_AGREEMENT } from "./form_fields";
import { useMultiStepForm } from "./MultiStepForm";
import * as yup from "yup";
import { CheckboxWithLabel } from "formik-mui";

const schema = yup.object().shape({
  agreement: yup.boolean().oneOf([true], "You must agree to our terms"),
});

interface AgreementInterface {
  agreement: boolean;
  date: string;
}

export default function Agreement() {
  const navigate = useNavigate();
  const { changeDetails, handleClose } = useMultiStepForm();
  return (
    <>
      <TitleWithClose onClose={handleClose} returnURL="/">
        Student Placement Agreement
      </TitleWithClose>
      <Typography className="px-20">
        For all EMS placements, we must ensure that you agree to our terms and
        conditions.
      </Typography>
      <DialogContent sx={{ height: "70vh", my: "1rem", px: "6rem" }}>
        <Box className="border rounded-md border-black p-4">
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            voluptates officia, laborum voluptatem culpa architecto, quam dolore
            ducimus velit adipisci temporibus aspernatur eligendi fugit quidem
            mollitia id assumenda tempora amet.
          </Typography>
        </Box>
        <Formik
          initialValues={CONTRACT_AGREEMENT}
          validationSchema={schema}
          onSubmit={(
            values: AgreementInterface,
            formikHelpers: FormikHelpers<AgreementInterface>
          ) => {
            const withDate = {
              ...values,
              date: new Date().toLocaleString(),
            };
            changeDetails(
              new Map<string, string | boolean>(Object.entries(withDate))
            );
            formikHelpers.setSubmitting(false);
            navigate("/provider-form/6");
          }}
        >
          {({ errors, handleSubmit, ...props }) => (
            <Form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
              <FormGroup>
                <Field
                  component={CheckboxWithLabel}
                  type="checkbox"
                  name="agreement"
                  Label={{ label: "I agree to the Terms & Conditions*" }}
                />
                {errors.agreement && (
                  <FormHelperText error>
                    You must agree to our terms and conditions
                  </FormHelperText>
                )}
              </FormGroup>
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
