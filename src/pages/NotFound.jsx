import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound-code">404</div>
      <h1 className="notfound-title">Страница не найдена</h1>
      <p className="notfound-text">
        Запрашиваемая страница не существует или была перемещена.
      </p>
      <Link to="/" className="card-btn">На главную</Link>
    </div>
  );
}

export default NotFound;
