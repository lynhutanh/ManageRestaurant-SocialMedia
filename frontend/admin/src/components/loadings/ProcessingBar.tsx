import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
export default function ProcessingBar() {
    return (
        <div className="fixed top-0 left-0 z-50 w-screen">
            <Box sx={{ width: "100%" }}>
                <LinearProgress />
            </Box>
        </div>
    );
}
