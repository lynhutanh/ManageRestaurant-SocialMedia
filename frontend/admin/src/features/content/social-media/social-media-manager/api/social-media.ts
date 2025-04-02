import axios from 'axios';
import { VITE_API_GENERATE } from '@/config';
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




export const fetchContent = async (blogUrl: string): Promise<{ url: string, content: string }[]> => {
    try {
        const response = await axios.get(`${VITE_API_GENERATE}/ai/crawl-content`, {
            params: { blog_url: blogUrl },
        });

        if (Array.isArray(response.data)) {
            return response.data.map((item: any) => ({
                url: item.url,
                content: item.content,
            }));
        } else {
            throw new Error("Invalid data returned from API");
        }
    } catch (error) {
        console.error('Error fetching content:', error);
        return [];
    }
};

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

export const fetchPagePosts = async (pageToken: string, pageId: string) => {
    try {
        const response = await axios.get(`https://graph.facebook.com/v21.0/${pageId}/posts`, {
            params: {
                fields: 'id,message,full_picture,permalink_url,created_time',
                limit: 10,
                access_token: pageToken,
            },
        });
        return response.data.data.map((post: any) => ({
            id: post.id,
            content: post.message,
            url: post.permalink_url, // Sử dụng permalink_url trực tiếp từ API
            tag: "Facebook", // Thay đổi platform thành tag

        }));
    } catch (error: any) {
        throw new Error(`Error fetching posts: ${error.message}`);
    }
};











//Instagram
export const fetchInstagramAccounts = async (pageId: string, accessToken: string) => {
    try {
        const response = await fetch(
            `https://graph.facebook.com/v21.0/${pageId}?fields=instagram_business_account{id,name}&access_token=${accessToken}`
        );
        const data = await response.json();

        if (data.instagram_business_account) {
            return [data.instagram_business_account]; // Return Instagram accounts
        } else {
            throw new Error('No linked Instagram Business Account found.');
        }
    } catch (err: any) {
        throw new Error(`Error fetching Instagram account: ${err.message}`);
    }
};

export const fetchPosts = async (instagramAccountId: string, accessToken: string) => {
    try {
        const response = await fetch(
            `https://graph.facebook.com/v21.0/${instagramAccountId}/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`
        );
        const data = await response.json();

        if (data.data) {
            return data.data.slice(0, 10).map((post: any) => ({
                id: post.id,
                tag: "Instagram", // Thay đổi platform thành tag
                content: post.caption, // Lấy caption cho Instagram
                url: post.permalink, // Lấy permalink cho Instagram
            }));
        } else {
            throw new Error('No posts found for the Instagram account.');
        }
    } catch (err: any) {
        throw new Error(`Error fetching posts: ${err.message}`);
    }
};



// Hàm xử lý lấy tài khoản Instagram Business

export const fetchInstagramData = async (
    pageId: string,
    accessToken: string,
    instagramAccounts: any[], // Không còn sử dụng state
    displayedFacebookAndBlog: any[],
    toast: any,
) => {
    // Tìm tài khoản Instagram có sẵn
    const existingAccount = instagramAccounts.find((account) => account.pageId === pageId);

    if (existingAccount) {
        const instagramAccountId = existingAccount.instagramAccountId;
        const data = await fetchPosts(instagramAccountId);
        return data;
    }

    try {
        // Lấy Instagram Account ID
        const response = await axios.get(
            `https://graph.facebook.com/v21.0/${pageId}?fields=instagram_business_account&access_token=${accessToken}`
        );
        const instagramAccountId = response.data.instagram_business_account?.id;

        if (instagramAccountId) {
            instagramAccounts.push({ pageId, instagramAccountId }); // Cập nhật trực tiếp
            localStorage.setItem('instagramAccounts', JSON.stringify(instagramAccounts)); // Đồng bộ với localStorage

            const data = await fetchPosts(instagramAccountId);
            return data;
        } else {
            toast.error("No Instagram Business Account linked to this page!", { autoClose: 2000 });
        }
    } catch (err) {
        console.error("Error fetching Instagram Business Account", err);
        return [];
    }

    async function fetchPosts(instagramAccountId: string) {
        const existingPosts = displayedFacebookAndBlog.filter(
            (post) => post.tag === "instagram" && post.instagramAccountId === instagramAccountId
        );

        if (existingPosts.length > 0) {
            toast.success("Loading successful !", { autoClose: 1000 });
            return existingPosts;
        }

        try {
            const response = await axios.get(
                `https://graph.facebook.com/v21.0/${instagramAccountId}/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`
            );
            const postsData = response.data.data;

            if (postsData.length > 0) {
                const taggedPosts = postsData.map((post: any) => ({
                    id: post.id,
                    tag: "Instagram",
                    content: post.caption,
                    url: post.permalink,
                    instagramAccountId,
                }));

                const data = [...displayedFacebookAndBlog, ...taggedPosts.slice(0, 10)];

                toast.success("Posts fetched successfully.", { autoClose: 1000 });
                return data.map((d: ISocialMedia) => ({
                    id: d.id,
                    tag: d.tag,
                    content: d.content, // Dùng caption cho Instagram, message cho Facebook
                    url: d.url,
                }));
            }
        } catch (err) {
            console.error("Error fetching posts", err);
            return [];
        }
    }
};

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
