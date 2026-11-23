import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Заполните все поля');
      return;
    }

    // СНАЧАЛА СБРАСЫВАЕМ ВСЁ
    localStorage.removeItem('isAdmin');

    // Проверка админа
    if (email === 'admin@garage.ru' && password === 'admin') {
      localStorage.setItem('currentUser', email);
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('currentUserName', 'Администратор');
      navigate('/admin');
      return;
    }

    // Проверка зарегистрированных пользователей
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', email);
      localStorage.setItem('isAdmin', 'false'); // ЯВНО СТАВИМ FALSE
      localStorage.setItem('currentUserName', user.name);
      navigate('/profile');
    } else {
      alert('Неверный email или пароль. Если у вас нет аккаунта — зарегистрируйтесь.');
    }
  };

  return (
    <div className="login-container">
      <div className="panel login-box">
        <h2 className="login-title">Вход</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="your@email.ru"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Пароль</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              className="form-input"
            />
          </div>
          <button type="submit" className="login-btn">Войти</button>
        </form>
        <p className="login-hint">
          Нет аккаунта? <Link to="/registration" className="login-link">Зарегистрироваться</Link>
        </p>
        <p className="login-hint" style={{ marginTop: '10px' }}>
          Админ: admin@garage.ru / admin
        </p>
      </div>
    </div>
  );
}

export default Login;
