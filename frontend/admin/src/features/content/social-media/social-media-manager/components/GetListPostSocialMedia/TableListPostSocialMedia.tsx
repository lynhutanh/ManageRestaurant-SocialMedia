import React from 'react';

interface ISocialMedia {
    id: string;
    content: string;
    tag: string;
    url?: string;
}

interface TableListPostSocialMediaProps {
    dataTable: ISocialMedia[];
    icons: {
        iconInstagram: string;
        iconFacebook: string;
        iconGlobe: string;
    };
    handleViewContent: (content: string) => void;
}

const TableListPostSocialMedia: React.FC<TableListPostSocialMediaProps> = ({ dataTable, icons, handleViewContent }) => {
    if (dataTable.length === 0) return null;

    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Post Details:</h3>
            <div className="w-full">
                <table className="w-full border-collapse border-b border-gray-300">
                    <thead>
                        <tr className="bg-inherit text-gray-600 font-semibold">
                            <th className="border-b border-gray-300 px-4 py-2 text-center w-[10%]">No.</th>
                            <th className="border-b border-gray-300 px-4 py-2 text-center w-[10%]">CONTENT</th>
                            <th className="border-b border-gray-300 px-4 py-2 text-center w-[20%]">TAG</th>
                            <th className="border-b border-gray-300 px-4 py-2 text-center w-[60%]">URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTable.map((post, index) => {
                            return (
                                <tr key={post.id} className="bg-inherit">
                                    <td className="border-b border-gray-300 px-4 py-4 text-center font-medium text-[#0C2556]">
                                        {index + 1}
                                    </td>
                                    <td className="border-b border-gray-300 px-4 py-4 text-center">
                                        <button
                                            onClick={() => handleViewContent(post.content || "No content available")}
                                            className="text-blue-500 hover:underline"
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td className="border-b border-gray-300 px-4 py-4 text-center">
                                        <div className="flex justify-center items-center">
                                            {post.tag === "Instagram" ? (
                                                <img src={icons.iconInstagram} alt="Instagram" className="w-10 h-10" />
                                            ) : post.tag === "Facebook" ? (
                                                <img src={icons.iconFacebook} alt="Facebook" className="w-10 h-10" />
                                            ) : post.tag === "Blog" ? (
                                                <img src={icons.iconGlobe} alt="Blog" className="w-10 h-10" />
                                            ) : 'blog'}
                                        </div>
                                    </td>
                                    <td className="border-b border-gray-300 px-4 py-4 text-left truncate max-w-[100px]">
                                        <a
                                            href={post.url || 'null'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            {post.url || 'null'}
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableListPostSocialMedia;
