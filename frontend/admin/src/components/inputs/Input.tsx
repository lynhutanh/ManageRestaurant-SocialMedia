import React from "react";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";

interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    label?: string;
    multiline?: boolean;
    error: boolean;
    errorMesage?: string;
}

const Input: React.FC<InputProps> = ({
    value,
    onChange,
    placeholder = "",
    type = "text",
    label,
    multiline = false,
    error = false,
    errorMesage = "This field is required",
}) => {
    
    return (
        <Box className="w-full">
            <TextField
                id={`outlined-basic`}
                label={label}
                variant="outlined"
                value={value}
                
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                type={type}
                multiline={multiline}
                fullWidth
                error= {error}
                helperText={error ? errorMesage : ""}
                inputProps={type === "number" ? { min: 0 } : {}}
            />
        </Box>
    );
};

export default Input;
