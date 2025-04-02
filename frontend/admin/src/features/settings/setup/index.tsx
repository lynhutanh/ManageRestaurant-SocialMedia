import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import InstructionModal from "./components/InstructionModal";
import { fetchPages } from "../../content/social-media/social-media-manager/api/social-media";
import { getAccessToken, removeAccessToken, setAccessToken } from "@/utils/auth/handleCookies";
import TokenExpiredModal from "./components/TokenExpiredModal";
import { setAppId, setSocialPages, setDefaultPage, setDefaultBusinessType, resetPages } from "@stores/redux/slice/user.slice";

const SettingSocialMediaManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpenInstructionModal, setIsOpenInstructionModal] = useState(false);
    const [isOpenPopupContinueScheduling, setIsOpenPopupContinueScheduling] = useState(false);

    const [accessToken, setAccessTokenState] = useState<string>(
        () => getAccessToken() || ""
    );
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedPages, setSelectedPages] = useState<{
        currentFbPage: { pageId: string; pageName: string };
        currentInstaPage: { pageId: string; pageName: string };
    }>({
        currentFbPage: { pageId: "", pageName: "" },
        currentInstaPage: { pageId: "", pageName: "" },
    });

    const { appId, listSocialPages, defaultPage, defaultBusinessType } = useSelector((state: any) => state.userSlice);

    const [appIdInput, setAppIdInput] = useState(appId || "");
    const [businessType, setBusinessType] = useState(defaultBusinessType || "");
    useEffect(() => {
        setAppIdInput(appId || "");
    }, [appId]);

    const handleCloseInstructionModal = () => {
        setIsOpenInstructionModal(false);
    };

    const handleSubmit = async () => {
        if (!appIdInput.trim()) {
            toast.warning("AppId cannot be empty!");
            return;
        }

        try {
            dispatch(setAppId(appIdInput));
            setAppIdInput(appIdInput);
            await handleLogin(appIdInput);
        } catch (error) {
            toast.error("Invalid AppId. Please check and try again.", { autoClose: 3000 });
        }
    };

    useEffect(() => {
        if (accessToken && isLoggedIn) {
            handleFetchPages(accessToken);
        }
    }, [accessToken, isLoggedIn]);

    const handleLogin = async (appId: string) => {
        if (!appId.trim()) {
            toast.warning("Please enter a valid AppId.");
            return;
        }

        try {
            await loadFacebookSDK(appId);
        } catch (error) {
            toast.error("Invalid AppId. Please check and try again.");
            return;
        }

        if (window.FB) {
            window.FB.login(
                (response: any) => {
                    if (response.authResponse) {
                        (async () => {
                            resetAppState();
                            const newAccessToken = response.authResponse.accessToken;
                            const expiresIn = response.authResponse.expiresIn;


                            setAccessTokenState(newAccessToken);
                            setAccessToken(newAccessToken);
                            setIsLoggedIn(true);
                            toast.success("Login successful!", { autoClose: 1000 });

                            checkTokenExpiry(expiresIn);

                            const schedulingPost = localStorage.getItem("schedulingPost");
                            if (schedulingPost) {
                                setIsOpenPopupContinueScheduling(true);
                            }
                        })();
                    } else {
                        toast.error("Invalid AppId", { autoClose: 1000 });
                    }
                },
                {
                    scope: "pages_show_list,pages_read_engagement,pages_manage_metadata,instagram_basic,instagram_content_publish,pages_manage_posts",
                }
            );
        }
    };

    const [isTokenExpired, setIsTokenExpired] = useState(false);
    const [tokenExpiryTimeout, setTokenExpiryTimeout] = useState<NodeJS.Timeout | null>(null);

    const checkTokenExpiry = (expiresIn: number) => {



        if (tokenExpiryTimeout) {
            clearTimeout(tokenExpiryTimeout);
        }

        const newTimeout = setTimeout(() => {
            setIsTokenExpired(true);
            resetAppState();
            setIsLoggedIn(false);
            localStorage.removeItem("dataTable");
            localStorage.removeItem("instagramAccounts");
            dispatch(resetPages());


        }, expiresIn * 1000);

        setTokenExpiryTimeout(newTimeout);
    };

    const handleRelogin = () => {
        setIsTokenExpired(false);
        handleLogin(appIdInput);
    };

    const loadFacebookSDK = (appId: string) => {
        return new Promise<void>((resolve, reject) => {
            if (window.FB) {
                resolve();
            } else {
                const script = document.createElement("script");
                script.src = "https://connect.facebook.net/en_US/sdk.js";
                script.async = true;
                script.onload = () => {
                    window.FB.init({
                        appId,
                        cookie: true,
                        xfbml: true,
                        version: "v16.0",
                    });
                    resolve();
                };
                script.onerror = () => {
                    reject(new Error("Failed to load Facebook SDK."));
                };
                document.body.appendChild(script);
            }
        });
    };

    const handleFetchPages = async (userToken: string) => {
        try {
            const pagesData = await fetchPages(userToken);
            dispatch(setSocialPages(pagesData));

            if (pagesData && pagesData.length > 0) {
            } else {
                toast.warning("No pages found.", { autoClose: 1000 });
            }
        } catch (err: any) {
            if (err.message === "Rate limit exceeded") {
                toast.error("Rate limit exceeded. Please try again later.", {
                    autoClose: 1000,
                });
            } else if (err.message === "Network Error") {
                toast.error("Network Error. Please check your connection.", {
                    autoClose: 1000,
                });
            } else {
                toast.error("Failed to fetch pages. Please try again.", {
                    autoClose: 1000,
                });
            }
        }
    };

    const resetAppState = () => {
        setAccessTokenState("");
        removeAccessToken();
        setSelectedPages({
            currentFbPage: { pageId: "", pageName: "" },
            currentInstaPage: { pageId: "", pageName: "" },
        });
    };
    const handleSelectPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPageId = event.target.value;
        const page = listSocialPages.find((p: any) => p.id === selectedPageId);

        if (page) {
            dispatch(setDefaultPage(page));
        }
    };
    const handleSave = async () => {
        if (!businessType.trim()) {
            toast.warning("Business Type cannot be empty!");
            return;
        }

        try {
            dispatch(setDefaultBusinessType(businessType));
            toast.success("Business Type saved successfully!", { autoClose: 1000 });
        } catch (error) {
            toast.error("Failed to save Business Type. Please try again.", { autoClose: 1000 });
        }
    };
    return (
        <div className="w-full h-screen flex bg-gray-100">
            <TokenExpiredModal
                isOpen={isTokenExpired}
                onClose={() => setIsTokenExpired(false)}
                onSubmit={handleRelogin}
            />
            {isOpenInstructionModal && (
                <InstructionModal
                    isOpenInstructionModal={isOpenInstructionModal}
                    handleCloseInstructionModal={handleCloseInstructionModal}
                />
            )}

            <div className="w-full bg-white rounded-xl shadow-xl p-8">
                <div className="w-full">
                    <span className="w-max text-xl font-semibold text-primary  flex items-center gap-2">Social Media Management </span>
                    <hr className="w-full " />
                    <div className=" ">
                        <p className="m-0 text ">
                            Manage your pages with an App ID. {" "}
                            <span
                                onClick={() => setIsOpenInstructionModal(true)}
                                className="text-dashboard-blue/90 font-normal  hover:underline cursor-pointer inline-flex items-center gap-1  py-4"
                            >
                                Learn how to set it up!
                            </span>
                        </p>

                    </div>



                    <span className="w-max text-lg font-semibold text-primary  flex items-center gap-2">
                        Social App ID
                    </span>

                    <div className="flex items-center space-x-4 w-[50%]">
                        <input
                            type="text"
                            placeholder="Enter your AppId Social Media"
                            value={appIdInput}
                            onChange={(e) => setAppIdInput(e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200 placeholder-gray-400"
                        />
                        <div
                            onClick={handleSubmit}
                            className="text-lg font-semibold cursor-pointer bg-primary text-white py-2 px-6 rounded-lg  hover:bg-primary/90 transition duration-300"
                        >
                            Connect
                        </div>
                    </div>
                </div>
                <div className="w-full bg-white mt-4">
                    <div className=" flex items-center  gap-2">
                        <h2 className="text-lg font-semibold text-primary-black">Select a default Facebook page: </h2>

                        {isLoggedIn && (!defaultPage || Object.keys(defaultPage).length === 0) && (
                            <p className="text-gray-500 ">Select your default page for a smoother experience!</p>
                        )}
                    </div>

                    {listSocialPages.length > 0 ? (
                        <select
                            value={defaultPage?.id || ""}
                            onChange={handleSelectPage}
                            className="mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option className="bg" value="" disabled>
                                -- Select a Page --
                            </option>
                            {listSocialPages.map((page: any) => (
                                <option key={page.id} value={page.id}>
                                    {page.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p className="text-gray-500 mt-2">No pages available</p>
                    )}

                    {isOpenPopupContinueScheduling && (
                        <div className="text-lg text-gray-700 mt-4 ">
                            Bạn có muốn tiếp tục chỉnh sửa.
                            <button
                                className="text-blue-500 hover:underline"
                                onClick={() => navigate("/social_post_scheduler", { state: { openScheduleModal: true } })}
                            >
                                Tiếp tục chỉnh sửa
                            </button>
                            {" "}hoặc{" "}
                            <button
                                className="text-red-500 hover:underline"
                                onClick={() => setIsOpenPopupContinueScheduling(false)}
                            >
                                Hủy
                            </button>.
                        </div>
                    )}
                </div>
                <span className="w-max text-lg font-semibold text-primary  flex items-center gap-2 mt-3 ">
                    Business Type
                </span>
                <div className="flex items-center space-x-4 w-[50%] ">
                    <input
                        type="text"
                        placeholder="Enter your Business Type"
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200 placeholder-gray-400"
                    />
                    <div
                        onClick={handleSave}
                        className="text-lg font-semibold cursor-pointer bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary/90 transition duration-300"
                    >
                        Save
                    </div>
                </div>
            </div>

        </div >
    );
};

export default SettingSocialMediaManagement;