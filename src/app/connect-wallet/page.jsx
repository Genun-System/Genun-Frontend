'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ConnectButton } from "../components/Ranbowkit";
import { useStellarWallet } from "../stellar/StellarWalletProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ConnectWallet = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [action, setAction] = useState('login');
    const { isConnected, address } = useStellarWallet();

    useEffect(() => {
        const actionParam = searchParams.get('action');
        if (actionParam) setAction(actionParam);
    }, [searchParams]);

    const handleEmailAuth = () => {
        if (action === 'login') router.push('/login');
        else router.push('/login?mode=register');
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            <div className="pt-20 px-8 pb-20">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white mb-4">
                            {action === 'login' ? 'Welcome Back' : 'Get Started'}
                        </h1>
                        <p className="text-gray-300">
                            Connect Freighter (Stellar) or continue with email
                        </p>
                    </div>

                    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">
                            Connect Freighter
                        </h2>

                        {isConnected ? (
                            <div className="text-center space-y-6">
                                <h3 className="text-xl font-bold text-white">Wallet Connected!</h3>
                                <p className="text-gray-400 text-sm break-all">{address}</p>
                                <div className="space-y-4">
                                    <button
                                        onClick={() => router.push(`/signup?wallet=connected&action=${action}`)}
                                        className="w-full px-6 py-3 text-white rounded-lg font-medium"
                                        style={{ backgroundColor: '#00AFFF' }}
                                    >
                                        Continue with Freighter
                                    </button>
                                    <button
                                        onClick={handleEmailAuth}
                                        className="w-full px-6 py-3 border border-white/30 text-white rounded-lg"
                                    >
                                        Use Email Instead
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 flex flex-col items-center">
                                <ConnectButton />
                                <button
                                    onClick={handleEmailAuth}
                                    className="w-full px-6 py-3 border border-white/30 text-white rounded-lg"
                                >
                                    Continue with Email
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ConnectWallet;
