import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-[10000] w-screen h-screen flex items-center justify-center bg-primary-gray-th1/80">
            <Box sx={{ display: "flex" }}>
                <CircularProgress />
            </Box>
        </div>
    );
}
