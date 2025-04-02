import PrimaryButton from "@/components/buttons/PrimaryButton";
import PhoneInput from "@/components/inputs/TelephoneInput";
import TypingText from "@/utils/animations/TypingText";
import { MdOutlineKeyboardReturn } from "react-icons/md";
import { useState } from "react";
import FileInput from "./FileInput";

interface StepFormProps {
    title: string;
    value: string;
    type: string;
    onChange: (value: string) => void;
    onSubmit: () => void;

    placeholder?: string;
    buttonTitle?: string;
    optional?: boolean;
    list?: string[];
    keyAttribute: string;
    handleNextStep: () => void;
}

const StepForm = (props: StepFormProps) => {
    const {
        title,
        value,
        type,
        onChange,
        onSubmit,
        placeholder,
        buttonTitle,
        optional,
        handleNextStep,
    } = props;

    const [isTypingComplete, setIsTypingComplete] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleNextStep();
        }
    };

    const renderInput = (type: string) => {
        switch (type) {
            case "text":
                return (
                    <textarea
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="border-b font-sans placeholder-current placeholder:opacity-30 w-full bg-transparent focus:outline-none text-lg sm:text-2xl resize-none pt-4"
                    />
                );
            case "email":
                return (
                    <textarea
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="border-b font-sans placeholder-current placeholder:opacity-30 w-full bg-transparent focus:outline-none text-lg sm:text-2xl resize-none pt-4"
                    />
                );
            case "tel":
                return <PhoneInput value={value} onChange={onChange} />;
            case "list":
                return (
                    <div className="flex-wrap max-w-full flex gap-3">
                        {props.list?.map((item) => (
                            <div
                                onClick={handleNextStep}
                                className="w-max h-max text-lg text-white bg-primary-button hover:bg-primary-button/70 cursor-pointer p-2 rounded-md transform transition-transform duration-300 hover:scale-105"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                );
            case "file":
                return (
                    <FileInput
                        value={value}
                        onChange={onChange}
                        maxSizeMB={10}
                        acceptedTypes={["image/*", "application/pdf"]}
                        handleNextStep={handleNextStep}
                    />
                );
            case "number":
                return (
                    <input
                        type="number"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="font-sans w-full bg-transparent focus:outline-none text-lg sm:text-2xl pt-4"
                    />
                );
            case "boolean":
                return (
                    <div className="flex items-center gap-2">
                        <div
                            onClick={handleNextStep}
                            className={`w-max h-max text-lg text-white bg-primary-button hover:bg-primary-button/70 cursor-pointer transform duration-200 p-2 rounded-md mb-2 px-6`}
                        >
                            Yes
                        </div>
                        <div
                            onClick={handleNextStep}
                            className={`w-max h-max text-lg text-white bg-primary-button hover:bg-primary-button/70 cursor-pointer transform duration-200 p-2 rounded-md mb-2 px-6`}
                        >
                            No
                        </div>
                    </div>
                );
            case "end":
                return (
                    <div className="w-full flex justify-end ">
                        <PrimaryButton
                            label={buttonTitle || "Submit"}
                            onClick={onSubmit}
                            className="bg-primary-button rounded-md text-white hover:bg-primary-button/80"
                        />
                    </div>
                );
            default:
                return <></>;
        }
    };
    return (
        <div
            onKeyDown={handleKeyDown}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-auto min-h-[18rem] max-w-[55rem] px-6 flex flex-col gap-2"
        >
            {/* content and input */}
            <div className="min-h-[40vh] flex flex-col gap-4 justify-center">
                <span className="leading-tight font-sans text-5xl prose-a:underline prose-strong:font-semibold prose-ul:list-disc prose-ul:px-6 prose-ul:py-2 prose-ol:list-decimal prose-ol:px-6 prose-ol:py-2">
                    <TypingText
                        text={title}
                        duration={10}
                        startDelay={100}
                        onComplete={() => setIsTypingComplete(true)}
                    />
                </span>

                {isTypingComplete && (
                    <span className="animate-slide-bottom">
                        {renderInput(type)}
                    </span>
                )}
            </div>
            {/* bottom-buttons */}
            {isTypingComplete && (
                <div className="flex w-full justify-between items-center gap-4 animate-slide-bottom">
                    {["text", "tel", "email"].includes(type) && (
                        <div className="flex items-center justify-between gap-2">
                            <PrimaryButton
                                label={buttonTitle || "Next"}
                                onClick={handleNextStep}
                                className="transform_z bg-primary-button rounded-md text-white hover:bg-primary-button/80"
                            />
                            <div className="flex items-center gap-1 text-primary-text text-sm ">
                                <span>
                                    or press <strong>Enter</strong>
                                </span>
                                <MdOutlineKeyboardReturn className="" />
                            </div>
                        </div>
                    )}

                    {!optional &&
                        !["end", "list", "boolean","file"].includes(type) && (
                            <PrimaryButton
                                label={"Skip"}
                                onClick={handleNextStep}
                                className="transform_z border border-primary-button text-primary-button rounded-md hover:bg-primary-button/20"
                            />
                        )}
                </div>
            )}
        </div>
    );
};

export default StepForm;
