import {
  Typography,
  DialogContent,
  Box,
  ButtonGroup,
  Button,
  FormControlLabel,
  FormGroup,
  Tooltip,
  FormHelperText,
  InputLabel,
  Radio,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Formik, FormikHelpers, Field } from "formik";
import { RadioGroup } from "formik-mui";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import * as yup from "yup";
import useFormFill from "../../../../hooks/useFormFill";
import FormikCheckbox from "../../../common/wrappers/forms/FormikCheckbox";
import FormikField from "../../../common/wrappers/forms/FormikField";
import TitleWithClose from "../../../common/wrappers/forms/TitleWithClose";
import { PlacementTypeInterface, PLACEMENT_TYPE } from "./form_fields";
import { useMultiStepForm } from "./MultiStepForm";

let schema = yup.object().shape({
  otherAnimalTypes: yup.string().default(""),
});

export default function PlacementType() {
  const navigate = useNavigate();
  const { changeDetails, handleClose } = useMultiStepForm();
  const { overwriteSaved, useFormFillEffect } =
    useFormFill<PlacementTypeInterface>({
      storeLocation: "placement-detail",
      defaultValues: PLACEMENT_TYPE,
    });
  const fillValues = useFormFillEffect();
  const [hasCheckboxError, setError] = useState(false);
  const [hasRadioError, setRadioError] = useState(false);

  return (
    <>
      <TitleWithClose onClose={handleClose} returnURL="/">
        What kind of placement is it?
      </TitleWithClose>
      <Typography className="px-20">
        The most compelling factor is the kinds of animals your facility works
        with. We provide filters for types of animals
      </Typography>
      <DialogContent sx={{ height: "70vh", my: "1rem", px: "6rem" }}>
        <Formik
          enableReinitialize
          initialValues={fillValues}
          validationSchema={schema}
          onSubmit={async (
            values: PlacementTypeInterface,
            formikHelpers: FormikHelpers<PlacementTypeInterface>
          ) => {
            if (
              values.animalTypes.length === 0 &&
              values.otherAnimalTypes === ""
            ) {
              setError(true);
              return;
            }
            if (values.placementType === "") {
              setRadioError(true);
              return;
            }

            overwriteSaved(JSON.stringify(values));
            changeDetails(new Map(Object.entries(values)));
            formikHelpers.setSubmitting(false);
            navigate(`/provider-form/4`);
          }}
        >
          {(props) => (
            <Form
              className="flex gap-y-4 flex-col"
              onSubmit={props.handleSubmit}
            >
              <FormControl component="fieldset">
                <FormLabel component="legend" error={hasCheckboxError}>
                  Animal(s) being worked with*
                </FormLabel>
                <FormGroup>
                  <FormikCheckbox label="Equine/Horse" name="animalTypes" />
                  <FormikCheckbox label="Pig" name="animalTypes" />
                  <FormikCheckbox label="Poultry" name="animalTypes" />
                  <FormikCheckbox label="Small Animal" name="animalTypes" />
                  <FormikCheckbox label="Wildlife" name="animalTypes" />
                </FormGroup>
                {hasCheckboxError && (
                  <FormHelperText error>
                    Please select an animal type
                  </FormHelperText>
                )}
              </FormControl>
              <InputLabel htmlFor="other-animal-input">
                Other major animals (if any)
              </InputLabel>
              <Box className="w-60 h-16">
                <Field
                  name="otherAnimalTypes"
                  id="other-animal-input"
                  variant="outlined"
                  size="small"
                  label="Other Animals"
                  component={FormikField}
                />
                <Tooltip
                  title="Please separate animals with commas"
                  arrow
                  open
                  placement="left-end"
                >
                  <Box />
                </Tooltip>
              </Box>
              <FormControl>
                <FormLabel id="placement-type-select">
                  Is the practice a...*
                </FormLabel>
                <Field component={RadioGroup} name="placementType">
                  <FormControlLabel
                    value="vet"
                    control={<Radio />}
                    label="Vet"
                  />
                  <FormControlLabel
                    value="farm"
                    control={<Radio />}
                    label="Farm"
                  />
                </Field>

                {hasRadioError && (
                  <FormHelperText error>
                    Please select your placement type
                  </FormHelperText>
                )}
              </FormControl>
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
