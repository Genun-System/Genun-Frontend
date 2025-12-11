"use-client";

import Button from "@/app/components/Button";
import { Alert, Typography } from "@/app/components/MaterialTailwind";
import { InformationCircleIcon } from "@heroicons/react/24/outline";



const ERCDeployAlert = ({ setOpen }) => {
    return (
        <div>
            <Alert className="my-4 bg-white  text-[#ffcc00]" icon={<InformationCircleIcon width={32} height={32} />}>
                <div className="flex flex-col md:flex-row items-start  md:justify-between  space-x-10">
                    <Typography className="font-oxygen font-normal text-justify  text-[14px] leading-[18px] md:text-[16px]  md:leading-[22px] ">
                        You are yet to deploy your token smart contract. Please note
                        that the deployment is a requirement for tokenizing your products on our system
                    </Typography>
                    <Button title="Deploy contract" variant="text"
                        onClick={() => setOpen(true)}
                    >
                        Deploy
                    </Button>
                </div>
            </Alert>
        </div>
    )
}

export default ERCDeployAlert;


