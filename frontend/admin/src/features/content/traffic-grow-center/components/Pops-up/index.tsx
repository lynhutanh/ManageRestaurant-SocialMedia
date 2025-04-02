import { useEffect, useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import InstructionPopup from "./components/InstructionPopup";

const PopupFormAffiliate = () => {
    const [step, setStep] = useState("welcome");
    console.log(step);

    const handleChangeStep = (step: string) => {
        setStep(step);
    };
    useEffect(() => {
        if (window.localStorage.getItem("formbricks-js")) {
            window.localStorage.removeItem("formbricks-js");
        }
    }, []);
    const renderStep = (index: string) => {
        switch (index) {
            case "welcome":
                return <WelcomeScreen handleChangeStep={handleChangeStep} />;
            case "form":
                return <InstructionPopup handleChangeStep={handleChangeStep} />;
            case "login":
                return <Login handleChangeStep={handleChangeStep} />;
            case "register":
                return <Register handleChangeStep={handleChangeStep} />;
            default:
                return null;
        }
    };
    return <div className="w-full h-full">{renderStep(step)}</div>;
};

export default PopupFormAffiliate;
