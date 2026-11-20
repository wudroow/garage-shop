import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (!savedUser) {
      navigate('/login');
      return;
    }
    const u = JSON.parse(savedUser);
    setUser(u);
    setForm({
      name: u.name || '',
      phone: u.phone || '',
      address: u.address || ''
    });

    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(allOrders.filter(o => o.clientId === u.id));
  }, [navigate]);

  const handleSave = () => {
    if (!form.name.trim()) {
      alert('Имя не может быть пустым');
      return;
    }

    const updatedUser = { ...user, name: form.name, phone: form.phone, address: form.address };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    if (updatedUser.role !== 'admin') {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map(u => u.id === updatedUser.id ? updatedUser : u);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }

    setUser(updatedUser);
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
    navigate('/');
    window.location.reload();
  };

  if (!user) return null;

  const statusText = {
    pending: 'В обработке',
    completed: 'Доставлен',
    cancelled: 'Отменён'
  };

  return (
    <div className="content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <h1 className="section-title" style={{ margin: 0 }}>Личный кабинет</h1>
        <button className="submit-btn ghost" style={{ maxWidth: 140 }} onClick={logout}>Выйти</button>
      </div>

      <div className="panel" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
          <h3 style={{ fontSize: 18 }}>
            {user.role === 'admin' ? '🔑 Администратор' : '👤 Профиль'}
          </h3>
          {user.role !== 'admin' && (
            <button
              className="submit-btn ghost"
              style={{ maxWidth: 160, padding: '8px 16px', fontSize: 14 }}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Отмена' : 'Редактировать'}
            </button>
          )}
        </div>

        {saved && (
          <p style={{ color: '#4ade80', marginBottom: 12, fontWeight: 600 }}>
            ✅ Данные сохранены
          </p>
        )}

        {isEditing ? (
          <div style={{ display: 'grid', gap: 14 }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Имя</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Иван Петров"
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Телефон</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+7-900-111-22-33"
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Адрес доставки</label>
              <input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="г. Юрга, ул. Ленина, 10"
              />
            </div>
            <button className="submit-btn" style={{ maxWidth: 200 }} onClick={handleSave}>
              Сохранить изменения
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 10 }}>
            <div style={{ display: 'flex', gap: 12, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="muted" style={{ minWidth: 100 }}>Имя:</span>
              <strong>{user.name || '—'}</strong>
            </div>
            <div style={{ display: 'flex', gap: 12, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="muted" style={{ minWidth: 100 }}>Email:</span>
              <span>{user.email || '—'}</span>
            </div>
            <div style={{ display: 'flex', gap: 12, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="muted" style={{ minWidth: 100 }}>Телефон:</span>
              <span>{user.phone || <span className="muted">не указан</span>}</span>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <span className="muted" style={{ minWidth: 100 }}>Адрес:</span>
              <span>{user.address || <span className="muted">не указан</span>}</span>
            </div>
          </div>
        )}
      </div>

      <div className="panel">
        <h3 style={{ fontSize: 18, marginBottom: 16 }}>Мои заказы ({orders.length})</h3>

        {orders.length === 0 ? (
          <p className="no-results">У вас пока нет заказов</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Дата</th>
                  <th>Состав</th>
                  <th>Сумма</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td>#{o.id}</td>
                    <td>{o.date}</td>
                    <td className="muted" style={{ fontSize: 12 }}>
                      {o.items.map(i => `${i.quantity} шт.`).join(', ')}
                    </td>
                    <td style={{ color: '#e63946', fontWeight: 700 }}>{o.total.toLocaleString('ru-RU')} ₽</td>
                    <td>
                      <span className={`badge ${o.status}`}>
                        {statusText[o.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;