import axios from "axios";
import { VITE_API_GENERATE } from "@/config";
import { GenerateSchedulePlanRequest, GeneratePostRequestMarketingPlan, GeneratePostRequest, GeneratePostResponse, GenerateMarketingPlanResponse, GenerateSchedulePlanResponse } from "../types/data";


export const generateCourse = async (data: unknown) => {
    const response = await axios.post('/api/openai/genCourse',
        data
    );
    const course = await response.data.course;
    return course;
};



export const generateAISchedulePlan = async (data: GenerateSchedulePlanRequest): Promise<GenerateSchedulePlanResponse> => {
    try {
        const response = await axios.post<GenerateSchedulePlanResponse>(`${VITE_API_GENERATE}/posts`, data);
        return response.data;
    } catch (error) {
        console.error("Error generating AI posts:", error);
        throw error;
    }
};

export const generateAIMarketingPlan = async (data: GeneratePostRequestMarketingPlan): Promise<GenerateMarketingPlanResponse> => {
    try {
        const response = await axios.post<GenerateMarketingPlanResponse>(`${VITE_API_GENERATE}/marketing_plan`, data);
        return response.data;
    } catch (error) {
        console.error("Error generating AI posts:", error);
        throw error;
    }
};
// Hàm gọi API với kiểu dữ liệu rõ ràng
export const generateAIPosts = async (data: GeneratePostRequest): Promise<GeneratePostResponse> => {
    try {
        const response = await axios.post<GeneratePostResponse>(`${VITE_API_GENERATE}/ai/posts`, data);
        return response.data;
    } catch (error) {
        console.error("Error generating AI posts:", error);
        throw error;
    }
};



export const fetchPagePosts = async (pageToken: string, pageId: string) => {
    try {
        const response = await axios.get(`https://graph.facebook.com/v21.0/${pageId}/posts`, {
            params: {
                fields: 'id,message,full_picture,permalink_url,created_time',
                limit: 5,
                access_token: pageToken,
            },
        });
        return response.data.data.map((post: any) => ({
            id: post.id,
            content: post.message,
            url: post.permalink_url,
            tag: "Facebook", // Thay đổi platform thành tag

        }));
    } catch (error: any) {
        throw new Error(`Error fetching posts: ${error.message}`);
    }
};
