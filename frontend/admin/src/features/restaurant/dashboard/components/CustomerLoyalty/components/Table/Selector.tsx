interface SelectorComponentProps {
    options: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const SelectorComponent: React.FC<SelectorComponentProps> = ({
    options,
    onChange,
}) => {
    return (
        <div className="flex justify-end h-full min-h-[40px]">
            <select
                onChange={onChange}
                id="statusFilter"
                className=" border border-gray-300 rounded px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 "
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};
export default SelectorComponent;
