import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useEffect, useState } from "react";
import { FORMBRICK_INFLUENCER } from "@/config";
import formbricks from "@formbricks/js";
import TypingText from "@/utils/animations/TypingText";
import { FaArrowRight } from "react-icons/fa6";

interface InstructionPopupProps {
    handleChangeStep: (value: string) => void;
}
const InstructionPopup = (props: InstructionPopupProps) => {
    const [step, setStep] = useState("start");
    // Initialize Formbricks on mount

    const renderStep = (index: string) => {
        switch (index) {
            case "start":
                return <StartStep setStep={setStep} />;
            case "end":
                return <EndStep handleChangeStep={props.handleChangeStep} />;
            case "form":
                return <FormStep setStep={setStep}/>;
            default:
                return null;
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            formbricks.init({
                environmentId: FORMBRICK_INFLUENCER,
                apiHost: "https://app.formbricks.com",
            });
        }

        return () => {
            formbricks.logout(); // Logout when component unmounts
        };
    }, []);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            {renderStep(step)}
        </div>
    );
};

interface StartStepProps {
    setStep: (value: string) => void;
}
const StartStep = (props: StartStepProps) => {
    const handleNextStage = () => {
        formbricks.track("start_click");
        props.setStep("form");
    };
    return (
        <div className="min-w-1/2  h-max p-10 gap-6 bg-white rounded-md flex flex-col justify-center items-center">
            <span className="text-xl font-semibold text-gray-900">
                <TypingText
                    text="Before we started, let's our know more about you"
                    duration={10}
                />
            </span>
            <PrimaryButton
                onClick={handleNextStage}
                label="Okay"
                className="px-8 py-3 text-lg bg-primary text-white rounded-lg 
            hover:bg-primary-th2 transform transition-all duration-200 
            hover:scale-105 focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-primary"
            />
        </div>
    );
};

interface FormStepProps {
    setStep: (value: string) => void;
}
const FormStep = (props: FormStepProps) => {
    return <div onClick={()=> props.setStep("end")} className="w-max h-max text-4xl p-2 flex items-center justify-center rounded-full bg-primary text-white cursor-pointer hover:bg-primary-th2 transform transition-all duration-200 hover:scale-105">
        <FaArrowRight/>
    </div>;
}

interface EndStepProps {
    handleChangeStep: (value: string) => void;
}
const EndStep = (props: EndStepProps) => {
    return (
        <div className="min-w-1/2 h-max p-10 bg-white rounded-md gap-6 flex flex-col justify-center items-center">
            <span className="text-xl font-semibold text-gray-900">
                <TypingText
                    text="Thanks for sharing, almost done!"
                    duration={10}
                />
            </span>
            <span className="text-lg font-medium text-gray-900">
                <TypingText
                    text="Do you want to create an account to save your progress?"
                    duration={50}
                />
            </span>
            <div className="flex items-center gap-4">
                <PrimaryButton
                    onClick={() => props.handleChangeStep("welcome")}
                    label="No, thanks"
                    className="px-8 py-3 text-lg border-2 border-primary text-primary rounded-lg 
                    hover:bg-primary/20 transform transition-all duration-200 
                    hover:scale-105 focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-primary"
                />
                <PrimaryButton
                    onClick={() => props.handleChangeStep("register")}
                    label="Create Account"
                    className="px-8 py-3 text-lg bg-primary text-white rounded-lg 
                    hover:bg-primary-th2 transform transition-all duration-200 
                    hover:scale-105 focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-primary"
                />
            </div>
        </div>
    );
};

export default InstructionPopup;
