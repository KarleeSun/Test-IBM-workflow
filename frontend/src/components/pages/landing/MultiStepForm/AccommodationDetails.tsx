import {
  Button,
  ButtonGroup,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  Typography,
} from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFormFill from "../../../../hooks/useFormFill";
import TitleWithClose from "../../../common/wrappers/forms/TitleWithClose";
import { ACCOMMODATION_DETAILS } from "./form_fields";
import { useMultiStepForm } from "./MultiStepForm";
import { RadioGroup } from "formik-mui";
import FormikField from "../../../common/wrappers/forms/FormikField";

interface AccommodationDetailInterface {
  providesAccommodation: string;
  isOnSite: string;
  information: string;
}

export default function AccommodationDetails() {
  const navigate = useNavigate();
  const { changeDetails, handleClose } = useMultiStepForm();
  const { overwriteSaved, useFormFillEffect } = useFormFill({
    storeLocation: "accommodation-detail",
    defaultValues: ACCOMMODATION_DETAILS,
  });
  const fillValues = useFormFillEffect();

  return (
    <>
      <TitleWithClose onClose={handleClose} returnURL="/">
        Accommodation Details
      </TitleWithClose>
      <Typography className="px-20">
        When going on EMS, students look for accommodation nearby. You don't
        need to provide accommodation.
      </Typography>
      <DialogContent sx={{ height: "70vh", my: "1rem", px: "6rem" }}>
        <Formik
          enableReinitialize
          initialValues={fillValues}
          onSubmit={async (
            values: AccommodationDetailInterface,
            formikHelpers: FormikHelpers<AccommodationDetailInterface>
          ) => {
            if (values.providesAccommodation === "no") {
              values.isOnSite = "no";
            }
            overwriteSaved(JSON.stringify(values));
            changeDetails(new Map(Object.entries(values)));
            formikHelpers.setSubmitting(false);
            navigate(`/provider-form/5`);
          }}
        >
          {(props) => (
            <Form
              className="flex gap-y-4 flex-col"
              onSubmit={props.handleSubmit}
            >
              <FormControl>
                <FormLabel id="provide-acc-radio">
                  Do you provide accommodation?*
                </FormLabel>
                <Field
                  component={RadioGroup}
                  name="providesAccommodation"
                  defaultValue="yes"
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </Field>
              </FormControl>
              <FormControl>
                <FormLabel id="onsite-radio">
                  If yes to above, is accommodation on site?*
                </FormLabel>
                <Field
                  component={RadioGroup}
                  name="isOnSite"
                  defaultValue="yes"
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </Field>
              </FormControl>
              <Field
                name="information"
                variant="outlined"
                size="medium"
                label="Could you tell us more details?"
                component={FormikField}
                multiline
                helperText="Information on price, area, etc. would be helpful"
              />
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
