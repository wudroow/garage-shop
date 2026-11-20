import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 — Страница не найдена</h1>
      <p>Такой страницы не существует.</p>
      <Link to="/" style={{ color: '#f57c00', textDecoration: 'underline' }}>Вернуться на главную</Link>
    </div>
  );
};

export default NotFound;