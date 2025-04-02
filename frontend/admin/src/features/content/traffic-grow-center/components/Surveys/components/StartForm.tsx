import PrimaryButton from "@/components/buttons/PrimaryButton";

interface StartFormProps {
    title: string;
    subtitle: string;
    onStart: () => void;
}

const StartForm = (props: StartFormProps) => {
    const { title, subtitle, onStart } = props;
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <span className="font-sans text-7xl tracking-tight font-semibold text-center text-balance focus:outline-none resize-none w-full bg-transparent  transition duration-150 ">
                {title}
            </span>
            <span className="font-sans bg-transparent focus:outline-none text-xl opacity-70 text-center mt-2 mb-10 text-balance resize-none w-full  transition duration-150 ">
                {subtitle}
            </span>

            <PrimaryButton
                label={"Get started"}
                onClick={onStart}
                className="bg-primary-button rounded-md text-white hover:bg-primary-button/80"
            />
        </div>
    );
};

export default StartForm;
