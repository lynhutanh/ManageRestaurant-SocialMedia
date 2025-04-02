
export interface IOrder {
    order_id: string;
    user_id: string;
    delivery_time?: string;
    status: string;
    total_price: number;
    create_at: string;
    message?: string;
    
}

export interface IOrderItem {
    order_id: string;
    item_id: string;
    quantity: number;
    price: number;
    title:string;
    image:string;
}