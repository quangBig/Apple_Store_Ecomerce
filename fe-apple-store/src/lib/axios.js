import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000', // Đã bỏ /api vì backend không có prefix
    withCredentials: true,
});

// Có thể thêm interceptor ở đây nếu cần
// instance.interceptors.request.use(...)
// instance.interceptors.response.use(...)

export default instance; 