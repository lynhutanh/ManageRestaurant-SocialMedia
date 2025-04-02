import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import {
    fetchPagePosts,
    fetchInstagramData,
    fetchContent,
} from "./api/social-media";
import {
    setAccessToken,
    getAccessToken,
} from "../../../../utils/auth/handleCookies";
import { useSelector } from "react-redux";
import { icons } from "../../../../assets/assets";
import GetListPostSocialMedia from "./components/GetListPostSocialMedia/GetListPostSocialMedia";
import PopupListPostSocialMedia from "./components/GetListPostSocialMedia/PopupListPostSocialMedia";
import PopupInputBlogUrl from "./components/GetListPostSocialMedia/PopupInputBlogUrl";
import TableListPostSocialMedia from "./components/GetListPostSocialMedia/TableListPostSocialMedia";
import { useNavigate } from "react-router-dom";
interface ISocialMedia {
    id: string;
    tag: string;
    url: string;
    content: string;
}

const SocialMediaManager: React.FC = () => {
    const [accessToken, setAccessTokenState] = useState<string>(
        () => getAccessToken() || ""
    );
    const { listSocialPages } = useSelector((state: any) => state.userSlice);


    const navigate = useNavigate();
    useEffect(() => {
        if (listSocialPages.length === 0) {
            toast.warning("Please login first!", { autoClose: 1500 });
            navigate("/setting");
        }
    }, [listSocialPages, navigate]);

    const instagramAccounts = JSON.parse(
        localStorage.getItem("instagramAccounts") || "[]"
    );
    const [selectedPages, setSelectedPages] = useState<{
        currentFbPage: { pageId: string; pageName: string };
        currentInstaPage: { pageId: string; pageName: string };
    }>({
        currentFbPage: { pageId: "", pageName: "" },
        currentInstaPage: { pageId: "", pageName: "" },
    });
    const [dataTable, setDataTable] = useState<ISocialMedia[]>(() =>
        JSON.parse(localStorage.getItem("dataTable") || "[]")
    );
    const [blogUrl, setBlogUrl] = useState<string>("");
    const [isPopupOpenPreViewContent, setIsPopupOpenPreViewContent] =
        useState(false);
    const [popupContent, setPopupContent] = useState("");
    const handleViewContent = (content: string) => {
        setPopupContent(content);
        setIsPopupOpenPreViewContent(true);
    };

    const closePopup = () => {
        setIsPopupOpenPreViewContent(false);
    };

    useEffect(() => {
        const storedToken = getAccessToken();
        if (storedToken) {
            setAccessTokenState(storedToken);
        }
    }, []);

    useEffect(() => {
        setAccessToken(accessToken);
        localStorage.setItem(
            "instagramAccounts",
            JSON.stringify(instagramAccounts)
        );
        localStorage.setItem("dataTable", JSON.stringify(dataTable));
    }, [listSocialPages, accessToken, instagramAccounts, dataTable]);




    const handleFetchPagePostsFacebook = async (
        pageToken: string,
        pageId: string
    ) => {
        try {
            const postsData = await fetchPagePosts(pageToken, pageId);

            if (postsData && postsData.length > 0) {
                const filteredPosts: ISocialMedia[] = postsData
                    .slice(0, 10)
                    .map((post: ISocialMedia) => ({
                        ...post,
                    }));
                setDataTable((prevPosts) => [
                    ...prevPosts.filter((post) => post.tag !== "Facebook"),
                    ...filteredPosts,
                ]);

                toast.success("Posts fetched successfully.", {
                    autoClose: 1000,
                });
            } else {
                setDataTable((prevPosts) =>
                    prevPosts.filter((post) => post.tag !== "Facebook")
                );
                toast.warning("No posts found for this page.", {
                    autoClose: 1000,
                });
            }
        } catch (err: any) {
            toast.error("Failed to fetch posts. Please try again.", {
                autoClose: 1000,
            });
        }
    };

    const handleSelectPage = (page: any) => {
        handleFetchPagePostsFacebook(page.access_token, page.id);
        setSelectedPages((prevState) => ({
            ...prevState,
            currentFbPage: { pageId: page.id, pageName: page.name },
        }));
        setDataTable((prevPosts) =>
            prevPosts.filter((post) => post.tag !== "Facebook")
        );
        setIsPopupOpenListPageFaceBook(false);
    };


    //INSTAGRAM

    useEffect(() => {
        localStorage.setItem("dataTable", JSON.stringify(dataTable));
    }, [dataTable]);

    const handleSelectPageForInstagram = async (
        page: any,
        account?: { instagramAccountId: string; pageId: string }
    ) => {
        try {
            const displayedFacebookAndBlog = dataTable.filter(
                (d) => d.tag === "Facebook" || d.tag === "Blog"
            );
            const fetchPostsInstagram = await fetchInstagramData(
                page.id,
                accessToken,
                instagramAccounts,
                displayedFacebookAndBlog,
                toast
            );
            setSelectedPages((prevState) => ({
                ...prevState,
                currentInstaPage: { pageId: page.id, pageName: page.name },
            }));
            fetchPostsInstagram && setDataTable(fetchPostsInstagram);
            setIsPopupOpenListPageInstagram(false);
        } catch (err) {
        }
    };

    const [isPopupOpenListPageFacebook, setIsPopupOpenListPageFaceBook] =
        useState<boolean>(false);

    const handleTogglePopupListPageFacebook = () => {
        setIsPopupOpenListPageFaceBook((prev) => !prev);
    };

    const [isPopupOpenListPageInstagram, setIsPopupOpenListPageInstagram] =
        useState<boolean>(false);

    const handleTogglePopupListPageInstagram = () => {
        setIsPopupOpenListPageInstagram((prev) => !prev);
    };

    const [isPopupOpenListPageBlogInput, setIsPopupOpenListPageBlogInput] =
        useState<boolean>(false);

    const handleTogglePopupListBlogInput = () => {
        setIsPopupOpenListPageBlogInput((prev) => !prev);
    };

    const handleSubmitBlogUrl = async () => {
        try {
            const newBlogPosts = await fetchContent(blogUrl);

            const formattedBlogPosts = newBlogPosts.map(
                (post: any, index: number) => ({
                    id: `${index + 1}`,
                    tag: "Blog",
                    content: post.content,
                    url: post.url,
                })
            );

            setDataTable((prevPosts) => [
                ...prevPosts.filter((post) => post.tag !== "Blog"),
                ...formattedBlogPosts,
            ]);

            setIsPopupOpenListPageBlogInput(false);
        } catch (error) {
            console.error("Error fetching blog posts:", error);
        }
    };


    return (
        <div className="w-full h-max bg-main-bg flex flex-col gap-4">


            <div className="w-full  flex flex-col justify-center items-center ">

                <div className="w-full h-full bg-white rounded-md p-5">
                    <span className="text-xl font-semibold text-primary">
                        Get List Post Social Media
                    </span>
                    <hr className="w-full my-2" />

                    <GetListPostSocialMedia
                        handleTogglePopupListPageFacebook={
                            handleTogglePopupListPageFacebook
                        }
                        handleTogglePopupListPageInstagram={
                            handleTogglePopupListPageInstagram
                        }
                        handleTogglePopupListBlogInput={
                            handleTogglePopupListBlogInput
                        }
                    />

                    {isPopupOpenListPageFacebook && (
                        <PopupListPostSocialMedia
                            handleTogglePopup={
                                handleTogglePopupListPageFacebook
                            }
                            selectedPages={selectedPages}
                            pages={listSocialPages}
                            handleSelectPage={handleSelectPage}
                        />
                    )}
                    {isPopupOpenListPageInstagram && (
                        <PopupListPostSocialMedia
                            handleTogglePopup={
                                handleTogglePopupListPageInstagram
                            }
                            selectedPages={selectedPages}
                            pages={listSocialPages}
                            handleSelectPage={handleSelectPageForInstagram}
                        />
                    )}

                    {isPopupOpenListPageBlogInput && (
                        <PopupInputBlogUrl
                            handleTogglePopupListBlogInput={
                                handleTogglePopupListBlogInput
                            }
                            blogUrl={blogUrl}
                            setBlogUrl={setBlogUrl}
                            handleSubmitBlogUrl={handleSubmitBlogUrl}
                        />
                    )}

                    {dataTable.length > 0 && (
                        <TableListPostSocialMedia
                            dataTable={dataTable}
                            icons={icons}
                            handleViewContent={handleViewContent}
                        />
                    )}

                    {isPopupOpenPreViewContent && (
                        <div
                            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                            onClick={closePopup}
                        >
                            <div
                                className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg max-h-[80vh] overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h3 className="text-lg font-semibold mb-4">
                                    Preview Content
                                </h3>
                                <p className="text-gray-700">
                                    {popupContent}
                                </p>
                                <div className="mt-6 text-right">
                                    <button
                                        onClick={closePopup}
                                        className="px-4 py-2 bg-primary-button text-white rounded hover:bg-blue-600"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

};
export default SocialMediaManager;
