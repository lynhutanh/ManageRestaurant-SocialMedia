interface TextFieldProps {
    label: string;
    value: string;
}
const TextFieldComponent: React.FC<TextFieldProps> = ({ label, value }) => {
    return (
        <div className="flex flex-row justify-between">
            <label className="text-[16px] font-semibold">{label}</label>
            <span className="text-[16px] ">{value}</span>
        </div>
    );
};
export default TextFieldComponent;
