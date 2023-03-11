import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import ukRegions from "../../../../resources/country-data";

interface RegionProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  hasError: boolean;
}

export default function RegionSelector({
  value,
  setValue,
  hasError,
}: RegionProps) {
  return (
    <FormControl className="w-full">
      <InputLabel id="region-select-label" error={hasError}>
        Region*
      </InputLabel>
      <Select
        error={hasError}
        name="region"
        label="Region*"
        labelId="region-select-label"
        id="region-select"
        variant="outlined"
        size="medium"
        value={value}
        onChange={(event: { target: { value: any } }) => {
          setValue(event.target.value);
        }}
      >
        {ukRegions.map((region) => (
          <MenuItem key={region} value={region}>
            {region}
          </MenuItem>
        ))}
      </Select>
      {hasError && (
        <FormHelperText error>Please select your region</FormHelperText>
      )}
    </FormControl>
  );
}
