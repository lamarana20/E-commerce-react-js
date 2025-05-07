import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Components/Footer';
import SearchBar from '../Components/SearchBar';
import { ShopContext } from '../Context/ShopContext';

const MainLayout = () => {
  return (
    <>
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

      <header>
        <Navbar />
        <SearchBar/>
      
      </header>
      <main>
        <Outlet />
        
        <ToastContainer />
     
      </main>
      <Footer/>
    </div>
    
    </>
  );
};

export default MainLayout;
