import React, { useState, useEffect } from "react";
import dayjs from 'dayjs';
import { toast } from "react-toastify";
import {
    schedulePostFacebook,
    getAllScheduledPostsFacebook,
    schedulePostInstagram,
    fetchInstagramBusinessId,
    getAllScheduledPostsInstagram,
} from "./api/social-media";
import CalendarHeader from "./components/Calendar/CalendarHeader";
import { HourlyCalendar } from "./components/Calendar/HourCalendar";
import { Calendar } from "./components/Calendar/Calendar";
import ScheduleModal from "./components/Schedule/ScheduleModal";
import PostSelectionModal from "./components/Schedule/PopupChoosePostFromAi";
import { AiOutlineRobot } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FaQuestionCircle } from "react-icons/fa";
import InstructionModalCrudSchedulePost from "./components/Schedule/InstructionModalCrudSchedulePost";
import { HiPaperAirplane } from "react-icons/hi2";
import { IoDocumentTextOutline } from "react-icons/io5";
import TokenExpiredModal from "@/features/settings/setup/components/TokenExpiredModal";
import { IAccountSate, IPostState } from "./types/schedule";

const SocialPostScheduler: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("facebook");
    const [handleShowCalendar, setHandleShowCalendar] = useState("week");
    const [scheduledPosts, setScheduledPosts] = useState<any[]>([]);
    const [postState, setPostState] = useState<IPostState>({
        postMessage: "",
        postImageUrl: "",
        scheduledTime: "",
    });
    const [isOpenListFaceBookSchedule, setisOpenListFaceBookSchedule] = useState(false);

    const [accountState, setAccountState] = useState<IAccountSate>({
        selectedPageToken: "",
        selectedPageId: "",
        selectedPageName: "",
        selectedInstagramBusinessId: "",
    });


    const [loading, setLoading] = useState(false);

    const [isDeletedPost, setIsDeletedPost] = useState(false);
    const [isUpdatedPost, setIsUpdatedPost] = useState(false);
    const [isOpenModalSchedulePost, setIsOpenModalSchedulePost] = useState(false);
    const [isInstructionModalOpen, setIsInstructionModalOpen] = useState(false);
    const handleOpenInstructionModal = () => setIsInstructionModalOpen(true);
    const handleCloseInstructionModal = () => setIsInstructionModalOpen(false);
    const navigate = useNavigate();

    const handleOpenModalSchedulePost = () => setIsOpenModalSchedulePost(true);
    const handleCloseModalSchedulePost = () => {
        setIsOpenModalSchedulePost(false);
        setPostState({
            postMessage: "",
            postImageUrl: "",
            scheduledTime: "",
        });

        localStorage.removeItem("schedulingPost");
    };
    const { defaultPage } = useSelector((state: any) => state.userSlice);
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const handleSchedulePostFacebook = async () => {
        if (!accountState.selectedPageId || !accountState.selectedPageToken) {
            toast.error("Please select a Facebook page first!", { autoClose: 2000 });
            return;
        }
        if (!postMessage || !postState.scheduledTime) {
            toast.error("Please enter full content, image URL and time!", { autoClose: 2000 });
            return;
        }

        const now = Math.floor(Date.now() / 1000);
        const unixScheduledTime = Math.floor(new Date(postState.scheduledTime).getTime() / 1000);

        if (unixScheduledTime < now + 600) {
            toast.error("The appointment time must be at least 10 minutes greater than the current time!", { autoClose: 2000 });
            return;
        }

        setLoading(true);



        try {
            const response = await schedulePostFacebook(
                accountState.selectedPageToken,
                accountState.selectedPageId,
                postState.postMessage,
                postState.postImageUrl,
                unixScheduledTime
            );


            toast.success("Post has been scheduled successfully", { autoClose: 2000 });

            setPostState({
                postMessage: "",
                postImageUrl: "",
                scheduledTime: "",
            });

            await getAllScheduledPosts();
        } catch (error) {
            console.error("Error scheduling post:", error);
            toast.error("Error scheduling post!", { autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    };


    const handleSchedulePostInstagram = async () => {
        if (!accountState.selectedPageId || !accountState.selectedPageToken || !accountState.selectedPageName) {
            toast.error("Please select a page associated with your instagram account !", { autoClose: 2000 });
            return;
        }

        if (!postMessage || !postState.scheduledTime || !postState.postImageUrl) {
            toast.error("Please enter full content, postImageUrl, time!", { autoClose: 2000 });
            return;
        }

        const unixScheduledTime = Math.floor(new Date(postState.scheduledTime).getTime() / 1000);
        setLoading(true);

        try {
            let businessId = accountState.selectedInstagramBusinessId;

            if (!businessId) {
                businessId = await fetchInstagramBusinessId(accountState.selectedPageId, accountState.selectedPageToken);
                if (businessId) {
                    setAccountState(prevState => ({
                        ...prevState,
                        selectedInstagramBusinessId: businessId,
                    }));
                } else {
                    toast.error("There are no instagram accounts linked to this page", { autoClose: 2000 });
                    setLoading(false);
                    return;
                }
            }

            const response = await schedulePostInstagram(
                accountState.selectedPageToken,
                businessId,
                postState.postMessage,
                postState.postImageUrl,
                unixScheduledTime,
                accountState.selectedPageName
            );

            toast.success("Post has been scheduled successfully on Instagram", { autoClose: 2000 });

            setPostState({
                postImageUrl: "",
                postMessage: "",
                scheduledTime: ""

            })

            await getAllScheduledPosts();

        } catch (error) {
            toast.error("Error scheduling posts on Instagram!", { autoClose: 2000 });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectPageFacebookSchedule = (page: any) => {
        setAccountState(prevState => ({
            ...prevState,
            selectedPageToken: page.access_token,
        }));
        setAccountState(prevState => ({
            ...prevState,
            selectedPageId: page.id,
        }));
        setAccountState(prevState => ({
            ...prevState,
            selectedPageName: page.name,
        }));
        setisOpenListFaceBookSchedule(false);
    };

    const getAllScheduledPosts = async () => {
        if (accountState.selectedPageToken && accountState.selectedPageId && accountState.selectedPageName) {
            try {
                const fbData = await getAllScheduledPostsFacebook(accountState.selectedPageToken, accountState.selectedPageId);

                let igData = [];
                try {
                    igData = await getAllScheduledPostsInstagram(accountState.selectedPageName);
                } catch (error) {
                    console.error("Error while fetching Instagram post:", error);
                }

                const mergedData = [...fbData, ...igData].map(d => ({
                    id: d.id,
                    page: d.platform,
                    time: dayjs(d.scheduled_publish_time * 1000).format('YYYY-MM-DD HH:mm:ss'),
                    caption: d.caption || d.message,
                    imageUrl: d.full_picture || d.imageUrl || "",
                }));

                setScheduledPosts(mergedData);
            } catch (error) {
                console.error("Error while retrieving scheduled post:", error);
            }
        }
    };

    useEffect(() => {
        getAllScheduledPosts();
    }, [accountState.selectedPageToken, accountState.selectedPageId]);

    useEffect(() => {
        if (isDeletedPost || isUpdatedPost) {
            getAllScheduledPosts();
            setIsDeletedPost(false);
            setIsUpdatedPost(false);
        }
    }, [isDeletedPost, isUpdatedPost]);




    const [posts, setPosts] = useState<any[]>([]);

    // lấy ra các content của các bài post đã generate bỏ vào Scheduled AI-post
    useEffect(() => {
        const storedPosts = localStorage.getItem("contentSocialGenerate");

        if (storedPosts) {
            const parsedPosts = JSON.parse(storedPosts);
            const contentPosts = parsedPosts.social_posts.map((content: string, index: number) => ({
                id: index + 1,
                caption: content,
                imgUrl: "",
            }));
            setPosts(contentPosts);
        } else {
            setPosts([]);
        }
    }, []);

    const [isPostListOpen, setIsPostListOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<any>(null);
    const handleOpenPostList = () => setIsPostListOpen(true);
    const handleClosePostList = () => setIsPostListOpen(false);

    const handleSelectPost = (post: any) => {
        setSelectedPost(post);
        setPostState(prevState => ({
            ...prevState, // Giữ nguyên các giá trị khác trong postState
            postMessage: post.caption, // Cập nhật postMessage
        }));
        handleClosePostList();
        handleOpenModalSchedulePost();
        localStorage.removeItem("schedulingPost");
    };
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 3, posts.length - 3));
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 3, 0));
    };
    const pages = useSelector((state: any) => state.userSlice.listSocialPages);
    useEffect(() => {
        if (!pages || pages.length === 0 || !defaultPage) {
            setShowLoginPopup(true);
        } else {
            setShowLoginPopup(false);
        }
    }, [pages, defaultPage]);
    const handleRefetchPages = () => {
        if (defaultPage) {
            setAccountState(prevState => ({
                ...prevState,
                selectedPageToken: defaultPage.access_token,
            }));
            setAccountState(prevState => ({
                ...prevState,
                selectedPageName: defaultPage.name,
            }));
            setAccountState(prevState => ({
                ...prevState,
                selectedPageId: defaultPage.id,
            }));

        }
    };


    const location = useLocation();

    useEffect(() => {
        if (location.state?.openScheduleModal) {
            setIsOpenModalSchedulePost(true);
        }
    }, [location.state]);
    const [isOpenPopupScheduleOption, setIsOpenPopupScheduleOption] = useState(false);

    const handleOpenPopup = () => setIsOpenPopupScheduleOption(true);
    const handleClosePopup = () => setIsOpenPopupScheduleOption(false);

    const handleSelectOption = (option: string) => {
        if (option === "ai") {
            handleOpenPostList();
        } else if (option === "new") {
            handleOpenModalSchedulePost();
        }
        handleClosePopup();
    };



    return (
        <div className="w-full h-max bg-main-bg flex flex-col gap-4 ">
            <PostSelectionModal
                isOpen={isPostListOpen}
                handleClose={handleClosePostList}
                handlePrev={handlePrev}
                handleNext={handleNext}
                handleSelectPost={handleSelectPost}
                currentIndex={currentIndex}
                fakePosts={posts}
            />


            <ScheduleModal
                isOpen={isOpenModalSchedulePost}
                onClose={handleCloseModalSchedulePost}
                selectedPageName={accountState.selectedPageName}
                postState={postState} // Truyền toàn bộ postState
                setPostState={setPostState} // Truyền hàm cập nhật postState
                pages={pages}
                loading={loading}
                handleSchedulePostFacebook={handleSchedulePostFacebook}
                handleSchedulePostInstagram={handleSchedulePostInstagram}
                handleSelectPageFacebookSchedule={handleSelectPageFacebookSchedule}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setAccountState={setAccountState} // Truyền hàm cập nhật postState
                accountState={accountState} // Truyền toàn bộ postState
                handleRefetchPages={handleRefetchPages}
            />


            <div className="w-full flex-col justify-center items-center">

                <div className="bg-white rounded-md mb-2 pb-2">



                    <CalendarHeader

                        handleShowCalendar={handleShowCalendar}
                        onClick={setHandleShowCalendar}
                    />




                    <div className="w-[650px] items-center gap-2 ">
                        <div className="flex items-center gap-2 ">
                            <label className="text-sm font-semibold text-primary-black ml-5 w-auto py-2">Schedule Post</label>


                            <span
                                onClick={handleOpenInstructionModal}
                                className=" text-dashboard-blue/90 font-normal text-sm hover:underline flex gap-1 items-center cursor-pointer"
                            >
                                <FaQuestionCircle className="cursor-pointer " />
                                Learn How to schedule a post
                            </span>
                            <InstructionModalCrudSchedulePost
                                isOpenInstructionModal={isInstructionModalOpen}
                                handleCloseInstructionModal={handleCloseInstructionModal}
                            />
                        </div>
                        <button
                            onClick={() => setIsOpenPopupScheduleOption(true)}
                            className="w-[300px]  ml-3 text-left p-3 bg-primary text-white border  rounded-lg 
               hover:bg-primary/90 flex gap-2 items-center"
                        >
                            <HiPaperAirplane className="w-6 h-6 " /> Click here to schedule post
                        </button>


                    </div>
                    {isOpenPopupScheduleOption && (
                        <div
                            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                            onClick={handleClosePopup}
                        >
                            <div
                                className="bg-white rounded-lg p-8 w-full max-w-4xl relative"
                                onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện click lan ra ngoài
                            >
                                <button
                                    onClick={handleClosePopup}
                                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>

                                <h2 className="text-lg text-primary font-semibold mb-4 text-center">
                                    Which option would you like to choose?
                                </h2>
                                <div className="flex items-center gap-4 justify-center">
                                    <button
                                        onClick={() => handleSelectOption("ai")}
                                        className="w-[360px] h-[200px] text-lg font-semibold px-6 py-4 
                    hover:border-primary hover:bg-primary/5 hover:-translate-y-1 transition-all duration-200 
                    flex flex-col justify-start items-start gap-4 rounded-lg border text-left"
                                    >
                                        <AiOutlineRobot size={40} className="text-primary" />
                                        Schedule AI-Generated Post
                                        <p className="text-sm font-light">
                                            Option to retrieve the AI-generated article content for you
                                        </p>
                                    </button>

                                    <button
                                        onClick={() => handleSelectOption("new")}
                                        className="w-[360px] h-[200px] text-lg font-semibold px-6 py-4 
                    hover:border-primary hover:bg-primary/5 hover:-translate-y-1 transition-all duration-200 
                    flex flex-col justify-start items-start gap-4 rounded-lg border text-left"
                                    >
                                        <IoDocumentTextOutline size={40} className="text-primary" />
                                        Create and Schedule a New Post
                                        <p className="text-sm font-light">
                                            Option to create content in your own way
                                        </p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}



                    {handleShowCalendar === "week" ? (

                        <Calendar
                            scheduleItems={scheduledPosts}
                            pages={pages}
                            handleSelectPageFacebookSchedule={handleSelectPageFacebookSchedule}
                            selectedPageName={accountState.selectedPageName}
                            setSelectedPageName={(name: string) =>
                                setAccountState(prevState => ({
                                    ...prevState,
                                    selectedPageName: name,
                                }))
                            }
                            isOpenListFaceBookSchedule={isOpenListFaceBookSchedule}
                            setisOpenListFaceBookSchedule={setisOpenListFaceBookSchedule}
                            loading={loading}
                            setIsDeletedPost={setIsDeletedPost}
                            setIsUpdatedPost={setIsUpdatedPost}
                            getAllScheduledPosts={getAllScheduledPosts}
                            setSelectedPageToken={(token: string) =>
                                setAccountState(prevState => ({
                                    ...prevState,
                                    selectedPageToken: token,
                                }))
                            }

                            setSelectedPageId={(id: string) =>
                                setAccountState(prevState => ({
                                    ...prevState,
                                    selectedPageId: id,
                                }))
                            }

                        />
                    ) : (
                        <HourlyCalendar
                            scheduleItems={scheduledPosts}
                            pages={pages}
                            handleSelectPageFacebookSchedule={handleSelectPageFacebookSchedule}
                            selectedPageName={accountState.selectedPageName}
                            setSelectedPageName={(name: string) =>
                                setAccountState(prevState => ({
                                    ...prevState,
                                    selectedPageName: name,
                                }))
                            } isOpenListFaceBookSchedule={isOpenListFaceBookSchedule}
                            setisOpenListFaceBookSchedule={setisOpenListFaceBookSchedule}
                            loading={loading}
                            setIsDeletedPost={setIsDeletedPost}
                            setIsUpdatedPost={setIsUpdatedPost}
                            getAllScheduledPosts={getAllScheduledPosts}
                            setSelectedPageId={(id: string) =>
                                setAccountState(prevState => ({
                                    ...prevState,
                                    selectedPageId: id,
                                }))
                            }

                        />
                    )}
                    <TokenExpiredModal isOpen={showLoginPopup}
                        onSubmit={() => navigate("/setting")}
                        onClose={() => setShowLoginPopup(false)}
                    />

                </div>
            </div>
        </div>
    );
};

export default SocialPostScheduler;