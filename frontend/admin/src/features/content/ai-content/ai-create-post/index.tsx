import { useState } from "react";
import SelectGenerateType from "./components/select-generate-type";
import { BsStars } from "react-icons/bs";
import Selector from "@/components/selectors/Selector";
import CreateContentWithSocialMedia from "./components/create-content-with-social-media";
import LoadingPageAIGenerate from "@/components/loadings/LoadingPageAIGenerate";
import { useSelector } from "react-redux";
import { generateAIMarketingPlan, generateAISchedulePlan } from "./api/ai-content";
import { toast } from "react-toastify";
import { TbRefresh } from "react-icons/tb";
import { FaSquareFacebook } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import OnboardingCreate from "./components/ai-chat-box";
import { schedulePostFacebook, schedulePostInstagram } from "../../social-media/social-post-scheduler/api/social-media";
import { IKnowledgeBase, ScheduleResponse } from "./types/data";
import { fetchInstagramBusinessId } from "../../social-media/social-media-manager/api/social-media";
import { useDispatch } from "react-redux";
import { setDefaultPage } from "@/stores/redux/slice/user.slice";


const socialOptions = [
    { id: "FACEBOOK", name: "Facebook", icon: <FaSquareFacebook size={20} />, color: "bg-orange-500 text-white" },
    { id: "INSTAGRAM", name: "Instagram", icon: <RiInstagramFill size={20} />, color: "bg-white border border-gray-300 text-gray-600" },
    { id: "LINKEDIN", name: "LinkedIn", icon: <FaLinkedinIn size={20} />, color: "bg-white border border-gray-300 text-gray-600" },
];
const AiContentCreation: React.FC = () => {
    const { listSocialPages, defaultPage, defaultBusinessType } = useSelector((state: any) => state.userSlice);

    const dispatch = useDispatch();

    const defaultLanguage = localStorage.getItem("language") || "en";
    const [businessType, setBusinessType] = useState<string>(defaultBusinessType);

    const [generateType, setGenerateType] = useState<"SOCIAL" | "AUTO" | "CHAT" | null>(
        null
    );
    const [userAnswers, setUserAnswers] = useState<{ question: string, answer: string }[]>([]);
    const [nDays, setNDays] = useState<number | null>(null);
    const handleChatComplete = (data: { answers: { question: string, answer: string }[], nDays: number | null }) => {
        setUserAnswers(data.answers);
        setNDays(data.nDays);
    };

    const [knowledgeBase, setKnowledgeBase] = useState<IKnowledgeBase>({
        newContent: "",
        sampleContent: "",
    });
    const [socialType, setSocialType] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [language, setLanguage] = useState<string>(defaultLanguage);
    const navigate = useNavigate();
    const handleSocialTypeChange = (socialType: string) => {
        setSocialType(socialType);
    };
    const handleChangeLanguage = (id: string) => {
        setLanguage(id);
        localStorage.setItem("language", id);
    }
    //format câu tra lòi người để gủi cho Be xử lí Genpost
    const formatKnowledgeBase = (userAnswers: { question: string, answer: string }[], newContent: string) => {
        // Format các câu hỏi và câu trả lời từ userAnswers
        const formattedUserAnswers = userAnswers.map(answer => `Q: ${answer.question}\nA: ${answer.answer}`).join('\n');

        // Thêm câu hỏi mặc định cho up load new con tent để format thành Q - A 
        const defaultQuestion = "Are you have sample content?";
        const formattedNewContent = `Q: ${defaultQuestion}\nA: ${newContent}`;

        // Kết hợp cả hai phần lại với nhau
        return `${formattedUserAnswers}\n${formattedNewContent}`;
    };

    const [marketingPlan, setMarketingPlan] = useState("");
    const [timeStamp, setTimeStamp] = useState<number[]>([]);
    const [postTiles, setPostTiles] = useState<string[]>([]);


    ///Generate Marketing Plan
    const handleGenerateMarketingPlan = async () => {
        if (!socialType || !businessType || !language) {
            toast.warning("Please fill all required fields before generating the post.");
            return;
        }

        // Nếu là Facebook hoặc Instagram mà chưa chọn page thì không cho chạy tiếp
        if ((socialType === "FACEBOOK" || socialType === "INSTAGRAM") && !defaultPage?.id) {
            toast.warning("Please select a page before generating the marketing plan.");
            return;
        }

        setIsLoading(true);

        try {
            const formattedKnowledgeBase = formatKnowledgeBase(userAnswers, knowledgeBase.newContent);

            const requestData = {
                social_platform: socialType,
                business: businessType,
                language: language === "vi" ? "VN" : "EN",
                knowledge_base: formattedKnowledgeBase,
                n_days: nDays,
                page_id: defaultPage?.id // Gửi page_id nếu có
            };

            const response = await generateAIMarketingPlan(requestData);
            setMarketingPlan(response.marketing_plan);
            setTimeStamp(response.timestamps);
            setPostTiles(response.post_titles);
            toast.success("Generate Marketing Plan Successful!");
        } catch (error) {
            toast.warning("Generation failed, please try again!");
        } finally {
            setIsLoading(false);
        }
    };


    const scheduleAllPosts = async (response: ScheduleResponse) => {
        try {
            if (response) {
                const { social_posts, timestamps, social_platform, postImageUrls } = response;

                for (let i = 0; i < social_posts.length; i++) {
                    const postMessage = social_posts[i];
                    const scheduledTime = timestamps[i];
                    const postImageUrl = "https://tinhdoan.tayninh.gov.vn/uploads/news/2023_11/image-20231125105150-3.jpeg" // fake image cho instagram

                    try {
                        if (social_platform === "FACEBOOK") {
                            // Lên lịch bài đăng trên Facebook
                            await schedulePostFacebook(
                                defaultPage.access_token,
                                defaultPage.id,
                                postMessage,
                                "",
                                scheduledTime
                            );
                        } else if (social_platform === "INSTAGRAM") {
                            // Lên lịch bài đăng trên Instagram
                            let businessId = defaultPage.igBusinessId;

                            // Nếu không có businessId, thử lấy từ API
                            if (!businessId) {
                                businessId = await fetchInstagramBusinessId(defaultPage.id, defaultPage.access_token);
                                if (!businessId) {
                                    toast.error("No Instagram account linked to this page", { autoClose: 2000 });
                                    continue; // Bỏ qua bài đăng này
                                }
                            }

                            // Gọi API lên lịch bài đăng trên Instagram
                            await schedulePostInstagram(
                                defaultPage.access_token,
                                businessId,
                                postMessage,
                                postImageUrl,
                                scheduledTime,
                                defaultPage.name
                            );
                        }

                        await new Promise(resolve => setTimeout(resolve, 1000)); // Tránh spam API
                    } catch (error) {
                        console.error("Error scheduling post:", error);
                    }
                }
            }
        } catch (error) {
            toast.error("An error occurred while scheduling posts!");
        }
    };
    ///Generate Schedule Plan
    const handleGenerateSchedulePlan = async () => {
        if (!socialType || !businessType || !language) {
            toast.warning("Please fill all required fields before generating the post.");
            return;
        }
        setIsLoading(true);

        try {
            const formattedKnowledgeBase = formatKnowledgeBase(userAnswers, knowledgeBase.newContent);
            const requestData = {
                social_platform: socialType,
                business: businessType,
                language: language === "vi" ? "VN" : "EN",
                knowledge_base: formattedKnowledgeBase,
                post_titles: postTiles,
                timestamps: timeStamp,
            };

            const response = await generateAISchedulePlan(requestData);
            localStorage.setItem("contentSocialGenerate", JSON.stringify(response));
            // Gọi hàm scheduleAllPosts và truyền response trực tiếp
            await scheduleAllPosts(response);
            toast.success("Generate Schedule Plan and schedule posts successful!");
            navigate("/social_post_scheduler");

        } catch (error) {
            toast.warning("Generation failed, please fill in all required fields!");
        } finally {
            setIsLoading(false);
        }
    };



    const [isOpen, setIsOpen] = useState(false);

    const [countCharacter, setCountCharacter] = useState<number>(0);

    const handleCountCharacterChange = (count: number) => {
        setCountCharacter(count);
    };
    const handleChangeBusiness = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBusinessType(e.target.value);
    };

    if (generateType === null) {
        return <SelectGenerateType setGenerateType={setGenerateType} />;
    }

    const handleBusinessTypeChange = (newBusinessType: string) => {
        setBusinessType(newBusinessType);
    };

    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage);
    };
    const handleChangeSocialType = (value: string) => {
        setSocialType(value);

    };

    const handleSelectPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPageId = event.target.value;
        const page = listSocialPages.find((p: any) => p.id === selectedPageId);

        if (page) {
            dispatch(setDefaultPage(page));
        }
    };


    return (


        <div className="h-full w-full bg-white rounded-md relative p-6 overflow-hidden">

            <div className="flex flex-col h-full" >
                <div className="flex  justify-between items-center  ">
                    <h1 className="text-xl font-semibold text-primary">Create a Marketing Plan</h1>
                    <div
                        className="flex items-center text-dashboard-blue gap-2 group hover:cursor-pointer underline-offset-3 hover:underline decoration-1 mb-2 ml-auto"
                        onClick={() => setGenerateType(null)}
                    >
                        <TbRefresh className="group-hover:rotate-180 transition-all duration-300" />
                        <span>Change AI Content Generation</span>
                    </div>

                </div>

                <hr className="w-full  " />
                {generateType === "AUTO" && (
                    <>
                        <div className="flex items-center justify-between  ">
                            <div className="flex flex-col py-2    ">
                                <h2 className="font-bold text-primary">
                                    Which social platform do you want AI to create posts for?
                                </h2>
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

                            </div>






                        </div>
                        <div className="pt-2 group">
                            <h1
                                className="text-dashboard-blue inline-flex cursor-pointer hover:underline items-center gap-2"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <IoSettingsOutline
                                    className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                                />
                                Advanced Settings
                            </h1>
                        </div>


                        {/* Nội dung Advanced Settings */}
                        {isOpen && (
                            <div className="w-[70%] flex flex-wrap gap-x-5 items-center pt-2">
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
                        <button
                            className="px-2  mt-6 py-2 text-lg w-max self-end text-white font-medium rounded-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex items-center gap-2"
                            onClick={handleGenerateMarketingPlan}
                        >
                            Generate Post Content with AI <BsStars className="inline" />
                        </button>
                    </>

                )}
                <div className=" flex flex-col w-full h-full">
                    <div className="flex-1 w-full h-full">
                        {
                            generateType === "CHAT" && (
                                <OnboardingCreate
                                    onNext={() => setGenerateType("SOCIAL")}
                                    onComplete={handleChatComplete}
                                />
                            )
                        }
                        {generateType === "SOCIAL" && (
                            <CreateContentWithSocialMedia
                                knowledgeBase={knowledgeBase}
                                setKnowledgeBase={setKnowledgeBase}
                                onCountCharacterChange={handleCountCharacterChange}
                                onSocialTypeChange={handleSocialTypeChange}
                                onBusinessTypeChange={handleBusinessTypeChange}
                                onLanguageChange={handleLanguageChange}
                                onGenerateMarketingPlan={handleGenerateMarketingPlan}
                                onGenerateSchedulePlan={handleGenerateSchedulePlan}
                                userAnswers={userAnswers}
                                nDays={nDays}
                                marketingPlan={marketingPlan}
                                postTitles={postTiles}
                                onCancel={() => setGenerateType("CHAT")}

                            />
                        )}
                    </div>
                </div>
            </div>
            {isLoading && <LoadingPageAIGenerate />}
        </div>

    );
};
export default AiContentCreation;
