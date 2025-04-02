export interface IShift {
    _id: string;
    staffId: string;
    staffName: string;
    start: Date;
    end: Date;
    title: string; 
}

export interface IStaff {
    user_id: string;
    fullName: string;
}
