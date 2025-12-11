"use client";

import Button from "@/app/components/Button";
import { Spinner, Tooltip, Typography } from "../../components/MaterialTailwind";
import {  months, authentications } from "./data";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import AuthCharts from "./AuthChart";
import { useEffect, useState } from "react";
import { getAuthentications, getManufacturerStats } from "@/app/actions/product";
import { LimitDisplayableTexts } from "@/app/utils/LimitDisplayableTexts";

const Dashboard = () => {
    const router = useRouter();
    const [stats, setStats] = useState({
        productCount: 0,
        categoryCount: 0,
        authCount: 0
    })
    const [fetchingAuths, setFetchingAuths] = useState(false);
    const [auths, setAuths] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getManufacturerStats();
                const result = await response.json();
                if (response.ok) {
                    //console.log("products:", result?.)
                    setStats({
                        productCount: result?.productCount,
                        categoryCount: result?.categoryCount,
                        authCount: result?.authCount,
                    })
                }
            }

            catch (err) {
                console.log("error:", err)
            }
        }

        fetchStats()
    }, [])

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

    const TABLE_HEAD = ["No", "Product", "Date", "Product ID", "Requester", "Status",]
    const handleViewAll = () => {
        router.push("/dashboard/manufacturer/authentications")
    }

    return (
        <section className=" min-h-full ">

            {/* Stat */}
            <div className="flex   flex-row gap-x-8 gap-y-8 tabletland:gap-x-[58px] tabletland:gap-y-[58px] mt-20 flex-wrap">

                <li style={{ boxShadow: "0px 1px 3px 0px #00000014" }}
                    className=" bg-white flex flex-col list-none justify-center pl-7 rounded-[5px] w-[calc(50%-40px)] md:w-[214px] h-[156px] space-y-1"
                >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.5 24.823V26.783C14.5 27.003 14.26 27.133 14.07 27.023L11.27 25.333C11.1752 25.2734 11.0971 25.1908 11.0429 25.0929C10.9887 24.995 10.9602 24.8849 10.96 24.773V22.813C10.96 22.593 11.2 22.463 11.39 22.573L14.19 24.263C14.38 24.383 14.5 24.593 14.5 24.823Z" fill="#474935" />
                        <path d="M16.89 1.289H16.893L27.814 7.931C28.371 8.274 28.71 8.887 28.71 9.533V21.973C28.71 22.909 28.228 23.811 27.396 24.309L16.853 30.715C16.5529 30.8998 16.2074 30.9977 15.855 30.9977C15.5026 30.9977 15.1571 30.8998 14.857 30.715L4.311 24.307C3.91064 24.0631 3.57976 23.7203 3.35017 23.3115C3.12057 22.9028 2.99999 22.4418 3 21.973V9.533C3 8.897 3.332 8.272 3.908 7.933L14.839 1.283C15.1491 1.09687 15.5042 0.99905 15.8658 1.00011C16.2275 1.00117 16.582 1.10106 16.891 1.289M15.861 3.003L6.083 8.95L9.593 11.095L19.383 5.144L15.861 3.003ZM22.676 7.146L12.871 13.098L15.871 14.93L25.776 9.032L22.676 7.146ZM5 21.973C5 22.232 5.137 22.469 5.35 22.598L14.863 28.378V16.659L11.76 14.764V16.552C11.76 16.792 11.5 16.932 11.3 16.822L8.62 15.192C8.57713 15.1635 8.54194 15.1248 8.51753 15.0795C8.49312 15.0341 8.48023 14.9835 8.48 14.932V12.76L5 10.634V21.973ZM26.36 22.598L26.368 22.594C26.4736 22.5284 26.5606 22.4367 26.6205 22.3278C26.6804 22.2188 26.7112 22.0963 26.71 21.972V10.802L16.863 16.667V28.369L26.36 22.598Z" fill="#474935" />
                    </svg>
                    <Typography className="text-primary font-bold font-crimsonText text-[21px] leading-[29px] md:text-[32px] md:leading-[41px]">
                        {stats.productCount}
                    </Typography>
                    <Typography className="font-oxygenMono break-all text-[10px] leading-4 md:text-[14px] md:leading-[18px] text-[#474935CC]">
                        Total Products
                    </Typography>
                </li>
                <li style={{ boxShadow: "0px 1px 3px 0px #00000014" }}
                    className=" bg-white flex flex-col list-none justify-center pl-7 rounded-[5px] w-[calc(50%-40px)] md:w-[214px] h-[156px] space-y-1"
                >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.33366 26.6667C4.60033 26.6667 3.97277 26.4058 3.45099 25.884C2.92921 25.3622 2.66788 24.7342 2.66699 24V8C2.66699 7.26667 2.92833 6.63911 3.45099 6.11733C3.97366 5.59555 4.60121 5.33422 5.33366 5.33333H12.2337C12.5892 5.33333 12.9283 5.4 13.251 5.53333C13.5737 5.66667 13.8568 5.85555 14.1003 6.1L16.0003 8H28.0003C28.3781 8 28.695 8.128 28.951 8.384C29.207 8.64 29.3345 8.95644 29.3337 9.33333C29.3337 9.71111 29.2057 10.028 28.9497 10.284C28.6937 10.54 28.3772 10.6676 28.0003 10.6667H14.9003L12.2337 8H5.33366V24L7.96699 15.2333C8.14477 14.6556 8.47277 14.1947 8.95099 13.8507C9.42921 13.5067 9.95677 13.3342 10.5337 13.3333H27.7337C28.6448 13.3333 29.3617 13.6947 29.8843 14.4173C30.407 15.14 30.5457 15.9231 30.3003 16.7667L27.9003 24.7667C27.7225 25.3444 27.395 25.8058 26.9177 26.1507C26.4403 26.4956 25.9123 26.6676 25.3337 26.6667H5.33366ZM8.13366 24H25.3337L27.7337 16H10.5337L8.13366 24Z" fill="#474935" />
                    </svg>
                    <Typography className="text-primary font-bold font-crimsonText text-[21px] leading-[29px] md:text-[32px] md:leading-[41px]">
                        {stats.categoryCount}
                    </Typography>
                    <Typography className="font-oxygenMono break-all text-[10px] leading-4 md:text-[14px] md:leading-[18px] text-[#474935CC]">
                        Categories
                    </Typography>
                </li>
                <li style={{ boxShadow: "0px 1px 3px 0px #00000014" }}
                    className=" bg-white flex flex-col list-none justify-center pl-7 rounded-[5px] w-[calc(50%-40px)] md:w-[214px] h-[156px] space-y-1"
                >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.9997 29.3333C12.9108 28.5556 10.3606 26.7831 8.34901 24.016C6.33745 21.2489 5.33212 18.1769 5.33301 14.8V6.66667L15.9997 2.66667L26.6663 6.66667V14.8C26.6663 18.1778 25.661 21.2502 23.6503 24.0173C21.6397 26.7844 19.0895 28.5564 15.9997 29.3333ZM15.9997 26.5333C18.1552 25.8667 19.9552 24.5498 21.3997 22.5827C22.8441 20.6156 23.6886 18.4213 23.933 16H15.9997V5.5L7.99968 8.5V15.4C7.99968 15.5556 8.0219 15.7556 8.06634 16H15.9997V26.5333Z" fill="#474935" />
                    </svg>
                    <Typography className="text-primary font-bold font-crimsonText text-[21px] leading-[29px] md:text-[32px] md:leading-[41px]">
                        {stats.authCount}
                    </Typography>
                    <Typography className="font-oxygenMono break-all text-[10px] leading-4 md:text-[14px] md:leading-[18px] text-[#474935CC]">
                        Authentications
                    </Typography>
                </li>
                <li style={{ boxShadow: "0px 1px 3px 0px #00000014" }}
                    className=" bg-white flex flex-col list-none justify-center pl-7 rounded-[5px] w-[calc(50%-40px)] md:w-[214px] h-[156px] space-y-1"
                >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.33366 29.3333C6.04477 29.3333 4.94477 28.8778 4.03366 27.9667C3.12255 27.0556 2.66699 25.9556 2.66699 24.6667C2.66699 23.3778 3.12255 22.2778 4.03366 21.3667C4.94477 20.4556 6.04477 20 7.33366 20C7.73366 20 8.12255 20.0498 8.50033 20.1493C8.8781 20.2489 9.23366 20.388 9.56699 20.5667L14.667 15.4667V11.8C13.6892 11.5111 12.8892 10.9613 12.267 10.1507C11.6448 9.34 11.3337 8.40089 11.3337 7.33333C11.3337 6.04444 11.7892 4.94444 12.7003 4.03333C13.6114 3.12222 14.7114 2.66666 16.0003 2.66666C17.2892 2.66666 18.3892 3.12222 19.3003 4.03333C20.2114 4.94444 20.667 6.04444 20.667 7.33333C20.667 8.4 20.3559 9.33911 19.7337 10.1507C19.1114 10.9622 18.3114 11.512 17.3337 11.8V15.4667L22.467 20.5667C22.8003 20.3889 23.1505 20.2502 23.5177 20.1507C23.8848 20.0511 24.2679 20.0009 24.667 20C25.9559 20 27.0559 20.4556 27.967 21.3667C28.8781 22.2778 29.3337 23.3778 29.3337 24.6667C29.3337 25.9556 28.8781 27.0556 27.967 27.9667C27.0559 28.8778 25.9559 29.3333 24.667 29.3333C23.3781 29.3333 22.2781 28.8778 21.367 27.9667C20.4559 27.0556 20.0003 25.9556 20.0003 24.6667C20.0003 24.2667 20.0501 23.8778 20.1497 23.5C20.2492 23.1222 20.3883 22.7667 20.567 22.4333L16.0003 17.8667L11.4337 22.4333C11.6114 22.7667 11.7505 23.1222 11.851 23.5C11.9514 23.8778 12.0012 24.2667 12.0003 24.6667C12.0003 25.9556 11.5448 27.0556 10.6337 27.9667C9.72255 28.8778 8.62255 29.3333 7.33366 29.3333ZM24.667 26.6667C25.2225 26.6667 25.695 26.4724 26.0843 26.084C26.4737 25.6956 26.6679 25.2231 26.667 24.6667C26.667 24.1111 26.4728 23.6391 26.0843 23.2507C25.6959 22.8622 25.2234 22.6676 24.667 22.6667C24.1114 22.6667 23.6394 22.8613 23.251 23.2507C22.8625 23.64 22.6679 24.112 22.667 24.6667C22.667 25.2222 22.8617 25.6947 23.251 26.084C23.6403 26.4733 24.1123 26.6676 24.667 26.6667ZM16.0003 9.33333C16.5559 9.33333 17.0283 9.13911 17.4177 8.75066C17.807 8.36222 18.0012 7.88977 18.0003 7.33333C18.0003 6.77777 17.8061 6.30578 17.4177 5.91733C17.0292 5.52889 16.5568 5.33422 16.0003 5.33333C15.4448 5.33333 14.9728 5.528 14.5843 5.91733C14.1959 6.30666 14.0012 6.77866 14.0003 7.33333C14.0003 7.88889 14.195 8.36133 14.5843 8.75066C14.9737 9.14 15.4457 9.33422 16.0003 9.33333ZM7.33366 26.6667C7.88921 26.6667 8.36166 26.4724 8.75099 26.084C9.14033 25.6956 9.33455 25.2231 9.33366 24.6667C9.33366 24.1111 9.13944 23.6391 8.75099 23.2507C8.36255 22.8622 7.8901 22.6676 7.33366 22.6667C6.7781 22.6667 6.3061 22.8613 5.91766 23.2507C5.52921 23.64 5.33455 24.112 5.33366 24.6667C5.33366 25.2222 5.52833 25.6947 5.91766 26.084C6.30699 26.4733 6.77899 26.6676 7.33366 26.6667Z" fill="#474935" />
                    </svg>
                    <Typography className="text-primary font-bold font-crimsonText text-[21px] leading-[29px] md:text-[32px] md:leading-[41px]">
                        -
                    </Typography>
                    <Typography className="font-oxygenMono break-all text-[10px] leading-4 md:text-[14px] md:leading-[18px] text-[#474935CC]">
                        Distributors
                    </Typography>
                </li>
            </div>

            {/* Graph */}
            <div className="w-full flex flex-col rounded-[5px] min-h-[315px] bg-white mt-[47px] pt-[23px] pl-[37px]"
                style={{ boxShadow: "0px 1px 3px 0px #00000014" }}
            >
                <Typography className="text-primary font-crimsonText font-semibold text-[20px] leading-[26px] text-justify">
                    Authentications
                </Typography>
                <div className="">
                    {/* <Typography className="font-crimsonText font-bold text-[20px] leading-[26px]">Coming soon (Chat)</Typography> */}
                    <AuthCharts
                        labels={months}
                        values={authentications}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="w-full flex flex-col rounded-[5px] min-h-[315px] bg-white mt-[47px] pt-[23px] pl-[37px]"
                style={{ boxShadow: "0px 1px 3px 0px #00000014" }}
            >
                <div className="w-full flex items-center justify-between">
                    <Typography className="text-primary font-crimsonText font-semibold text-[20px] leading-[26px] text-justify">
                        Authentication Requests
                    </Typography>
                    <Button variant="text" onClick={handleViewAll}>
                        View all
                    </Button>
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
                            {!fetchingAuths && auths?.slice(0, 5).map(({ product, createdAt, requester, productId, status }, index) => (
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
                                    <td className="p-4" >
                                        <Tooltip content={requester}>
                                            <Typography variant="small" color="blue-gray" className="font-medium">
                                                {requester ? LimitDisplayableTexts(requester, 10) : "-"}
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

export default Dashboard;
