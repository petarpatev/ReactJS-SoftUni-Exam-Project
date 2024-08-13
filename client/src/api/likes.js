import * as apiService from "./requester"

const endpoints = {
    create: '/data/likes',
    getByArticleId: (articleId) => `/data/likes?where=articleId%3D%22${articleId}%22`
}

export const create = async (likeData) => {
    return await apiService.post(endpoints.create, likeData);
}

export const getByArticleId = async (articleId) => {
    return await apiService.get(endpoints.getByArticleId(articleId));
}