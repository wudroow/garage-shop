import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import products from '../data/products';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null');

  if (!product) {
    return (
      <div className="content" style={{ textAlign: 'center' }}>
        <h1>Товар не найден</h1>
        <Link to="/catalog" className="submit-btn" style={{ display: 'inline-block', maxWidth: 240, marginTop: 20 }}>
          В каталог
        </Link>
      </div>
    );
  }

  const addToCart = () => {
    if (!user) {
      alert('Чтобы добавить товар в корзину, нужно войти в аккаунт!');
      navigate('/login');
      return;
    }
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`"${product.name}" добавлен в корзину!`);
  };

  return (
    <div className="content">
      <button className="submit-btn ghost" style={{ maxWidth: 160, marginBottom: 20 }} onClick={() => navigate(-1)}>
        ← Назад
      </button>

      <div className="panel" style={{ display: 'flex', gap: 30, flexWrap: 'wrap' }}>
        <div className="card-img" style={{ width: 320, height: 260, fontSize: 90, margin: 0 }}>{product.icon}</div>

        <div style={{ flex: 1, minWidth: 260 }}>
          <h1 style={{ fontSize: 26, marginBottom: 6 }}>{product.name}</h1>
          <p className="muted" style={{ marginBottom: 16 }}>{product.brand} · {product.category} · арт. #{product.id}</p>
          <div className="price" style={{ fontSize: 30, marginBottom: 14 }}>{product.price.toLocaleString('ru-RU')} ₽</div>
          <p style={{ marginBottom: 14 }}>{product.description}</p>
          <p className="muted" style={{ marginBottom: 18 }}>На складе: {product.stock} шт.</p>

          <div style={{ background: 'rgba(230, 57, 70, 0.1)', padding: 14, borderRadius: 10, marginBottom: 18 }}>
            <b style={{ color: '#e63946' }}>Совместимость по VIN:</b>
            <p className="muted" style={{ marginTop: 6, fontSize: 13 }}>
              {product.vin.length ? product.vin.join(', ') : 'Универсальная деталь'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="submit-btn" style={{ flex: 1, maxWidth: 220 }} onClick={addToCart}>
              В корзину
            </button>
            <Link to="/cart" className="submit-btn ghost" style={{ flex: 1, maxWidth: 220, textAlign: 'center' }}>
              Открыть корзину
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;