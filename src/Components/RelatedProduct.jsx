import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from './Title';
import { Link } from 'react-router-dom';

const RelatedProduct = ({ category_id, subcategory, currentId }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const related = products.filter(product =>
        product.category_id === category_id &&
       // product.sub_category === subcategory &&//
        product.id !== currentId 
      );
      setRelatedProducts(related.slice(0, 100)); 
    }
  }, [products, category_id, currentId, subcategory]);

  return (
    <div className="my-10">
     <div className='text-center text-3xl font-bold py-3'>
      <Title text1='Related Products' />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} className="text-gray-700 cursor-pointer">
          <div>
            <img
              src={product.image_urls?.[0]}
              alt={product.name}
              className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
            />
            <h3 className="pt-3 pb-1 text-sm">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-1">${product.price}</p>
          </div>
          </Link>
        ))}
      </div>
     
    </div>
  );
};

export default RelatedProduct;