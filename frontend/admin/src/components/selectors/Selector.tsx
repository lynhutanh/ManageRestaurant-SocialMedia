import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

interface SelectorProps {
    title: string;
    list: any[];
    value: string;
    onChange: (value: string) => void;
}

const Selector: React.FC<SelectorProps> = ({
    title,
    list,
    value,
    onChange,
}) => {
    const { t } = useTranslation();

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-standard-label">
                {t(title)}
            </InputLabel>

            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={value}
                label={t(title)}
                onChange={(e) => onChange(e.target.value)}
            >
                {list.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                        {t(item.name)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default Selector;
