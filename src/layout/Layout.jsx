// src/components/Layout.js
import React from 'react';

import { Outlet } from 'react-router-dom'; // This will render the matched child route component
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Layout() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout