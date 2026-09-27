"use client";

import { ConnectButton } from "../../../components/Ranbowkit";
import { useStellarWallet } from "../../../stellar/StellarWalletProvider";
import { Typography } from "../../../components/MaterialTailwind";

const ConnectWalletPage = () => {
  const { isConnected, address } = useStellarWallet();

  return (
    <section className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <Typography className="text-white text-xl font-crimsonText">
        Freighter wallet
      </Typography>
      <ConnectButton />
      {isConnected && address ? (
        <Typography className="text-white/70 text-sm break-all max-w-md text-center">
          {address}
        </Typography>
      ) : null}
    </section>
  );
};

export default ConnectWalletPage;
