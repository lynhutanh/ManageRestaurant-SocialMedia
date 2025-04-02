import axios from 'axios';

interface ISocialMedia {
    id: string,
    tag: string,
    content: string,
    permalink_url: string
    platform: string,
    message: string,
    permalink: string
    caption?: string;
    url: string

}



export const fetchPages = async (userToken: string) => {
    try {
        const response = await axios.get('https://graph.facebook.com/v21.0/me/accounts', {
            params: { access_token: userToken },
        });


        const pages = response.data.data;

        if (!pages || pages.length === 0) {
            return [];
        }



        return pages;
    } catch (error: any) {
        throw new Error(`Error fetching pages: ${error.message}`);
    }
};







//Post_Schedule

export const schedulePostFacebook = async (
    pageToken: string,
    pageId: string,
    message: string,
    imageUrl: string | null, // imageUrl có thể là null hoặc string
    scheduledTime: number // Unix Timestamp
) => {
    try {
        let photoId: string | null = null;

        // 1. Tải ảnh lên Facebook nếu imageUrl tồn tại
        if (imageUrl) {
            const uploadResponse = await axios.post(
                `https://graph.facebook.com/v21.0/${pageId}/photos`,
                {
                    url: imageUrl,
                    published: false,
                    access_token: pageToken,
                }
            );

            photoId = uploadResponse.data.id;
        }

        // 2. Đặt lịch bài viết
        const postData: any = {
            message: message,
            published: false, // Không đăng ngay
            scheduled_publish_time: scheduledTime, // Thời gian lên lịch
            access_token: pageToken,
        };

        // Nếu có ảnh, đính kèm ảnh vào bài viết
        if (photoId) {
            postData.attached_media = [{ media_fbid: photoId }];
        }

        const postResponse = await axios.post(
            `https://graph.facebook.com/v21.0/${pageId}/feed`,
            postData
        );

        return postResponse.data;
    } catch (error: any) {
        throw new Error(`Error scheduling post: ${error.message}`);
    }
};

export const deleteScheduledPostFacebook = async (
    pageToken: string,
    postId: string
) => {
    try {
        const deleteResponse = await axios.delete(
            `https://graph.facebook.com/v21.0/${postId}`,
            {
                params: {
                    access_token: pageToken,
                },
            }
        );

        return deleteResponse.data;
    } catch (error: any) {
        throw new Error(`Error deleting scheduled post: ${error.message}`);
    }
};

export const getScheduledPostFacebook = async (
    pageToken: string,
    postId: string
) => {
    try {
        const response = await axios.get(
            `https://graph.facebook.com/v21.0/${postId}`,
            {
                params: {
                    fields: "id,message,scheduled_publish_time,created_time,status_type",
                    access_token: pageToken,
                },
            }
        );

        return response.data;
    } catch (error: any) {
        throw new Error(`Error fetching scheduled post: ${error.message}`);
    }
};

export const getAllScheduledPostsFacebook = async (
    pageToken: string,
    pageId: string
) => {
    try {
        const response = await axios.get(
            `https://graph.facebook.com/v21.0/${pageId}/scheduled_posts`,
            {
                params: {
                    fields: "id,message,scheduled_publish_time,created_time,status_type,full_picture",
                    access_token: pageToken,
                },
            }
        );

        type Post = {
            id: string;
            message?: string;
            scheduled_publish_time?: number;
            created_time?: string;
            status_type?: string;
            full_picture?: string;
            platform: string;
        };

        const postDetails = await Promise.all(
            response.data.data.map(async (post: Post) => {
                const details = await getScheduledPostFacebook(pageToken, post.id);
                return {
                    ...details,
                    full_picture: post.full_picture || "",
                    platform: "Facebook",
                };
            })
        );


        return postDetails;
    } catch (error: any) {
        throw new Error(`Error fetching all scheduled posts: ${error.message}`);
    }
};




export const editScheduledPostFacebook = async (
    pageToken: string,
    postId: string,
    newMessage: string,
    newScheduledTime: Date
) => {
    try {
        const editResponse = await axios.post(
            `https://graph.facebook.com/v21.0/${postId}`,
            {
                message: newMessage,
                scheduled_publish_time: Math.floor(newScheduledTime.getTime() / 1000),
                access_token: pageToken,
            }
        );

        return editResponse.data;
    } catch (error: any) {
        console.error("Error response:", error.response?.data || error.message);
        throw new Error(`Error editing scheduled post: ${error.message}`);
    }
};











// Hàm xử lý lấy tài khoản Instagram Business

//Hàm lấy tai khoan instagram bussiness
export const fetchInstagramBusinessId = async (pageId: string, accessToken: string) => {
    try {
        const response = await axios.get(
            `https://graph.facebook.com/v21.0/${pageId}?fields=instagram_business_account&access_token=${accessToken}`
        );

        const instagramBusinessId = response.data.instagram_business_account?.id;
        return instagramBusinessId || null;
    } catch (error) {
        console.error("Error fetching Instagram Business Account ID:", error);
        return null;
    }
};
export const schedulePostInstagram = async (
    accessToken: string,
    igBusinessId: string,
    caption: string,
    imageUrl: string,
    scheduledTime: number,
    pageName: string
) => {
    try {
        const response = await axios.post("http://localhost:5000/schedule-post", {
            igBusinessId,
            accessToken,
            caption,
            imageUrl,
            scheduledTime,
            pageName
        });

        return response.data;
    } catch (error: any) {
        throw new Error(`Lỗi khi lên lịch bài đăng: ${error.message}`);
    }
};


export const getAllScheduledPostsInstagram = async (pageName: string) => {
    try {
        const response = await axios.get("http://localhost:5000/scheduled-posts");

        response.data.forEach((post: any) => {
        });

        const filteredPosts = response.data.filter((post: any) =>
            String(post.pageName).trim().toLowerCase() === String(pageName).trim().toLowerCase()
        );

        return filteredPosts;
    } catch (error: any) {
        throw new Error(`Lỗi khi lấy danh sách bài đăng Instagram: ${error.message}`);
    }
};


export const deleteScheduledPostInstagram = async (postId: string, pageName: string) => {
    try {
        // Xóa bài đăng
        const response = await axios.delete(`http://localhost:5000/posts/${postId}`);

        // Kiểm tra lại danh sách bài đăng sau khi xóa
        const updatedPosts = await getAllScheduledPostsInstagram(pageName);

        return {
            success: true,
            message: "Bài đăng đã được xóa thành công.",
            updatedPosts
        };
    } catch (error: any) {
        throw new Error(error.response?.data?.error || error.message);
    }
};


export const editScheduledPostInstagram = async (
    postId: string,
    caption: string,
    scheduledTime: number,
    imageUrl?: string
) => {
    try {
        if (!scheduledTime || isNaN(scheduledTime)) {
            throw new Error("scheduledTime không hợp lệ");
        }

        const response = await axios.put(
            `http://localhost:5000/posts/${postId}`,
            { caption, scheduledTime, imageUrl },
            { headers: { "Content-Type": "application/json" } }
        );

        return response.data;
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "Lỗi không xác định";
        throw new Error(`Lỗi khi cập nhật bài đăng Instagram: ${errorMessage}`);
    }
};

export const getAllScheduledPosts = async (
    pageToken: string,
    pageId: string,
    pageName: string
) => {
    try {
        // Fetch Facebook scheduled posts
        const fbResponse = await axios.get(
            `https://graph.facebook.com/v21.0/${pageId}/scheduled_posts`,
            {
                params: {
                    fields: "id,message,scheduled_publish_time,created_time,status_type,full_picture",
                    access_token: pageToken,
                },
            }
        );

        const fbPosts = await Promise.all(
            fbResponse.data.data.map(async (post: any) => {
                const details = await getScheduledPostFacebook(pageToken, post.id);
                return {
                    ...details,
                    full_picture: post.full_picture || "",
                    platform: "Facebook",
                };
            })
        );

        // Fetch Instagram scheduled posts
        const igResponse = await axios.get("http://localhost:5000/scheduled-posts");
        const igPosts = igResponse.data.filter((post: any) =>
            String(post.pageName).trim().toLowerCase() === String(pageName).trim().toLowerCase()
        ).map((post: any) => ({ ...post, platform: "Instagram" }));

        // Merge both platform posts
        return [...fbPosts, ...igPosts];
    } catch (error: any) {
        throw new Error(`Lỗi khi lấy danh sách bài đăng: ${error.message}`);
    }
};