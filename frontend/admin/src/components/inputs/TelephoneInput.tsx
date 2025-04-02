import { useState } from "react";

interface PhoneInputProps {
    value: string;
    onChange: (value: string) => void;
}
const countryOptions = [
    { code: "+33", name: "France" },
    { code: "+49", name: "Germany" },
    { code: "+34", name: "Spain" },
    { code: "+1", name: "USA" },
];

const PhoneInput = (props:PhoneInputProps) => {
    const { value, onChange } = props;
    const [selectedCode, setSelectedCode] = useState("+33");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSelectCode = (code: string) => {
        setSelectedCode(code);
        setIsDropdownOpen(false);
    };

    const handlePhoneNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const numericValue = e.target.value.replace(/\D/g, "").slice(0, 12);
        onChange(numericValue);
    };

    return (
        <div className="w-max max-w-sm min-w-[200px] mt-4">
            <label className="block mb-1 text-sm text-slate-600">
                Enter Phone Number
            </label>
            <div className="relative mt-2">
                <div className="absolute top-2 left-0 flex items-center pl-3">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="h-full text-sm flex justify-center items-center bg-transparent text-slate-700 focus:outline-none"
                    >
                        <span>{selectedCode}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-4 w-4 ml-1"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </button>
                    <div className="h-6 border-l border-slate-200 ml-2"></div>
                </div>
                {isDropdownOpen && (
                    <div className="min-w-[150px] absolute left-0 w-full mt-10 bg-white border border-slate-200 rounded-md shadow-lg z-10">
                        <ul>
                            {countryOptions.map((option) => (
                                <li
                                    key={option.code}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-50 text-sm cursor-pointer"
                                    onClick={() =>
                                        handleSelectCode(option.code)
                                    }
                                >
                                    {option.name} ({option.code})
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <input
                    type="tel"
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="324-456-2323"
                    value={value}
                    onChange={handlePhoneNumberChange}
                />
            </div>
        </div>
    );
}

export default PhoneInput;
