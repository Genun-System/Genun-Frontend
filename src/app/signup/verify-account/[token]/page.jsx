"use client"

import { useParams, useRouter } from "next/navigation";
import { Spinner, Typography } from "../../../components/MaterialTailwind"
import React, { useState, useEffect } from "react"
import { verifyAccount } from "@/app/actions/auth";
import { toast } from "react-toastify";

const VerifyAccount = () => {
    const [verifying, setVerifying] = useState(true);
    const param = useParams();
    const router = useRouter();

    useEffect(() => {
        const _verifyAccount = async () => {
            setVerifying(true);
            
            try {
                const response = await verifyAccount(param?.token);
                if (response.ok) {
                    setVerifying(false)
                    setTimeout(() => {
                        router.replace("/login")
                    }, 2000)
                }

                else {
                    const result = await response.json();
                    //setVerifying(false)
                    if (result?.message) {
                        toast.error(result?.message)
                    }

                }
            }

            catch (err) {
                console.log("error:", err)
                //setVerifying(false)
                if (err?.response?.data?.message) {
                    toast.error(err?.response.data?.message)
                }
                console.log(err)
                toast.error("Failed to verify your account. Please reach out to our support to log your issues")
            }
        }
        _verifyAccount();
    }, [param])

    return (
        <section className="h-[calc(100vh-84px)] px-[30px] flex items-center  tabletland:h-[calc(100vh-107px)] -mt-[84px] tabletland:-mt-[107px]">
            {
                verifying ?
                    <div className="flex flex-col items-center">
                        <Spinner color="#235789" className="h-10 w-10" />
                        <Typography className="mt-6 font-oxygen font-normal  text-center text-[16px] leading-[19px] md:text-[20px]  md:leading-[25px] text-[#474935]">
                            Please wait, we are verifying your account
                        </Typography>
                    </div> :
                    <div>
                        <Typography className="font-crimsonText text-center text-[21px] leading-[32px] md:text-[32px] font-semibold md:leading-[41px] text-[#474935]">
                            Verification complete, you are trendsetting
                            <span variant="" className="font-crimsonText text-[21px] leading-[32px] md:text-[32px] font-semibold md:leading-[41px] text-primary">
                                {" "}originality
                            </span>
                        </Typography>
                        <Typography className="mt-6 font-oxygen font-normal  text-center text-[16px] leading-[19px] md:text-[20px]  md:leading-[25px] text-[#474935]">
                            Please wait, You will be redirected to login shortly
                        </Typography>
                    </div>
            }
        </section>
    )
}

export default VerifyAccount;
