import { useState } from "react";
import StepForm from "./components/Form";
import StartForm from "./components/StartForm";
import { steps } from "./constants/steps";

interface UserData {
    personalInfo: {
        fullName: string;
        email: string;
        phoneNumber: string;
        location: string;
    };
    platformDetails: {
        platform: string;
        website: string;
        followers: string;
        monthlyTraffic: string;
        contentCategory: string;
    };
    brandCollaboration: {
        brandCollab: string;
        brandCategories: string[];
        sponsoredContent: string;
        typicallyPromote: string;
    };
    financialDetails: {
        commissionType: string;
        paymentMethod: string;
    };
    file: string;
    termsAndConditions: boolean;
    [key: string]: any;
}

const SurveyForm = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [step, setStep] = useState(0);
    const key = steps[step].keyAttribute;
    const type = steps[step].type;

    const [userData, setUserData] = useState<UserData>({
        personalInfo: {
            fullName: "",
            email: "",
            phoneNumber: "",
            location: "",
        },
        platformDetails: {
            platform: "",
            website: "",
            followers: "",
            monthlyTraffic: "",
            contentCategory: "",
        },
        brandCollaboration: {
            brandCollab: "",
            brandCategories: [],
            sponsoredContent: "",
            typicallyPromote: "",
        },
        financialDetails: {
            commissionType: "",
            paymentMethod: "",
        },
        file: "",
        termsAndConditions: false,
    });

    const handleNextStep = () => {
        setStep((prev) => {
            if (prev < steps.length - 1) {
                return prev + 1;
            }
            return prev;
        });
    };
    const handleStart = () => {
        setIsStarted(true);
    };

    const handleInputChange = (value: string | boolean | string[]) => {

        setUserData((prevData) => {
            // Create a deep copy of userData
            const updatedData = { ...prevData };

            // Find which category the key belongs to and update accordingly
            if (
                Object.prototype.hasOwnProperty.call(prevData.personalInfo, key)
            ) {
                updatedData.personalInfo = {
                    ...prevData.personalInfo,
                    [key]: value,
                };
            } else if (
                Object.prototype.hasOwnProperty.call(
                    prevData.platformDetails,
                    key
                )
            ) {
                updatedData.platformDetails = {
                    ...prevData.platformDetails,
                    [key]: value,
                };
            } else if (
                Object.prototype.hasOwnProperty.call(
                    prevData.brandCollaboration,
                    key
                )
            ) {
                updatedData.brandCollaboration = {
                    ...prevData.brandCollaboration,
                    [key]: value,
                };
            } else if (
                Object.prototype.hasOwnProperty.call(
                    prevData.financialDetails,
                    key
                )
            ) {
                updatedData.financialDetails = {
                    ...prevData.financialDetails,
                    [key]: value,
                };
            } else {
                // Handle top-level fields
                updatedData[key] = value;
            }

            return updatedData;
        });
    };

    const renderStep = () => {
        return (
            <StepForm
                key={step}
                title={steps[step].content}
                value={key in userData ? userData[key] : ""}
                type={type}
                onChange={handleInputChange}
                onSubmit={handleNextStep}
                buttonTitle={steps[step].buttonTitle}
                optional={steps[step].optional}
                placeholder={steps[step].placeholder}
                list={steps[step].list}
                keyAttribute={key}
                handleNextStep={handleNextStep}
            />
        );
    };
    return (
        <div className="w-full h-full flex transition-all duration-1000">
            {!isStarted ? (
                <StartForm
                    onStart={handleStart}
                    title="Let's Explore Collaboration Opportunities!"
                    subtitle="We are excited to connect with you and discover potential ways to work together. Please share a bit about yourself and your expertise so we can explore the possibilities together!"
                />
            ) : (
                <>{renderStep()}</>
            )}
        </div>
    );
};

export default SurveyForm;
