import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export const videosApi = {
  getAll: (params) => api.get('/videos', { params }).then(r => r.data),
  getFeatured: () => api.get('/videos/featured').then(r => r.data),
  getById: (id) => api.get(`/videos/${id}`).then(r => r.data),
  getRelated: (id) => api.get(`/videos/${id}/related`).then(r => r.data),
  view: (id) => api.post(`/videos/${id}/view`).then(r => r.data),
  like: (id) => api.post(`/videos/${id}/like`).then(r => r.data),
}

export const categoriesApi = {
  getAll: () => api.get('/categories').then(r => r.data),
  getBySlug: (slug) => api.get(`/categories/${slug}`).then(r => r.data),
}

export const searchApi = {
  search: (params) => api.get('/search', { params }).then(r => r.data),
}

export const subscribersApi = {
  subscribe: (data) => api.post('/subscribers', data).then(r => r.data),
}

export const commentsApi = {
  getAll: () => api.get('/comments').then(r => r.data),
  getByVideoId: (videoId) => api.get(`/comments/${videoId}`).then(r => r.data),
  post: (videoId, data) => api.post(`/comments/${videoId}`, data).then(r => r.data),
}

export const adminApi = {
  getPending: (key) =>
    api.get('/comments/admin/pending', { headers: { 'x-admin-key': key } }).then(r => r.data),
  approve: (id, key) =>
    api.post(`/comments/admin/${id}/approve`, {}, { headers: { 'x-admin-key': key } }).then(r => r.data),
  reject: (id, key) =>
    api.delete(`/comments/admin/${id}`, { headers: { 'x-admin-key': key } }).then(r => r.data),
  getSubscribers: (key) =>
    api.get('/subscribers/admin/list', { headers: { 'x-admin-key': key } }).then(r => r.data),
  deleteSubscriber: (id, key) =>
    api.delete(`/subscribers/admin/${id}`, { headers: { 'x-admin-key': key } }).then(r => r.data),
  resendVerification: (id, key) =>
    api.post(`/subscribers/admin/${id}/resend`, {}, { headers: { 'x-admin-key': key } }).then(r => r.data),
}
