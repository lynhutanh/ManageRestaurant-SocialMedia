import { useState } from "react";
import CardContent from "@/features/settings/setup/components/CardContent";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { steps } from "../../constants/step";
import Modal from "@/features/shared/pops-up";

interface InstructionModalProps {
    handleCloseInstructionModal: () => void;
    isOpenInstructionModal: boolean;
}

const InstructionModalCrudSchedulePost = (props: InstructionModalProps) => {
    const { handleCloseInstructionModal, isOpenInstructionModal } = props;

    const [stepGroup, setStepGroup] = useState<"Schedule" | "View" | "Update" | "Delete">("Schedule");
    const [currentStep, setCurrentStep] = useState(0);

    const stepsForGroup = steps[stepGroup];

    const handleSetStep = (value: boolean) => {
        if (currentStep === stepsForGroup.length - 1 && value) {
            handleCloseInstructionModal();
            return;
        }
        setCurrentStep((prevStep) => {
            if (value && prevStep < stepsForGroup.length - 1) {
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
                <div className="p-6">
                    {/* Giao diện chọn stepGroup */}
                    <div className="flex justify-center gap-6 mb-4 border-b border-gray-300">
                        {["Schedule", "View", "Update", "Delete"].map((tab) => (
                            <div
                                key={tab}
                                className={`cursor-pointer px-4 py-2 text-lg font-medium ${stepGroup === tab
                                    ? "border-b-2 border-dashboard-blue text-dashboard-blue"
                                    : "text-gray-500 hover:text-dashboard-blue"
                                    }`}
                                onClick={() => setStepGroup(tab as "Schedule" | "View" | "Update" | "Delete")}
                            >
                                {tab}
                            </div>
                        ))}

                    </div>



                    <div className="overflow-y-auto max-h-[70vh]">
                        {<CardContent item={stepsForGroup[currentStep]} />}
                    </div>

                    <div className="flex justify-end gap-4 w-full h-max py-4 mt-4">
                        <div className="flex justify-between gap-4">
                            <PrimaryButton
                                label="Previous"
                                onClick={() => handleSetStep(false)}
                                className={`border-2 border-dashboard-blue text-dashboard-blue rounded-md hover:bg-dashboard-blue/80 hover:text-white ${currentStep === 0 ? "hidden" : ""}`}
                            />
                            <PrimaryButton
                                label={currentStep === stepsForGroup.length - 1 ? "Done" : "Next"}
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

export default InstructionModalCrudSchedulePost;
