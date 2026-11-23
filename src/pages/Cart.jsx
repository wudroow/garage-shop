import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
  const navigate = useNavigate();

  const updateQty = (id, delta) => {
    const newCart = cart.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItem = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery = total > 5000 || total === 0 ? 0 : 500;

  const checkout = () => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const currentUser = localStorage.getItem('currentUser');
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString('ru-RU'),
      email: currentUser,
      items: [...cart],
      total: total + delivery,
      status: 'new'
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.removeItem('cart');
    setCart([]);
    alert('Заказ оформлен! Ожидайте подтверждения.');
    navigate('/profile');
  };

  if (cart.length === 0) {
    return (
      <div className="panel" style={{ textAlign: 'center', padding: '60px' }}>
        <h2 style={{ marginBottom: '20px' }}>Корзина пуста</h2>
        <Link to="/catalog" className="card-btn">Перейти в каталог</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="section-title">Корзина</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        <div className="panel" style={{ padding: 0 }}>
          {cart.map(item => (
            <div key={item.id} className="result-item">
              <div className="result-name">
                <strong>{item.name}</strong>
                <div className="muted">{item.brand} | {item.price.toLocaleString('ru-RU')} ₽</div>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button className="ghost" onClick={() => updateQty(item.id, -1)} style={{ padding: '6px 12px' }}>-</button>
                <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                <button className="ghost" onClick={() => updateQty(item.id, 1)} style={{ padding: '6px 12px' }}>+</button>
                <button className="ghost" onClick={() => removeItem(item.id)} style={{ padding: '6px 12px', marginLeft: '10px' }}>×</button>
              </div>
            </div>
          ))}
        </div>
        <div className="panel">
          <h3 style={{ marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px' }}>Итого</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
            <span className="muted">Товары:</span>
            <span>{total.toLocaleString('ru-RU')} ₽</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '14px' }}>
            <span className="muted">Доставка:</span>
            <span>{delivery === 0 ? 'Бесплатно' : `${delivery} ₽`}</span>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>
            <span>К оплате:</span>
            <span>{(total + delivery).toLocaleString('ru-RU')} ₽</span>
          </div>
          <button className="card-btn" style={{ width: '100%' }} onClick={checkout}>
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
