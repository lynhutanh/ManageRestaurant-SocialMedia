import React from 'react'
interface IPropsGetListPostSocialMedia {
    handleTogglePopupListPageFacebook: () => void;
    handleTogglePopupListPageInstagram: () => void;
    handleTogglePopupListBlogInput: () => void;
}

const GetListPostSocialMedia: React.FC<IPropsGetListPostSocialMedia> = ({
    handleTogglePopupListPageFacebook,
    handleTogglePopupListPageInstagram,
    handleTogglePopupListBlogInput
}) => {
    return (
        <div >
            <div className="flex justify-start items-center gap-2">

                <h3 className="text-lg font-semibold text-black "> Facebook Pages:</h3>
                <h3
                    onClick={handleTogglePopupListPageFacebook}
                    className="cursor-pointer text-gray-600 underline py-2"
                >
                    Select Page Facebook
                </h3>
            </div>
            <div className="flex justify-start items-center  gap-2 ">

                <h3 className="text-lg font-semibold text-black">Instagram Pages: </h3>
                <h3
                    onClick={handleTogglePopupListPageInstagram}
                    className="cursor-pointer text-gray-600 underline py-2"
                >
                    Select Page Instagram
                </h3>
            </div>
            <div className="flex justify-start items-center gap-2">
                <h3 className="text-lg font-semibold text-black "> Blog Url:</h3>
                <h3
                    onClick={handleTogglePopupListBlogInput}
                    className="cursor-pointer text-gray-600 underline py-2 ml-[80px]"
                >
                    Input Blog Url
                </h3>
            </div>
        </div>)
}

export default GetListPostSocialMedia