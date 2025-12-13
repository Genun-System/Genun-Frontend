'use client';

import { useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';

const WalletConnectionFallback = ({ children }) => {
  const [connectionError, setConnectionError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Only use Wagmi hooks on client side
  const account = isClient ? useAccount() : { isConnected: false };
  const connect = isClient ? useConnect() : { connectors: [], connect: () => {} };
  
  const { isConnected } = account;
  const { connectors } = connect;

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    // Monitor for WebSocket connection errors
    const handleError = (event) => {
      if (event.reason?.message?.includes('WebSocket connection failed')) {
        setConnectionError(true);
        // Show fallback after 5 seconds if still having issues
        setTimeout(() => {
          if (!isConnected) {
            setShowFallback(true);
          }
        }, 5000);
      }
    };

    window.addEventListener('unhandledrejection', handleError);
    
    return () => {
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, [isConnected, isClient]);

  // Reset fallback when connection is successful
  useEffect(() => {
    if (isConnected) {
      setConnectionError(false);
      setShowFallback(false);
    }
  }, [isConnected]);

  if (showFallback && connectionError && !isConnected) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg shadow-lg max-w-sm">
        <div className="flex items-start">
          <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="font-medium text-sm">Connection Issue</h4>
            <p className="text-xs mt-1">
              Having trouble connecting? Try using a different wallet or refresh the page.
            </p>
            <button
              onClick={() => setShowFallback(false)}
              className="text-xs underline mt-2 hover:no-underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default WalletConnectionFallback;