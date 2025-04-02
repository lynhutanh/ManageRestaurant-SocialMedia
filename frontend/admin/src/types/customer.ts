export interface ICustomer {
    user_id: number;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    status?: number;
    about?: string;
    image?: string;
    age?: number;
}