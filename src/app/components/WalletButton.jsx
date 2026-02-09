'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const WalletButton = ({ pathname, headerButton, isMobile, onClose }) => {
    const { isConnected, address } = useAccount();

    const handleClick = (callback) => {
        if (isMobile && onClose) {
            callback();
            onClose();
        } else {
            callback();
        }
    };

    const buttonClasses = isMobile 
        ? "mt-4 px-6 py-3 text-white rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer font-medium w-full"
        : "px-6 py-2 text-white rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer font-medium hover:shadow-lg hover:shadow-blue-400/25";

    const accountButtonClasses = isMobile
        ? "mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-green-500/20 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-all duration-300 cursor-pointer w-full"
        : "flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-all duration-300 cursor-pointer";

    if (isConnected && address) {
        return (
            <ConnectButton.Custom>
                {({ openAccountModal, mounted }) => {
                    return (
                        <button
                            onClick={() => handleClick(openAccountModal)}
                            disabled={!mounted}
                            className={accountButtonClasses}
                        >
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-400 font-mono text-sm">
                                {address.slice(0, 6)}...{address.slice(-4)}
                            </span>
                        </button>
                    );
                }}
            </ConnectButton.Custom>
        );
    }

    if (pathname === "/get-started") {
        return (
            <ConnectButton.Custom>
                {({ openConnectModal, mounted }) => {
                    return (
                        <button 
                            onClick={() => handleClick(openConnectModal)}
                            disabled={!mounted}
                            className={buttonClasses}
                            style={{backgroundColor: '#00AFFF'}}
                        >
                            Connect Wallet
                        </button>
                    );
                }}
            </ConnectButton.Custom>
        );
    }

    return (
        <button 
            onClick={() => {
                headerButton.action();
                if (isMobile && onClose) onClose();
            }}
            className={buttonClasses}
            style={{backgroundColor: '#00AFFF'}}
        >
            {headerButton.text}
        </button>
    );
};

export default WalletButton;
