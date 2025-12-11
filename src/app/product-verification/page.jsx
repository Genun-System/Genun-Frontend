"use client";
import { Typography } from "@/app/components/MaterialTailwind";
import { useAccount, useReadContract } from "wagmi";
import { POOS_FACTORY_CONRACT_ADDRESS } from "../config";
import abi from "../utils/abi";

const ProductVerification = () => {
    const { isConnected, address, } = useAccount();
    const result = useReadContract({
        abi,
        address: POOS_FACTORY_CONRACT_ADDRESS,
        functionName: 'getMintedTokenAddress',
        args: [
            address,
        ],
    })
    return (
        <div className="flex-1 flex text-center items-center justify-center">
            <Typography>{result?.data}</Typography>
        </div>
    )
}


export default ProductVerification;
