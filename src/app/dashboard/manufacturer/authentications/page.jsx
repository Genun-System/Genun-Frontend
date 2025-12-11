"use client";

import { useEffect, useState } from "react";
import { IconButton, Typography, Menu, MenuHandler, MenuList, MenuItem, Spinner, Tooltip } from "../../../components/MaterialTailwind";
import { format } from "date-fns";
import { LimitDisplayableTexts } from "@/app/utils/LimitDisplayableTexts";
import { getAuthentications } from "@/app/actions/product";
const Authentication = () => {

    const [filter, setFilter] = useState({
        value: "all",
        label: "All"
    })
    const [fetchingAuths, setFetchingAuths] = useState(false);
    const [auths, setAuths] = useState([]);

    useEffect(() => {
        const fetchAuthentications = async () => {
            setFetchingAuths(true)
            try {
                const response = await getAuthentications();
                const result = await response.json();
                if (response.ok) {
                    setFetchingAuths(false)
                    setAuths(result?.products)
                }

                else {
                    setFetchingAuths(false)
                }
            }

            catch (err) {
                console.log("error:", err)
                setFetchingAuths(false)
            }
        }

        fetchAuthentications();
    }, [])

    const filterOption = [
        {
            value: "all",
            label: "All"
        },
        {
            value: "1 week",
            label: "Last week"
        },
        {
            value: "2 weeks",
            label: "Last 2 weeks"
        },
        {
            value: "1 month",
            label: "1 month ago"
        },
        {
            value: "2 months",
            label: "2 months ago"
        },
        {
            value: "6 months+",
            label: "More than 6 months"
        },
        {
            value: "1 year",
            label: "1 year ago"
        },
        {
            value: "1 year+",
            label: "More than 1 year"
        },
    ]

    const TABLE_HEAD = ["No", "Product", "Date", "Product ID", "Requester", "Status",]

    const handleMenuItemClick = (selectedValue, selectedLabel) => {
        setFilter({
            label: selectedLabel,
            value: selectedValue
        })
    }

    return (
        <section className="min-h-full ">
            <div className="mt-[62px] bg-white rounded-xl px-[22px] pt-[33px] pb-[10px]"
                style={{ boxShadow: "0px 1px 3px 0px #00000014" }}
            >
                <div className="w-full flex justify-between "
                >
                    {/** Table title and meta info */}
                    <div className="">
                        <div>
                            <Typography className="text-primary font-crimsonText font-semibold text-[20px] leading-[26px] text-justify">
                                Authentication Requests
                            </Typography>
                            <Typography className="text-[13px] leading-[16px] font-oxygen text-[#474935] mt-[7px]">
                                {filter.label}
                            </Typography>
                        </div>
                    </div>
                    <div className="flex items-center space-x-[10px]">
                        <Menu>
                            <MenuHandler>
                                <IconButton variant="text" >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.25 2.25C2.25 2.05109 2.32902 1.86032 2.46967 1.71967C2.61032 1.57902 2.80109 1.5 3 1.5H21C21.1989 1.5 21.3897 1.57902 21.5303 1.71967C21.671 1.86032 21.75 2.05109 21.75 2.25V5.25C21.75 5.43496 21.6816 5.61339 21.558 5.751L15 13.038V20.25C14.9999 20.4073 14.9503 20.5607 14.8582 20.6883C14.7661 20.8159 14.6363 20.9113 14.487 20.961L9.987 22.461C9.87431 22.4985 9.75432 22.5088 9.6369 22.4909C9.51948 22.4729 9.408 22.4274 9.31162 22.358C9.21525 22.2886 9.13674 22.1972 9.08257 22.0915C9.02839 21.9858 9.00009 21.8688 9 21.75V13.038L2.442 5.751C2.31841 5.61339 2.25003 5.43496 2.25 5.25V2.25ZM3.75 3V4.962L10.308 12.249C10.4316 12.3866 10.5 12.565 10.5 12.75V20.709L13.5 19.71V12.75C13.5 12.565 13.5684 12.3866 13.692 12.249L20.25 4.962V3H3.75Z" fill="#235789" />
                                    </svg>
                                </IconButton>
                            </MenuHandler>
                            <MenuList>
                                {
                                    filterOption?.map((option, index) => (
                                        <MenuItem key={index}>
                                            <button onClick={() => handleMenuItemClick(option.value, option.label)}>
                                                {option.label}
                                            </button>
                                        </MenuItem>
                                    ))
                                }
                            </MenuList>
                        </Menu>
                        <IconButton variant="text" onClick={() => alert("This feature is  not available yet.")}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.333 16C13.333 16.7072 13.614 17.3855 14.1141 17.8856C14.6142 18.3857 15.2924 18.6667 15.9997 18.6667C16.7069 18.6667 17.3852 18.3857 17.8853 17.8856C18.3854 17.3855 18.6663 16.7072 18.6663 16C18.6663 15.2928 18.3854 14.6145 17.8853 14.1144C17.3852 13.6143 16.7069 13.3333 15.9997 13.3333C15.2924 13.3333 14.6142 13.6143 14.1141 14.1144C13.614 14.6145 13.333 15.2928 13.333 16ZM13.333 8C13.333 8.70724 13.614 9.38552 14.1141 9.88562C14.6142 10.3857 15.2924 10.6667 15.9997 10.6667C16.7069 10.6667 17.3852 10.3857 17.8853 9.88562C18.3854 9.38552 18.6663 8.70724 18.6663 8C18.6663 7.29276 18.3854 6.61448 17.8853 6.11438C17.3852 5.61429 16.7069 5.33333 15.9997 5.33333C15.2924 5.33333 14.6142 5.61429 14.1141 6.11438C13.614 6.61448 13.333 7.29276 13.333 8ZM13.333 24C13.333 24.7072 13.614 25.3855 14.1141 25.8856C14.6142 26.3857 15.2924 26.6667 15.9997 26.6667C16.7069 26.6667 17.3852 26.3857 17.8853 25.8856C18.3854 25.3855 18.6663 24.7072 18.6663 24C18.6663 23.2928 18.3854 22.6145 17.8853 22.1144C17.3852 21.6143 16.7069 21.3333 15.9997 21.3333C15.2924 21.3333 14.6142 21.6143 14.1141 22.1144C13.614 22.6145 13.333 23.2928 13.333 24Z" fill="#235789" />
                            </svg>
                        </IconButton>
                    </div>
                </div>
                <div className="h-full max-h-[660px] w-full overflow-scroll pt-5">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b border-[#DCDCDC] bg-white p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {!fetchingAuths && auths?.map(({  product, createdAt, requester, productId, status }, index) => (
                                <tr key={product} className="odd:bg-background">
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {index + 1}.
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {product}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {format(createdAt, "P")}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {productId}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Tooltip content={requester}>
                                            <Typography variant="small" color="blue-gray" className="font-medium">
                                                {requester ? LimitDisplayableTexts(requester,10) : "-"}
                                            </Typography>
                                        </Tooltip>
                                    </td>
                                    <td className="p-4">
                                        <div className={`${status === "failed" ? "bg-[#FFD7D7] text-[#ED5B75] " : "text-[#4FDFB1] bg-[#DCFCE7]"} rounded-[5px] p-[5px] w-fit text-center capitalize font-oxygen text-[14px] leading-[17px] `}>
                                            {status}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {
                        fetchingAuths &&
                        <div className="mt-5 w-full flex flex-1 items-center justify-center">
                            <Spinner className="h-6 w-6" />
                        </div>
                    }
                </div>
            </div>

        </section>
    )
}

export default Authentication;
