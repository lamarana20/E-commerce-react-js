import React, { createContext, useState, useEffect } from 'react';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://store-management-backend-main-ehdxlo.laravel.cloud/api/categories', {
          headers: {
            'Authorization': 'Bearer 1|AIWfG1mrVXAkBO4mHMPOHk3STkPGrUum7UKbar8R87e16048',
            'Accept': 'application/json',
          },
        });

        const result = await res.json();
    
        setCategories(result.data || result); // adapt based on received structure
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading }}>
      {children}
    </CategoryContext.Provider>
  );
};
