'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { checkNetworkConnectivity } from '../utils/rpcErrorHandler';

// Inner component that uses hooks
const NetworkStatusInner = () => {
    const [networkStatus, setNetworkStatus] = useState('checking');
    const [lastChecked, setLastChecked] = useState(null);
    const { isConnected } = useAccount();
    const chainId = useChainId();

    const checkNetwork = async () => {
        setNetworkStatus('checking');
        try {
            const isAvailable = await checkNetworkConnectivity();
            setNetworkStatus(isAvailable ? 'connected' : 'disconnected');
            setLastChecked(new Date());
        } catch (error) {
            setNetworkStatus('error');
            setLastChecked(new Date());
        }
    };

    useEffect(() => {
        if (isConnected) {
            checkNetwork();
            // Check network status every 30 seconds
            const interval = setInterval(checkNetwork, 30000);
            return () => clearInterval(interval);
        }
    }, [isConnected]);

    if (!isConnected) {
        return null;
    }

    const isCorrectNetwork = chainId === baseSepolia.id;
    
    const getStatusColor = () => {
        if (!isCorrectNetwork) return 'bg-yellow-500';
        switch (networkStatus) {
            case 'connected': return 'bg-green-500';
            case 'disconnected': return 'bg-red-500';
            case 'error': return 'bg-red-500';
            case 'checking': return 'bg-yellow-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusText = () => {
        if (!isCorrectNetwork) {
            return `Wrong Network (Connected to Chain ID: ${chainId})`;
        }
        switch (networkStatus) {
            case 'connected': return 'Network Connected';
            case 'disconnected': return 'Network Disconnected';
            case 'error': return 'Network Error';
            case 'checking': return 'Checking Network...';
            default: return 'Unknown Status';
        }
    };

    const getStatusMessage = () => {
        if (!isCorrectNetwork) {
            return `Please switch to Base Sepolia (Chain ID: ${baseSepolia.id}) to use this application.`;
        }
        switch (networkStatus) {
            case 'connected': return 'All systems operational';
            case 'disconnected': return 'Unable to connect to blockchain network. Please check your internet connection.';
            case 'error': return 'Network connection error. Some features may not work properly.';
            case 'checking': return 'Verifying network connection...';
            default: return '';
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className={`
                flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg text-white text-sm
                ${!isCorrectNetwork ? 'bg-yellow-600' : 
                  networkStatus === 'connected' ? 'bg-green-600' : 
                  networkStatus === 'disconnected' || networkStatus === 'error' ? 'bg-red-600' : 
                  'bg-yellow-600'}
                transition-all duration-300
            `}>
                <div className={`w-2 h-2 rounded-full ${getStatusColor()} ${
                    networkStatus === 'checking' ? 'animate-pulse' : ''
                }`}></div>
                
                <div className="flex flex-col">
                    <span className="font-medium">{getStatusText()}</span>
                    <span className="text-xs opacity-90">{getStatusMessage()}</span>
                    {lastChecked && (
                        <span className="text-xs opacity-75">
                            Last checked: {lastChecked.toLocaleTimeString()}
                        </span>
                    )}
                </div>

                {(networkStatus === 'disconnected' || networkStatus === 'error') && (
                    <button
                        onClick={checkNetwork}
                        className="ml-2 px-2 py-1 bg-white bg-opacity-20 rounded text-xs hover:bg-opacity-30 transition-colors"
                    >
                        Retry
                    </button>
                )}
            </div>
        </div>
    );
};

// Wrapper component that handles SSR
const NetworkStatus = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Return nothing during SSR
    if (!isClient) {
        return null;
    }

    // Return full component with Web3 hooks on client side
    return <NetworkStatusInner />;
};

export default NetworkStatus;