"use client";

import Button from "../../components/Button";
import { Alert, Typography } from "../../components/MaterialTailwind";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const ERCDeployAlert = ({ setOpen }) => {
    return (
        <div>
            <Alert className="my-4 bg-white text-[#ffcc00]" icon={<InformationCircleIcon width={32} height={32} />}>
                <div className="flex flex-col md:flex-row items-start md:justify-between space-x-10">
                    <Typography className="font-oxygen font-normal text-justify text-[14px] leading-[18px] md:text-[16px] md:leading-[22px] ">
                        Connect Freighter and save your Stellar address to tokenize products
                        on the Genun Soroban contract.
                    </Typography>
                    <Button title="Connect wallet" variant="text" onClick={() => setOpen(true)}>
                        Connect
                    </Button>
                </div>
            </Alert>
        </div>
    );
};

export default ERCDeployAlert;
