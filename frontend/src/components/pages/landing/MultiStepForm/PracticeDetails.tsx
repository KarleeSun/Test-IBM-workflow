import {
  Typography,
  DialogContent,
  Box,
  ButtonGroup,
  Button,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { Formik, FormikHelpers, Field } from "formik";
import { Form, useNavigate } from "react-router-dom";
import * as yup from "yup";
import FormikField from "../../../common/wrappers/forms/FormikField";
import TitleWithClose from "../../../common/wrappers/forms/TitleWithClose";
import { PRACTICE_ADDRESS } from "./form_fields";
import { useMultiStepForm } from "./MultiStepForm";
import { useState } from "react";
import RegionSelector from "../../../common/wrappers/forms/RegionSelector";
import useFormFill from "../../../../hooks/useFormFill";

interface PracticeFormDetails {
  practiceName: string;
  address: string;
  postCode: string;
  region: string;
  positionInPractice: string;
}

const schema = yup.object({
  practiceName: yup.string().required("Please enter your practice name"),
  address: yup.string().required("Please enter the address of your practice"),
  postCode: yup.string().required("Please enter your postcode"),
  positionInPractice: yup.string().required("Please enter your position"),
});

export default function PracticeDetails() {
  const navigate = useNavigate();
  const { changeDetails, handleClose } = useMultiStepForm();
  const { overwriteSaved, useFormFillEffect } =
    useFormFill<PracticeFormDetails>({
      storeLocation: "practice-detail",
      defaultValues: PRACTICE_ADDRESS,
    });
  const values = useFormFillEffect();
  const [region, setRegion] = useState<string>("");
  const [showRegionError, setError] = useState(false);

  return (
    <>
      <TitleWithClose onClose={handleClose} returnURL="/">
        Practice/Placement Address
      </TitleWithClose>
      <Typography className="px-20">
        Prospective students may want to opportunities by location, and will be
        used for travelling purposes.
      </Typography>
      <DialogContent sx={{ height: "70vh", my: "1rem", px: "6rem" }}>
        <Formik
          enableReinitialize
          initialValues={values}
          validationSchema={schema}
          onSubmit={(
            values: PracticeFormDetails,
            formikHelpers: FormikHelpers<PracticeFormDetails>
          ) => {
            if (region === "") {
              setError(true);
              return;
            }
            const withRegion = {
              ...values,
              country: "United Kingdom",
              region,
            };
            overwriteSaved(JSON.stringify(withRegion));
            changeDetails(new Map(Object.entries(withRegion)));
            navigate(`/provider-form/3`);
            formikHelpers.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form
              className="flex gap-y-4 flex-col mt-4"
              onSubmit={props.handleSubmit}
            >
              <Box className="w-80 h-16">
                <Field
                  name="practiceName"
                  variant="outlined"
                  size="large"
                  label="Practice Name*"
                  component={FormikField}
                />
              </Box>
              <Box className="w-80 h-16">
                <Field
                  name="address"
                  variant="outlined"
                  size="large"
                  label="Address Line 1*"
                  component={FormikField}
                />
              </Box>
              <Box className="w-80 h-16">
                <Field
                  name="postCode"
                  variant="outlined"
                  size="large"
                  label="Post code*"
                  component={FormikField}
                />
              </Box>
              <Box className="w-40 h-16">
                <FormControl className="w-full">
                  <InputLabel id="country-select">Country</InputLabel>
                  <Select
                    size="medium"
                    labelId="country-select"
                    variant="outlined"
                    value="United Kingdom"
                    label="Country"
                  >
                    <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                  </Select>
                  <Tooltip
                    title="We currently only accept UK-based practices"
                    arrow
                    placement="left-end"
                    open
                  >
                    <Box />
                  </Tooltip>
                </FormControl>
              </Box>
              <Box className="w-52 h-16">
                <RegionSelector
                  setValue={setRegion}
                  hasError={showRegionError}
                  value={region}
                />
              </Box>
              <Box className="w-60 h-16">
                <Field
                  name="positionInPractice"
                  variant="outlined"
                  size="large"
                  label="Position at Practice*"
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
