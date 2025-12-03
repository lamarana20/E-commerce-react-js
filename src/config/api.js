const BASE_URL = "https://store-management-backend-main-ehdxlo.laravel.cloud/api";

export const API_ENDPOINTS = {
    // Auth
    register: `${BASE_URL}/register`,
    login: `${BASE_URL}/login`,
    logout: `${BASE_URL}/logout`,
    
    // Profile
    profile: `${BASE_URL}/profile`,
    updatePassword: `${BASE_URL}/profile/password`,
    
    // Products
    products: `${BASE_URL}/products`,
    
    // Orders (User)
    orders: `${BASE_URL}/orders`,
    
    // Dashboard
    userDashboard: `${BASE_URL}/dashboard/user`,
    adminDashboard: `${BASE_URL}/admin/dashboard`,
    
    // Admin
    adminOrders: `${BASE_URL}/admin/orders`,
    adminUsers: `${BASE_URL}/admin/users`,
    adminProducts: `${BASE_URL}/admin/products`,
};

export default BASE_URL;