import PrimaryButton from "@components/buttons/PrimaryButton";
import InputField from "@components/textfields/InputField";
import { useState } from "react";
import { toast } from 'react-toastify';
import { IUserProfile } from "..";
import { useSelector } from "react-redux";
import { changePassword, editUserAPI } from "../api/profile";

interface ProfileContentProps {
    user: {
        name: string;
        email: string;
        phone: string;
        image: string;
        oldPassword: string;
        newPassword: string;
        confirmPassword: string;
    };

    setUser?: (user: IUserProfile) => void;
    selectedImage?: any;
    setSelectedImage: (file: any) => void;
    handleValidation?: () => void;
}


const ProfileContent = (props: ProfileContentProps) => {
    const { user, setUser, handleValidation } = props;
    const [isEditProfile, setIsEditProfile] = useState(false);
    const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);
    const { id } = useSelector((state: any) => state.userSlice);

    const handleEdit = async () => {
        if (!isEditProfile) {
            setIsEditProfile(true);
            return;
        }

        if (handleValidation) {
            handleValidation();
        }

        try {
            const data = {
                user_id: id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            };

            const response = await editUserAPI(data);

            if (response.status === 200) {
                toast.success("Edit successfully!");
                setIsEditProfile(false);

                // Cập nhật user nếu cần
                if (setUser) {
                    setUser(response.data);
                }
            } else {
                toast.error("Edit failed!");
            }
        } catch (error) {
            toast.error("An error occurred while editing.");
        }
    };
    const handleChangePassword = async () => {
        const { oldPassword, newPassword, confirmPassword } = user;

        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error("Please fill in all fields!");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match!");
            return;
        }

        try {
            const response = await changePassword({
                email: user.email,
                oldPassword,
                newPassword,
            });

            if (response?.status === 200) {
                setShowChangePasswordPopup(false);
                toast.success("Password changed successfully!");
            } else {
                const errorMessage = response?.data?.message;
                if (errorMessage?.includes("incorrect old password")) {
                    toast.error("Incorrect old password!");
                } else {
                    toast.error(errorMessage || "Incorrect old password.");
                }
            }
        } catch (error: any) {
            // Xử lý lỗi kết nối hoặc lỗi không mong muốn
            const errorMessage = error?.response?.data?.message;
            if (errorMessage?.includes("incorrect old password")) {
                toast.error("Mật khẩu cũ không đúng!");
            } else {
                toast.error(errorMessage || "An error occurred while changing the password.");
            }
        }
    };

    return (

        <div className="w-full h-full bg-white p-6 rounded-md">

            <h2 className="text-2xl font-semibold text-primary mb-6">
                Public Profile
            </h2>

            <div className="flex justify-end">
                <div
                    className="text-primary hover:underline cursor-pointer"
                    onClick={() => setShowChangePasswordPopup(true)}
                >
                    Change Password
                </div>
            </div>
            <form className="space-y-4">
                <div className="flex space-x-4">
                    <div className="w-full">

                        <InputField
                            label="Your name"
                            value={user.name}
                            onChange={(e) =>
                                setUser &&
                                setUser({ ...user, name: e.target.value })
                            }
                            type="text"
                            placeHolder="Your name"
                            disabled={!isEditProfile}
                        />
                    </div>

                </div>
                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <InputField
                            label="Your email"
                            value={user.email}
                            onChange={(e) =>
                                setUser &&
                                setUser({ ...user, email: e.target.value })
                            }
                            type="email"
                            placeHolder="abc@gmail.com"
                            disabled={!isEditProfile}

                        />
                    </div>
                    <div className="w-1/2">
                        <InputField
                            label="Your phone"
                            value={user.phone}
                            onChange={(e) =>
                                setUser &&
                                setUser({ ...user, phone: e.target.value })
                            }
                            type="text"
                            placeHolder="+1234567890"
                            disabled={!isEditProfile}
                        />
                    </div>
                </div>
                {isEditProfile ? (
                    <div className="flex space-x-2">
                        <PrimaryButton
                            onClick={() => setIsEditProfile(false)}
                            label="Cancel"
                            className="text-primary border-2 border-primary hover:bg-primary/10  flex flex-row items-center justify-center rounded-md  cursor-pointer"

                        />
                        <PrimaryButton
                            onClick={handleEdit}
                            label="Save"
                            className="bg-primary text-white rounded-md hover:bg-primary/80"
                        />
                    </div>
                ) : (
                    <PrimaryButton
                        onClick={() => setIsEditProfile(true)}
                        label="Edit Profile"
                        className="bg-primary text-white rounded-md hover:bg-primary/80"
                    />
                )}

            </form>
            {showChangePasswordPopup && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={(e) => {
                        // Đóng popup nếu nhấn vào vùng bên ngoài (lớp phủ nền)
                        if (e.target === e.currentTarget) {
                            setShowChangePasswordPopup(false);
                        }
                    }}
                >
                    <div className="bg-white w-[500px]  p-6 rounded-md shadow-lg">
                        <h3 className="text-xl text-[#0C2556] font-semibold mb-4">
                            Change Password
                        </h3>
                        <form className="space-y-6">
                            <InputField
                                label="Current Password"
                                type="password"
                                value={user.oldPassword}
                                onChange={(e) =>
                                    setUser &&
                                    setUser({ ...user, oldPassword: e.target.value })
                                }
                                placeHolder="Enter current password"

                            />
                            <InputField
                                label="New Password"
                                type="password"
                                value={user.newPassword}
                                onChange={(e) =>
                                    setUser &&
                                    setUser({ ...user, newPassword: e.target.value })
                                }
                                placeHolder="Enter new password"
                            />
                            <InputField
                                label="Confirm New Password"
                                type="password"
                                value={user.confirmPassword}
                                onChange={(e) =>
                                    setUser &&
                                    setUser({ ...user, confirmPassword: e.target.value })
                                }
                                placeHolder="Re-enter new password"
                            />

                            <div className="flex space-x-2 justify-end">
                                <PrimaryButton
                                    label="Cancel"
                                    onClick={() => setShowChangePasswordPopup(false)}
                                    className="text-black border-2 border-primary hover:bg-primary/10  flex flex-row items-center justify-center rounded-md  cursor-pointer"
                                />
                                <PrimaryButton
                                    label="Save"
                                    onClick={handleChangePassword}
                                    className="bg-primary text-white rounded-md hover:bg-primary/80"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProfileContent;