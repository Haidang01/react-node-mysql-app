import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
});
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}
    `;
  }
  return req;
})


// AUTH
export const register = (data) => API.post('/api/auth/register', data);
export const login = (data) => API.post('/api/auth/login', data);
export const logout = () => API.get('/api/auth/logout');
export const getProfile = (userId) => API.get(`/api/auth/${userId}`);
export const updateUser = (data) => API.put(`/api/users`, data);

// POSTS
export const getPosts = () => API.get('/api/posts');
export const deletePost = (postId, userId) => API.delete(`/api/posts/${postId}/${userId}`);
export const getPostCurrent = (userId) => API.get(`/api/posts/${userId}`);
export const sharePost = (data) => API.post('/api/posts', data);

//Comments
export const getComment = (postId) => API.get(`/api/comments/${postId}`);
export const addComment = (data) => API.post(`/api/comments`, data);

// Relationship

export const getRelationships = (userId) => API.get(`/api/relationships/${userId}`);
export const addRelationship = (userId) => API.post(`/api/relationships/${userId}`);