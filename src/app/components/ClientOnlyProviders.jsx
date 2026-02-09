'use client';
import { useState, useEffect } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import CustomRainbowKitProvider from './CustomRainbowKitProvider';
import WalletConnectionFallback from './WalletConnectionFallback';
import NetworkStatus from './NetworkStatus';
import { wagmiConfig } from "../config";
import { enableErrorSuppression, disableErrorSuppression } from "../utils/errorSuppression";

export default function ClientOnlyProviders({ children }) {
  const [isClient, setIsClient] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          // Don't retry WebSocket connection errors
          if (error?.message?.includes('WebSocket')) {
            return false;
          }
          return failureCount < 3;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  }));

  // Only initialize on client side
  useEffect(() => {
    setIsClient(true);
    enableErrorSuppression();
    
    // Add a small delay to ensure wagmiConfig is fully initialized
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    
    return () => {
      clearTimeout(timer);
      disableErrorSuppression();
    };
  }, []);

  // Show loading state during SSR and initial mount
  if (!isClient || !isMounted || !wagmiConfig) {
    return (
      <div suppressHydrationWarning style={{ minHeight: '100vh' }}>
        {/* Empty div to prevent hydration mismatch */}
      </div>
    );
  }

  // Only render Web3 providers on client with valid config
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <CustomRainbowKitProvider>
          <WalletConnectionFallback>
            <NetworkStatus />
            {children}
          </WalletConnectionFallback>
        </CustomRainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}