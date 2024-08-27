import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/v1', 
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
        
    }
});

// Request interceptor to add the token
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log(token)
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Assuming 401 status code is returned when the token is expired or invalid
            localStorage.removeItem('token'); // Remove the expired token
            // Optionally, you can also redirect the user to the login page or show a message
            window.location.href = '/login'; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
