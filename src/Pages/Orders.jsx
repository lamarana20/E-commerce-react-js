import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import { FiClock, FiPackage, FiMapPin } from "react-icons/fi";

const Orders = () => {
  const { token } = useAuth();
  const { products } = useContext(ShopContext);
  
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setError("Please login to view your orders");
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch("https://store-management-backend-main-ehdxlo.laravel.cloud/api/orders", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(data.data || data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(dateString));
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const renderItems = (items) => {
    // Items are stored as JSON in the database
    if (typeof items === "string") {
      items = JSON.parse(items);
    }

    return Object.entries(items).map(([productId, sizes]) => {
      const product = products.find((p) => p.id === parseInt(productId));
      
      return (
        <div key={productId} className="flex gap-3 py-2 border-b last:border-0">
          {product?.image_urls?.[0] && (
            <img
              src={product.image_urls[0]}
              alt={product.name}
              className="w-16 h-16 object-cover rounded"
            />
          )}
          <div className="flex-1">
            <p className="font-medium text-sm">
              {product?.name || `Product #${productId}`}
            </p>
            <div className="text-xs text-gray-600 mt-1">
              {Object.entries(sizes).map(([size, qty]) => (
                <span key={size} className="mr-3">
                  Size {size}: x{qty}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Link to="/login" className="px-6 py-2 bg-black text-white rounded-lg">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Title text1="Your" text2="Orders" />

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg mt-8">
          <FiPackage className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
          <Link
            to="/collection"
            className="inline-block mt-4 px-6 py-3 bg-black text-white rounded-lg"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6 mt-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-6 bg-white shadow-sm"
            >
              {/* Header */}
              <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b">
                <div>
                  <span className="text-sm font-semibold text-blue-600">
                    Order #{order.id}
                  </span>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <FiClock className="w-4 h-4" />
                    {formatDate(order.created_at)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">
                    ${parseFloat(order.total).toFixed(2)}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(order.order_status)}`}>
                    {order.order_status}
                  </span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="py-4 border-b">
                <p className="text-sm font-medium flex items-center gap-2 mb-2">
                  <FiMapPin className="w-4 h-4" />
                  Delivery Address
                </p>
                <p className="text-sm text-gray-600">
                  {order.delivery_first_name} {order.delivery_last_name}<br />
                  {order.delivery_address}<br />
                  {order.delivery_city}, {order.delivery_state} {order.delivery_zip}<br />
                  {order.delivery_country}
                </p>
              </div>

              {/* Items */}
              <div className="pt-4">
                <p className="text-sm font-medium mb-3">Items</p>
                {renderItems(order.items)}
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t flex justify-between text-sm">
                <span className="text-gray-500">
                  Payment: {order.payment_method}
                </span>
                <span className={`${order.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.payment_status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
