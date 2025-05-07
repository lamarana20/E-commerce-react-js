import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from '../Components/Title';

const Orders = () => {
  const { orders, products } = useContext(ShopContext);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email.');
      return;
    }

    setErrorMessage('');
    
    // Redirect to email client with pre-filled email subject and body (mailto)
      const subject = 'Order Details';
      const body = `Here are my order details:\n\n${orders.map(order => {
        const orderItems = Object.entries(order.items).map(([productId, sizes]) => {
          const product = products.find(p => p.id === parseInt(productId));
          return `${product?.name || 'Unknown Product'} - Quantity: ${Object.values(sizes).reduce((a, b) => a + b, 0)}`;
        }).join('\n');
      
        return `Order #${order.id}\nDate: ${formatDate(order.date)}\nTotal: ${order.total}\nItems:\n${orderItems}\n`;
      }).join('\n')}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
console.log(orders);
  return (
    <div className="border-t pt-16 px-4 sm:px-8">
      <div className="text-2xl">
        <Title text1="Your" text2="Orders" />
      </div>

      <div className="mt-8">
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders placed yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="border p-4 rounded mb-6 shadow-sm">
              <p className="font-bold text-lg">Order #{order.id}</p>
              <p className="text-gray-600">Date: {formatDate(order.date)}</p>
              <p className="text-gray-700 font-medium mb-2">Total: ${order.total}</p>

              {/* Delivery Info */}
              <div className="bg-gray-50 p-3 rounded mb-4">
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
              <div className="mt-4 flex flex-wrap gap-4">
                {Object.entries(order.items).map(([productId, sizes]) => {
                  const product = products.find(p => p.id === parseInt(productId));
                  return (
                    <div key={productId} className="flex items-start gap-3 border rounded-md p-3 w-full sm:w-[45%] bg-white">
                      {product?.image && (
                        <img
                          src={product.image_urls?.[0]}
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
          ))
        )}
      </div>

      {/* Email input form */}
      <div className="mt-8">
        <form onSubmit={handleEmailSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold">Enter your email to receive order details</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full p-2 border border-gray-300 rounded-md"
              placeholder="Your email address"
            />
            {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
          </div>

          <button
  type="submit"
  disabled={orders.length === 0 || !orders.some(order => order.items && Object.keys(order.items).length > 0)}
  className={`px-6 py-2 font-semibold rounded-md focus:outline-none ${
    orders.length === 0 || !orders.some(order => order.items && Object.keys(order.items).length > 0)
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-blue-500 text-white hover:bg-blue-600'
  }`}
>
  Send Order Details via Email
</button>

        </form>
      </div>
    </div>
  );
};

export default Orders;