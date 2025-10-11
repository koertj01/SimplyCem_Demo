import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useMemo } from "react";

export type MappingSelectorProps<T> = {
  label: string;
  value: T | T[] | null;
  options: T[];
  onChange: (value: T | T[] | null) => void;
  disabled?: boolean;
  getOptionLabel?: (option: T) => string;
  getOptionValue?: (option: T) => string | number;
  highlightSelected?: boolean;
  isMultipleSelect?: boolean;
};

export default function MappingSelector<T>({
  label,
  value,
  options,
  onChange,
  disabled = false,
  getOptionLabel = (opt) => String(opt),
  getOptionValue = (opt) => String(opt),
  isMultipleSelect = false,
}: MappingSelectorProps<T>) {
  const optionLabel = (option: T) =>
    getOptionLabel ? getOptionLabel(option) : String(option);

  const optionValue = (option: T) =>
    getOptionValue ? getOptionValue(option) : String(option);

  const labelId = `${label.toLowerCase().replace(/\s+/g, '-')}-label`;
  
  // Handle the value based on multiple selection mode
  const selectValue = useMemo(() => {
    if (isMultipleSelect) {
      return Array.isArray(value) ? value : [];
    }
    return value ?? "";
  }, [value, isMultipleSelect]);

  return (
    <FormControl 
      sx={{ 
        width: 160,
        '& .MuiOutlinedInput-notchedOutline': {
          borderWidth: 1,
        },
        '& .MuiInputLabel-outlined': {
          backgroundColor: 'background.paper',
          px: 0.5,
        }
      }} 
      disabled={disabled}
      variant="outlined"
    >
      <InputLabel 
        id={labelId}
        sx={{
          '&.MuiInputLabel-shrink': {
            backgroundColor: 'background.paper',
            px: 0.5,
          }
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId={labelId}
        multiple={isMultipleSelect}
        value={selectValue}
        onChange={(e) => {
          const selected = e.target.value;
          if (isMultipleSelect) {
            onChange(selected as unknown as T);
          } else {
            onChange(
              selected === ""
                ? null
                : typeof value === "number"
                ? (Number(selected) as T)
                : (selected as T)
            );
          }
        }}
        aria-label={`Select ${label}`}
        displayEmpty
      >
        {options.length > 0 ? (
          options.map((option) => (
            <MenuItem
              key={optionValue(option)}
              value={optionValue(option)}
              aria-label={`${label} option: ${optionLabel(option)}`}
              sx={theme => ({
                '&.Mui-selected': {
                  backgroundColor: theme.palette.action.selected,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  }
                }
              })}
            >
              {optionLabel(option)}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No Data</MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
