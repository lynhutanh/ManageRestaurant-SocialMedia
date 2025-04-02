import { IoHomeOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

const navBottom = [
    {
        name: "Home",
        icon: <IoHomeOutline />,
        link: "/shipper/home",
    },
    {
        name: "Profile",
        icon: <FaUser />,
        link: "/shipper/profile",
    },
];

interface NavBottomProps {
    setNavChoose: (value: string) => void;
    navchoose: string;
}
const NavBottom: React.FC<NavBottomProps> = ({ setNavChoose, navchoose }) => {
    return (
        <div className="fixed bottom-0 w-full h-[75px] bg-white shadow-2xl rounded-t-[10px]">
            <div className="flex h-full w-full flex-row justify-evenly items-center text-black text-[30px] font-bold">
                {navBottom?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => setNavChoose(item.name)}
                            className={` ${
                                item.name === navchoose ? "bg-blue-200 text-white" : ""
                            } w-1/2 h-full px-2 flex flex-row justify-center items-center gap-2`}
                        >
                            {item.icon}
                            <span className="text-[12px]">{item.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default NavBottom;
