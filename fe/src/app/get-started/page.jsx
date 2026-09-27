'use client'

import { useRouter } from "next/navigation";
import { ConnectButton } from "../components/Ranbowkit";
import { useStellarWallet } from "../stellar/StellarWalletProvider";
import { useEffect } from 'react';

const GetStarted = () => {
    const router = useRouter();
    const { isConnected, address } = useStellarWallet();

    useEffect(() => {
        if (isConnected && address) {
            console.log('Freighter connected:', address);
        }
    }, [isConnected, address]);

    return (
        <section className="py-24 px-8">
            <div className="max-w-md mx-auto text-center">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        We help you be just
                        <span className="text-blue-400"> YOU</span>
                    </h1>
                    <p className="text-gray-300">
                        Connect Freighter (Stellar Testnet) to get started with Genun
                    </p>
                </div>

                {isConnected ? (
                    <div className="space-y-6">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white">Wallet Connected!</h2>
                        <p className="text-gray-400 text-sm break-all">{address}</p>
                        <div className="space-y-4">
                            <button
                                onClick={() => router.push('/signup?wallet=connected')}
                                className="w-full px-6 py-3 text-white rounded-lg font-medium"
                                style={{ backgroundColor: '#00AFFF' }}
                            >
                                Continue to Sign Up
                            </button>
                            <button
                                onClick={() => router.push('/login?wallet=connected')}
                                className="w-full px-6 py-3 border border-white/30 text-white rounded-lg font-medium"
                            >
                                Continue to Login
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <ConnectButton label="Connect Freighter" />
                        <button
                            onClick={() => router.push('/login')}
                            className="w-full px-6 py-3 border border-white/30 text-white rounded-lg font-medium"
                        >
                            Continue with Email
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default GetStarted;
