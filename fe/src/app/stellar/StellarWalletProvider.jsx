"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  isConnected,
  requestAccess,
  getAddress,
  getNetwork,
} from "@stellar/freighter-api";
import { STELLAR } from "../config";

const StellarWalletContext = createContext({
  address: null,
  isConnected: false,
  connecting: false,
  network: null,
  connect: async () => {},
  disconnect: () => {},
  refresh: async () => {},
});

export function StellarWalletProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [network, setNetwork] = useState(null);
  const [connecting, setConnecting] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const connected = await isConnected();
      if (!connected?.isConnected && connected !== true) {
        // freighter-api returns { isConnected: bool } in newer versions
        const ok = typeof connected === "boolean" ? connected : connected?.isConnected;
        if (!ok) {
          setAddress(null);
          return;
        }
      }
      const addrRes = await getAddress();
      const addr = typeof addrRes === "string" ? addrRes : addrRes?.address;
      if (addr) setAddress(addr);
      try {
        const net = await getNetwork();
        setNetwork(typeof net === "string" ? net : net?.network || net?.networkPassphrase);
      } catch (_) {}
    } catch (_) {
      setAddress(null);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const connect = useCallback(async () => {
    setConnecting(true);
    try {
      const access = await requestAccess();
      const addr = typeof access === "string" ? access : access?.address;
      if (!addr) {
        throw new Error(access?.error || "Freighter access denied");
      }
      setAddress(addr);
      try {
        const net = await getNetwork();
        setNetwork(typeof net === "string" ? net : net?.network || net?.networkPassphrase);
      } catch (_) {}
      return addr;
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
  }, []);

  const value = useMemo(
    () => ({
      address,
      isConnected: Boolean(address),
      connecting,
      network: network || STELLAR.network,
      connect,
      disconnect,
      refresh,
    }),
    [address, connecting, network, connect, disconnect, refresh]
  );

  return (
    <StellarWalletContext.Provider value={value}>
      {children}
    </StellarWalletContext.Provider>
  );
}

export function useStellarWallet() {
  return useContext(StellarWalletContext);
}
