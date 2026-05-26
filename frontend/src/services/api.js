import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export const videosApi = {
  getAll: (params) => api.get('/videos', { params }).then(r => r.data),
  getFeatured: () => api.get('/videos/featured').then(r => r.data),
  getById: (id) => api.get(`/videos/${id}`).then(r => r.data),
  getRelated: (id) => api.get(`/videos/${id}/related`).then(r => r.data),
  like: (id) => api.post(`/videos/${id}/like`).then(r => r.data),
}

export const categoriesApi = {
  getAll: () => api.get('/categories').then(r => r.data),
  getBySlug: (slug) => api.get(`/categories/${slug}`).then(r => r.data),
}

export const searchApi = {
  search: (params) => api.get('/search', { params }).then(r => r.data),
}
