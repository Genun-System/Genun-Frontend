"use client"

import { Typography } from "../../components/MaterialTailwind"
import React from "react"


const RegistrationSuccessful = () => {


    return (
        <section className="h-[calc(100vh-84px)] px-[30px] flex items-center  tabletland:h-[calc(100vh-107px)] -mt-[84px] tabletland:-mt-[107px]">
            <div>
                <Typography className="font-crimsonText text-center text-[21px] leading-[32px] md:text-[32px] font-semibold md:leading-[41px] text-[#474935]">
                    Thank you for joining, you are
                    <span variant="" className="font-crimsonText text-[21px] leading-[32px] md:text-[32px] font-semibold md:leading-[41px] text-primary">
                        {" "}unique {" "}
                    </span>
                    and
                    <span variant="" className="font-crimsonText text-[21px] leading-[32px] md:text-[32px] font-semibold md:leading-[41px] text-primary">
                        {" "}authentic
                    </span>
                </Typography>
                <Typography className="mt-6 font-oxygen font-normal  text-center text-[16px] leading-[19px] md:text-[20px]  md:leading-[25px] text-[#474935]">
                    We sent you a verification mail. Please, check your email.
                </Typography>
            </div>
        </section>
    )
}

export default RegistrationSuccessful;
