import { ICourseSetup } from "../types/data";
import React from "react";

interface SummaryMessageProps {
    courseSetupInfo: ICourseSetup;
}

const SummaryMessage: React.FC<SummaryMessageProps> = ({ courseSetupInfo }) => {
    return (
        <div className="h-max max-w-md rounded-md py-3 px-4 bg-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                🎉 Great job! Your Course is Ready
            </h2>

            <div className="mt-3 space-y-2 text-gray-700">
                <div className="flex items-center">
                    <span className="font-medium text-gray-900">
                        📌 Subject:
                    </span>
                    <span className="ml-2">{courseSetupInfo.subject}</span>
                </div>
                <div className="flex items-center">
                    <span className="font-medium text-gray-900">
                        🎯 Focus Area:
                    </span>
                    <span className="ml-2">{courseSetupInfo.content}</span>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 text-gray-800">
                <div className="flex items-center bg-gray-200 rounded-lg px-4 py-2">
                    <span className="text-lg">📖</span>
                    <span className="ml-3 font-medium">Chapters:</span>
                    <span className="ml-auto">
                        {courseSetupInfo.chapterCount}
                    </span>
                </div>
                <div className="flex items-center bg-gray-200 rounded-lg px-4 py-2">
                    <span className="text-lg">📚</span>
                    <span className="ml-3 font-medium">Lessons/Chapter:</span>
                    <span className="ml-auto">
                        {courseSetupInfo.lessonsPerChapter}
                    </span>
                </div>
                <div className="flex items-center bg-gray-200 rounded-lg px-4 py-2">
                    <span className="text-lg">📝</span>
                    <span className="ml-3 font-medium">Exercises/Lesson:</span>
                    <span className="ml-auto">
                        {courseSetupInfo.exercisesPerLesson}
                    </span>
                </div>
            </div>

            <p className="mt-4 text-gray-700">
                Everything looks great! Would you like to make any changes
                before proceeding? 😊
            </p>
        </div>
    );
};

export default SummaryMessage;
