import { useQuery } from "@tanstack/react-query";
import { IUserIp } from "@/types/user";
import { VITE_IP_INFO_ACCESS_TOKEN } from "@/config";

const fetchIp = async () => {
    try {
        const response = await fetch(
            `https://ipinfo.io/json?token=${VITE_IP_INFO_ACCESS_TOKEN}`
        );
        const data = await response.json();
        return data as IUserIp;
    } catch (error) {
        console.error("Error fetching IP address:", error);
    }
};

const useGetIp = () => {
    const { data } = useQuery({
        queryKey: ["userIp"],
        queryFn: fetchIp,
    });

    return { data };
};

export default useGetIp;
