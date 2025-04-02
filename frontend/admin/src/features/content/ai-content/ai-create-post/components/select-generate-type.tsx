import Tooltip from "@components/tooltip/ToolTip";
import React from "react";
import { useTranslation } from "react-i18next";

interface SelectGenerateTypeProps {
    setGenerateType: React.Dispatch<
        React.SetStateAction<"SOCIAL" | "AUTO" | "CHAT" | null>
    >;
}

const SelectGenerateType: React.FC<SelectGenerateTypeProps> = ({
    setGenerateType,
}) => {
    const { t } = useTranslation();

    return (
        <div className="h-full w-full bg-white rounded-md flex flex-col justify-center items-center gap-4">
            <h1 className="text-2xl font-medium">
                How Do You Want AI to Create Your Content?
            </h1>
            <div className="flex gap-4 text-xl font-semibold">
                <div className="relative  ">

                    <div
                        className="px-4 gap-2 items-center flex ml- py-2 border-2 border-dashboard-green hover:bg-dashboard-green/10 cursor-pointer rounded-md text-dashboard-green"
                        onClick={() => setGenerateType("CHAT")}
                    >
                        <Tooltip
                            title=""
                            content="AI will generate content based on the data you provide, along with sample content and initial foundations that shape the posts."
                            altTitle={t("AI Generate")}
                            className="text-dashboard-green hover:text-dashboard-green/70 "
                        />
                        Train my social media agent

                    </div>


                </div>


                <div className="relative ">
                    <div
                        className="px-4 py-2 border-2 flex items-center gap-2 border-primary hover:bg-primary/10 cursor-pointer rounded-md text-primary"
                        onClick={() => setGenerateType("AUTO")}
                    >  <Tooltip
                            title=""
                            content=" By analyzing your industry, target audience, and provided data, AI can craft engaging and relevant posts that align with your business type"
                            altTitle={t("AI Generate automatically")}
                            className="text-primary hover:text-primary/70 "
                        />
                        Let Chow generate automatically
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SelectGenerateType;
