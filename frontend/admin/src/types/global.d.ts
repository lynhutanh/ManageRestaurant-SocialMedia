// global.d.ts
interface Window {
    FB: {
        init: (params: {
            appId: string;
            cookie: boolean;
            xfbml: boolean;
            version: string;
        }) => void;
        login: (
            callback: (response: any) => void,
            options?: { scope: string }
        ) => void;
        api: (
            path: string,
            method: string,
            params: Record<string, any>,
            callback: (response: any) => void
        ) => void;
    };
}
