import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
  return (
    <>
      <Header />
      <main className="container" style={{ padding: '40px 20px', minHeight: '80vh' }}>
        <Outlet />
      </main>
      <footer style={{ background: '#1a1a1a', color: '#888', padding: '30px 0', textAlign: 'center', marginTop: '50px' }}>
        <div className="container">
          <p>© 2026 Интернет-магазин «Гараж». Все права защищены.</p>
          <p style={{ fontSize: '12px', marginTop: '10px' }}>Учебный проект. Не является публичной офертой.</p>
        </div>
      </footer>
    </>
  );
}

export default Layout;
