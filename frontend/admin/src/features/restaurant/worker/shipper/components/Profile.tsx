import { useState } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { changePassword, getStaffByIdAPI } from "@/features/settings/profile/api/profile";
interface ProfileProps {
    id: number;
}
const Profile: React.FC<ProfileProps> = ({ id }) => {
    const fetchUser = async () => {
        const rs = await getStaffByIdAPI(id);
        return rs?.data.data;
    };
    const { data } = useQuery({
        queryKey: ["user", id],
        queryFn: fetchUser,
    });
    const [resetPassword, setResetPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        isChangePassword: false,
        isErrorOldPassword: false,
        isErrorNewPassword: false,
        isErrorConfirmPassword: false,
        isSamePassword: false,
    });

    const handleChangePassword = async () => {
        const {
            oldPassword,
            newPassword,
            confirmPassword,
            isChangePassword,
            isErrorOldPassword,
        } = resetPassword;

        if (isChangePassword) {
            // Validate password
            if (isErrorOldPassword) {
                setResetPassword((prev) => ({
                    ...prev,
                    isErrorOldPassword: false,
                }));
            }

            if (newPassword !== confirmPassword) {
                setResetPassword((prev) => ({
                    ...prev,
                    isErrorConfirmPassword: true,
                    confirmPassword: "",
                }));
                return;
            } else {
                setResetPassword((prev) => ({
                    ...prev,
                    isErrorConfirmPassword: false,
                }));
            }

            if (
                newPassword.length < 8 ||
                !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(newPassword)
            ) {
                setResetPassword((prev) => ({
                    ...prev,
                    confirmPassword: "",
                    isErrorNewPassword: true,
                }));
                return;
            } else {
                setResetPassword((prev) => ({
                    ...prev,
                    isErrorNewPassword: false,
                }));
            }

            if (oldPassword === newPassword) {
                setResetPassword((prev) => ({
                    ...prev,
                    confirmPassword: "",
                    isSamePassword: true,
                }));
                return;
            } else {
                setResetPassword((prev) => ({
                    ...prev,
                    isSamePassword: false,
                }));
            }

            // Change password
            const rs = await changePassword({
                email: data?.email,
                oldPassword: oldPassword,
                newPassword: newPassword,
            });

            if (rs.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Change password success",
                    showConfirmButton: false,
                    timer: 1000,
                }).then(() => {
                    setResetPassword((prev) => ({
                        ...prev,
                        isChangePassword: false,
                    }));
                });
            } else if (rs.status === 401) {
                setResetPassword((prev) => ({
                    ...prev,
                    isErrorOldPassword: true,
                }));
            }
        } else {
            setResetPassword((prev) => ({ ...prev, isChangePassword: true }));
        }
    };

    return (
        <div className="bg-primary-gray-th1 w-full h-full px-5 pt-[50px] flex flex-col justify-start items-start overflow-y-auto gap-2">
            <div className="w-full justify-start items-start ">
                <span className="text-[25px] font-bold">Your profile</span>
            </div>
            <div className="flex flex-col h-[80%] w-full gap-2 overflow-y-auto scrollbar-hidden ">
                <div className="flex flex-col gap-4 items-center justify-start">
                    <div className="flex items-center gap-2">
                        <img
                            src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                            alt="Profile"
                            className="w-[150px] h-[150px] rounded-full"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Name:</label>
                        <span>{data?.fullName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Phone:</label>
                        <span>{data?.phone}</span>
                    </div>{" "}
                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Email:</label>
                        <span>{data?.email} </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Points:</label>
                        <span>{data?.point}</span>
                    </div>
                    {resetPassword.isChangePassword && (
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex items-center gap-2">
                                <label className="font-semibold">
                                    Current Password:
                                </label>
                                <input
                                    type="password"
                                    className="border rounded-md p-2 w-full"
                                />
                            </div>
                            {resetPassword.isErrorOldPassword && (
                                <span className="text-red-400">
                                    Password is incorrect
                                </span>
                            )}
                            <div className="flex items-center gap-2">
                                <label className="font-semibold">
                                    New Password:
                                </label>
                                <input
                                    type="password"
                                    className="border rounded-md p-2 w-full"
                                />
                            </div>
                            {resetPassword.isErrorNewPassword && (
                                <span className="text-red-400">
                                    Password must be at least 8 characters,
                                    including uppercase, lowercase, and number
                                </span>
                            )}
                            <div className="flex items-center gap-2">
                                <label className="font-semibold">
                                    Confirm New Password:
                                </label>
                                <input
                                    type="password"
                                    className="border rounded-md p-2 w-full"
                                />
                            </div>
                            {resetPassword.isErrorConfirmPassword && (
                                <span className="text-red-400">
                                    Password is not match
                                </span>
                            )}
                            {resetPassword.isSamePassword && (
                                <span className="text-red-400">
                                    New password must be different from old
                                    password
                                </span>
                            )}
                        </div>
                    )}
                    <button
                        onClick={() => handleChangePassword()}
                        className="bg-blue-400 w-2/3 px-5 py-2 text-white hover:bg-blue-200 rounded-md"
                    >
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Profile;
