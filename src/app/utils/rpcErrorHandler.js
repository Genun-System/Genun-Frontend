/**
 * RPC Error Handler Utility
 * Provides fallback RPC endpoints and error handling for blockchain interactions
 */

// Base Sepolia RPC endpoints (fallbacks)
export const BASE_SEPOLIA_RPC_URLS = [
    'https://sepolia.base.org',
    'https://base-sepolia.blockpi.network/v1/rpc/public',
    'https://base-sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', // Public Infura endpoint
    'https://base-sepolia-rpc.publicnode.com'
];

/**
 * Check if an error is related to RPC issues
 * @param {Error} error - The error to check
 * @returns {boolean} - True if it's an RPC-related error
 */
export const isRpcError = (error) => {
    const rpcErrorPatterns = [
        'Internal JSON-RPC error',
        'An internal error was received',
        'network error',
        'timeout',
        'connection refused',
        'rate limit',
        'service unavailable'
    ];
    
    const errorMessage = error.message?.toLowerCase() || '';
    return rpcErrorPatterns.some(pattern => errorMessage.includes(pattern.toLowerCase()));
};

/**
 * Check if an error is related to insufficient gas
 * @param {Error} error - The error to check
 * @returns {boolean} - True if it's a gas-related error
 */
export const isGasError = (error) => {
    const gasErrorPatterns = [
        'insufficient funds',
        'gas required exceeds allowance',
        'out of gas',
        'gas limit exceeded'
    ];
    
    const errorMessage = error.message?.toLowerCase() || '';
    return gasErrorPatterns.some(pattern => errorMessage.includes(pattern.toLowerCase()));
};

/**
 * Check if an error is related to user rejection
 * @param {Error} error - The error to check
 * @returns {boolean} - True if the user rejected the transaction
 */
export const isUserRejectionError = (error) => {
    const rejectionPatterns = [
        'user rejected',
        'user denied',
        'user cancelled',
        'transaction was rejected'
    ];
    
    const errorMessage = error.message?.toLowerCase() || '';
    return rejectionPatterns.some(pattern => errorMessage.includes(pattern.toLowerCase()));
};

/**
 * Get a user-friendly error message based on the error type
 * @param {Error} error - The error to analyze
 * @returns {string} - User-friendly error message
 */
export const getErrorMessage = (error) => {
    if (isUserRejectionError(error)) {
        return "Transaction was cancelled by user.";
    }
    
    if (isGasError(error)) {
        return "Insufficient funds for gas fees. Please add more ETH to your wallet.";
    }
    
    if (isRpcError(error)) {
        return "Network connection issue. Please try again or check your internet connection.";
    }
    
    if (error.message?.includes('execution reverted')) {
        return "Contract execution failed. Please check the transaction parameters.";
    }
    
    if (error.message?.includes('nonce')) {
        return "Transaction nonce error. Please reset your wallet or try again.";
    }
    
    return "Transaction failed. Please try again or contact support if the issue persists.";
};

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise} - Promise that resolves with the function result
 */
export const retryWithBackoff = async (fn, maxRetries = 3, baseDelay = 1000) => {
    let lastError;
    
    for (let i = 0; i <= maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            
            // Don't retry user rejections
            if (isUserRejectionError(error)) {
                throw error;
            }
            
            // If this is the last attempt, throw the error
            if (i === maxRetries) {
                throw error;
            }
            
            // Calculate delay with exponential backoff
            const delay = baseDelay * Math.pow(2, i);
            console.log(`Retry attempt ${i + 1}/${maxRetries} after ${delay}ms delay`);
            
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    
    throw lastError;
};

/**
 * Estimate gas with fallback values
 * @param {Object} contract - Contract instance
 * @param {string} functionName - Function name to call
 * @param {Array} args - Function arguments
 * @returns {Promise<bigint>} - Estimated gas limit
 */
export const estimateGasWithFallback = async (contract, functionName, args = []) => {
    try {
        // Try to estimate gas
        const estimatedGas = await contract.estimateGas[functionName](...args);
        // Add 20% buffer to the estimated gas
        return (estimatedGas * 120n) / 100n;
    } catch (error) {
        console.warn('Gas estimation failed, using fallback values:', error);
        
        // Fallback gas limits for common functions
        const fallbackGasLimits = {
            'createNewPOoS': 500000n,
            'mint': 200000n,
            'transfer': 100000n,
            'approve': 80000n,
            'setApprovalForAll': 100000n
        };
        
        return fallbackGasLimits[functionName] || 300000n;
    }
};

/**
 * Check network connectivity
 * @returns {Promise<boolean>} - True if network is accessible
 */
export const checkNetworkConnectivity = async () => {
    try {
        const response = await fetch('https://sepolia.base.org', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'eth_blockNumber',
                params: [],
                id: 1
            }),
            timeout: 5000
        });
        
        return response.ok;
    } catch (error) {
        console.warn('Network connectivity check failed:', error);
        return false;
    }
};