import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'; // <-- Добавили useNavigate

const Header = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate(); // <-- Добавили хук навигации

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) setUser(JSON.parse(savedUser));

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.reduce((sum, item) => sum + item.qty, 0));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.reduce((sum, item) => sum + item.qty, 0));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const isAdmin = user?.role === 'admin';

  // ИСПРАВЛЕННАЯ ФУНКЦИЯ ВЫХОДА
  const logout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
    setUser(null);
    setOpen(false);
    navigate('/'); // <-- Правильный переход на главную
    window.location.reload(); // Перезагрузка для обновления шапки
  };

  const close = () => setOpen(false);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo" onClick={close}>ГАРАЖ</Link>

        <button className="burger" onClick={() => setOpen(!open)} aria-label="Меню">
          {open ? '✕' : '☰'}
        </button>

        <nav className={`nav ${open ? 'open' : ''}`}>
          <NavLink to="/" end onClick={close}>Главная</NavLink>
          <NavLink to="/catalog" onClick={close}>Каталог</NavLink>
          <NavLink to="/cart" onClick={close} style={{ position: 'relative' }}>
            Корзина
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-10px',
                background: '#e63946',
                color: '#fff',
                fontSize: '11px',
                fontWeight: '700',
                padding: '2px 6px',
                borderRadius: '10px',
                minWidth: '18px',
                textAlign: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </NavLink>

          {user ? (
            <>
              <NavLink to={isAdmin ? "/admin" : "/profile"} onClick={close}>
                {isAdmin ? 'Админ' : 'Кабинет'}
              </NavLink>
              <button onClick={logout} className="logout-btn">Выйти</button>
            </>
          ) : (
            <NavLink to="/login" onClick={close}>Вход</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;