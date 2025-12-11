"use client";

import Image from "next/image";
import WalletLogo from "../../assets/images/wallet_logo.svg";
import { useAccount, useBalance, useWatchContractEvent } from "wagmi";
import formatWalletAddres
    from "../../utils/formatWalletAddress";
import { Typography } from "../../components/MaterialTailwind";
import SideNav from "./sideNav";
import Drawer from "./Drawer";
import { ConnectButton } from "../../components/Ranbowkit"
import { useEffect, useState } from "react";
import AuthProvider from "../../context/User";
import RequireAuth from "@/app/wrapper/RequireAuth";
import { getUser } from "@/app/actions/auth";
import DeployContractDialog from "./DeployContractDialog";
import { toast } from "react-toastify";
import { POOS_FACTORY_CONRACT_ADDRESS } from "@/app/config";
import abi from "@/app/utils/abi";
import ERCDeployAlert from "./ERCDeployAlert";

const DashboardLayout = ({ children }) => {
    const { isConnected, address, } = useAccount();
    const result = useBalance({
        address: address
    });

    const [user, setUser] = useState(null);
    const [fetching, setFetching] = useState(false)
    const [open, setOpen] = useState(false);;



    useEffect(() => {
        const fetchUser = async () => {
            setFetching(true)
            try {
                const response = await getUser();
                const result = await response.json();
                if (response.ok) {
                    setUser(result?.user)
                    setFetching(false)
                }

                else {

                    setFetching(false)
                    if (result?.message) {
                        toast.error(result?.message)
                    }

                }
            }
            catch (err) {
                console.log("error:", err)
                setFetching(false)
                if (err?.response?.data?.message) {
                    toast.error(err?.response.data?.message)
                }
                console.log(err)
            }
        }

        fetchUser();
    }, [])

    return (
        <RequireAuth>
            <AuthProvider value={{ user, setUser }}>
                <main className="flex min-h-screen overflow-y-none flex-col tabletland:flex-row relative">
                    {/*  Side nav */}
                    <div className=" hidden tabletland:block tabletland:w-[282px]">
                        <SideNav />
                    </div>
                    {/*  Drawer  */}
                    <div className="tabletland:hidden">
                        <Drawer />
                    </div>
                    <div className="flex  w-full  flex-col px-[15px] md:px-[30px] tabletland:px-[65px] pt-8 tabletland:pt-[55px]">
                        {
                            isConnected ?
                                <div className="self-end px-4 py-2 md:px-6 md:py-[10px] border rounded-[5px] border-[#4749354D] flex items-center space-x-[15px]">
                                    <div className="w-[30px] h-[30px] rounded-full bg-[#47493533] flex  items-center justify-center">
                                        <Image width={16} height={16} src={WalletLogo} alt="" />
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <Typography className="text-[#474935] font-semibold font-inter text-[16px] leading-[24px]">
                                            {result?.isFetched ? Number(result.data.formatted).toFixed(6) : ""} <span> {result?.isFetched ? result.data.symbol : ""}</span>
                                        </Typography>
                                        <Typography className="text-primary text-[12px] leading-[12px] font-inter">
                                            {formatWalletAddres(address)}
                                        </Typography>
                                    </div>
                                </div> :
                                <div className="self-end" >
                                    <ConnectButton showBalance={false} />
                                </div>
                        }
                        <div className="">
                            {
                                user && !(user?.contractAddress) &&
                                <ERCDeployAlert setOpen={setOpen} />
                            }
                            {children}
                        </div>
                    </div>
                    <DeployContractDialog open={open} setOpen={setOpen} />
                </main>
            </AuthProvider>
        </RequireAuth>
    )
}


export default DashboardLayout;