'use client';
import { useState, useEffect } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import CustomRainbowKitProvider from './CustomRainbowKitProvider';
import { wagmiConfig } from "../config";
import { enableErrorSuppression, disableErrorSuppression } from "../utils/errorSuppression";

export default function ClientOnlyProviders({ children }) {
  const [isClient, setIsClient] = useState(false);
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
    
    return () => {
      disableErrorSuppression();
    };
  }, []);

  // Don't render Web3 providers during SSR or if wagmiConfig is not available
  if (!isClient || !wagmiConfig) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  }

  // Only render Web3 providers on client with valid config
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <CustomRainbowKitProvider>
          {children}
        </CustomRainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}