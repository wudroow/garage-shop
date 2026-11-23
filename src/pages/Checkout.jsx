import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [errors, setErrors] = useState({});
  const [placed, setPlaced] = useState(null);

  useEffect(() => {
    // Проверка авторизации
    const savedUser = localStorage.getItem('currentUser');
    if (!savedUser) {
      alert('Чтобы оформить заказ, нужно войти в аккаунт!');
      navigate('/login');
      return;
    }
    const u = JSON.parse(savedUser);
    setUser(u);

    // Проверка корзины
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
    if (savedCart.length === 0) {
      navigate('/cart');
      return;
    }

    // Подставляем данные из профиля
    setForm({
      name: u.name || '',
      phone: u.phone || '',
      address: u.address || ''
    });
  }, [navigate]);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = total > 5000 ? 0 : 500;

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Введите имя';
    else if (form.name.trim().length < 2) errs.name = 'Имя слишком короткое';
    if (!form.phone.trim()) errs.phone = 'Введите телефон';
    else if (!/^[\d\s\+\-\(\)]{10,}$/.test(form.phone)) errs.phone = 'Некорректный телефон';
    if (!form.address.trim()) errs.address = 'Введите адрес';
    else if (form.address.trim().length < 10) errs.address = 'Адрес слишком короткий';
    return errs;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      id: orders.length ? Math.max(...orders.map(o => o.id)) + 1 : 1004,
      clientId: user?.id || 1,
      date: new Date().toISOString().slice(0, 10),
      status: 'pending',
      items: cart.map(i => ({ productId: i.id, quantity: i.qty, price: i.price })),
      total: total + delivery,
      customerName: form.name,
      customerPhone: form.phone,
      customerAddress: form.address
    };

    localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));
    localStorage.removeItem('cart');
    setPlaced(newOrder.id);
  };

  if (!user) {
    return (
      <div className="content" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <p className="muted">Проверка авторизации...</p>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="content" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h1 style={{ color: '#4ade80' }}>✅ Заказ №{placed} оформлен!</h1>
        <p className="muted" style={{ margin: '14px 0 24px' }}>
          Статус: «в обработке». Администратор скоро свяжется с вами.
        </p>
        <button className="submit-btn" style={{ maxWidth: 240 }} onClick={() => navigate('/')}>
          На главную
        </button>
      </div>
    );
  }

  return (
    <div className="content">
      <h1 className="section-title">Оформление заказа</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px', alignItems: 'start' }}>
        <div className="panel">
          <h3 style={{ marginBottom: 16 }}>Контактные данные</h3>
          <p className="muted" style={{ marginBottom: 16, fontSize: 13 }}>
            Вошли как: <b style={{ color: '#e63946' }}>{user.name}</b>
            {user.phone && <span> · {user.phone}</span>}
          </p>
          <form onSubmit={submit}>
            <div className="form-group">
              <label>Имя</label>
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Иван Петров"
              />
              {errors.name && <p style={{ color: '#e63946', fontSize: 12, marginTop: 4 }}>{errors.name}</p>}
            </div>
            <div className="form-group">
              <label>Телефон</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="+7-900-111-22-33"
              />
              {errors.phone && <p style={{ color: '#e63946', fontSize: 12, marginTop: 4 }}>{errors.phone}</p>}
            </div>
            <div className="form-group">
              <label>Адрес доставки</label>
              <input
                value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
                placeholder="город, улица, дом, квартира"
              />
              {errors.address && <p style={{ color: '#e63946', fontSize: 12, marginTop: 4 }}>{errors.address}</p>}
            </div>
            <button type="submit" className="submit-btn">Подтвердить заказ</button>
          </form>
        </div>

        <div className="panel" style={{ position: 'sticky', top: '90px' }}>
          <h3 style={{ marginBottom: 16 }}>Ваш заказ</h3>
          {cart.map(i => (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="muted" style={{ fontSize: 14 }}>{i.name} × {i.qty}</span>
              <span style={{ fontWeight: 600 }}>{(i.price * i.qty).toLocaleString('ru-RU')} ₽</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <span className="muted">Товары</span>
            <span>{total.toLocaleString('ru-RU')} ₽</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <span className="muted">Доставка</span>
            <span style={{ color: delivery === 0 ? '#4ade80' : undefined }}>
              {delivery === 0 ? 'Бесплатно' : `${delivery} ₽`}
            </span>
          </div>
          {delivery > 0 && (
            <p className="muted" style={{ fontSize: 12, marginTop: 8 }}>Бесплатная доставка от 5 000 ₽</p>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 0', fontSize: 20, fontWeight: 800 }}>
            <span>Итого</span>
            <span style={{ color: '#e63946' }}>{(total + delivery).toLocaleString('ru-RU')} ₽</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
