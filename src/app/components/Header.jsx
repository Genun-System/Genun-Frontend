"use client"
import Image from "next/image";
import Link from "next/link";
import WalletLogo from "../assets/images/wallet_logo.svg";
import { useAccount, useBalance } from "wagmi";
import { Typography } from "./MaterialTailwind";
import formatWalletAddres
 from "../utils/formatWalletAddress";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
    const { isConnected, address, } = useAccount();
    const result = useBalance({
        address: address
    });


    return (
        <header className="flex flex-row w-full justify-between items-center pt-8 tabletland:pt-[55px] px-10 tabletland:px-[91px]">
            <Link href={"/"}>
                <img src="/Logo1.svg" alt="genun-logo" />
            </Link>
            {/* {
                isConnected ?
                    <div className="px-4 py-2 md:px-6 md:py-[10px] border rounded-[5px] border-[#4749354D] flex items-center space-x-[15px]">
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
                    </div> : null
            } */}

            <ConnectButton showBalance={true} />
        </header>
    )
}

export default Header;
