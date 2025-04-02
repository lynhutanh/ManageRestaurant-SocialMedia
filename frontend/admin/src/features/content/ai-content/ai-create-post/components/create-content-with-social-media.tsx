import React, { useEffect, useState } from "react";
import pdfToText from "react-pdftotext";
import { FaCheckSquare, FaLinkedinIn, FaRegSquare } from "react-icons/fa";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import Selector from "@/components/selectors/Selector";
import { useSelector } from "react-redux";
import { IoSettingsOutline } from "react-icons/io5";
import Tooltip from "@/components/tooltip/ToolTip";
import { BsStars } from "react-icons/bs";
import PopupMarketingPlan from "./popup-marketing-plan";
import { setDefaultPage } from "@/stores/redux/slice/user.slice";
import { useDispatch } from "react-redux";


interface IKnowledgeBase {
    newContent: string;
    sampleContent: string;

}

interface CreateContentWithSocialMediaProps {
    knowledgeBase: IKnowledgeBase;
    setKnowledgeBase: React.Dispatch<React.SetStateAction<IKnowledgeBase>>;
    onCountCharacterChange: (count: number) => void;
    onSocialTypeChange: (socialType: string) => void;
    onBusinessTypeChange: (businessType: string) => void;
    onLanguageChange: (language: string) => void;
    onGenerateMarketingPlan: () => void;
    onGenerateSchedulePlan: () => void;
    userAnswers: { question: string; answer: string }[];
    nDays: number | null
    marketingPlan: string;
    postTitles: string[]
    onCancel: () => void;
}

const CreateContentWithSocialMedia: React.FC<
    CreateContentWithSocialMediaProps
> = ({ knowledgeBase, setKnowledgeBase,
    onGenerateSchedulePlan,
    onCountCharacterChange,
    onGenerateMarketingPlan,
    nDays, onSocialTypeChange,
    userAnswers,
    onLanguageChange,
    onBusinessTypeChange,
    postTitles,
    onCancel,
    marketingPlan
}) => {
        const { listSocialPages, defaultPage, defaultBusinessType } = useSelector((state: any) => state.userSlice);
        const dispatch = useDispatch();

        const LIMIT_COUNT = 10000;
        const [countCharacter, setCountCharacter] = useState<number>(0);
        const [currentNameFileSelected, setCurrentNameFileSelected] =
            useState<string>("");

        const fixExtractedText = (text: string) => {
            return text.replace(/\s+(?=[a-zA-Z])/g, "");
        };

        const handleUploadNewContent = async (file: File) => {
            if (!file) return;

            setCurrentNameFileSelected(file.name);

            await pdfToText(file)
                .then((text: string) => {
                    const fixedText = fixExtractedText(text);

                    setKnowledgeBase((prev) => ({ ...prev, newContent: fixedText }));
                })
                .catch((error: any) => {
                    console.error("Failed to extract text from PDF:", error);
                });
        };
        const handleGenerateMarketingPlan = () => {
            onGenerateMarketingPlan();
            setIsOpenPopupMarketingPlan(true);
        };


        useEffect(() => {
            const coutNewContent = knowledgeBase.newContent.length;
            const coutSampleContent = knowledgeBase.sampleContent.length;
            setCountCharacter(coutNewContent + coutSampleContent);
            const totalCount = coutNewContent + coutSampleContent;

            onCountCharacterChange(totalCount);
        }, [knowledgeBase, onCountCharacterChange]);


        const [isDragging, setIsDragging] = useState<boolean>(false);
        const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            setIsDragging(true);
        };

        const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            setIsDragging(true);
        };

        const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            setIsDragging(false);
        };

        const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            setIsDragging(false);

            const file = event.dataTransfer.files?.[0];
            if (file) {
                handleUploadNewContent(file);
            }
        };
        const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
                handleUploadNewContent(file);
            }
            event.target.value = "";
        };


        const socialOptions = [
            { id: "FACEBOOK", name: "Facebook", icon: <FaSquareFacebook size={20} />, color: "bg-orange-500 text-white" },
            { id: "INSTAGRAM", name: "Instagram", icon: <RiInstagramFill size={20} />, color: "bg-white border border-gray-300 text-gray-600" },
            { id: "LINKEDIN", name: "LinkedIn", icon: <FaLinkedinIn size={20} />, color: "bg-white border border-gray-300 text-gray-600" },
        ];
        const [socialType, setSocialType] = useState<string>("");

        const handleChangeSocialType = (value: string) => {
            setSocialType(value);
            onSocialTypeChange(value);

        };
        const [businessType, setBusinessType] = useState<string>(defaultBusinessType);
        const [isOpen, setIsOpen] = useState(false);
        const handleChangeBusiness = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newBusinessType = e.target.value;
            setBusinessType(newBusinessType);
            onBusinessTypeChange(newBusinessType);
        };
        const defaultLanguage = localStorage.getItem("language") || "en";

        const [language, setLanguage] = useState<string>(defaultLanguage);
        const handleChangeLanguage = (id: string) => {
            setLanguage(id);
            localStorage.setItem("language", id);
            onLanguageChange(id);
        }

        useEffect(() => {
            // Chỉ cập nhật sampleContent với userAnswers
            if (userAnswers.length > 0) {
                const combinedUserAnswers = userAnswers.map(item => item.answer).join(" ");
                setKnowledgeBase((prev) => ({
                    ...prev,
                    sampleContent: combinedUserAnswers, // Lưu combinedUserAnswers vào sampleContent
                }));
            } else {
                // Nếu không có userAnswers, đặt sampleContent thành rỗng
                setKnowledgeBase((prev) => ({
                    ...prev,
                    sampleContent: "",
                }));
            }


        }, [userAnswers]);


        const handleSelectPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedPageId = event.target.value;
            const page = listSocialPages.find((p: any) => p.id === selectedPageId);

            if (page) {
                dispatch(setDefaultPage(page));
            }
        };

        const [isOpenPopupMarketingPlan, setIsOpenPopupMarketingPlan] = useState(false)
        return (
            <div className="h-full w-full ">

                <p>
                    The character count is limited to {LIMIT_COUNT.toLocaleString()}{" "}
                    characters. Character count:{" "}
                    <span
                        className={`font-medium ${countCharacter > LIMIT_COUNT
                            ? "text-dashboard-red"
                            : "text-dashboard-blue"
                            }`}
                    >
                        {countCharacter.toLocaleString()}
                    </span>{" "}
                    / {LIMIT_COUNT.toLocaleString()}
                </p>
                <div className=" flex justify-between py-4   gap-4">
                    <div className="w-full h-full " >
                        <div className="flex w-[100% ] items-center gap-2 ">
                            <h2 className="font-bold text-primary flex items-center">
                                Upload new content

                                {currentNameFileSelected === "" && (
                                    <>
                                        <span className="text-gray-500 font-light">(optional)</span>
                                        <Tooltip
                                            title=""
                                            content="Make content using the template you uploaded!"
                                            altTitle="Sample content"
                                        />
                                    </>
                                )}
                            </h2>
                            {currentNameFileSelected !== "" && (
                                <div className="flex justify-end items-center gap-2 ">
                                    <div className="">
                                        <span className="font-medium">Current File:</span>
                                        <span className="ml-2 max-w-[300px] truncate text-dashboard-blue">
                                            {currentNameFileSelected}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="w-full flex flex-col items-start justify-start mt-2">
                            <div
                                className={`bg-white p-4 rounded border-dashed border-2 ${isDragging ? "border-blue-500" : "border-gray-300"
                                    } w-full flex flex-col items-center justify-center h-40 cursor-pointer`}
                                onDragOver={handleDragOver}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handleFileInputChange}
                                    className="hidden"
                                    id="fileInput"
                                />
                                <label htmlFor="fileInput" className="flex flex-col items-center cursor-pointer">
                                    <FaCloudDownloadAlt className="text-6xl text-gray-400 mb-2" />
                                    <p className="text-gray-500">Click or drag file to upload</p>
                                    <p className="text-gray-500 text-xs">PDF only</p>
                                </label>


                            </div>



                            <div className="flex items-center justify-between  ">
                                <div className="flex flex-col py-2    ">
                                    <h2 className="font-bold text-primary">
                                        Which social platform do you want AI to create posts for?
                                    </h2>
                                    <div className="flex gap-4 py-2">
                                        <div className="flex gap-4 py-2">
                                            {socialOptions.map((option) => {
                                                const isDisabled = option.id === "LINKEDIN";
                                                return (
                                                    <div
                                                        key={option.id}
                                                        className={`px-4 py-2 rounded cursor-pointer flex items-center gap-2 
                    ${socialType === option.id ? "bg-primary text-white font-semibold" : "bg-white border border-gray-300 text-gray-600"}
                    ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                                                        onClick={() => !isDisabled && handleChangeSocialType(option.id)}
                                                    >
                                                        {option.icon}
                                                        {option.name}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {(socialType === "FACEBOOK" || socialType === "INSTAGRAM") && (
                                <div className="">
                                    <h1 className="font-bold text-primary">Which pages do you want to generate for the marketing plan?</h1>
                                    <select

                                        value={defaultPage?.id || ""}
                                        onChange={handleSelectPage}
                                        className="mt-2 p-2 border  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
                                    >
                                        <option value="" disabled>
                                            -- Select a Page --
                                        </option>
                                        {listSocialPages.map((page: any) => (
                                            <option key={page.id} value={page.id}>
                                                {page.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            )}
                            <div className=" group"
                            >

                                <h1 className="text-dashboard-blue  inline-flex cursor-pointer hover:underline items-center gap-2 mt-4"
                                    onClick={() => setIsOpen(!isOpen)}>
                                    <IoSettingsOutline className="transition-transform duration-300 group-hover:rotate-90" />
                                    Advanced Settings
                                </h1>
                            </div>

                            {isOpen && (
                                <div className="w-[70%] flex flex-nowrap gap-x-5 items-center">
                                    <div className="flex items-center gap-3">
                                        <label className="font-bold text-primary whitespace-nowrap">Business type:</label>
                                        <input
                                            type="text"
                                            name="business"
                                            value={businessType}
                                            onChange={handleChangeBusiness}
                                            className="w-[150px] p-2 border rounded-md"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <label className="font-bold text-primary whitespace-nowrap">Language:</label>
                                        <Selector
                                            title="Language"
                                            list={[
                                                { id: "en", name: "English" },
                                                { id: "vi", name: "Tiếng Việt" },
                                            ]}
                                            value={language}
                                            onChange={handleChangeLanguage}
                                        />
                                    </div>
                                </div>
                            )}


                        </div>

                    </div>

                </div>
                <button
                    className="px-2  py-2 text-lg w-max self-end text-white font-medium rounded-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex items-center gap-2"
                    onClick={handleGenerateMarketingPlan}
                // onClick={() => setIsOpenPopupMarketingPlan(true)}
                >
                    Generate Marketing Plan <BsStars className="inline" />
                </button>

                {
                    isOpenPopupMarketingPlan && (
                        <PopupMarketingPlan
                            onGenerateSchedulePlan={onGenerateSchedulePlan}
                            isOpen={isOpenPopupMarketingPlan}
                            onClose={() => setIsOpenPopupMarketingPlan(false)}
                            marketingPlan={marketingPlan}
                            postTitles={postTitles}
                            onCancel={onCancel}
                        />


                    )
                }

            </div>
        );
    };

export default CreateContentWithSocialMedia;
