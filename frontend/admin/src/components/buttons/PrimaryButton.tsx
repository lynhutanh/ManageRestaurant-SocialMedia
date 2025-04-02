interface PrimaryButtonProps {
    className?: string;
    onClick?: () => void;
    label: string;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
    const { label, onClick, className } = props;
    return (
        <div onClick={onClick} className={`px-4 py-2 cursor-pointer w-max text-lg font-semibold ${className}`}>
            {label}
        </div>
    );
};

export default PrimaryButton;
