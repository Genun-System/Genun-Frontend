import { useState } from "react";
import { Typography } from "./MaterialTailwind";
import Image from "next/image";


const ImagePicker = (prop) => {
    const [previewUrl, setPreviewUrl] = useState("");


    const dragOverHandler = (evt) => {
        evt.preventDefault();
    }

    const dragEnterHandler = (evt) => {
        evt.preventDefault();
        //setOverLay(true);
    }

    const dragLeaveHandler = (evt) => {
        evt.preventDefault();
        //setOverLay(false);
    }

    const dropHandler = (evt) => {
        evt.preventDefault();
        let file = evt.dataTransfer?.files[0]
        // if (maxFileSize) {
        //     const isFileSizeAllowed = checkFileSize(file, maxFileSize)
        //     if (!isFileSizeAllowed) {
        //         toast.error(`Failed to upload file because file size exceeds ${maxFileSize}MB limit.`)
        //         return
        //     }
        // }

        prop?.setFieldValue(prop?.name, file)
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                setPreviewUrl(event.target.result)
            }
            reader.readAsDataURL(file);
        }

    }

    const handleFileChange = (evt) => {
        let file = evt.currentTarget.files[0]

        // if (maxFileSize) {
        //     const isFileSizeAllowed = checkFileSize(file, maxFileSize)
        //     if (!isFileSizeAllowed) {
        //         toast.error(`Failed to upload file because file size exceeds ${maxFileSize}MB limit.`)
        //         return
        //     }
        // }
        prop?.setFieldValue(prop?.name, file)
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                setPreviewUrl(event.target.result || "")
            }
            reader.readAsDataURL(file);
        }

    }


    return (
        <label className={`bg-white h-[200px] flex flex-col space-y-10 md:flex-row md:space-y-0 md:space-x-10 tabletland:space-x-5 lg:space-x-10 md:items-center px-[26px] py-6  ${prop?.className}`}
            onDrop={(evt) => {
                dropHandler(evt)
            }}
            onDragOver={dragOverHandler}
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
        >
            <div>
                <input type="file" className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                />
                <div className="flex items-center  space-x-[13px] mb-[9px]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.003 8.25C9.003 8.84674 8.76595 9.41903 8.34399 9.84099C7.92203 10.2629 7.34974 10.5 6.753 10.5C6.15626 10.5 5.58397 10.2629 5.16201 9.84099C4.74005 9.41903 4.503 8.84674 4.503 8.25C4.503 7.65326 4.74005 7.08097 5.16201 6.65901C5.58397 6.23705 6.15626 6 6.753 6C7.34974 6 7.92203 6.23705 8.34399 6.65901C8.76595 7.08097 9.003 7.65326 9.003 8.25Z" fill="#474935" fill-opacity="0.5" />
                        <path d="M2.25 3C1.65326 3 1.08097 3.23705 0.65901 3.65901C0.237053 4.08097 0 4.65326 0 5.25V18.75C0 19.3467 0.237053 19.919 0.65901 20.341C1.08097 20.7629 1.65326 21 2.25 21H21.75C22.3467 21 22.919 20.7629 23.341 20.341C23.7629 19.919 24 19.3467 24 18.75V5.25C24 4.65326 23.7629 4.08097 23.341 3.65901C22.919 3.23705 22.3467 3 21.75 3H2.25ZM21.75 4.5C21.9489 4.5 22.1397 4.57902 22.2803 4.71967C22.421 4.86032 22.5 5.05109 22.5 5.25V14.25L16.8375 11.3295C16.6968 11.259 16.5376 11.2346 16.3822 11.2596C16.2269 11.2847 16.0834 11.3579 15.972 11.469L10.407 17.034L6.417 14.376C6.27294 14.2801 6.10014 14.237 5.92791 14.2539C5.75567 14.2709 5.5946 14.3468 5.472 14.469L1.503 18V18.81C1.50121 18.79 1.50021 18.77 1.5 18.75V5.25C1.5 5.05109 1.57902 4.86032 1.71967 4.71967C1.86032 4.57902 2.05109 4.5 2.25 4.5H21.75Z" fill="#474935" fill-opacity="0.5" />
                    </svg>
                    <Typography className="font-crimsonText font-semibold text-[18px] leading-[21px] text-[#47493580]">
                        {prop?.placeholder}
                    </Typography>
                </div>
                <Typography className="text-[16px] leading-[18px] md:text-[18px] md:leading-[20px] font-oxygen mb-[10px] text-[#47493580]">
                    <span className="font-crimsonText text-primary">Upload file</span> or drop Image here
                </Typography>
                {
                    prop?.fileLimit &&
                    <Typography className="font-oxygen text-[14px] leading-[20px] text-[#47493580]">
                        File size must be less than {prop.fileLimit}mb
                    </Typography>
                }
            </div>
            <div className="relative w-full  md:w-[181px] h-[150px]">
                <Image
                    src={previewUrl}
                    className="rounded-[5px]"
                    alt="Preview"
                    fill={true}
                />
            </div>
        </label>
    )
}

export default ImagePicker;
