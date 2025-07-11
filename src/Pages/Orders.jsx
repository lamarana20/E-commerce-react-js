import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from '../Components/Title';
import { FiDownload, FiMail, FiClock, FiTrash2 } from 'react-icons/fi';

const Orders = () => {
  const { products } = useContext(ShopContext);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load orders from localStorage on component mount
  useEffect(() => {
    const loadOrders = () => {
      try {
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
          const parsedOrders = JSON.parse(savedOrders);
          
          // Filter out orders older than 5 days
          const recentOrders = parsedOrders.filter(order => {
            const orderDate = new Date(order.date);
            const fiveDaysAgo = new Date();
            fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
            return orderDate >= fiveDaysAgo;
          });

          setOrders(recentOrders);
          
          // Update localStorage with filtered orders
          if (recentOrders.length !== parsedOrders.length) {
            localStorage.setItem('orders', JSON.stringify(recentOrders));
          }
        }
      } catch (error) {
        console.error('Failed to load orders:', error);
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
      setErrorMessage('Please enter a valid email.');
      return;
    }

    setErrorMessage('');

    const subject = 'Order Details';
    const body = `Here are my order details:\n\n${orders.map(order => {
      const orderItems = Object.entries(order.items || {}).map(([productId, sizes]) => {
        const product = products.find(p => p.id === parseInt(productId));
        return `${product?.name || 'Unknown Product'} - Quantity: ${Object.values(sizes).reduce((a, b) => a + b, 0)}`;
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

  if (isLoading) {
    return <div className="border-t pt-16 px-4 sm:px-8 text-center">Loading orders...</div>;
  }

  return (
    <div className="border-t pt-16 px-4 sm:px-8 max-w-6xl mx-auto">
      <div className="text-2xl">
        <Title text1="Your" text2="Orders" />
      </div>

      <div className="mt-8">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <FiClock className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-gray-500">No orders found from the last 5 days.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="border p-4 rounded mb-6 shadow-sm bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-lg">Order #{order.id}</p>
                  <p className="text-gray-600">Date: {formatDate(order.date)}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => downloadOrderDetails(order)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                    title="Download order"
                  >
                    <FiDownload />
                  </button>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full"
                    title="Delete order"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-700 font-medium mb-2">Total: ${order.total.toFixed(2)}</p>

              {/* Delivery Info */}
              <div className="bg-gray-50 p-3 rounded mb-4 text-sm">
                <p className="font-semibold mb-1">Delivery Information:</p>
                {order.delivery ? (
                  <>
                    <p>{order.delivery.firstName} {order.delivery.lastName}</p>
                    <p>{order.delivery.address}</p>
                    <p>{order.delivery.city}, {order.delivery.state} {order.delivery.zip}</p>
                    <p>{order.delivery.country}</p>
                    <p>Email: {order.delivery.email}</p>
                    <p>Phone: {order.delivery.phone}</p>
                  </>
                ) : (
                  <p className="text-gray-500">Delivery information not available.</p>
                )}
              </div>

              {/* Items */}
              <div className="mt-4">
                <h3 className="font-semibold mb-3">Ordered Items:</h3>
                <div className="flex flex-wrap gap-4">
                  {Object.entries(order.items || {}).map(([productId, sizes]) => {
                    const product = products.find(p => p.id === parseInt(productId));
                    return (
                      <div
                        key={productId}
                        className="flex items-start gap-3 border rounded-md p-3 w-full sm:w-[45%] bg-white"
                      >
                        {product?.image_urls?.[0] && (
                          <img
                            src={product.image_urls[0]}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-sm">{product?.name || "Product no longer available"}</p>
                          <ul className="ml-4 list-disc text-sm mt-1">
                            {Object.entries(sizes).map(([size, quantity]) => (
                              <li key={size}>
                                Size {size}: {quantity}
                              </li>
                            ))}
                          </ul>
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

      {/* Email Form */}
      {orders.length > 0 && (
        <div className="mt-8 max-w-lg mx-auto bg-white p-4 rounded shadow-sm">
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold flex items-center gap-2">
                <FiMail /> Email order details
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your email address"
              />
              {errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={
                orders.length === 0 ||
                !orders.some(order => order.items && Object.keys(order.items).length > 0)
              }
              className={`w-full px-6 py-2 font-semibold rounded-md focus:outline-none transition flex items-center justify-center gap-2 ${
                orders.length === 0 ||
                !orders.some(order => order.items && Object.keys(order.items).length > 0)
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <FiMail /> Send Order Details
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Orders;