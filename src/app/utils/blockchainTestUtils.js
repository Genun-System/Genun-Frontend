/**
 * Blockchain Test Utilities
 * Helper functions for testing blockchain connectivity and contract interactions
 */

import { POOS_FACTORY_CONRACT_ADDRESS } from '../config';
import { checkNetworkConnectivity, getErrorMessage } from './rpcErrorHandler';

/**
 * Test basic blockchain connectivity
 */
export const testBlockchainConnectivity = async () => {
    console.log('🔍 Testing blockchain connectivity...');
    
    try {
        const isConnected = await checkNetworkConnectivity();
        console.log(`✅ Network connectivity: ${isConnected ? 'Connected' : 'Disconnected'}`);
        return isConnected;
    } catch (error) {
        console.error('❌ Connectivity test failed:', error);
        return false;
    }
};

/**
 * Test contract address validation
 */
export const testContractAddress = () => {
    console.log('🔍 Testing contract configuration...');
    
    if (!POOS_FACTORY_CONRACT_ADDRESS) {
        console.error('❌ Contract address not configured');
        return false;
    }
    
    if (!/^0x[a-fA-F0-9]{40}$/.test(POOS_FACTORY_CONRACT_ADDRESS)) {
        console.error('❌ Invalid contract address format');
        return false;
    }
    
    console.log(`✅ Contract address valid: ${POOS_FACTORY_CONRACT_ADDRESS}`);
    return true;
};

/**
 * Test error message generation
 */
export const testErrorHandling = () => {
    console.log('🔍 Testing error handling...');
    
    const testErrors = [
        new Error('Internal JSON-RPC error'),
        new Error('insufficient funds for gas'),
        new Error('user rejected the request'),
        new Error('execution reverted'),
        new Error('unknown error type')
    ];
    
    testErrors.forEach(error => {
        const message = getErrorMessage(error);
        console.log(`✅ Error "${error.message}" -> "${message}"`);
    });
    
    return true;
};

/**
 * Run all blockchain tests
 */
export const runBlockchainTests = async () => {
    console.log('🚀 Starting blockchain diagnostic tests...\n');
    
    const results = {
        connectivity: await testBlockchainConnectivity(),
        contractAddress: testContractAddress(),
        errorHandling: testErrorHandling()
    };
    
    console.log('\n📊 Test Results Summary:');
    console.log(`Connectivity: ${results.connectivity ? '✅ Pass' : '❌ Fail'}`);
    console.log(`Contract Address: ${results.contractAddress ? '✅ Pass' : '❌ Fail'}`);
    console.log(`Error Handling: ${results.errorHandling ? '✅ Pass' : '❌ Fail'}`);
    
    const allPassed = Object.values(results).every(result => result === true);
    console.log(`\n${allPassed ? '🎉 All tests passed!' : '⚠️ Some tests failed. Check the logs above.'}`);
    
    return results;
};

/**
 * Test wallet connection requirements
 */
export const testWalletRequirements = (address, chainId) => {
    console.log('🔍 Testing wallet requirements...');
    
    const results = {
        connected: !!address,
        correctNetwork: chainId === 84532, // Base Sepolia
        addressFormat: address ? /^0x[a-fA-F0-9]{40}$/.test(address) : false
    };
    
    console.log(`Wallet Connected: ${results.connected ? '✅' : '❌'}`);
    console.log(`Correct Network: ${results.correctNetwork ? '✅' : '❌'} (Current: ${chainId}, Expected: 421614)`);
    console.log(`Valid Address: ${results.addressFormat ? '✅' : '❌'} (${address || 'Not connected'})`);
    
    return results;
};

/**
 * Generate test transaction data
 */
export const generateTestTransactionData = () => {
    return {
        to: POOS_FACTORY_CONRACT_ADDRESS,
        data: '0x156e29f6', // Function selector for createNewPOoS
        value: '0x0',
        gas: '0x7a120', // 500000 in hex
        gasPrice: '0x3b9aca00' // 1 gwei in hex
    };
};

/**
 * Simulate transaction error scenarios
 */
export const simulateTransactionErrors = () => {
    console.log('🔍 Simulating transaction error scenarios...');
    
    const errorScenarios = [
        {
            name: 'RPC Error',
            error: new Error('Internal JSON-RPC error'),
            expectedMessage: 'Network connection issue'
        },
        {
            name: 'Insufficient Funds',
            error: new Error('insufficient funds for gas'),
            expectedMessage: 'Insufficient funds for gas fees'
        },
        {
            name: 'User Rejection',
            error: new Error('user rejected the request'),
            expectedMessage: 'Transaction was cancelled by user'
        }
    ];
    
    errorScenarios.forEach(scenario => {
        const message = getErrorMessage(scenario.error);
        const isCorrect = message.toLowerCase().includes(scenario.expectedMessage.toLowerCase().split(' ')[0]);
        console.log(`${scenario.name}: ${isCorrect ? '✅' : '❌'} "${message}"`);
    });
};

// Export for console testing
if (typeof window !== 'undefined') {
    window.blockchainTests = {
        runAll: runBlockchainTests,
        testConnectivity: testBlockchainConnectivity,
        testContract: testContractAddress,
        testErrors: testErrorHandling,
        testWallet: testWalletRequirements,
        simulate: simulateTransactionErrors
    };
    
    console.log('🔧 Blockchain test utilities loaded. Use window.blockchainTests to run tests.');
}