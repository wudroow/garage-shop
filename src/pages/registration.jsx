import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('Заполните все поля');
      return;
    }

    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    if (password.length < 6) {
      alert('Пароль должен быть не менее 6 символов');
      return;
    }

    // Получаем существующих пользователей
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Проверяем, не занят ли email
    if (users.find(u => u.email === email)) {
      alert('Пользователь с таким email уже существует');
      return;
    }

    // Сохраняем нового пользователя
    const newUser = { name, email, password, date: new Date().toLocaleString('ru-RU') };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Автоматический вход после регистрации
    localStorage.setItem('currentUser', email);
    localStorage.setItem('isAdmin', 'false');
    localStorage.setItem('currentUserName', name);

    alert('Регистрация успешна!');
    navigate('/profile');
  };

  return (
    <div className="login-container">
      <div className="panel login-box">
        <h2 className="login-title">Регистрация</h2>
        <form onSubmit={handleRegister} className="login-form">
          <div className="form-group">
            <label className="form-label">Имя</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Иван Иванов"
              className="form-input"
            />
          </div>
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
              placeholder="Минимум 6 символов"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Повторите пароль</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="••••••••"
              className="form-input"
            />
          </div>
          <button type="submit" className="login-btn">Зарегистрироваться</button>
        </form>
        <p className="login-hint">
          Уже есть аккаунт? <Link to="/login" className="login-link">Войти</Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;
