"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Spinner,
    Typography
} from "../../components/MaterialTailwind";
import { userContext } from "../../context/User";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { updateUser } from "../../actions/auth";
import { useStellarWallet } from "../../stellar/StellarWalletProvider";
import { isManufacturerOnChain } from "../../stellar/contract";
import { STELLAR } from "../../config";

const ConnectStellarDialog = ({ open, setOpen }) => {
    const { user, setUser } = React.useContext(userContext);
    const { address, connect, isConnected, connecting } = useStellarWallet();
    const [saving, setSaving] = useState(false);
    const [checkingRole, setCheckingRole] = useState(false);

    React.useEffect(() => {
        if (user && (!(user?.stellarAddress) || user?.isFirstTimeLogin)) {
            setOpen(true);
        }
    }, [user, setOpen]);

    const handleOpen = () => setOpen(!open);

    const linkWallet = async () => {
        try {
            setSaving(true);
            let addr = address;
            if (!addr) {
                addr = await connect();
            }
            if (!addr) {
                toast.error("Connect Freighter and approve access");
                return;
            }

            setCheckingRole(true);
            let isMfr = false;
            try {
                if (STELLAR.contractId && STELLAR.contractId !== "REPLACE_AFTER_DEPLOY") {
                    isMfr = await isManufacturerOnChain(addr);
                }
            } catch (e) {
                console.warn("Role check skipped:", e);
            }
            setCheckingRole(false);

            const payload = { stellarAddress: addr, isFirstTimeLogin: false };
            const response = await updateUser(payload, user?._id);
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result?.message || "Failed to save Stellar address");
            }
            setUser(result?.singleUser);
            setOpen(false);
            if (isMfr) {
                toast.success("Freighter linked. You can tokenize products on Stellar.");
            } else {
                toast.success(
                    "Freighter linked. Ask a Genun admin to grant manufacturer role on the contract before creating batches."
                );
            }
        } catch (err) {
            console.error(err);
            toast.error(err?.message || "Could not link Freighter wallet");
        } finally {
            setSaving(false);
            setCheckingRole(false);
        }
    };

    const busy = saving || connecting || checkingRole;

    return (
        <Dialog open={open}>
            <DialogHeader>Hello, {user?.name}</DialogHeader>
            <DialogBody>
                {busy ? (
                    <div className="flex flex-col items-center">
                        <Spinner color="#235789" className="h-10 w-10" />
                        <Typography className="mt-6 font-oxygen font-normal text-center text-[16px] leading-[19px] md:text-[20px] md:leading-[25px] text-[#474935]">
                            {checkingRole
                                ? "Checking manufacturer role on Stellar…"
                                : "Connecting Freighter…"}
                        </Typography>
                    </div>
                ) : (
                    <>
                        Link your Freighter wallet (Stellar Testnet) so Genun can mint product
                        batches on the shared Soroban contract. No per-manufacturer contract
                        deploy is required.
                        {isConnected && address ? (
                            <Typography className="mt-4 break-all text-sm text-[#474935]">
                                Connected: {address}
                            </Typography>
                        ) : null}
                    </>
                )}
            </DialogBody>
            <DialogFooter>
                {!busy && (
                    <Button variant="text" onClick={handleOpen} className="mr-1">
                        <span>Cancel</span>
                    </Button>
                )}
                {!busy && (
                    <Button variant="filled" color="#235789" onClick={linkWallet}>
                        <span>{isConnected ? "Save wallet" : "Connect Freighter"}</span>
                    </Button>
                )}
            </DialogFooter>
        </Dialog>
    );
};

export default ConnectStellarDialog;
