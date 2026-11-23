import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';

// Импорты компонентов (из папки components)
import Layout from './components/Layout';

// Импорты страниц (из папки pages)
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Registration from './pages/Registration';

const NotFound = () => (
  <div className="content" style={{ textAlign: 'center', padding: '80px 20px' }}>
    <h1 style={{ fontSize: 60, color: 'var(--accent)' }}>404</h1>
    <p className="muted" style={{ margin: '14px 0 24px' }}>Страница не найдена</p>
    <Link to="/" className="submit-btn" style={{ display: 'inline-block', maxWidth: 220 }}>На главную</Link>
  </div>
);

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/registration" element={<Registration />} />
        <Route index element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </HashRouter>
);

export default App;
