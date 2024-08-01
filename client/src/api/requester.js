import { getToken, clearUserData } from "../utils/user";

const host = 'http://localhost:3030';

async function requester(method, url, data) {
    let options = {
        method,
        headers: {}
    };

    const token = getToken();
    if (token) {
        options.headers['X-Authorization'] = token;
    }
    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host + url, options);
        if (response.ok != true) {
            if (response.status == 403) {
                clearUserData();
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export const get = requester.bind(null, 'get');
export const post = requester.bind(null, 'post');
export const put = requester.bind(null, 'put');
export const del = requester.bind(null, 'delete');