import * as apiService from "./requester"

const endpoints = {
    create: '/data/comments',
    getByArticleId: (articleId) => `/data/comments?where=articleId%3D%22${articleId}%22`,
    getByMemberId: (memberId) => `/data/comments?where=_ownerId%3D%22${memberId}%22`
}

export const create = async (commentData) => {
    return await apiService.post(endpoints.create, commentData);
}

export const getByArticleId = async (articleId) => {
    return await apiService.get(endpoints.getByArticleId(articleId));
}

export const getByMemberId = async (memberId) => {
    return await apiService.get(endpoints.getByMemberId(memberId));
}