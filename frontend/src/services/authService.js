// src/services/authService.js
import axiosInstance from "./axiosInstance";
import { API_ROUTES } from "../constants/apiRoutes";

export const authService = {
    register: async (userData) => {
    const response = await axiosInstance.post(API_ROUTES.AUTH.REGISTER, userData);

    if (response.data.success) {
        localStorage.setItem("token", response.data.token);
    }

    return response.data;
},

    login: async (userData) => {
        const response = await axiosInstance.post(API_ROUTES.AUTH.LOGIN, userData);
        
        // Login success hone par token save kar lo
        if (response.data.success) {
            localStorage.setItem('token', response.data.token);
            // Aap chaho toh user data bhi save kar sakte ho: localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        // localStorage.removeItem('user');
    }
};