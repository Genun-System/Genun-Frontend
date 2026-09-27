"use client";

import { useStellarWallet } from "../../stellar/StellarWalletProvider";

export function ConnectButton({ label = "Connect Freighter" }) {
  const { connect, disconnect, isConnected, address, connecting } = useStellarWallet();

  if (isConnected && address) {
    return (
      <button
        type="button"
        onClick={disconnect}
        className="rounded-[5px] bg-primary px-4 py-2 text-sm font-semibold text-white"
      >
        {address.slice(0, 4)}…{address.slice(-4)} · Disconnect
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={connecting}
      onClick={() => connect().catch(() => {})}
      className="rounded-[5px] bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
    >
      {connecting ? "Connecting…" : label}
    </button>
  );
}

export default ConnectButton;
