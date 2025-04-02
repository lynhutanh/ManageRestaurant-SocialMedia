import { permissions } from "../../constants/permissions";

export const permissionRole = (role: string) => {
    switch (role) {
        case "admin":
            return [
                permissions[0],
                permissions[1],
                permissions[2],
                permissions[3],
                permissions[4],
                permissions[5],
                permissions[6],
                permissions[7],
                permissions[8],
                permissions[9],
                permissions[10],
            ];
        case "cashier":
            return [
                permissions[5],
                permissions[6],
                permissions[9],
                permissions[8],
                permissions[10],
            ];
        case "chef":
            return [permissions[0], permissions[7], permissions[10]];

        default:
            return [];
    }
};
