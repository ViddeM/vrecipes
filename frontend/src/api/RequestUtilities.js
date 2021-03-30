import axios from "axios";

const path = "/api";

export function toUrl(url) {
    return path + url
}

export function getRequest(endpoint) {
    return axios.get(path + endpoint);
}

export function postRequest(endpoint, data) {
    return axios.post(path + endpoint, data);
}

export function putRequest(endpoint, data) {
    return axios.put(path + endpoint, data);
}

export function deleteRequest(endpoint) {
    return axios.delete(path + endpoint)
}