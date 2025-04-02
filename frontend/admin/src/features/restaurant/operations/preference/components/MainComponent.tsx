import React, { useEffect, useState } from "react";
import PageNavigation from "./PageNavigation";
import CodeGenerator from "./CodeGenerator";
import { useSearchParams } from "react-router-dom";
import layoutService from "../api/layout";
import { RiFileAddLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

export interface CodeGeneratorInstance {
    _id: string;
    code: string;
    name: string;
    page: string;
    create_at: string;
    prompt?: string;
    isNew?: boolean;
}

const MainComponent: React.FC = () => {
    const { t } = useTranslation();
    const [codeGenerators, setCodeGenerators] = useState<CodeGeneratorInstance[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();

    // Add a new CodeGenerator component
    const handleAddCodeGenerator = () => {
        setCodeGenerators([
            ...codeGenerators,
            {
                _id: "",
                code: "",
                name: "",
                page: "",
                prompt: "",
                create_at: "",
                isNew: true,
            },
        ]);
    };

    // Delete a CodeGenerator component
    const handleDeleteCodeGenerator = (id: string) => {
        const newCodeGenerators = codeGenerators.filter(
            (generator) => generator._id !== id
        );
        setCodeGenerators(newCodeGenerators);
    };

    // Fetch the layouts from the server
    const fetchLayouts = async () => {
        if (!searchParams.get("page")) {
            setSearchParams({ page: "home" });
        }
        const rs = await layoutService.apiGetLayout(
            searchParams.get("page") as string
        );
        rs && setCodeGenerators(rs?.data.result);
    };

    useEffect(() => {
        fetchLayouts();
    }, [searchParams]);

    return (
        <div className="col-span-5 space-y-4 border border-gray-300 rounded-lg w-full h-screen overflow-y-auto">
            <PageNavigation />
            <div className="bg-white border border-gray-300 rounded-lg p-5">
                <span className="text-2xl font-bold">{t("Components")}</span>
                {/* Display the CodeGenerator components dynamically */}
                {codeGenerators.map((generator) => (
                    <div key={generator._id} className="mt-4">
                        <CodeGenerator
                            data={generator}
                            handleDeleteCodeGenerator={handleDeleteCodeGenerator}
                        />
                    </div>
                ))}

                {/* Add Row Button */}
                <div
                    onClick={handleAddCodeGenerator}
                    className="w-full flex flex-row mt-2 justify-center items-center gap-2 bg-blue-100 text-black border border-blue-400 px-4 py-2 rounded hover:bg-blue-300"
                >
                    {t("Add Component")} <RiFileAddLine />
                </div>
            </div>
        </div>
    );
};

export default MainComponent;