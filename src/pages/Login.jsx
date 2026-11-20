import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Тестовые клиенты (как в методичке п. 2.4.4)
const TEST_CLIENTS = [
  { id: 1, name: 'Иван Петров', email: 'ivan@example.com', password: '123456', phone: '+7-900-111-22-33', address: 'г. Юрга, ул. Ленина, 10', role: 'user' },
  { id: 2, name: 'Мария Сидорова', email: 'maria@example.com', password: '123456', phone: '+7-900-444-55-66', address: 'г. Кемерово, пр. Советский, 25', role: 'user' },
  { id: 3, name: 'Алексей Кузнецов', email: 'alexey@example.com', password: '123456', phone: '+7-900-777-88-99', address: 'г. Томск, ул. Баумана, 5', role: 'user' }
];

const Login = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', passwordConfirm: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isRegister) {
      // РЕГИСТРАЦИЯ
      if (!form.name.trim()) { setError('Введите имя'); return; }
      if (!form.email.trim()) { setError('Введите email'); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError('Некорректный email'); return; }
      if (!form.password) { setError('Введите пароль'); return; }
      if (form.password.length < 6) { setError('Пароль минимум 6 символов'); return; }
      if (form.password !== form.passwordConfirm) { setError('Пароли не совпадают'); return; }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.email.toLowerCase() === form.email.toLowerCase())) {
        setError('Пользователь с таким email уже существует');
        return;
      }

      const newUser = {
        id: Date.now(),
        name: form.name,
        email: form.email,
        password: form.password,
        role: 'user',
        phone: '',
        address: ''
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      localStorage.setItem('isAdmin', 'false');
      navigate('/');
      window.location.reload();
    } else {
      // ВХОД
      if (!form.email || !form.password) {
        setError('Введите email и пароль');
        return;
      }

      // Админ
      if (form.email === 'admin' && form.password === 'admin123') {
        const admin = { id: 0, name: 'Администратор', email: 'admin', role: 'admin' };
        localStorage.setItem('currentUser', JSON.stringify(admin));
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin');
        window.location.reload();
        return;
      }

      // Тестовые клиенты
      const testClient = TEST_CLIENTS.find(
        c => c.email.toLowerCase() === form.email.toLowerCase() && c.password === form.password
      );
      if (testClient) {
        localStorage.setItem('currentUser', JSON.stringify(testClient));
        localStorage.setItem('isAdmin', 'false');
        navigate('/');
        window.location.reload();
        return;
      }

      // Зарегистрированные пользователи
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(
        u => u.email.toLowerCase() === form.email.toLowerCase() && u.password === form.password
      );
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isAdmin', 'false');
        navigate('/');
        window.location.reload();
      } else {
        setError('Неверный email или пароль');
      }
    }
  };

  const switchMode = () => {
    setIsRegister(!isRegister);
    setError('');
    setForm({ name: '', email: '', password: '', passwordConfirm: '' });
  };

  return (
    <div className="form-card">
      <h2>{isRegister ? 'Регистрация' : 'Вход'}</h2>

      {!isRegister && (
        <div style={{
          background: 'rgba(230, 57, 70, 0.1)',
          border: '1px solid rgba(230, 57, 70, 0.3)',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '18px',
          fontSize: '13px'
        }}>
          <p style={{ color: '#e63946', fontWeight: '600', marginBottom: '6px' }}>Тестовые аккаунты:</p>
          <p className="muted" style={{ marginBottom: '4px' }}>👤 Клиент: <b>ivan@example.com</b> / <b>123456</b></p>
          <p className="muted" style={{ marginBottom: '4px' }}>👤 Клиент: <b>maria@example.com</b> / <b>123456</b></p>
          <p className="muted">🔑 Админ: <b>admin</b> / <b>admin123</b></p>
        </div>
      )}

      {isRegister && (
        <p className="muted" style={{ textAlign: 'center', marginBottom: 18, fontSize: 13 }}>
          Заполните форму для создания нового аккаунта
        </p>
      )}

      {error && (
        <p style={{ color: '#e63946', textAlign: 'center', marginBottom: 12, fontSize: 14 }}>{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div className="form-group">
            <label>Имя</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Иван Петров"
            />
          </div>
        )}

        <div className="form-group">
          <label>Email</label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="ivan@example.com"
          />
        </div>

        <div className="form-group">
          <label>Пароль</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Минимум 6 символов"
          />
        </div>

        {isRegister && (
          <div className="form-group">
            <label>Повторите пароль</label>
            <input
              type="password"
              value={form.passwordConfirm}
              onChange={(e) => setForm({ ...form, passwordConfirm: e.target.value })}
              placeholder="Повторите пароль"
            />
          </div>
        )}

        <button type="submit" className="submit-btn">
          {isRegister ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 16, color: '#b8b8b8', fontSize: 14 }}>
        {isRegister ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}{' '}
        <button
          onClick={switchMode}
          style={{
            background: 'none',
            border: 'none',
            color: '#e63946',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 14
          }}
        >
          {isRegister ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </p>
    </div>
  );
};

export default Login;