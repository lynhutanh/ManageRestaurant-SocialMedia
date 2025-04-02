import React from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { images } from "@/assets/assets";
import { useNavigate } from "react-router-dom";

interface PostSelectionModalProps {
    isOpen: boolean;
    handleClose: () => void;
    handlePrev: () => void;
    handleNext: () => void;
    handleSelectPost: (post: { id: number; caption: string; imgUrl?: string }) => void;
    currentIndex: number;
    fakePosts: { id: number; caption: string; imgUrl?: string }[];
}

const PostSelectionModal: React.FC<PostSelectionModalProps> = ({
    isOpen,
    handleClose,
    handlePrev,
    handleNext,
    handleSelectPost,
    currentIndex,
    fakePosts
}) => {
    if (!isOpen) return null;

    // Hình ảnh mặc định
    const defaultImageUrl = images.defaultImage
    const navigate = useNavigate();
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-1/2 relative">
                <h2 className="text-lg text-primary font-semibold mb-4 text-center">Select a post</h2>

                <div className="relative flex items-center">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className={`absolute left-2 top-1/2 transform -translate-y-1/2 
                            ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "bg-white text-primary "}`}
                    >
                        <GrPrevious size={30} className="font-bold" />
                    </button>

                    <div className="grid grid-cols-3 gap-4 w-full mx-10">
                        {fakePosts.length === 0 ? (
                            <p className="text-gray-500 text-center col-span-3">
                                There are no AI-generated posts yet.Go to the{" "}
                                <span
                                    className="text-dashboard-blue cursor-pointer hover:underline"
                                    onClick={() => navigate("/ai_content_creation")}
                                >
                                    AI Generate Post page to create. </span>{" "}

                            </p>
                        ) : (
                            fakePosts.slice(currentIndex, currentIndex + 3).map((post) => (
                                <div
                                    key={post.id}
                                    className="cursor-pointer border p-4 rounded-lg hover:bg-gray-100"
                                    onClick={() => handleSelectPost(post)}
                                >
                                    <img
                                        src={post.imgUrl || defaultImageUrl}
                                        alt="Post"
                                        className="w-full h-32 object-cover mb-2"
                                    />
                                    <p className="text-sm line-clamp-2 overflow-hidden">
                                        {post.caption}
                                    </p>
                                    {post.caption.length > 10 && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSelectPost(post);
                                            }}
                                            className="text-blue-500 text-xs mt-1 underline"
                                        >
                                            Xem thêm
                                        </button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>


                    <button
                        onClick={handleNext}
                        disabled={currentIndex + 3 >= fakePosts.length}
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 
                            ${currentIndex + 3 >= fakePosts.length ? "opacity-50 cursor-not-allowed" : "bg-white text-primary "}`}
                    >
                        <GrNext size={30} className="font-bold" />
                    </button>
                </div>
                <div className="flex justify-end">
                    <PrimaryButton
                        onClick={handleClose}
                        className={` mt-2 border-2 border-dashboard-blue text-dashboard-blue rounded-md hover:bg-dashboard-blue/80 hover:text-white `}
                        label="Close"
                    />
                </div>
            </div>
        </div>
    );
};

export default PostSelectionModal;