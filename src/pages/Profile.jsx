import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const user = localStorage.getItem('currentUser');
  const userName = localStorage.getItem('currentUserName');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const myOrders = allOrders.filter(o => o.email === user);
    setOrders(myOrders);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('currentUserName');
    navigate('/');
    window.location.reload();
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const statusConfig = {
    new: { label: 'Новый', color: '#2563eb' },
    accepted: { label: 'Принят', color: '#10b981' },
    rejected: { label: 'Отклонён', color: '#ef4444' }
  };

  return (
    <div>
      <h1 className="section-title">Личный кабинет</h1>
      <div className="panel" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '10px' }}>Добро пожаловать, {userName || user}</h3>
        <p className="muted">{user}</p>
        <button className="ghost" style={{ marginTop: '20px' }} onClick={handleLogout}>Выйти</button>
      </div>

      <h2 className="section-title" style={{ marginTop: '30px' }}>Мои заказы</h2>
      {orders.length === 0 ? (
        <div className="panel" style={{ textAlign: 'center' }}>
          <p className="muted">У вас пока нет заказов</p>
        </div>
      ) : (
        orders.map(order => {
          const status = statusConfig[order.status] || statusConfig.new;
          return (
            <div key={order.id} className="panel" style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <strong style={{ fontSize: '16px' }}>Заказ #{String(order.id).slice(-4)}</strong>
                  <div className="muted" style={{ fontSize: '13px', marginTop: '4px' }}>{order.date}</div>
                </div>
                <span className="order-status" style={{ background: status.color }}>
                  {status.label}
                </span>
              </div>
              <div style={{ marginBottom: '15px' }}>
                {order.items.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span>{item.name} × {item.qty}</span>
                    <span>{(item.price * item.qty).toLocaleString('ru-RU')} ₽</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <strong style={{ fontSize: '18px' }}>Итого: {order.total.toLocaleString('ru-RU')} ₽</strong>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Profile;
