import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const user = localStorage.getItem('currentUser');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <header>
      <div className="container">
        <Link to="/"><h1>🔧 ГАРАЖ</h1></Link>
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/catalog">Каталог</Link>
          {user && <Link to="/profile">Кабинет</Link>}
          {isAdmin && <Link to="/admin">Админ</Link>}
          <Link to="/cart">Корзина {cartCount > 0 && <span className="badge">{cartCount}</span>}</Link>
          {user ? <Link to="/login">Выйти</Link> : <Link to="/login">Войти</Link>}
        </nav>
      </div>
    </header>
  );
}

export default Header;
