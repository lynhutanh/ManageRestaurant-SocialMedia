import SocketSingleton from "@config/socket";

const sendNotification= async () => {
    const socket = SocketSingleton.getInstance();
    socket.emit("send-notification", {});
};
export default sendNotification;