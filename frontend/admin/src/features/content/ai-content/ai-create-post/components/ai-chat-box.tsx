
import React, { useEffect, useRef, useState } from "react";
import ProcessBar from "./process-bar";
import ChatMessage from "./chat-message";
import ListClientSelection from "./list-selection";
import { IMessage, MESSAGE_TYPE } from "../types/data";
import { DEMO_RESPONSES, generateCourse, STEPS } from "../types/data";
import WelcomeOnboarding from "./welcome-onboarding";
import { ICourse, ICourseSetup, INITIAL_COURSE_SETUP } from "../types/data";
import { X } from "lucide-react";
import { fetchPagePosts } from "../api/ai-content";
import { useSelector } from "react-redux";
import { MdOutlineNavigateNext } from "react-icons/md";



interface OnboardingCreateProps {
    onNext?: () => void;
    onComplete?: (data: { answers: { question: string; answer: string }[]; nDays: number | null }) => void;
}

interface ISocialMedia {
    id: string;
    tag: string;
    url: string;
    content: string;
}

const OnboardingCreate: React.FC<OnboardingCreateProps> = ({ onNext, onComplete }) => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [currentStepGo, setCurrentStepGo] = useState<number>(-1);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [isOnboarding, setIsOnboarding] = useState<boolean>(false);
    const [isOpenCanvas, setIsOpenCanvas] = useState<boolean>(false);
    const [dataCourseGenerated, setDataCourseGenerated] = useState<ICourse | null>(null);
    const [courseSetup, setCourseSetup] = useState<ICourseSetup>(INITIAL_COURSE_SETUP);
    const [answers, setAnswers] = useState<{ question: string; answer: string }[]>([]);
    const [nDays, setNDays] = useState<number | null>(null);
    const [facebookPosts, setFacebookPosts] = useState<{ id: string; url: string }[]>([]);
    const [isFinalStepCompleted, setIsFinalStepCompleted] = useState(false);

    const { defaultPage } = useSelector((state: any) => state.userSlice);
    const handleStartOnboarding = () => {
        setCurrentStepGo(0);
        setIsOnboarding(true);
        setMessages([
            {
                text: DEMO_RESPONSES[STEPS[0]].text,
                isUser: false,
                suggestions: DEMO_RESPONSES[STEPS[0]].suggestions,
                messageType: MESSAGE_TYPE.TEXT,
            },
        ]);
    };

    const handleGenerateCourse = async () => {
        const courseGenerated = await generateCourse(courseSetup);
        setDataCourseGenerated(courseGenerated);
        setIsOpenCanvas(true);
    };

    const handleSuggestionClick = async (suggestion: string) => {
        const isGenerate = suggestion.includes("Generate My Course");
        if (isGenerate) {
            await handleGenerateCourse();
            return;
        }

        const nextStep = currentStepGo + 1;
        const stepKey = STEPS[currentStepGo];

        // Lưu câu hỏi và câu trả lời vào state answers
        setAnswers((prevAnswers) => [
            ...prevAnswers,
            {
                question: DEMO_RESPONSES[stepKey].text,
                answer: suggestion,
            },
        ]);

        // Nếu đây là câu hỏi về previousContents và người dùng trả lời "yes"
        if (stepKey === "previousContents" && suggestion === "Yes") {
            try {
                // Gọi hàm fetchPagePosts để lấy dữ liệu từ Facebook
                const posts = await fetchPagePosts(defaultPage.access_token, defaultPage.id);
                setFacebookPosts(posts); // Lưu dữ liệu vào state
                // Gộp nội dung của các bài viết thành một chuỗi
                const combinedContent = posts.map((post: ISocialMedia) => post.content).join("\n\n");
                setAnswers((prevAnswers) => [
                    ...prevAnswers,
                    {
                        question: DEMO_RESPONSES[stepKey].text,
                        answer: combinedContent,
                    },
                ]);
                // Hiển thị URL của các bài viết
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        text: "Here are the URLs of the latest posts:",
                        isUser: false,
                        messageType: MESSAGE_TYPE.TEXT,
                    },
                    ...posts.map((post: ISocialMedia) => ({
                        text: post.url,
                        isUser: false,
                        messageType: MESSAGE_TYPE.TEXT,
                    })),
                ]);
            } catch (error) {
                console.error("Failed to fetch Facebook posts:", error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        text: 'Session has expired.Please re-login',
                        isUser: false,
                        messageType: MESSAGE_TYPE.TEXT, // Đảm bảo component chat của bạn hỗ trợ hiển thị HTML
                    },
                ]);

            }
        }

        // Nếu đây là câu hỏi cuối cùng (liên quan đến số ngày), cập nhật state nDays
        if (stepKey === "n_days") {
            const days = parseInt(suggestion, 10);
            if (!isNaN(days)) {
                setNDays(days);
                setIsFinalStepCompleted(true); // Đánh dấu bước cuối cùng đã hoàn thành
            }
        }

        setCourseSetup((prev) => ({
            ...prev,
            [stepKey]: suggestion,
        }));

        setMessages((prevMessages) => [
            ...prevMessages.map((msg) => ({ ...msg, suggestions: undefined })),
            { text: suggestion, isUser: true, messageType: MESSAGE_TYPE.TEXT },
        ]);

        if (nextStep < STEPS.length) {
            const nextStepKey = STEPS[nextStep];
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    text: DEMO_RESPONSES[nextStepKey].text,
                    isUser: false,
                    suggestions: DEMO_RESPONSES[nextStepKey].suggestions,
                    messageType: MESSAGE_TYPE.TEXT,
                },
            ]);
            setCurrentStepGo(nextStep);
        } else {
            setIsOnboarding(false);
            // Gửi state answers và nDays ra ngoài component cha
            if (onComplete) {
                onComplete({ answers, nDays });
            }
        }

        setTimeout(() => {
            chatContainerRef.current?.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }, 100);
    };
    useEffect(() => {
        if (currentStepGo === STEPS.length - 1 && onComplete) {
            onComplete({ answers, nDays });
        }
    }, [nDays, currentStepGo, answers, onComplete]);

    return (
        <div className="p-6 h-full flex">
            <div
                className={`h-full flex flex-col transition-all duration-500 ease-in-out ${isOpenCanvas ? "w-1/3 pr-2" : "w-full"
                    }`}
            >

                <ProcessBar
                    percentProcess={(currentStepGo / (STEPS.length - 1)) * 100}
                    isOnboarding={isOnboarding}
                />
                <div
                    className="flex-1 h-full py-2 flex flex-col space-y-4 overflow-y-auto"
                    ref={chatContainerRef}
                >
                    {currentStepGo === -1 ? (
                        <WelcomeOnboarding handleStart={handleStartOnboarding} />
                    ) : (
                        <div className="flex flex-col space-y-4">
                            {messages.map((message, index) => (
                                <div key={index} className="flex flex-col space-y-2">
                                    <ChatMessage
                                        message={message}
                                        courseSetupInfo={courseSetup}
                                    />
                                    {!message.isUser &&
                                        message.suggestions &&
                                        index === messages.length - 1 && (
                                            <ListClientSelection
                                                listSelections={message.suggestions}
                                                handleSuggestionClick={handleSuggestionClick}
                                            />
                                        )}
                                </div>
                            ))}

                        </div>
                    )}
                </div>
                <div className="w-full">
                    {currentStepGo === STEPS.length - 1 && isFinalStepCompleted && (
                        <div className="w-full flex justify-end py-2">
                            {currentStepGo === STEPS.length - 1 && (
                                <button
                                    onClick={onNext}
                                    className="px-4 py-2 group relative flex items-center bg-dashboard-green text-white rounded-lg transition-all duration-300"
                                >
                                    <div className="flex items-center transition-all duration-300 group-hover:mr-2">
                                        <span className="font-semibold">Next</span>
                                    </div>

                                    <div className="flex items-center opacity-0 translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                        <span className="font-semibold">step</span>
                                        <MdOutlineNavigateNext size={30} />
                                    </div>
                                </button>
                            )}
                        </div>

                    )}
                </div>
            </div>
            <div
                className={`h-full bg-gray-100 rounded-md transition-all duration-500 ease-in-out flex flex-col ${isOpenCanvas ? "w-2/3" : "w-0"
                    }`}
            >
                {isOpenCanvas && (
                    <div
                        onClick={() => {
                            setIsOpenCanvas(false);
                            setDataCourseGenerated(null);
                        }}
                        className="cursor-pointer mt-1 ml-1 h-10 w-10 p-2 hover:bg-gray-200 rounded-sm"
                    >
                        <X className="text-gray-700" />
                    </div>

                )}
            </div>

        </div>
    );
};

export default OnboardingCreate;
