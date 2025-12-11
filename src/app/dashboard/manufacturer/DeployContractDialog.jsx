"use client";

import React, { useState } from "react";
import {
    //Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Spinner,
    Typography
} from "@/app/components/MaterialTailwind";
import { userContext } from "@/app/context/User";
import Button from "@/app/components/Button";
import { useWriteContract, useAccount, useConfig, useWatchContractEvent } from "wagmi";
import { POOS_FACTORY_CONRACT_ADDRESS } from "@/app/config";
import abi from "@/app/utils/abi";
import { toast } from "react-toastify";
import { updateUser } from "@/app/actions/auth";
import { getTransactionReceipt } from 'wagmi/actions'



const DeployContractDialog = ({open, setOpen}) => {
    
    const { user, setUser } = React.useContext(userContext);
    const { writeContract, isPending, reset, data, } = useWriteContract()
    const { address, } = useAccount();
    const [confirming, setConfirming] = useState(false);
    const config = useConfig()

    // useWatchContractEvent({
    //     address: POOS_FACTORY_CONRACT_ADDRESS,
    //     abi,
    //     eventName: 'NewPOoSTokenCreated', 
    //     onLogs: async (logs)=> {
    //         console.log("logs:",logs)
    //       if (logs[0].args[2]===address) {
    //         //update user data with their smart contract 
    //         const payload = { contractAddress:logs[0].args[0] }
    //         const response = await updateUser(payload, user?._id);
    //         const result = await response.json();
    //         setUser(result?.singleUser);
    //         //setOpen(false)
    //         toast.success("Congratulations! Your contract has been deployed. You can now mint the digitalized token of your product on the blockchain")
    //         setOpen(false)
    //       }
    //     },
    //   })



    React.useEffect(() => {

        if (user && (!(user?.contractAddress) || user?.isFirstTimeLogin)) {
            setOpen(true)
        }
    }, [user])

    const handleOpen = () => setOpen(!open);

    const deployERC1155 = async () => {
        writeContract(
            {
                abi,
                address: POOS_FACTORY_CONRACT_ADDRESS,
                functionName: 'createNewPOoS',
                args: [
                    `${process.env.NEXT_PUBLIC_PROD_URL}product-verification/{id}`,
                ],
            },
            {
                onSuccess: async (res, variable) => {
                    setConfirming(true);
                    const intervalResult = setInterval(async () => {
                        try {
                            const result = await getTransactionReceipt(config, {
                                hash: res,
                            })
                            //console.log("Deployment result:", result?.logs[0]?.address)
                            const address = result?.logs[0]?.address
                            if (address) {
                                const payload = { contractAddress: address }
                                const response = await updateUser(payload, user?._id);
                                const result = await response.json();
                                setUser(result?.singleUser);
                                setOpen(false)
                                toast.success("Congratulations! Your contract has been deployed. You can now mint the digitalized token of your product on the blockchain")
                                setOpen(false)
                                clearInterval(intervalResult)
                            }
                        }

                        catch (err) {
                            console.log(err);
                        }
                    }, 3000)

                },


                onError: (err) => {
                    console.log("Error", err)
                    setOpen(false)
                    toast.error("Oops! We couldn't deploy your contract. Please try again and ensure your wallet is connected with enough funds")
                }
            }
        )
    }


    return (
        <>

            <Dialog open={open} >
                <DialogHeader>Hello, {user?.name}</DialogHeader>
                <DialogBody>
                    {
                        isPending || confirming ?
                            <div className="flex flex-col items-center">
                                <Spinner color="#235789" className="h-10 w-10" />
                                <Typography className="mt-6 font-oxygen font-normal  text-center text-[16px] leading-[19px] md:text-[20px]  md:leading-[25px] text-[#474935]">
                                    {
                                        !confirming ? "Please wait, deployment process started" :
                                            "Deployment successful! Please wait for confirmation."
                                    }
                                </Typography>
                            </div> :
                            `Are you ready to embark on the journey of ensuring the authenticity of your
                        products across the supply chain? If so, we'd like to seek your permission
                        to assist you in deploying your product's digital token smart contract on
                        the blockchain as part of the onboarding process.`
                    }
                </DialogBody>
                <DialogFooter>
                    {
                        !confirming &&
                        <Button
                            variant="text"
                            onClick={!isPending ? handleOpen : () => reset()}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                    }
                    {
                        !isPending && !confirming &&
                        <Button variant="filled" color="#235789" onClick={deployERC1155}>
                            <span>Ok</span>
                        </Button>
                    }
                </DialogFooter>
            </Dialog>
        </>
    );
}


export default DeployContractDialog;
