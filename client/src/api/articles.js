import * as apiService from "./requester"

const endpoints = {
    getAll: '/data/articles',
    getLatestThree: '/data/articles?sortBy=_createdOn%20desc&pageSize=3',
    create: '/data/articles',
    edit: '/data/articles/',
    remove: '/data/articles/',
    getOne: '/data/articles/'
}

export const getAll = async () => {
    return await apiService.get(endpoints.getAll);
}

export const getLatestThree = async () => {
    return await apiService.get(endpoints.getLatestThree);
}

export const create = async (articleData) => {
    return await apiService.post(endpoints.create, articleData);
}

export const edit = async (articleID, articleData) => {
    return await apiService.put(endpoints.edit + articleID, articleData);
}

export const remove = async (articleID) => {
    return await apiService.del(endpoints.remove + articleID);
}

export const getOne = async (articleID) => {
    return await apiService.get(endpoints.getOne + articleID);
}