import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [cartCount, setCartCount] = useState(0);
  const user = localStorage.getItem('currentUser');
  const userName = localStorage.getItem('currentUserName');
  const isAdmin = localStorage.getItem('isAdmin') === 'true' && user === 'admin@garage.ru';

  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((sum, item) => sum + item.qty, 0);
      setCartCount(count);
    };
    updateCount();
    window.addEventListener('storage', updateCount);
    return () => window.removeEventListener('storage', updateCount);
  }, []);

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="logo">ГАРАЖ</Link>
        <nav className="nav">
          <Link to="/">Главная</Link>
          <Link to="/catalog">Каталог</Link>
          {user && <Link to="/profile">Кабинет</Link>}
          {isAdmin && <Link to="/admin">Управление</Link>}
          <Link to="/cart" className="nav-cart">
            Корзина
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          {user
            ? <Link to="/login" className="nav-exit">Выйти</Link>
            : <Link to="/login" className="nav-exit">Войти</Link>
          }
        </nav>
      </div>
    </header>
  );
}

export default Header;
