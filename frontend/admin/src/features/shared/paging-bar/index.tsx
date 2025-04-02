import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate, useSearchParams } from "react-router-dom";
import { memo } from 'react';

interface PagingBarProps {
    totalPage: number;
}
const PagingBar: React.FC<PagingBarProps> = ({totalPage}) => {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    return (
        <div className="w-full h-full py-2 flex justify-center items-center">
            <Stack spacing={2}>
                <Pagination
                    count={totalPage}
                    onChange={(event, page) => {
                        params.delete("page");
                        params.append("page", page.toString());
                        navigate(`?${params.toString()}`);
                    }}
                />
            </Stack>
        </div>
    );
}

export default memo(PagingBar);
