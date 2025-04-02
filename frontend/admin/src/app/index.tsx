import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes";
import SocketSingleton from "@config/socket";
import { sendNotificationAction } from "@stores/redux/api/notification";
import useHandleCheckPermission from "@hooks/useHandleCheckPermission";

function App() {
    const socket = SocketSingleton.getInstance();
    const dispatch: any = useDispatch();
    const { isLogin } = useHandleCheckPermission();

    useEffect(() => {

        socket.connect();
        socket.on("orderCancelNotification", (orderId: string) => {
            dispatch(
                sendNotificationAction({
                    title: "Order has been cancelled",
                    content: `Order ${orderId} has been cancelled`,
                    link: `/order/${orderId}`,
                    type: "failed",
                })
            );
            toast.error(`Order ${orderId} has been cancelled`);
        });

        return () => {
            socket.off("orderCancelNotification");
        };
    }, []);

    return (
        <div className="App font-montserrat-regular">
            <AppRoutes isLogin={isLogin} />
            <ToastContainer autoClose={3000} />
        </div>
    );
}

export default App;
