import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";

interface SelectProps {
    value: string;
    onChange: (select: SelectChangeEvent) => void;
    listItems: string[];
    label: string;
    id: boolean;
    errorMesage?: string;
}

const SelectInput: React.FC<SelectProps> = ({
    value,
    onChange,
    listItems,
    label,
    id = false,
}) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id={`demo-simple-select`}
                value={value}
                label={label}
                onChange={(e) => onChange(e)}
                error={id}
            >
                {listItems.map((item, index) => (
                    <MenuItem key={index} value={item}>
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
export default SelectInput;
