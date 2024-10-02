import axios from 'axios';
const configuredUrl = axios.create({
  baseURL: 'https://cngenbackend.onrender.com/api/v1',
});
configuredUrl.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')} `;
  }
  return req;
});

export default configuredUrl;
