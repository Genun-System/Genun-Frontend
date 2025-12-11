//"use server";
import { API_URL, FETCH_FORMDATA_INIT, FETCH_INIT, FETCH_JSON_INIT } from "../config";



export const createProduct = async (formData) => {
    try {
        const response = await fetch(`${API_URL.PROD_URL}products`, FETCH_FORMDATA_INIT(formData))
        return response;
    }

    catch (err) {
        throw err;
    }
}

export const createCategory = async (payload) => {
    try {
        const response = await fetch(`${API_URL.PROD_URL}products/create-category`, FETCH_JSON_INIT(payload))
        return response;
    }

    catch (err) {
        throw err;
    }
}

export const getCategories = async () => {
    try {
        const response = await fetch(`${API_URL.PROD_URL}products/categories`, FETCH_INIT())
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