'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ConnectWalletContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [action, setAction] = useState('login');
    const { isConnected, address } = useAccount();

    useEffect(() => {
        const actionParam = searchParams.get('action');
        if (actionParam) {
            setAction(actionParam);
        }
    }, [searchParams]);

    // Log wallet connection status
    useEffect(() => {
        if (isConnected && address) {
            console.log('Wallet connected:', address);
        }
    }, [isConnected, address]);

    const handleEmailAuth = () => {
        if (action === 'login') {
            router.push('/login');
        } else {
            // For register, you might want to create a register page
            router.push('/login?mode=register');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            
            <div className="pt-20 px-8">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white mb-4">
                            {action === 'login' ? 'Welcome Back' : 'Get Started'}
                        </h1>
                        <p className="text-gray-300">
                            {action === 'login' 
                                ? 'Connect your wallet or sign in to continue' 
                                : 'Create your account to start protecting your products'
                            }
                        </p>
                    </div>

                    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">
                            Connect Wallet
                        </h2>
                        
                        {isConnected ? (
                            <div className="text-center space-y-6">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white">Wallet Connected!</h3>
                                <p className="text-gray-300 mb-6">
                                    Choose how you&apos;d like to continue:
                                </p>
                                
                                <div className="space-y-4">
                                    <button 
                                        onClick={() => router.push(`/signup?wallet=connected&action=${action}`)}
                                        className="w-full flex items-center justify-center gap-3 px-6 py-3 text-white rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer font-medium hover:shadow-lg hover:shadow-blue-400/25"
                                        style={{backgroundColor: '#00AFFF'}}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                        </svg>
                                        {action === 'register' ? 'Complete Registration' : 'Create New Account'}
                                    </button>
                                    
                                    <button 
                                        onClick={() => router.push(`/login?wallet=connected&action=${action}`)}
                                        className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-600 hover:border-blue-400 text-white rounded-lg transition-all duration-300 hover:bg-gray-800/50 font-medium"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
                                        </svg>
                                        {action === 'login' ? 'Complete Sign In' : 'Sign In to Existing Account'}
                                    </button>
                                </div>
                                
                                <div className="pt-4 border-t border-gray-600">
                                    <p className="text-center text-gray-400 text-sm mb-3">
                                        Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
                                    </p>
                                    <button
                                        onClick={() => router.push('/dashboard/manufacturer')}
                                        className="w-full px-4 py-2 text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-all duration-300 text-sm"
                                    >
                                        Skip & Go to Dashboard
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <p className="text-center text-gray-300 mb-6">
                                    Choose your preferred wallet to connect
                                </p>
                                
                                {/* RainbowKit Connect Button */}
                                <div className="flex justify-center">
                                    <ConnectButton.Custom>
                                        {({
                                            account,
                                            chain,
                                            openAccountModal,
                                            openChainModal,
                                            openConnectModal,
                                            authenticationStatus,
                                            mounted,
                                        }) => {
                                            const ready = mounted && authenticationStatus !== 'loading';
                                            const connected =
                                                ready &&
                                                account &&
                                                chain &&
                                                (!authenticationStatus ||
                                                    authenticationStatus === 'authenticated');

                                            return (
                                                <div
                                                    {...(!ready && {
                                                        'aria-hidden': true,
                                                        'style': {
                                                            opacity: 0,
                                                            pointerEvents: 'none',
                                                            userSelect: 'none',
                                                        },
                                                    })}
                                                >
                                                    {(() => {
                                                        if (!connected) {
                                                            return (
                                                                <button
                                                                    onClick={openConnectModal}
                                                                    type="button"
                                                                    className="w-full px-8 py-4 text-white rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer font-medium hover:shadow-lg hover:shadow-blue-400/25 text-lg"
                                                                    style={{backgroundColor: '#00AFFF'}}
                                                                >
                                                                    Connect Wallet
                                                                </button>
                                                            );
                                                        }

                                                        if (chain.unsupported) {
                                                            return (
                                                                <button
                                                                    onClick={openChainModal}
                                                                    type="button"
                                                                    className="w-full px-8 py-4 bg-red-500 text-white rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer font-medium text-lg"
                                                                >
                                                                    Wrong network
                                                                </button>
                                                            );
                                                        }

                                                        return (
                                                            <div className="flex gap-3">
                                                                <button
                                                                    onClick={openChainModal}
                                                                    className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                                                    type="button"
                                                                >
                                                                    {chain.hasIcon && (
                                                                        <div
                                                                            style={{
                                                                                background: chain.iconBackground,
                                                                                width: 12,
                                                                                height: 12,
                                                                                borderRadius: 999,
                                                                                overflow: 'hidden',
                                                                                marginRight: 4,
                                                                            }}
                                                                        >
                                                                            {chain.iconUrl && (
                                                                                <Image
                                                                                    alt={chain.name ?? 'Chain icon'}
                                                                                    src={chain.iconUrl}
                                                                                    width={12}
                                                                                    height={12}
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                    {chain.name}
                                                                </button>

                                                                <button
                                                                    onClick={openAccountModal}
                                                                    type="button"
                                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                                                >
                                                                    {account.displayName}
                                                                    {account.displayBalance
                                                                        ? ` (${account.displayBalance})`
                                                                        : ''}
                                                                </button>
                                                            </div>
                                                        );
                                                    })()}
                                                </div>
                                            );
                                        }}
                                    </ConnectButton.Custom>
                                </div>
                            </div>
                        )}

                        <div className="mt-8 pt-6 border-t border-gray-600">
                            <p className="text-center text-gray-400 mb-4">Or continue with email</p>
                            <button
                                onClick={handleEmailAuth}
                                className="w-full p-4 border-2 border-gray-600 hover:border-blue-400 text-white rounded-lg transition-all duration-300"
                            >
                                Continue with Email
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <button
                                onClick={() => router.push('/')}
                                className="text-gray-400 hover:text-white transition-colors duration-300"
                            >
                                ← Back to Home
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-sm text-gray-400">
                        <p>
                            {action === 'login' ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => {
                                    const newAction = action === 'login' ? 'register' : 'login';
                                    router.push(`/connect-wallet?action=${newAction}`);
                                }}
                                className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                            >
                                {action === 'login' ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

const ConnectWallet = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-white">Loading...</div>
        </div>}>
            <ConnectWalletContent />
        </Suspense>
    );
};

export default ConnectWallet;