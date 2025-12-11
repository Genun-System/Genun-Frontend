//"use server";
import { API_URL, FETCH_INIT, FETCH_JSON_INIT } from "../config";



export const register = async (payload) => {
    try {
        const response = await fetch(`${API_URL.PROD_URL}register-user`, FETCH_JSON_INIT(payload))
        return response;
    }

    catch (err) {
        throw err;
    }
}

export const login = async (payload) => {
    try {
        const response = await fetch(`${API_URL.PROD_URL}login`, FETCH_JSON_INIT(payload))
        return response;
    }

    catch (err) {
        throw err;
    }
}

export const verifyAccount = async (token) => {
    try {
        const response = await fetch(`${API_URL.PROD_URL}register-user/verify-email/${token}`, FETCH_INIT())
        return response;
    }

    catch (err) {
        throw err;
    }
}

export const requestVerificationLink = async (payload) => {
    try {
        const response = await fetch(`${API_URL.PROD_URL}register-user/verify-email`, FETCH_JSON_INIT(payload))
        return response;
    }

    catch (err) {
        throw err;
    }
}



export const getUser = async () => {
    try {
        const response = await fetch(`${API_URL.PROD_URL}register-user`, FETCH_INIT())
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


 



