"use client"
import { useAccount } from "wagmi";
import Header from "../components/Header";
import { Typography, Spinner } from "../components/MaterialTailwind";
//import ConnectButton from "./components/ConnectButton";
import { ConnectButton } from "../components/Ranbowkit"
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

 function ConnectWallet() {
  const { isConnected, isConnecting, isReconnecting } = useAccount()
  const router = useRouter();
  const param = useSearchParams();

  
  if (isConnected) {
    if (param.get("action") === "login") {
      router.replace("login")
    }
    else if (param.get("action") === "register") {
      router.replace("signup")
    }
  }


  return (
    <main className="flex min-h-screen flex-col relative">
      <div className="absolute">
        <Header />
      </div>
      <div className="flex w-full h-screen flex-col items-center justify-center space-y-12">
        {
          isConnecting || isReconnecting ?
          <Spinner className="h-10 w-10" />:
            <>
              <Typography className="font-crimsonText text-center text-[21px] leading-[32px] md:text-[32px] font-semibold md:leading-[41px] text-[#474935]">
                We love authenticity,
                <span variant="" className="font-crimsonText text-[21px] leading-[32px] md:text-[32px] font-semibold md:leading-[41px] text-primary">
                  {" "}Don’t you?
                </span>
              </Typography>
              {
                !isConnected &&
                <ConnectButton showBalance={true} />
              }
            </> 
            
        }
      </div>
    </main>
  );
}


export default function SuspendedConnectWallet () {
  return (
      <Suspense>
        <ConnectWallet/>
      </Suspense>
  )
}
