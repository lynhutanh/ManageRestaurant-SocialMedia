import { BiErrorCircle } from "react-icons/bi";

import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { IoMdInformationCircleOutline } from "react-icons/io";
import React from "react";

export const icons = {
    "new": React.createElement(IoMdInformationCircleOutline, { color: "blue", size: "24px" }),
    "done": React.createElement(IoMdCheckmarkCircleOutline, { color: "green", size: "24px" }),
    "repaired": React.createElement(IoMdCheckmarkCircleOutline, { color: "green", size: "24px" }),
    "ingredient": React.createElement(BiErrorCircle, { color: "orange", size: "24px" }),
    "failed": React.createElement(BiErrorCircle, { color: "red", size: "24px" }), 
}


