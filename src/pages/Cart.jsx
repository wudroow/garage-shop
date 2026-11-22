import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  if (cart.length === 0) {
    return (
      <div className="text-center" style={{ padding: '50px' }}>
        <h2>Корзина пуста</h2>
        <button className="btn mt-2" onClick={() => navigate('/catalog')}>Перейти в каталог</button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-2">Корзина</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        <div>
          {cart.map(item => (
            <div key={item.id} className="card mb-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3>{item.name}</h3>
                <p style={{ color: '#666' }}>{item.price} ₽ x {item.qty} = <b>{item.price * item.qty} ₽</b></p>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button className="btn btn-outline" onClick={() => updateQty(item.id, -1)}>-</button>
                <span>{item.qty}</span>
                <button className="btn btn-outline" onClick={() => updateQty(item.id, 1)}>+</button>
                <button className="btn" style={{ background: '#dc3545' }} onClick={() => removeItem(item.id)}>Удалить</button>
              </div>
            </div>
          ))}
        </div>
        <div className="card" style={{ height: 'fit-content' }}>
          <h3>Итого</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}><span>Товары:</span><span>{total} ₽</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}><span>Доставка:</span><span>{delivery} ₽</span></div>
          <hr style={{ margin: '15px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold' }}><span>К оплате:</span><span>{total + delivery} ₽</span></div>
          <button className="btn btn-block mt-2" onClick={() => navigate('/checkout')}>Оформить заказ</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
