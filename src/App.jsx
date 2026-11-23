import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound'; // <-- добавь эту строку

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="profile" element={<Profile />} />
        <Route path="admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} /> {/* <-- добавь эту строку ПОСЛЕДНЕЙ */}
      </Route>
    </Routes>
  );
}

export default App;
