import React from "react";

interface SearchInputProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
    placeholder = "Search...",
    value,
    onChange,
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className="flex flex-col">
            <input
                id="searchInput"
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="border  rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            />
        </div>
    );
};

export default SearchInput;
