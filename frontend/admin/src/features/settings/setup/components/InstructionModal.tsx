import CardContent from "./CardContent";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { steps } from "../constants/step";
import { useState } from "react";
import Modal from "@/features/shared/pops-up";

interface InstructionModalProps {
    handleCloseInstructionModal: () => void;
    isOpenInstructionModal: boolean;
}

const InstructionModal = (props: InstructionModalProps) => {
    const { handleCloseInstructionModal, isOpenInstructionModal } = props;
    const [currentStep, setCurrentStep] = useState(0);
    const handleSetStep = (value: boolean) => {
        if (currentStep === steps.length - 1 && value) {
            handleCloseInstructionModal();
            return;
        }
        setCurrentStep((prevStep) => {
            if (value && prevStep < steps.length - 1) {
                return prevStep + 1;
            } else if (!value && prevStep > 0) {
                return prevStep - 1;
            }
            return prevStep;
        });
    };

    return (
        <div className="fixed flex items-center justify-center h-screen z-[200] overflow-x-hidden">
            <Modal
                isOpen={isOpenInstructionModal}
                onClose={handleCloseInstructionModal}
                className=" max-md:py-4 max-md:px-2"
            >
                <div className="p-6 ">
                    <div className="overflow-y-auto max-h-[70vh]">
                        {<CardContent item={steps[currentStep]} />}
                    </div>
                    <div className="flex justify-end gap-4 w-full h-max py-4 mt-4">
                        <div className="flex justify-between gap-4">
                            <PrimaryButton 
                                label="Previous"
                                onClick={() => handleSetStep(false)}
                                className={`border-2 border-dashboard-blue text-dashboard-blue rounded-md hover:bg-dashboard-blue/80 hover:text-white ${currentStep === 0 ? "hidden" : ""}`}
                            />
                            <PrimaryButton
                                label={currentStep === steps.length -1 ? "Done" : "Next"}
                                onClick={() => handleSetStep(true)}
                                className="border-2 bg-dashboard-green text-white rounded-md hover:bg-dashboard-green/90 border-dashboard-green"
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default InstructionModal;
