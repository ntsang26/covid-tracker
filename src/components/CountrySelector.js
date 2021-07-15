import {
  FormControl,
  FormHelperText,
  InputLabel,
  NativeSelect,
} from "@material-ui/core";
import React from "react";

export default function CountrySelector({ value, handleOnChange, countries }) {
  return (
    <FormControl style={{ marginBottom: "20px" }}>
      <InputLabel htmlFor="country-selector" shrink>
        Quốc Gia
      </InputLabel>
      <NativeSelect
        value={value}
        onChange={handleOnChange}
        inputProps={{
          name: "country",
          id: "country-selector",
        }}
      >
        {countries.map(({ Country, ISO2 }) => (
          <option key={ISO2} value={ISO2.toLowerCase()}>
            {Country}
          </option>
        ))}
      </NativeSelect>
      <FormHelperText>Lựa chọn quốc gia</FormHelperText>
    </FormControl>
  );
}
