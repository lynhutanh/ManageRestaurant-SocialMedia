import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { IUserProfile } from "..";
import { getStaffByIdAPI } from "../api/profile";

const useGetUserInformation = () => {
    const { t } = useTranslation();

    const { id } = useSelector((state: any) => state.userSlice);
    const [selectedImage, setSelectedImage] = useState(null);

    const [state, setState] = useState({
        isLoading: false,
        isChangePassword: false,
        isEditProfile: false,
    });

    const [error, setError] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        samePassword: "",
        phoneNumberExist: "",
        invalidPhoneNumber: "",
    });

    const [user, setUser] = useState<IUserProfile>({
        name: "",
        email: "",
        phone: "",
        image: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleValidation = () => {
        let formIsValid = true;
        const newError = {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            samePassword: "",
            phoneNumberExist: "",
            invalidPhoneNumber: "",
        };

        if (!user.oldPassword) {
            formIsValid = false;
            newError.oldPassword = t("Old password is required");
        }

        if (!user.newPassword) {
            formIsValid = false;
            newError.newPassword = t("New password is required");
        }

        if (!user.confirmPassword) {
            formIsValid = false;
            newError.confirmPassword = t("Confirm password is required");
        }

        if (user.newPassword !== user.confirmPassword) {
            formIsValid = false;
            newError.samePassword = t("Passwords do not match");
        }

        setError(newError);
        return formIsValid;
    };

    const fetchUser = async () => {
        try {
            const response = await getStaffByIdAPI(id);
            const data = response?.data?.data;
            setUser({
                name: data?.fullName || "", 
                email: data?.email || "",
                phone: data?.phone || "",
                image: data?.image || "",
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return {
        id,
        user,
        selectedImage,
        state,
        error,
        setState,
        setError,
        setUser,
        setSelectedImage,
        handleValidation,
    };
};

export default useGetUserInformation;
