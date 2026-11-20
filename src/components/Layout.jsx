import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => (
  <div className="app-shell">
    <Header />
    <main className="main">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;