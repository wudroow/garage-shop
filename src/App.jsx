import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

function App() {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const currentUser = localStorage.getItem('currentUser');

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route
          path="checkout"
          element={currentUser ? <Checkout /> : <Navigate to="/login" />}
        />
        <Route
          path="profile"
          element={currentUser ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="admin"
          element={isAdmin ? <Admin /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
