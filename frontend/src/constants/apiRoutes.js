export const BASE_URL="https://task-management-ieax.onrender.com/api"

export const API_ROUTES = {
    AUTH: {
        REGISTER: "/auth/register",
        LOGIN: "/auth/login",
    },
    TASKS: {
        GET_ALL: "/task", // Search aur filter query params ke sath yahi use hoga
        CREATE: "/task",
        UPDATE: (id) => `/task/${id}`,
        DELETE: (id) => `/task/${id}`,
    }
};