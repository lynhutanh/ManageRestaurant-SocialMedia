import { io } from "socket.io-client";
import { VITE_URL_SOCKET } from "@/config";

class SocketSingleton {
    private static instance: SocketSingleton;
    private socket: any;

    private constructor() {
        this.socket = io(VITE_URL_SOCKET, {
            autoConnect: false, // Disable auto-connect
        });
    }
    public static getInstance(): SocketSingleton {
        if (!SocketSingleton.instance) {
            SocketSingleton.instance = new SocketSingleton(); // Auto-connect when instance is created
        }
        return SocketSingleton.instance;
    }

    public connect() {
        if (!this.socket.connected) {
            this.socket.connect();
        }
    }

    public disconnect() {
        if (this.socket.connected) {
            this.socket.disconnect();
        }
    }

    public emit(event: string, data: any) {
        this.socket.emit(event, data);
    }

    public on(event: string, callback: (data: any) => void) {
        this.socket.on(event, callback);
    }

    public off(event: string) {
        this.socket.off(event);
    }
}

export default SocketSingleton;
