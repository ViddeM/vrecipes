import axios from "axios";

let initialized = false;
let path = "";

export function initApi(debugMode) {
    initialized = true;
    if (debugMode) {
        path = "http://localhost:5000";
    }
}

export function getRequest(endpoint) {
    if (initialized !== true) {
        console.error("API not initialized!");
        return;
    }

    let headers = {};

    return axios.get(path + endpoint, {headers});
}

export function postRequest(endpoint, data) {
    if (initialized !== true) {
        console.error("API not initialized!");
        return;
    }

    let headers = {};

    return axios.post(path + endpoint, data, {headers});
}

export function putRequest(endpoint, data) {
    if (initialized !== true) {
        console.error("API not initialized!");
        return;
    }

    let headers = {};

    return axios.put(path + endpoint, data, {headers});
}
