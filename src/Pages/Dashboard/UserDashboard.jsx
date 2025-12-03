import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { API_ENDPOINTS } from "../../config/api";
import Title from "../../Components/Title";
import { FiPackage, FiDollarSign, FiClock, FiCheckCircle } from "react-icons/fi";

const UserDashboard = () => {
    const { token, user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await fetch(API_ENDPOINTS.userDashboard, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                },
            });
            const data = await res.json();
            setStats(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <Title text1="My" text2="Dashboard" />

            {/* Welcome */}
            <div className="mt-6 mb-8">
                <h2 className="text-xl">Welcome back, <span className="font-semibold">{user?.name}</span>!</h2>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white border rounded-lg p-4">
                    <FiPackage className="text-blue-500 text-2xl mb-2" />
                    <p className="text-2xl font-bold">{stats?.total_orders || 0}</p>
                    <p className="text-gray-500 text-sm">Total Orders</p>
                </div>

                <div className="bg-white border rounded-lg p-4">
                    <FiDollarSign className="text-green-500 text-2xl mb-2" />
                    <p className="text-2xl font-bold"> ${Number(stats?.total_spent || 0).toFixed(2)}</p>
                    <p className="text-gray-500 text-sm">Total Spent</p>
                </div>

                <div className="bg-white border rounded-lg p-4">
                    <FiClock className="text-yellow-500 text-2xl mb-2" />
                    <p className="text-2xl font-bold">{stats?.pending_orders || 0}</p>
                    <p className="text-gray-500 text-sm">Pending</p>
                </div>

                <div className="bg-white border rounded-lg p-4">
                    <FiCheckCircle className="text-green-500 text-2xl mb-2" />
                    <p className="text-2xl font-bold">{stats?.completed_orders || 0}</p>
                    <p className="text-gray-500 text-sm">Completed</p>
                </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Link to="/profile" className="bg-white border rounded-lg p-6 hover:shadow-md transition">
                    <h3 className="font-semibold mb-2">My Profile</h3>
                    <p className="text-gray-500 text-sm">Update your personal information</p>
                </Link>

                <Link to="/orders" className="bg-white border rounded-lg p-6 hover:shadow-md transition">
                    <h3 className="font-semibold mb-2">My Orders</h3>
                    <p className="text-gray-500 text-sm">View all your orders</p>
                </Link>

                <Link to="/collection" className="bg-white border rounded-lg p-6 hover:shadow-md transition">
                    <h3 className="font-semibold mb-2">Shop Now</h3>
                    <p className="text-gray-500 text-sm">Browse our collection</p>
                </Link>
            </div>

            {/* Recent Orders */}
            <div className="bg-white border rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Recent Orders</h3>
                    <Link to="/orders" className="text-blue-500 text-sm hover:underline">
                        View All
                    </Link>
                </div>

                {stats?.recent_orders?.length > 0 ? (
                    <div className="space-y-3">
                        {stats.recent_orders.map((order) => (
                            <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium">Order #{order.id}</p>
                                    <p className="text-gray-500 text-sm">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">${parseFloat(order.total).toFixed(2)}</p>
                                    <span className={`text-xs px-2 py-1 rounded ${
                                        order.order_status === 'completed' ? 'bg-green-100 text-green-800' :
                                        order.order_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {order.order_status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-4">No orders yet</p>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;