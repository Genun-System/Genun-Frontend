//"use server";
import { API_URL, FETCH_INIT, FETCH_JSON_INIT } from "../config";

// Helper function to get the correct API URL
const getApiUrl = () => {
    // Always use production URL if we're on a deployed domain
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        if (hostname.includes('netlify.app') || 
            hostname !== 'localhost') {
            console.log('Using PROD_URL:', API_URL.PROD_URL);
            return API_URL.PROD_URL;
        }
    }
    
    // Fallback to NODE_ENV check
    const isDev = process.env.NODE_ENV === 'development';
    const apiUrl = isDev ? API_URL.DEV_URL : API_URL.PROD_URL;
    console.log('Environment:', process.env.NODE_ENV, 'Using URL:', apiUrl);
    return apiUrl;
};

export const register = async (payload) => {
    try {
        const apiUrl = getApiUrl();
        console.log('Register API URL:', `${apiUrl}register-user`);
        console.log('Register payload:', payload);
        
        const response = await fetch(`${apiUrl}register-user`, FETCH_JSON_INIT(payload));
        
        console.log('Register response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Register API error:', errorText);
            throw new Error(`Registration failed: ${response.status} - ${errorText}`);
        }
        
        return response;
    }
    catch (err) {
        console.error('Register error:', err);
        throw err;
    }
}

export const login = async (payload) => {
    try {
        const apiUrl = getApiUrl();
        console.log('Login API URL:', `${apiUrl}login`);
        console.log('Login payload:', payload);
        
        const response = await fetch(`${apiUrl}login`, FETCH_JSON_INIT(payload));
        
        console.log('Login response status:', response.status);
        console.log('Login response headers:', response.headers);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Login API error:', errorText);
            throw new Error(`Login failed: ${response.status} - ${errorText}`);
        }
        
        return response;
    }
    catch (err) {
        console.error('Login error:', err);
        throw err;
    }
}

export const verifyAccount = async (token) => {
    try {
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}register-user/verify-email/${token}`, FETCH_INIT())
        return response;
    }

    catch (err) {
        throw err;
    }
}

export const requestVerificationLink = async (payload) => {
    try {
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}register-user/verify-email`, FETCH_JSON_INIT(payload))
        return response;
    }

    catch (err) {
        throw err;
    }
}



export const getUser = async () => {
    try {
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}register-user`, FETCH_INIT())
        return response;
    }

    catch (err) {
        throw err;
    }
}

export const updateUser = async (payload, userId) => {
    try {
        const response = await fetch(`${API_URL.PROD_URL}register-user/${userId}`, FETCH_JSON_INIT(payload, "PUT"))
        return response;
    }

    catch (err) {
        throw err;
    }
}


 



