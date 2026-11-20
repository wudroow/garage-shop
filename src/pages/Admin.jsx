import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('products');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Товары
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('admin_products');
    if (saved) return JSON.parse(saved);
    return [
      { id: 101, name: "Тормозные колодки передние", brand: "Bosch", price: 3500, category: "Тормозная система", icon: "🛑", vin: ["XW7BF4FKX0S123456", "XTA210990Y1234567"] },
      { id: 102, name: "Масляный фильтр", brand: "Mann-Filter", price: 800, category: "Фильтры", icon: "🧩", vin: ["XW7BF4FKX0S123456", "JTDBR32E720123456"] },
      { id: 103, name: "Свечи зажигания", brand: "Denso", price: 1200, category: "Двигатель", icon: "⚡", vin: ["JTDBR32E720123456"] },
      { id: 104, name: "Амортизатор задний", brand: "KYB", price: 4500, category: "Подвеска", icon: "🔩", vin: ["XW7BF4FKX0S123456"] }
    ];
  });

  // Заказы
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1001, clientId: 1, customerName: "Иван Петров", date: "2026-02-10", total: 4300, status: "completed" },
      { id: 1002, clientId: 2, customerName: "Мария Сидорова", date: "2026-02-12", total: 2400, status: "pending" },
      { id: 1003, clientId: 3, customerName: "Алексей Кузнецов", date: "2026-02-14", total: 5800, status: "completed" }
    ];
  });

  // Форма добавления товара
  const [form, setForm] = useState({ name: '', brand: '', price: '', category: '', icon: '🔧', vin: '' });

  // Проверка авторизации
  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      alert('Доступ только для администратора');
      navigate('/login');
    }
  }, [navigate]);

  // Отслеживание размера экрана
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Сохранение в localStorage
  useEffect(() => { localStorage.setItem('admin_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('orders', JSON.stringify(orders)); }, [orders]);

  // Добавление товара
  const addProduct = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      alert('Заполните название и цену');
      return;
    }
    const item = {
      id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 101,
      name: form.name,
      brand: form.brand || 'Не указан',
      price: Number(form.price),
      category: form.category || 'Без категории',
      icon: form.icon || '🔧',
      vin: form.vin ? form.vin.split(',').map(v => v.trim().toUpperCase()).filter(Boolean) : []
    };
    setProducts([...products, item]);
    setForm({ name: '', brand: '', price: '', category: '', icon: '🔧', vin: '' });
    alert('Товар добавлен!');
  };

  // Удаление товара
  const deleteProduct = (id) => {
    if (window.confirm('Удалить товар?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // Смена статуса заказа
  const setStatus = (id, status) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  // Сброс данных
  const resetData = () => {
    if (!window.confirm('Сбросить все данные к исходному состоянию?')) return;
    localStorage.clear();
    window.location.reload();
  };

  // Выход
  const logout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('currentUser');
    navigate('/');
    window.location.reload();
  };

  const statusText = {
    pending: 'В обработке',
    completed: 'Доставлен',
    cancelled: 'Отменён'
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Шапка */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '800' }}>Админ-панель</h1>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={resetData}
            style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', cursor: 'pointer' }}
          >
            Сброс данных
          </button>
          <button
            onClick={logout}
            style={{ padding: '10px 16px', background: '#e63946', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
          >
            Выйти
          </button>
        </div>
      </div>

      {/* Вкладки */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => setTab('products')}
          style={{
            padding: '10px 20px',
            background: tab === 'products' ? '#e63946' : 'rgba(255,255,255,0.1)',
            color: '#fff',
            border: tab === 'products' ? 'none' : '1px solid rgba(255,255,255,0.2)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Товары ({products.length})
        </button>
        <button
          onClick={() => setTab('orders')}
          style={{
            padding: '10px 20px',
            background: tab === 'orders' ? '#e63946' : 'rgba(255,255,255,0.1)',
            color: '#fff',
            border: tab === 'orders' ? 'none' : '1px solid rgba(255,255,255,0.2)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Заказы ({orders.length})
        </button>
      </div>

      {/* Вкладка ТОВАРЫ */}
      {tab === 'products' && (
        <div>
          {/* Форма добавления */}
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ color: '#fff', marginBottom: '15px' }}>Добавить товар</h3>
            <form onSubmit={addProduct} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              <input
                placeholder="Название"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', color: '#fff' }}
                required
              />
              <input
                placeholder="Бренд"
                value={form.brand}
                onChange={e => setForm({ ...form, brand: e.target.value })}
                style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', color: '#fff' }}
              />
              <input
                placeholder="Цена"
                type="number"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', color: '#fff' }}
                required
              />
              <input
                placeholder="Категория"
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', color: '#fff' }}
              />
              <input
                placeholder="Иконка (эмодзи)"
                value={form.icon}
                onChange={e => setForm({ ...form, icon: e.target.value })}
                style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', color: '#fff' }}
              />
              <input
                placeholder="VIN через запятую"
                value={form.vin}
                onChange={e => setForm({ ...form, vin: e.target.value })}
                style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', color: '#fff', gridColumn: '1 / -1' }}
              />
              <button
                type="submit"
                style={{ padding: '10px', background: '#e63946', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', gridColumn: '1 / -1' }}
              >
                Добавить товар
              </button>
            </form>
          </div>

          {/* Список товаров */}
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ color: '#fff', marginBottom: '15px' }}>Список товаров</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <th style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#fff' }}>ID</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#fff' }}>Название</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#fff' }}>Бренд</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#fff' }}>Категория</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#fff' }}>Цена</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#fff' }}>VIN</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#fff' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#fff' }}>{p.id}</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#fff' }}>{p.icon} {p.name}</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#aaa' }}>{p.brand}</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#aaa' }}>{p.category}</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#e63946', fontWeight: '600' }}>{p.price} ₽</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#aaa', fontSize: '12px' }}>{p.vin.join(', ') || '—'}</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          style={{ padding: '6px 12px', background: '#e63946', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Вкладка ЗАКАЗЫ */}
      {tab === 'orders' && (
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ color: '#fff', marginBottom: '15px' }}>Заказы ({orders.length})</h3>

          {/* Десктоп: таблица */}
          {!isMobile && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <th style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#fff' }}>№</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#fff' }}>Дата</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#fff' }}>Клиент</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#fff' }}>Сумма</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#fff' }}>Статус</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#fff' }}>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#fff' }}>#{o.id}</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#fff' }}>{o.date}</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#fff' }}>{o.customerName || 'Неизвестный'}</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#e63946', fontWeight: '600' }}>{o.total} ₽</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          background: o.status === 'completed' ? '#16a34a' : o.status === 'cancelled' ? '#ef4444' : '#f59e0b',
                          color: '#fff'
                        }}>
                          {statusText[o.status]}
                        </span>
                      </td>
                      <td style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <select
                          value={o.status}
                          onChange={e => setStatus(o.id, e.target.value)}
                          style={{
                            padding: '6px',
                            background: '#1e1e1e',
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="pending">В обработке</option>
                          <option value="completed">Доставлен</option>
                          <option value="cancelled">Отменён</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Мобилка: карточки */}
          {isMobile && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {orders.map(o => (
                <div key={o.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#aaa', fontSize: '13px' }}>Номер:</span>
                    <span style={{ color: '#fff', fontWeight: '600' }}>#{o.id}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#aaa', fontSize: '13px' }}>Дата:</span>
                    <span style={{ color: '#fff' }}>{o.date}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#aaa', fontSize: '13px' }}>Клиент:</span>
                    <span style={{ color: '#fff' }}>{o.customerName || 'Неизвестный'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#aaa', fontSize: '13px' }}>Сумма:</span>
                    <span style={{ color: '#e63946', fontWeight: '600' }}>{o.total} ₽</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ color: '#aaa', fontSize: '13px' }}>Статус:</span>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      background: o.status === 'completed' ? '#16a34a' : o.status === 'cancelled' ? '#ef4444' : '#f59e0b',
                      color: '#fff'
                    }}>
                      {statusText[o.status]}
                    </span>
                  </div>
                  <select
                    value={o.status}
                    onChange={e => setStatus(o.id, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      background: '#1e1e1e',
                      color: '#fff',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="pending">В обработке</option>
                    <option value="completed">Доставлен</option>
                    <option value="cancelled">Отменён</option>
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
