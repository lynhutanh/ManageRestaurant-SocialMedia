import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useRef, useState, DragEvent } from "react";
import { TbCloudUpload } from "react-icons/tb";

interface FileInputProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    maxSizeMB?: number;
    acceptedTypes?: string[];
    handleNextStep?: () => void;
}

const FileInput = (props: FileInputProps) => {
    const {
        placeholder = "Upload file",
        value,
        onChange,
        maxSizeMB = 10,
        acceptedTypes = ["image/*", "video/*", "audio/*", "application/pdf"],
        handleNextStep,
    } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");

    const validateFile = (file: File): boolean => {
        setError("");

        // Check file size
        if (file.size > maxSizeMB * 1024 * 1024) {
            setError(`File size must be less than ${maxSizeMB}MB`);
            return false;
        }

        // Check file type
        const fileType = file.type;
        const isValidType = acceptedTypes.some((type) => {
            if (type.endsWith("/*")) {
                const category = type.split("/")[0];
                return fileType.startsWith(`${category}/`);
            }
            return type === fileType;
        });

        if (!isValidType) {
            setError(
                `Invalid file type. Accepted types: ${acceptedTypes.join(", ")}`
            );
            return false;
        }

        return true;
    };

    const handleFile = (file: File) => {
        if (validateFile(file)) {
            setFileName(file.name);
            onChange(file.name);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleClickFileInput = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    return (
        <div className="w-full flex flex-col gap-2">
            <div
                onClick={handleClickFileInput}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                    w-full cursor-pointer h-max p-6 
                    flex flex-col justify-center items-center gap-3 
                    border-2 border-dashed rounded-md 
                    transition-all duration-200
                    ${
                        isDragging
                            ? "border-primary bg-primary/10"
                            : "border-primary/50 bg-primary/5 hover:border-primary hover:bg-primary/10"
                    }
                `}
            >
                <TbCloudUpload className="text-4xl text-primary" />
                <div className="flex flex-col items-center gap-1">
                    <span className="font-sans text-sm font-semibold text-center">
                        {fileName || placeholder}
                    </span>
                    <span className="text-xs text-gray-500">
                        Drag & drop or click to upload • {maxSizeMB}MB max
                    </span>
                    {error && (
                        <span className="text-xs text-red-500 mt-1">
                            {error}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex justify-between w-full items-center">
                {fileName && (
                    <PrimaryButton
                        label={"Next"}
                        onClick={handleNextStep}
                        className="transform_z bg-primary-button rounded-md text-white hover:bg-primary-button/80"
                    />
                )}
                <PrimaryButton
                    label={"Skip"}
                    onClick={handleNextStep}
                    className="transform_z border border-primary-button text-primary-button rounded-md hover:bg-primary-button/20"
                />
            </div>

            <input
                ref={inputRef}
                type="file"
                accept={acceptedTypes.join(",")}
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
};

export default FileInput;
