import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@components/Layout";
import path from "@constants/path";

const Login = lazy(() => import("@features/auth/login"));
const Register = lazy(() => import("@features/auth/register"));
const DashBoard = lazy(() => import("@features/restaurant/dashboard"));
const Profile = lazy(() => import("@features/settings/profile"));
const Menu = lazy(() => import("@features/restaurant/products/menu"));
const Ingredient = lazy(() => import("@features/restaurant/products/ingredient"));
const Order = lazy(() => import("@features/restaurant/orders/order"));
const Kitchen = lazy(() => import("@features/restaurant/operations/kitchen"));
const HistoryOrder = lazy(() => import("@features/restaurant/orders/history-order"));
const Notification = lazy(() => import("@features/restaurant/operations/notification"));
const Shipper = lazy(() => import("@features/restaurant/worker/shipper"));
const Schedule = lazy(() => import("@features/restaurant/operations/schedule"));
const Grid = lazy(() => import("@features/restaurant/operations/preference"));
const SocialMediaManager = lazy(() => import("@features/content/social-media/social-media-manager"));
const SocialPostScheduler = lazy(() => import("@features/content/social-media/social-post-scheduler"));
const AffiliateLink = lazy(() => import("@features/content/traffic-grow-center"));
const SettingPage = lazy(() => import("@features/settings/setup"));
const AiContentCreation = lazy(() => import("@/features/content/ai-content/ai-create-post"));

interface AppRoutesProps {
    isLogin: boolean;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ isLogin }) => {
    return (
        <Routes>
            <Route path={path.login} element={<Login />} />
            <Route path={path.register} element={<Register />} />
            {isLogin && (
                <>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<DashBoard />} />
                        <Route path={path.dashboard} element={<DashBoard />} />
                        <Route path={path.profile} element={<Profile />} />
                        <Route path={path.menu} element={<Menu />} />
                        <Route path={path.ingredient} element={<Ingredient />} />
                        <Route path={path.history} element={<HistoryOrder />} />
                        <Route path={path.order} element={<Order />} />
                        <Route path={path.kitchen} element={<Kitchen />} />
                        <Route path={path.notification} element={<Notification />} />
                        <Route path={path.schedule} element={<Schedule />} />
                        <Route path={path.grid} element={<Grid />} />
                        <Route path={path.ai_content_creation} element={<AiContentCreation />} />
                        <Route path={path.social_media_management} element={<SocialMediaManager />} />
                        <Route path={path.social_post_scheduler} element={<SocialPostScheduler />} />
                        <Route path={path.setting} element={<SettingPage />} />
                        <Route path={path.affiliate_management} element={<AffiliateLink />} />



                    </Route>
                    <Route path={path.shipper} element={<Shipper />} />
                </>
            )}
        </Routes>
    );
};

export default AppRoutes;
