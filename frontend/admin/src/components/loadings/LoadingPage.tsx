import SpinnerSquare from "./SpinnerSquare/SpinnerSquare";

export default function Loading() {
    return (
        <div className="h-full w-full z-50 flex flex-col justify-center items-center gap-3">
            {/* <Box sx={{ display: "flex" }}>
                <CircularProgress />
            </Box> */}
            <SpinnerSquare />
            <span className="text-2xl font-medium text-primary/80">
                Loading
            </span>
        </div>
    );
}
