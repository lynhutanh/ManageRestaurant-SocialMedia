import RefeshButton from "@/components/buttons/RefeshButton";

interface CalendarHeaderProps {
    onClick: (value: string) => void;
    handleShowCalendar: string;
}

const CalendarHeader = (props: CalendarHeaderProps) => {
    const { onClick, handleShowCalendar } = props;
    return (
        <div className="w-full h-fit bg-main-bg px-5 pt-5  ">
            <div className="w-full h-full flex justify-start items-center bg-white rounded-md gap-5">
                <span className="text-xl font-semibold text-primary ">
                    Posting Schedule
                </span>

            </div>
            <hr className=" w-full py-2" />
            <span className="text-primary-black ">Plan and manage your social media content in one place</span>

            <div className="flex items-center w-max gap-2 mt-5 float-right bg-gray-200 p-1 rounded-lg">
                <button
                    onClick={() => onClick("week")}
                    className={`rounded-md px-4 py-2 text-sm font-medium transition ${handleShowCalendar === "week"
                        ? "bg-white text-primary-black "
                        : "text-gray-600 hover:bg-gray-300"
                        }`}
                >
                    Week
                </button>
                <button
                    onClick={() => onClick("day")}
                    className={`rounded-md px-4 py-2 text-sm font-medium transition ${handleShowCalendar === "day"
                        ? "bg-white text-primary-black "
                        : "text-gray-600 hover:bg-gray-300"
                        }`}
                >
                    Day
                </button>
            </div>

        </div>
    );
};

export default CalendarHeader;
