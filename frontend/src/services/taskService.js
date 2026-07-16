import axiosInstance from "./axiosInstance";
import { API_ROUTES } from "../constants/apiRoutes";

export const taskService = {
    getTasks: async (search = "", status = "") => {
        let query = "";
        if (search) query += `search=${search}&`;
        if (status) query += `status=${status}`;
        
        const response = await axiosInstance.get(`${API_ROUTES.TASKS.GET_ALL}?${query}`);
        return response.data;
    },

    createTask: async (taskData) => {
        const response = await axiosInstance.post(API_ROUTES.TASKS.CREATE, taskData);
        return response.data;
    },

    updateTask: async (id, taskData) => {
        const response = await axiosInstance.put(API_ROUTES.TASKS.UPDATE(id), taskData);
        return response.data;
    },

    deleteTask: async (id) => {
        const response = await axiosInstance.delete(API_ROUTES.TASKS.DELETE(id));
        return response.data;
    }
};