import { Shipper } from "@/types/shipper";
import { getShipperById } from "../api/shipper";

export const getShipper = async (id: string): Promise<Shipper> => {
    const rs = await getShipperById(id);
    return rs?.data;
};

export const fetchShipperInformation = async (id: string) => {
    const rs = await getShipperById(id);
    return rs?.data;
};
