export const API_URL = {
    DEV_URL: process.env.NEXT_PUBLIC_DEV_URL,
    PROD_URL: process.env.NEXT_PUBLIC_PROD_URL,
};

export const STELLAR = {
    network: process.env.NEXT_PUBLIC_STELLAR_NETWORK || "TESTNET",
    networkPassphrase:
        process.env.NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE ||
        "Test SDF Network ; September 2015",
    rpcUrl:
        process.env.NEXT_PUBLIC_STELLAR_RPC_URL ||
        "https://soroban-testnet.stellar.org",
    horizonUrl:
        process.env.NEXT_PUBLIC_STELLAR_HORIZON_URL ||
        "https://horizon-testnet.stellar.org",
    contractId: process.env.NEXT_PUBLIC_GENUN_CONTRACT_ID || "",
};

export const FETCH_JSON_INIT = (payload = {}, method = "POST", contentType = "application/json") => {
    return {
        method: method,
        headers: {
            "Content-Type": contentType,
            "x-auth-token": localStorage.getItem("_poostoken_"),
        },
        body: JSON.stringify(payload),
    };
};

export const FETCH_INIT = (method = "GET") => {
    return {
        method: method,
        headers: {
            "x-auth-token": localStorage.getItem("_poostoken_"),
        },
    };
};

export const FETCH_FORMDATA_INIT = (formData, method = "POST") => {
    return {
        method: method,
        headers: {
            "x-auth-token": localStorage.getItem("_poostoken_"),
        },
        body: formData,
    };
};
