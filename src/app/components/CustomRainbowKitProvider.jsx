'use client';

import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';

const CustomRainbowKitProvider = ({ children }) => {
  useEffect(() => {
    // Additional WebSocket error suppression specifically for RainbowKit
    const suppressRainbowKitErrors = () => {
      // Override fetch to handle WebSocket upgrade failures
      const originalFetch = window.fetch;
      window.fetch = async (...args) => {
        try {
          return await originalFetch(...args);
        } catch (error) {
          if (error.message?.includes('WebSocket') || 
              error.message?.includes('relay.walletconnect')) {
            // Return a mock successful response for WebSocket failures
            return new Response(JSON.stringify({ success: false }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' }
            });
          }
          throw error;
        }
      };
    };

    suppressRainbowKitErrors();
  }, []);

  return (
    <RainbowKitProvider
      theme={lightTheme({
        accentColor: '#235789',
        accentColorForeground: 'white',
        borderRadius: 'medium',
        fontStack: 'system',
      })}
      showRecentTransactions={true}
      // Additional configuration to handle connection issues
      modalSize="compact"
      initialChain={84532} // Base Sepolia chain ID
    >
      {children}
    </RainbowKitProvider>
  );
};

export default CustomRainbowKitProvider;