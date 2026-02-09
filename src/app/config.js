// Import error suppression utility
import './utils/errorSuppression';

// Browser-only wagmi configuration
let wagmiConfig = null;

// Only initialize wagmi on the client side
if (typeof window !== 'undefined') {
  const { getDefaultConfig } = require("@rainbow-me/rainbowkit");
  const { baseSepolia } = require('wagmi/chains');
  const { http } = require('wagmi');

  wagmiConfig = getDefaultConfig({
    appName: 'Genun',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '2f5a2c1b8e4d3a9f7c6b5e8d9a2f1c4b',
    chains: [baseSepolia],
    ssr: false, // Disable SSR for wagmi
    transports: {
      [baseSepolia.id]: http('https://sepolia.base.org', {
        batch: false,
        fetchOptions: {
          timeout: 30000,
        },
        retryCount: 5,
        retryDelay: 2000,
      })
    }
  });
}

export { wagmiConfig };

export const API_URL = {
    DEV_URL: (process.env.NEXT_PUBLIC_DEV_URL || 'http://localhost:3002/') + 'api/',
    PROD_URL: (process.env.NEXT_PUBLIC_PROD_URL || 'https://genun-api-1.onrender.com/') + 'api/',
}

export const POOS_FACTORY_CONRACT_ADDRESS = "0x2A301B1a5D6Eacb1781A8022386A66f49908a354"//"0xE1Fa53c9858FD7d08CFDF4335c189c94a3aA32B5" // "0xE1Fa53c9858FD7d08CFDF4335c189c94a3aA32B5"


export const FETCH_JSON_INIT = (payload = {}, method = "POST", contentType = "application/json") => {
    return {
        method: method, // *GET, POST, PUT, DELETE, etc.
        //mode: "cors", // no-cors, *cors, same-origin
        //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": contentType,
            "x-auth-token": typeof window !== 'undefined' ? localStorage.getItem("_poostoken_") : null
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        //redirect: "follow", // manual, *follow, error
        //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(payload)
    }
}

export const FETCH_INIT = (method = "GET") => {
    return {
        method: method, // *GET, POST, PUT, DELETE, etc.
        //mode: "cors", // no-cors, *cors, same-origin
        //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: "same-origin", // include, *same-origin, omit
        headers: {
            //"Content-Type": contentType,
            "x-auth-token": typeof window !== 'undefined' ? localStorage.getItem("_poostoken_") : null
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    }
}

export const FETCH_FORMDATA_INIT = (formData, method = "POST") => {
    return {
        method: method, // *GET, POST, PUT, DELETE, etc.
        //mode: "cors", // no-cors, *cors, same-origin
        //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "x-auth-token": typeof window !== 'undefined' ? localStorage.getItem("_poostoken_") : null,
            //"Content-Type": contentType,
            //'Content-Type': 'multipart/form-data',
        },
        //redirect: "follow", // manual, *follow, error
        //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: formData
    }
}

//other configutations 