import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { API_ENDPOINTS } from "../../config/api";
import Title from "../../Components/Title";

import {
    FiUsers,
    FiPackage,
    FiDollarSign,
    FiShoppingBag,
    FiAlertCircle,
} from "react-icons/fi";

const AdminDashboard = () => {
    const { token } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.adminDashboard, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Debug log
            console.log("Dashboard data received:", data);
            
            // Ensure every numeric value is parsed properly
            const sanitizedData = {
                ...data,
                total_revenue: parseFloat(data.total_revenue) || 0,
                total_orders: parseInt(data.total_orders) || 0,
                total_users: parseInt(data.total_users) || 0,
                total_products: parseInt(data.total_products) || 0,
                pending_orders: parseInt(data.pending_orders) || 0,
                revenue_this_month: parseFloat(data.revenue_this_month) || 0,
                new_users_this_month: parseInt(data.new_users_this_month) || 0,
                low_stock_products: parseInt(data.low_stock_products) || 0,
                recent_orders: Array.isArray(data.recent_orders) ? data.recent_orders : []
            };
            
            setStats(sanitizedData);
            setError(null);
        } catch (error) {
            console.error("Failed to load admin stats:", error);
            setError("Failed to load dashboard data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Helper to format numeric values
    const formatNumber = (num) => {
        if (typeof num === 'number') {
            return num.toLocaleString('en-US');
        }
        return "0";
    };

    // Helper to format currency values
    const formatCurrency = (amount) => {
        const num = parseFloat(amount) || 0;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <Title text1="Admin" text2="Dashboard" />
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-8">
                    <p className="text-red-800">{error}</p>
                    <button
                        onClick={loadStats}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <Title text1="Admin" text2="Dashboard" />
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
                    <p className="text-yellow-800">No data available</p>
                    <button
                        onClick={loadStats}
                        className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
                    >
                        Refresh
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <Title text1="Admin" text2="Dashboard" />

            {/* MAIN STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-10">
                {[
                    {
                        icon: <FiDollarSign className="text-green-500 text-2xl" />,
                        label: "Total Revenue",
                        value: formatCurrency(stats.total_revenue),
                    },
                    {
                        icon: <FiPackage className="text-blue-500 text-2xl" />,
                        label: "Total Orders",
                        value: formatNumber(stats.total_orders),
                    },
                    {
                        icon: <FiUsers className="text-purple-500 text-2xl" />,
                        label: "Total Users",
                        value: formatNumber(stats.total_users),
                    },
                    {
                        icon: <FiShoppingBag className="text-orange-500 text-2xl" />,
                        label: "Products",
                        value: formatNumber(stats.total_products),
                    },
                ].map((item, i) => (
                    <div key={i} className="bg-white border rounded-lg p-4">
                        {item.icon}
                        <p className="text-2xl font-bold mt-2">{item.value}</p>
                        <p className="text-gray-500 text-sm">{item.label}</p>
                    </div>
                ))}
            </div>

            {/* SECONDARY STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-xl font-bold text-yellow-800">
                        {formatNumber(stats.pending_orders)}
                    </p>
                    <p className="text-yellow-600 text-sm">Pending Orders</p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-xl font-bold text-green-800">
                        {formatCurrency(stats.revenue_this_month)}
                    </p>
                    <p className="text-green-600 text-sm">Revenue This Month</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-xl font-bold text-blue-800">
                        {formatNumber(stats.new_users_this_month)}
                    </p>
                    <p className="text-blue-600 text-sm">New Users This Month</p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <FiAlertCircle className="text-red-500 inline mr-1" />
                    <span className="text-xl font-bold text-red-800">
                        {formatNumber(stats.low_stock_products)}
                    </span>
                    <p className="text-red-600 text-sm">Low Stock Products</p>
                </div>
            </div>

            {/* QUICK LINKS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
                <Link to="/admin/orders" className="bg-white border rounded-lg p-6 text-center hover:shadow">
                    <FiPackage className="text-blue-500 text-3xl mx-auto mb-2" />
                    <h3 className="font-semibold">Manage Orders</h3>
                </Link>

                <Link to="/admin/users" className="bg-white border rounded-lg p-6 text-center hover:shadow">
                    <FiUsers className="text-purple-500 text-3xl mx-auto mb-2" />
                    <h3 className="font-semibold">Manage Users</h3>
                </Link>

                <Link to="/admin/products" className="bg-white border rounded-lg p-6 text-center hover:shadow">
                    <FiShoppingBag className="text-orange-500 text-3xl mx-auto mb-2" />
                    <h3 className="font-semibold">Manage Products</h3>
                </Link>

                <Link to="/admin/products/new" className="bg-black text-white rounded-lg p-6 text-center hover:bg-gray-800">
                    <span className="text-3xl block mb-2">+</span>
                    <h3 className="font-semibold">Add Product</h3>
                </Link>
            </div>

            {/* RECENT ORDERS */}
            <div className="bg-white border rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Recent Orders</h3>
                    <Link to="/admin/orders" className="text-blue-500 text-sm hover:underline">
                        View All
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3">ID</th>
                                <th className="p-3">Customer</th>
                                <th className="p-3">Total</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(stats.recent_orders || []).map((order) => {
                                // Ensure the order data is valid before rendering
                                const orderTotal = parseFloat(order.total) || 0;
                                const orderStatus = order.order_status || "Unknown";
                                
                                return (
                                    <tr key={order.id} className="border-t">
                                        <td className="p-3">#{order.id || "N/A"}</td>
                                        <td className="p-3">{order.user?.name || "Guest"}</td>
                                        <td className="p-3">{formatCurrency(orderTotal)}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                orderStatus === 'completed' ? 'bg-green-100 text-green-800' :
                                                orderStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                orderStatus === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                orderStatus === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {orderStatus}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            {order.created_at 
                                                ? new Date(order.created_at).toLocaleDateString() 
                                                : "N/A"
                                            }
                                        </td>
                                    </tr>
                                );
                            })}

                            {(!stats.recent_orders || stats.recent_orders.length === 0) && (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-gray-500">
                                        No recent orders
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
