
export default interface INotification {
    nof_id?: number;
    title: string;
    content: string;
    isRead?: boolean;
    type:string,
    link: string,
    time?: string | Date;
}
