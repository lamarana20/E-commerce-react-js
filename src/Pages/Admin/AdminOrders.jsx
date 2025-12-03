import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { API_ENDPOINTS } from "../../config/api";
import { Link } from "react-router-dom";

const AdminOrders = () => {
    const { token } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingOrderId, setEditingOrderId] = useState(null);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
    });

    const [editForm, setEditForm] = useState({
        order_status: "",
        payment_status: "",
    });

    const fetchOrders = async (page = 1) => {
        setLoading(true);

        try {
            const response = await fetch(`${API_ENDPOINTS.adminOrders}?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            const data = await response.json();

            setOrders(data.data || []);
            setPagination({
                current_page: data.current_page || 1,
                last_page: data.last_page || 1,
                total: data.total || 0,
            });
        } catch (err) {
            console.error("Error fetching orders:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const startEdit = (order) => {
        setEditingOrderId(order.id);
        setEditForm({
            order_status: order.order_status,
            payment_status: order.payment_status,
        });
    };

    const cancelEdit = () => {
        setEditingOrderId(null);
        setEditForm({ order_status: "", payment_status: "" });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    // Auto-update payment status
    useEffect(() => {
        if (editForm.order_status === "completed") {
            setEditForm((prev) => ({ ...prev, payment_status: "paid" }));
        }
        if (editForm.order_status === "cancelled") {
            setEditForm((prev) => ({ ...prev, payment_status: "refunded" }));
        }
    }, [editForm.order_status]);

    const updateOrder = async (id) => {
        try {
            const response = await fetch(`${API_ENDPOINTS.adminOrders}/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(editForm),
            });

            if (!response.ok) {
                throw new Error("Failed to update order");
            }

            setOrders((prev) =>
                prev.map((order) =>
                    order.id === id
                        ? {
                              ...order,
                              order_status: editForm.order_status,
                              payment_status: editForm.payment_status,
                          }
                        : order
                )
            );

            cancelEdit();
            alert("Order updated successfully!");
        } catch (err) {
            alert(err.message);
        }
    };

    const deleteOrder = async (id) => {
        if (!window.confirm("Are you sure you want to delete this order?")) {
            return;
        }

        try {
            const response = await fetch(`${API_ENDPOINTS.adminOrders}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete order");
            }

            setOrders((prev) => prev.filter((order) => order.id !== id));
            alert("Order deleted!");
        } catch (err) {
            alert(err.message);
        }
    };

    const getStatusColor = (status) => {
        const map = {
            pending: "bg-yellow-100 text-yellow-800",
            processing: "bg-blue-100 text-blue-800",
            shipped: "bg-purple-100 text-purple-800",
            completed: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800",
        };
        return map[status] || "bg-gray-100 text-gray-800";
    };

    const getPaymentColor = (status) => {
        const map = {
            pending: "bg-yellow-100 text-yellow-800",
            paid: "bg-green-100 text-green-800",
            refunded: "bg-red-100 text-red-800",
        };
        return map[status] || "bg-gray-100 text-gray-800";
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin h-12 w-12 border-b-2 border-gray-900 rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Manage Orders</h1>
                    <p className="text-gray-500">{pagination.total} orders total</p>
                </div>
                <Link
                    to="/admin"
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                    ← Back to Dashboard
                </Link>
            </div>

            {/* Table */}
            <div className="bg-white border rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 text-left text-sm font-medium text-gray-500">ID</th>
                            <th className="p-4 text-left text-sm font-medium text-gray-500">Customer</th>
                            <th className="p-4 text-left text-sm font-medium text-gray-500">Total</th>
                            <th className="p-4 text-left text-sm font-medium text-gray-500">Status</th>
                            <th className="p-4 text-left text-sm font-medium text-gray-500">Payment</th>
                            <th className="p-4 text-left text-sm font-medium text-gray-500">Date</th>
                            <th className="p-4 text-left text-sm font-medium text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="p-8 text-center text-gray-500">
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="border-t hover:bg-gray-50">
                                    <td className="p-4 font-mono text-sm">#{order.id}</td>
                                    <td className="p-4">
                                        <p className="font-medium">{order.user?.name || "Guest"}</p>
                                        <p className="text-sm text-gray-500">{order.user?.email || order.delivery_email}</p>
                                    </td>
                                    <td className="p-4 font-semibold">${parseFloat(order.total).toFixed(2)}</td>

                                    {/* Order Status */}
                                    <td className="p-4">
                                        {editingOrderId === order.id ? (
                                            <select
                                                name="order_status"
                                                value={editForm.order_status}
                                                onChange={handleFormChange}
                                                className="border rounded px-2 py-1 text-sm"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        ) : (
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.order_status)}`}>
                                                {order.order_status}
                                            </span>
                                        )}
                                    </td>

                                    {/* Payment Status */}
                                    <td className="p-4">
                                        {editingOrderId === order.id ? (
                                            <select
                                                name="payment_status"
                                                value={editForm.payment_status}
                                                onChange={handleFormChange}
                                                className="border rounded px-2 py-1 text-sm"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="paid">Paid</option>
                                                <option value="refunded">Refunded</option>
                                            </select>
                                        ) : (
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentColor(order.payment_status)}`}>
                                                {order.payment_status}
                                            </span>
                                        )}
                                    </td>

                                    <td className="p-4 text-sm text-gray-500">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </td>

                                    {/* Actions */}
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            {editingOrderId === order.id ? (
                                                <>
                                                    <button
                                                        onClick={() => updateOrder(order.id)}
                                                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={cancelEdit}
                                                        className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <Link
                                                        to={`/admin/orders/${order.id}`}
                                                        className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded hover:bg-blue-200"
                                                    >
                                                        View
                                                    </Link>
                                                    <button
                                                        onClick={() => startEdit(order)}
                                                        className="px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => deleteOrder(order.id)}
                                                        className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded hover:bg-red-200"
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination.last_page > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        onClick={() => fetchOrders(pagination.current_page - 1)}
                        disabled={pagination.current_page === 1}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        Previous
                    </button>

                    <div className="flex gap-1">
                        {[...Array(pagination.last_page)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => fetchOrders(index + 1)}
                                className={`px-4 py-2 rounded-lg ${
                                    pagination.current_page === index + 1
                                        ? "bg-black text-white"
                                        : "border hover:bg-gray-50"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => fetchOrders(pagination.current_page + 1)}
                        disabled={pagination.current_page === pagination.last_page}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;