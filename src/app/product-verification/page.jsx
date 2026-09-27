"use client";
import { Typography } from "../components/MaterialTailwind";
import { STELLAR } from "../config";

const ProductVerification = () => {
    return (
        <div className="flex-1 flex text-center items-center justify-center flex-col gap-2 px-6">
            <Typography className="text-white">
                Scan a product QR code or open /product-verification/&lt;productId&gt;
            </Typography>
            <Typography className="text-white/60 text-sm break-all">
                Genun contract: {STELLAR.contractId || "(set NEXT_PUBLIC_GENUN_CONTRACT_ID)"}
            </Typography>
        </div>
    )
}

export default ProductVerification;
