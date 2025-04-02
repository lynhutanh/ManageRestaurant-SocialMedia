export interface IAffiliateUser {
    id: number;
    name: string;
    links: number;
    clicks: number;
    conversionRate: number;
    revenue: number;
    commission: number;
    region?:string;
}

export interface ILinkTable {
    id: number;
    link: string;
    clicks: number;
    conversionRate: number;
    revenue: number;
    commission: number;
}

export interface Tab {
    id: number;
    label: string;
}
