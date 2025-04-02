import React, { useEffect, useState } from "react";
import LoadingScreen from "@components/loadings/LoadingScreen";
import ReviewDisplay from "./ReviewCode";
import Button from "./Button";
import LayoutService from "../api/layout";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

//icons
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { FaRegSave } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useTranslation } from "react-i18next";

interface CodeGeneratorProps {
    handleDeleteCodeGenerator: (id: string) => void;
    data: any;
}

const CodeGenerator: React.FC<CodeGeneratorProps> = ({
    data: { _id, code, name, prompt, isNew },
    handleDeleteCodeGenerator,
}) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const [prompting, setPrompt] = useState<string>(prompt);
    const [generatedCode, setGeneratedCode] = useState<string>(code);
    const [title, setTitle] = useState<string>(name);

    const [isShow, setIsShow] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openPreview, setOpenPreview] = useState<boolean>(false);
    const [openCode, setOpenCode] = useState<boolean>(false);

    // Simulate code generation
    const handleGenerateCode = async () => {
        setIsLoading(true);
        const rs = await LayoutService.apiCreateUI({
            prompt: prompting,
        });
        const { content } = rs.data.completion.choices[0].message;
        setGeneratedCode(
            content
                .split("```jsx")[1]
                .split("```")[0]
                .split("return (")
                .join("")
                .split(")")
                .join("")
        );
        setIsLoading(false);
    };

    // Simulate save functionality
    const handleSave = async () => {
        if (!generatedCode) {
            toast.error(t("Please generate code first"));
            return;
        }
        if (!title) {
            toast.error(t("Please input title"));
            return;
        }
        setIsLoading(true);
        const rs = await LayoutService.apiCreateLayout({
            page: searchParams.get("page") as string,
            code: generatedCode,
            name: title,
            prompt: prompting,
        });
        if (rs.data.result) {
            setIsEditing(false);
            setIsLoading(false);
            toast.success(t("Saved successfully"));
        }
        setIsLoading(false);
    };
    const handleEdit = () => {
        if (isEditing) {
            Swal.fire({
                title: t("Confirm you want to change it?"),
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#FF760E",
                cancelButtonColor: "#727D73",
                confirmButtonText: t("Yes, save it!"),
            }).then(async (result) => {
                if (result.isConfirmed) {
                    setIsLoading(true);
                    const rs = await LayoutService.apiUpdateLayout({
                        layout_id: _id,
                        code: generatedCode,
                        name: title,
                        prompt: prompting,
                    });
                    if (rs.status === 200) {
                        setIsLoading(false);
                        setIsEditing(!isEditing);
                        toast.success(t("Updated successfully"));
                    } else {
                        setIsLoading(false);
                    }
                }
            });
        } else {
            setIsEditing(!isEditing);
        }
    };
    // Simulate preview functionality
    const handlePreview = () => {
        setOpenPreview(!openPreview);
    };

    const handleDelete = async () => {
        if (isNew) {
            handleDeleteCodeGenerator(_id);
            toast.success(t("Deleted successfully"));
        } else {
            Swal.fire({
                title: t("Are you sure?"),
                text: t("You won't be able to revert this!"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#FF760E",
                cancelButtonColor: "#727D73",
                confirmButtonText: t("Yes, delete it!"),
            }).then(async (result) => {
                if (result.isConfirmed) {
                    setIsLoading(true);
                    handleDeleteCodeGenerator(_id);
                    await LayoutService.apiDeleteLayout(_id);
                    setIsLoading(false);
                    toast.success(t("Deleted successfully"));
                }
            });
        }
    };
    const handleOpenCode = (id: number) => {
        setOpenCode(!openCode);
        if (openCode) {
            const codeInput = document.getElementById(`code-${id}`);
            codeInput?.setAttribute("style", `height: auto`);
        } else {
            const codeInput = document.getElementById(`code-${id}`);
            codeInput?.setAttribute(
                "style",
                `height: ${codeInput?.scrollHeight}px`
            );
        }
    };
    useEffect(() => {
        if (isNew) {
            const nameInput = document.getElementById(`name-${_id}`);
            if (nameInput) {
                nameInput.focus();
            }
        }
    }, [isNew, _id]);

    return (
        <>
            {isLoading && <LoadingScreen />}

            <div
                onClick={() => setIsShow(!isShow)}
                className="w-full h-[50px] flex justify-between items-center rounded-md bg-primary px-[30px]"
            >
                <input
                    id={`name-${_id}`}
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    type="text"
                    disabled={!isNew}
                    className="bg-primary text-white"
                    placeholder={t("input your title here")}
                />
                <IoIosArrowDown
                    className={`text-white text-[30px]  ${
                        isShow ? " duration-75 rotate-90" : " duration-75"
                    }`}
                />
            </div>
            <div className={`${isShow ? "" : "hidden"} `}>
                {openPreview && (
                    <div className="border border-gray-300 p-4 mb-2">
                        <h1 className="text-xl font-bold">{t("Review")}</h1>
                        <div className="w-full flex justify-center items-center">
                            <ReviewDisplay generatedCode={generatedCode} />
                        </div>
                    </div>
                )}
                <div className="border border-gray-300 p-4 rounded-lg space-y-4 w-full">
                    <div className="w-full flex justify-between items-start">
                        <h1 className="text-xl font-bold">{t("Prompt")}</h1>
                        <div
                            onClick={handleGenerateCode}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            {t("Gen Code")}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <textarea
                            id="prompt"
                            value={prompting}
                            onChange={(e) => {
                                e.target.style.height = "auto";
                                e.target.style.height = `${e.target.scrollHeight}px`;
                                setPrompt(e.target.value);
                            }}
                            className="w-full border border-gray-300 p-2 rounded resize-none overflow-hidden"
                            placeholder={t(
                                "You should be writing layout and content here"
                            )}
                        />
                    </div>
                    <div className="w-full flex flex-row items-center justify-between ">
                        <h1 className="text-xl font-bold">
                            {t("Generated Code")}
                        </h1>
                        <div
                            onClick={() => handleOpenCode(_id)}
                            className="flex flex-row justify-center items-center gap-2 hover:bg-blue-300 p-2 rounded-md cursor-pointer hover:text-white"
                        >
                            {openCode ? t("Hide") : t("Open more")}{" "}
                            <IoIosArrowDown />
                        </div>
                    </div>

                    <textarea
                        id={`code-${_id}`}
                        style={{ height: "auto" }}
                        onChange={(e) => {
                            setGeneratedCode(e.target.value);
                        }}
                        value={generatedCode}
                        className="w-full border border-gray-300 p-2 rounded resize-none overflow-hidden"
                        placeholder={t("Generated code will appear here")}
                        disabled={!isEditing}
                    />
                    <div className="flex space-x-4">
                        {isNew && (
                            <Button
                                text={t("Save")}
                                onClick={handleSave}
                                additionClass="bg-primary"
                                icons={<FaRegSave />}
                            />
                        )}

                        <Button
                            text={isEditing ? t("Save") : t("Edit")}
                            onClick={handleEdit}
                            additionClass="bg-gray-500"
                            icons={<FaEdit />}
                        />

                        <Button
                            text={
                                openPreview ? t("Close preview") : t("Preview")
                            }
                            onClick={handlePreview}
                            additionClass="bg-orange-500"
                            icons={<GrView />}
                        />
                        <Button
                            text={t("Delete")}
                            onClick={handleDelete}
                            additionClass="bg-red-500"
                            icons={<MdDeleteOutline />}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CodeGenerator;
