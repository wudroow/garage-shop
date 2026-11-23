import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer'; // <-- Добавили эту строку

function Layout() {
  return (
    <>
      <Header />
      <main className="container" style={{ padding: '40px 20px', minHeight: '80vh' }}>
        <Outlet />
      </main>
      <Footer /> {/* <-- Добавили эту строку */}
    </>
  );
}

export default Layout;
