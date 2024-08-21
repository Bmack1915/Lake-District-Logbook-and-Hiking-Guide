import { TimeField } from "@mui/x-date-pickers/TimeField";

export default function BasicTimeField({ value, setValue, width }) {
  return (
    <TimeField
      label="Select Time"
      value={value}
      sx={{ width: width }}
      onChange={(newValue) => setValue(newValue)}
      format="HH:mm"
      minutesStep={5}
    />
  );
}
