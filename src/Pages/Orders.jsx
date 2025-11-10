import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Title from '../Components/Title';
import { FiDownload, FiMail, FiClock, FiTrash2, FiPackage } from 'react-icons/fi';

const Orders = () => {
  const { products } = useContext(ShopContext);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrders = () => {
      try {
        const savedOrders = localStorage.getItem('orders');
        
        if (savedOrders) {
          const parsedOrders = JSON.parse(savedOrders);
          
          const fiveDaysAgo = new Date();
          fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
          
          const recentOrders = parsedOrders.filter(order => {
            if (!order || !order.date) return false;
            
            const orderDate = new Date(order.date);
            return orderDate >= fiveDaysAgo;
          });

          recentOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

          setOrders(recentOrders);

          if (recentOrders.length !== parsedOrders.length) {
            localStorage.setItem('orders', JSON.stringify(recentOrders));
          }
        }
      } catch (error) {
        console.error('Failed to load orders:', error);
        setErrorMessage('Failed to load orders. Please try refreshing the page.');
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  const formatDate = (dateString) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(dateString));
    } catch {
      return dateString;
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setErrorMessage('');

    const subject = 'Order Details';
    const body = `Here are my order details:\n\n${orders.map(order => {
      const orderItems = Object.entries(order.items || {}).map(([productId, sizes]) => {
        const product = products.find(p => p.id === parseInt(productId));
        const totalQuantity = Object.values(sizes).reduce((a, b) => a + b, 0);
        return `${product?.name || 'Unknown Product'} - Quantity: ${totalQuantity}`;
      }).join('\n');

      return `Order #${order.id}\nDate: ${formatDate(order.date)}\nTotal: $${order.total.toFixed(2)}\nItems:\n${orderItems}\n`;
    }).join('\n\n')}`;

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const downloadOrderDetails = (order) => {
    const orderDetails = {
      id: order.id,
      date: formatDate(order.date),
      total: order.total.toFixed(2),
      delivery: order.delivery || {},
      items: Object.entries(order.items || {}).map(([productId, sizes]) => {
        const product = products.find(p => p.id === parseInt(productId));
        return {
          product: product?.name || 'Unknown Product',
          price: product?.price || 0,
          sizes: Object.entries(sizes).map(([size, quantity]) => ({
            size,
            quantity
          }))
        };
      })
    };

    const blob = new Blob([JSON.stringify(orderDetails, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `order_${order.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const deleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      const updatedOrders = orders.filter(order => order.id !== orderId);
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    }
  };

  const getTotalItems = (items) => {
    return Object.values(items || {}).reduce((total, sizes) => {
      return total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0);
    }, 0);
  };

  if (isLoading) {
    return (
      <div className="border-t pt-16 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t pt-16 px-4 sm:px-8 max-w-6xl mx-auto pb-16">
      <div className="mb-8">
        <Title text1="Your" text2="Orders" />
        <p className="text-gray-600 mt-2">
          Showing orders from the last 5 days
        </p>
      </div>

      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <FiPackage className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders in the last 5 days.
            </p>
            <Link
              to="/collection"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 pb-4 border-b">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      Order #{order.id}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <FiClock className="w-4 h-4" />
                    {formatDate(order.date)}
                  </p>
                  <p className="text-lg font-bold text-gray-900 mt-2">
                    Total: ${order.total.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {getTotalItems(order.items)} item(s)
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => downloadOrderDetails(order)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Download order details"
                    aria-label="Download order details"
                  >
                    <FiDownload className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete order"
                    aria-label="Delete order"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {order.delivery && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Delivery Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">
                        {order.delivery.firstName} {order.delivery.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{order.delivery.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">{order.delivery.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Address</p>
                      <p className="font-medium text-gray-900">
                        {order.delivery.address}<br />
                        {order.delivery.city}, {order.delivery.state} {order.delivery.zip}<br />
                        {order.delivery.country}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Ordered Items</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(order.items || {}).map(([productId, sizes]) => {
                    const product = products.find(p => p.id === parseInt(productId));
                    const totalQuantity = Object.values(sizes).reduce((sum, qty) => sum + qty, 0);

                    return (
                      <div
                        key={productId}
                        className="flex gap-4 border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition"
                      >
                        <Link
                          to={`/product/${productId}`}
                          className="flex-shrink-0"
                        >
                          {product?.image_urls?.[0] ? (
                            <img
                              src={product.image_urls[0]}
                              alt={product.name}
                              className="w-20 h-20 object-cover rounded"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                              <FiPackage className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                        </Link>

                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/product/${productId}`}
                            className="font-semibold text-sm text-gray-900 hover:text-blue-600 transition block truncate"
                          >
                            {product?.name || "Product no longer available"}
                          </Link>
                          
                          {product?.price && (
                            <p className="text-sm text-gray-600 mt-1">
                              ${product.price.toFixed(2)} each
                            </p>
                          )}

                          <div className="mt-2 space-y-1">
                            {Object.entries(sizes).map(([size, quantity]) => (
                              <div key={size} className="flex items-center gap-2 text-sm">
                                <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-700">
                                  Size {size}
                                </span>
                                <span className="text-gray-600">
                                  × {quantity}
                                </span>
                              </div>
                            ))}
                          </div>

                          <p className="text-xs text-gray-500 mt-2">
                            Total: {totalQuantity} item(s)
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {orders.length > 0 && (
        <div className="mt-10 max-w-lg mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiMail className="w-5 h-5" />
              Email Order Details
            </h3>
            
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage('');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="your.email@example.com"
                  required
                />
                {errorMessage && (
                  <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errorMessage}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition flex items-center justify-center gap-2"
              >
                <FiMail className="w-5 h-5" />
                Send Order Details
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;