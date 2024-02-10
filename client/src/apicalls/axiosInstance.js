import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:3004",
});

// Add an interceptor to set the authorization header dynamically
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
