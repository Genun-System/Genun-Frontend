//"use server";
import { API_URL, FETCH_FORMDATA_INIT, FETCH_INIT, FETCH_JSON_INIT } from "../config";

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

export const createProduct = async (formData) => {
    try {
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}products`, FETCH_FORMDATA_INIT(formData))
        return response;
    }

    catch (err) {
        throw err;
    }
}

export const createCategory = async (payload) => {
    try {
        const apiUrl = getApiUrl();
        console.log('Creating category with API URL:', apiUrl);
        console.log('Category payload:', payload);
        const response = await fetch(`${apiUrl}products/create-category`, FETCH_JSON_INIT(payload))
        return response;
    }

    catch (err) {
        throw err;
    }
}

export const getCategories = async () => {
    try {
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}products/categories`, FETCH_INIT())
        return response;
    }

    catch (err) {
        throw err;
    }
}


export const getProducts = async () => {
    try {
        const response = await fetch(`${API_URL.PROD_URL}products`, FETCH_INIT())
        return response;
    }

    catch (err) {
        throw err;
    }
}


export const verifyProduct = async (productId) => {
    try {
        const response = await fetch(`${API_URL.PROD_URL}products/${productId}`, FETCH_INIT())
        return response;
    }

    catch (err) {
        throw err;
    }
}

export const getCategoriesFromProducts = async () => {
    try {
        const response = await fetch(`${API_URL.PROD_URL}products/product-categories`, FETCH_INIT())
        return response;
    }

    catch (err) {
        throw err;
    }
}

export const getManufacturerStats = async () => {
    try {
        const response = await fetch(`${API_URL.PROD_URL}products/statistics`, FETCH_INIT())
        return response;
    }

    catch (err) {
        throw err;
    }
}

export const getAuthentications = async () => {
    try {
        const response = await fetch(`${API_URL.PROD_URL}products/product-requests`, FETCH_INIT())
        return response;
    }

    catch (err) {
        throw err;
    }
}