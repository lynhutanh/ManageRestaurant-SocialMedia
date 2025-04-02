export interface IScheduleItem {
    id: string;
    social_id: string;
    page: string;
    time: Date;
    caption: string;
    url: string;
    image_id?: string;
    status?: boolean;
}
