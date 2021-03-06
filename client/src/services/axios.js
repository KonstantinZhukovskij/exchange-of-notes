import axios from 'axios';

export function registration(dataToSend) {
    return axios.post('/registration', dataToSend)
}

export function login(dataToSend) {
    return axios.post('/login', dataToSend)
}

export function getLogout() {
    return axios.get('/logout')
}

export function getAllAuthorSummaries(userId) {
    return axios.get('/authorSummary', userId)
}

export function getAllUsers() {
    return axios.get('/users')
}

export function getUserById(userId) {
    return axios.get('/user', userId)
}

export function putUpdateAccount(dataToSend) {
    return axios.put('/account/profile', dataToSend)
}

export function putUpdatePassword(dataToSend) {
    return axios.put('/account/password', dataToSend)
}

export function deleteUser(userId) {
    return axios.delete('/account/delete', {data: {id: userId}})
}

export function createAdmin(dataToSend) {
    return axios.put('/admin', dataToSend)
}

export function createSummary(dataToSend) {
    return axios.post('/create', dataToSend)
}

export function getAllSummaries() {
    return axios.get('/allSummaries');
}

export function getPaginationSummaries(limit, offset) {
    return axios.get('/summary',
        {
            params: {
                limit: limit,
                offset: offset,
            }
        }
    );
}

export function getPopularSummaries() {
    return axios.get('/popularSummary')
}

export function getSummaryById(id) {
    return axios.get('/summary/' + id)
}

export function deleteSummaryById(id) {
    return axios.delete('/summary', {data: {id: id}})
}

export function getAllCommentsToSummary(summaryId) {
    return axios.get('/comment/' + summaryId)
}

export function createComment(dataToSend) {
    return axios.post('/comment', dataToSend)
}

export function putUpdateSummary(summaryId, dataToSend) {
    return axios.put('/summary/' + summaryId, dataToSend)
}

export function sendSearchQuery(dataToSend) {
    return axios.get('/search?rawText=' + dataToSend, dataToSend)
}

export function uploadImage(file) {
    const formData = new FormData();
    formData.set('action', 'upload');
    formData.set('type', 'file');
    formData.set('auth_token', '8621e9d2ad0bdcc7db1b20c3586a5be5dfbe6068');
    formData.append('source', file);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    return axios.post('https://imgbb.com/json', formData, config);
}