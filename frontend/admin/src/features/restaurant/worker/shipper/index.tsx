import { FiLogOut } from "react-icons/fi";
import NavBottom from "./components/NavBottom";
import { useEffect, useState } from "react";
import ListOrders from "./components/ListOrder";
import Profile from "./components/Profile";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@stores/redux/slice/user.slice";

import Swal from "sweetalert2";
import { GetPosition } from "@utils/common/getPosition";
import SocketSingleton from "@config/socket";
import { deleteLoginCookies } from "@utils/auth/handleCookies";

interface Location {
    lng: number;
    lat: number;
}
interface ShipperProps {}
const Shipper: React.FC<ShipperProps> = () => {
    const [navChoose, setNavChoose] = useState<string>("Home");
    const { id, fullName } = useSelector((state: any) => state.userSlice);
    const socket = SocketSingleton.getInstance();
    const [shipperLocation, setShipperLocation] = useState<Location | null>(
        null
    );

    const dispatch = useDispatch();

    const handleLogout = () => {
        socket.emit("disconnectCustom", id);
        socket.disconnect();
        deleteLoginCookies();
        dispatch(logout());
    };

    useEffect(() => {
        socket.connect(); 
        socket.emit("joinShipper", id);

        socket.on("orderOnArrive", (data) => {
            if (data === id) {
                Swal.fire({
                    title: "🔔 New order arrived! ",

                    position: "top",
                    showClass: {
                        popup: `
                      animate__animated
                      animate__fadeInDown
                      animate__faster
                    `,
                    },
                    hideClass: {
                        popup: `
                      animate__animated
                      animate__fadeOutUp
                      animate__faster
                    `,
                    },
                    grow: "row",
                    showConfirmButton: false,
                    showCloseButton: true,
                });
            }
        });

        return () => {
            socket.off("orderOnArrive");
            socket.emit("disconnectCustom", id);
            socket.disconnect();
        };
    }, [id]);

    useEffect(() => {
        if (shipperLocation) {
            socket.emit("Shipper-Position-Post", { shipperLocation, id });
            window.localStorage.setItem("shipperLocation", JSON.stringify(shipperLocation));
        }
    }, [shipperLocation, socket, id]);

    useEffect(() => {
        if (!shipperLocation) {
            // Trigger re-render to get position from GetPosition component
            setShipperLocation(null);
        }
    }, [shipperLocation]);
    
    return (
        <>
            <GetPosition onLocationFound={setShipperLocation} />
            <div className="w-full h-screen rounded-md bg-white flex flex-col">
                <div className="fixed top-0 bg z-50 flex flex-row w-full h-[50px] justify-between items-center px-5">
                    <span className="text-[15px] font-semibold">
                        Welcome {fullName}!
                    </span>
                    <div
                        onClick={handleLogout}
                        className="ml-auto text-[30px] text-black rounded-md p-2"
                    >
                        <FiLogOut />
                    </div>
                </div>
                {navChoose === "Home" && <ListOrders />}
                {navChoose === "Profile" && <Profile id={id} />}

                <NavBottom setNavChoose={setNavChoose} navchoose={navChoose} />
            </div>
        </>
    );
};
export default Shipper;