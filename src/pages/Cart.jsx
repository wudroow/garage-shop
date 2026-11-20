import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(saved);
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const changeQty = (id, delta) => {
    const updated = cart.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    );
    saveCart(updated);
  };

  const removeItem = (id) => {
    saveCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery = subtotal > 5000 ? 0 : 500;
  const total = subtotal + delivery;

  if (cart.length === 0) {
    return (
      <div className="content" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
        <h1 style={{ marginBottom: '12px' }}>Ваша корзина пуста</h1>
        <p className="muted" style={{ marginBottom: '24px' }}>
          Добавьте запчасти из каталога или подберите по VIN-коду
        </p>
        <Link to="/catalog" className="submit-btn" style={{ display: 'inline-block', maxWidth: '240px' }}>
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="content">
      <h1 className="section-title">Корзина</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px', alignItems: 'start' }}>
        {/* Список товаров */}
        <div>
          {cart.map(item => (
            <div key={item.id} className="cart-row">
              {/* Левая часть: фото + информация */}
              <div style={{ display: 'flex', gap: '16px', flex: 1, minWidth: 0 }}>
                <div className="thumb">{item.icon}</div>
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ fontSize: '16px', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name}
                  </h3>
                  <p className="muted" style={{ fontSize: '13px', marginBottom: '4px' }}>
                    {item.brand} · {item.category}
                  </p>
                  <p className="muted" style={{ fontSize: '12px' }}>
                    {item.price.toLocaleString('ru-RU')} ₽ за шт.
                  </p>
                </div>
              </div>

              {/* Правая часть: действия + цена */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                <div className="qty">
                  <button onClick={() => changeQty(item.id, -1)}>−</button>
                  <span style={{ minWidth: '28px', textAlign: 'center', fontWeight: '600' }}>{item.qty}</span>
                  <button onClick={() => changeQty(item.id, 1)}>+</button>
                </div>
                <div className="result-price" style={{ minWidth: '110px', textAlign: 'right', fontSize: '18px' }}>
                  {(item.price * item.qty).toLocaleString('ru-RU')} ₽
                </div>
                <button className="del-btn" onClick={() => removeItem(item.id)} title="Удалить">
                  ✕
                </button>
              </div>
            </div>
          ))}

          {/* Кнопки под карточками */}
          <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/catalog" className="submit-btn ghost" style={{ maxWidth: '220px', textAlign: 'center' }}>
              ← Продолжить покупки
            </Link>
            <button
              className="submit-btn ghost"
              style={{ maxWidth: '180px' }}
              onClick={() => {
                if (window.confirm('Очистить корзину?')) saveCart([]);
              }}
            >
              Очистить всё
            </button>
          </div>
        </div>

        {/* Правая панель: итог (sticky) */}
        <div className="panel" style={{ position: 'sticky', top: '90px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Ваш заказ</h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <span className="muted">Товары ({cart.reduce((s, i) => s + i.qty, 0)} шт.)</span>
            <span>{subtotal.toLocaleString('ru-RU')} ₽</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <span className="muted">Доставка</span>
            <span style={{ color: delivery === 0 ? '#4ade80' : undefined }}>
              {delivery === 0 ? 'Бесплатно' : `${delivery} ₽`}
            </span>
          </div>

          {delivery > 0 && (
            <p className="muted" style={{ fontSize: '12px', marginTop: '8px' }}>
              Бесплатная доставка от 5 000 ₽
            </p>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 8px', fontSize: '20px', fontWeight: '800' }}>
            <span>Итого</span>
            <span style={{ color: '#e63946' }}>{total.toLocaleString('ru-RU')} ₽</span>
          </div>

          <button className="submit-btn" style={{ marginTop: '16px' }} onClick={() => navigate('/checkout')}>
            Оформить заказ
          </button>

          <p className="muted" style={{ fontSize: '12px', textAlign: 'center', marginTop: '12px' }}>
            После оформления с вами свяжется менеджер
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;