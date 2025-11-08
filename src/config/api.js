

// The base URL of your API
const API_BASE_URL = "https://store-management-backend-main-ehdxlo.laravel.cloud/api";

// All your API endpoints
export const API_ENDPOINTS = {
    login: `${API_BASE_URL}/login`,
    register: `${API_BASE_URL}/register`,
    // You can add more endpoints here later
    // products: `${API_BASE_URL}/products`,
    // users: `${API_BASE_URL}/users`,
};

// Also export the base URL in case you need it
export { API_BASE_URL };