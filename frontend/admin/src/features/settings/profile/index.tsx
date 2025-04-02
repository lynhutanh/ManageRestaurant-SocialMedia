import React from "react";
import ProfileContent from "./components/ProfileContent";
import useGetUserInformation from "./hooks/useGetUserInformation";

export interface IUserProfile {
    name: string;
    email: string;
    phone: string;
    image: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const ProfilePage: React.FC = () => {
    const {
        user,
        selectedImage,
        setUser,
        setSelectedImage,
        handleValidation,
    } = useGetUserInformation();

    return (
        <div className="flex h-screen bg-gray-100 rounded-md">
            <ProfileContent
                user={user}
                setUser={setUser}
                setSelectedImage={setSelectedImage}
                selectedImage={selectedImage}
                handleValidation={handleValidation}
            />
        </div>
    );
};

export default ProfilePage;
