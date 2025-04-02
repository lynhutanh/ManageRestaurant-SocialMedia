import React, { useState, useEffect } from "react";
import { LiaEdit } from "react-icons/lia";
import PopupEditNewContent from "../ai-create-post/components/PopupEditNewContent";

interface ListCreatedWebpagesProps { }

const ListCreatedWebpages: React.FC<ListCreatedWebpagesProps> = () => {
    const [selectedPostIndex, setSelectedPostIndex] = useState<number>(0);
    const [listBlogPostsCreated, setListBlogPostsCreated] = useState<string[]>([]);
    const [expandedPosts, setExpandedPosts] = useState<Record<number, boolean>>({});
    const [socialPlatform, setSocialPlatform] = useState<string>("");
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [editingContent, setEditingContent] = useState<string>("")


    useEffect(() => {
        const storedData = localStorage.getItem("contentSocialGenerate");
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                if (parsedData?.social_posts && Array.isArray(parsedData.social_posts)) {
                    setListBlogPostsCreated(parsedData.social_posts);
                }
                if (parsedData?.social_platform) {
                    setSocialPlatform(parsedData.social_platform);
                }
            } catch (error) {
                console.error("Error parsing contentSocialGenerate from localStorage:", error);
            }
        }
    }, []);

    const handleEditGeneratePost = (postIndex: number) => {
        setSelectedPostIndex(postIndex);
        setEditingContent(listBlogPostsCreated[postIndex]);
        setIsPopupOpen(true); // Mở popup
    };

    const handleSaveEditedContent = () => {
        const updatedPosts = [...listBlogPostsCreated];
        updatedPosts[selectedPostIndex] = editingContent;
        setListBlogPostsCreated(updatedPosts);
        localStorage.setItem("contentSocialGenerate", JSON.stringify({ social_posts: updatedPosts, social_platform: socialPlatform }));
        setIsPopupOpen(false);
    };


    const toggleExpand = (index: number) => {
        setExpandedPosts((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    if (listBlogPostsCreated.length === 0) {
        return <p className="text-gray-500">No content available.</p>;
    }

    return (
        <div className="col-span-full w-full h-max bg-white rounded-md p-4 ">
            <h1 className="text-xl font-semibold text-primary mb-2">
                List of AI Created {socialPlatform.charAt(0).toUpperCase() + socialPlatform.slice(1).toLowerCase()} Posts
            </h1>
            <hr className="w-full" />

            <div className="h-max max-h-[400px] overflow-y-scroll mt-4">
                {listBlogPostsCreated.map((content, index) => {
                    const isExpanded = expandedPosts[index];
                    const shortContent = content.length > 100 ? content.substring(0, 100) + "..." : content;

                    return (
                        <div
                            className="flex justify-between items-center p-4 border rounded-md mb-4"
                            key={index}
                        >
                            <div>
                                <span className="font-semibold mr-1">Content:</span>
                                <span dangerouslySetInnerHTML={{ __html: isExpanded ? content.replace(/\n/g, "<br />") : shortContent.replace(/\n/g, "<br />") }} />
                                {content.length > 100 && (
                                    <button
                                        className="text-blue-500 ml-2"
                                        onClick={() => toggleExpand(index)}
                                    >
                                        {isExpanded ? "Thu gọn" : "Xem thêm"}
                                    </button>
                                )}
                            </div>
                            <div className="flex items-center gap-1 h-8">
                                <div
                                    className="text-[15px] cursor-pointer text-dashboard-blue bg-dashboard-blue/15 hover:bg-dashboard-blue/25 px-2 rounded-md flex flex-row items-center h-full"
                                    title="Edit Post"
                                    onClick={() => handleEditGeneratePost(index)}
                                >
                                    <LiaEdit className="size-7" />
                                </div>
                            </div>
                        </div>
                    );
                })}
                <PopupEditNewContent
                    isOpenEditContent={isPopupOpen}
                    closeEditContent={() => setIsPopupOpen(false)}
                    editingContent={editingContent}
                    setEditingContent={setEditingContent}
                    saveEditedContent={handleSaveEditedContent}
                />

            </div>

        </div>

    );
};

export default ListCreatedWebpages;
