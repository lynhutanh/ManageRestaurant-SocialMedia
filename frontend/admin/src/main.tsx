import ReactDOM from "react-dom/client";
import "./index.css";
import "./config/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { HashRouter } from "react-router-dom";
import { rootStore, persistor } from "@stores/redux/config/persist.config";
import App from "./app";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const queyClient = new QueryClient();
root.render(
    <QueryClientProvider client={queyClient}>
        <Provider store={rootStore}>
            <PersistGate loading={null} persistor={persistor}>
                <HashRouter>
                    <App />
                </HashRouter>
            </PersistGate>
        </Provider>
    </QueryClientProvider>
);
