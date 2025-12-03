import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { API_ENDPOINTS } from "../../config/api";
import Title from "../../Components/Title";

const AdminOrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [formData, setFormData] = useState({
        order_status: "",
        payment_status: "",
    });

    useEffect(() => {
        fetchOrder();
    }, [id]);

    useEffect(() => {
        if (order) {
            setFormData({
                order_status: order.order_status || "",
                payment_status: order.payment_status || "",
            });
        }
    }, [order]);

    const fetchOrder = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API_ENDPOINTS.adminOrders}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to load order");
            }

            const data = await res.json();
            setOrder(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateOrder = async (e) => {
        e.preventDefault();
        setUpdating(true);

        try {
            const res = await fetch(`${API_ENDPOINTS.adminOrders}/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Update failed");
            }

            setOrder(data.order);
            alert("Order updated successfully!");
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            setUpdating(false);
        }
    };

    const handleDeleteOrder = async () => {
        if (!window.confirm("Are you sure you want to delete this order?")) {
            return;
        }

        try {
            const res = await fetch(`${API_ENDPOINTS.adminOrders}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Delete failed");
            }

            alert("Order deleted!");
            navigate("/admin/orders");
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount || 0);
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: "bg-yellow-100 text-yellow-800",
            processing: "bg-blue-100 text-blue-800",
            shipped: "bg-purple-100 text-purple-800",
            completed: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800",
        };
        return colors[status] || "bg-gray-100 text-gray-800";
    };

    const getPaymentColor = (status) => {
        const colors = {
            pending: "bg-yellow-100 text-yellow-800",
            paid: "bg-green-100 text-green-800",
            refunded: "bg-red-100 text-red-800",
            failed: "bg-red-100 text-red-800",
        };
        return colors[status] || "bg-gray-100 text-gray-800";
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
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={fetchOrder}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg mr-2"
                    >
                        Retry
                    </button>
                    <Link to="/admin/orders" className="px-4 py-2 border rounded-lg">
                        Back to Orders
                    </Link>
                </div>
            </div>
        );
    }

    if (!order) return null;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Order #{order.id}</h1>
                    <p className="text-gray-500">
                        {new Date(order.created_at).toLocaleString()}
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link
                        to="/admin/orders"
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                        ← Back
                    </Link>
                    <button
                        onClick={handleDeleteOrder}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Status Cards */}
                    <div className="bg-white border rounded-lg p-6">
                        <h2 className="font-semibold text-lg mb-4">Current Status</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Order Status</p>
                                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.order_status)}`}>
                                    {order.order_status}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Payment Status</p>
                                <span className={`px-3 py-1 rounded-full text-sm ${getPaymentColor(order.payment_status)}`}>
                                    {order.payment_status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Update Form */}
                    <div className="bg-white border rounded-lg p-6">
                        <h2 className="font-semibold text-lg mb-4">Update Status</h2>
                        <form onSubmit={handleUpdateOrder} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Order Status
                                    </label>
                                    <select
                                        value={formData.order_status}
                                        onChange={(e) =>
                                            setFormData({ ...formData, order_status: e.target.value })
                                        }
                                        className="w-full border rounded-lg px-3 py-2"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Payment Status
                                    </label>
                                    <select
                                        value={formData.payment_status}
                                        onChange={(e) =>
                                            setFormData({ ...formData, payment_status: e.target.value })
                                        }
                                        className="w-full border rounded-lg px-3 py-2"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="paid">Paid</option>
                                        <option value="refunded">Refunded</option>
                                        <option value="failed">Failed</option>
                                    </select>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={updating}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                            >
                                {updating ? "Updating..." : "Update Order"}
                            </button>
                        </form>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white border rounded-lg p-6">
                        <h2 className="font-semibold text-lg mb-4">Order Items</h2>
                        <div className="space-y-4">
                            {order.items_details && order.items_details.length > 0 ? (
                                order.items_details.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 border-b pb-4 last:border-0"
                                    >
                                        {/* Image */}
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                                                <span className="text-gray-400 text-xs">No image</span>
                                            </div>
                                        )}

                                        {/* Details */}
                                        <div className="flex-1">
                                            <h4 className="font-medium">{item.name}</h4>
                                            <p className="text-sm text-gray-500">
                                                Size: {item.size} | Qty: {item.quantity}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {formatCurrency(item.price)} each
                                            </p>
                                        </div>

                                        {/* Subtotal */}
                                        <div className="text-right">
                                            <p className="font-semibold">
                                                {formatCurrency(item.subtotal)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No items</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Customer Info */}
                    <div className="bg-white border rounded-lg p-6">
                        <h2 className="font-semibold text-lg mb-4">Customer</h2>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="font-medium">{order.user?.name || "Guest"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{order.user?.email || order.delivery_email}</p>
                            </div>
                            {order.delivery_phone && (
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="font-medium">{order.delivery_phone}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="bg-white border rounded-lg p-6">
                        <h2 className="font-semibold text-lg mb-4">Delivery Address</h2>
                        <div className="text-sm space-y-1">
                            <p className="font-medium">
                                {order.delivery_first_name} {order.delivery_last_name}
                            </p>
                            <p>{order.delivery_address}</p>
                            <p>
                                {order.delivery_city}, {order.delivery_state} {order.delivery_zip}
                            </p>
                            <p>{order.delivery_country}</p>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white border rounded-lg p-6">
                        <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal</span>
                                <span>{formatCurrency(order.subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Delivery</span>
                                <span>{formatCurrency(order.delivery_fee)}</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between font-bold">
                                <span>Total</span>
                                <span>{formatCurrency(order.total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white border rounded-lg p-6">
                        <h2 className="font-semibold text-lg mb-4">Payment</h2>
                        <div className="space-y-2">
                            <div>
                                <p className="text-sm text-gray-500">Method</p>
                                <p className="font-medium capitalize">{order.payment_method}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderDetails;