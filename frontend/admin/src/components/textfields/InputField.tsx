interface InputFieldProps {
    label: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeHolder?: string;
    disabled?: boolean;
    className?: string;
    type?: string;
    error?: string;
}

const InputField = (props: InputFieldProps) => {
    const { label, value, onChange, placeHolder, disabled, className, type, error } =
        props;
    return (
        <div>
            <label className="block text-gray-700">{label}</label>
            <input
                value={value}
                onChange={onChange}
                type={type || "text"}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
                placeholder={placeHolder || "set placeholder"}
                disabled={disabled}
            />
            {error && <p className="text-red-500 text-xs">*{error}</p>}
        </div>
    );
};

export default InputField;
