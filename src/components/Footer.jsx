import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '40px', 
        textAlign: 'left', 
        marginBottom: '30px' 
      }}>
        
        {/* Колонка 1: О проекте */}
        <div>
          <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '800', marginBottom: '15px', letterSpacing: '1px' }}>
            ГАРАЖ
          </h3>
          <p className="muted" style={{ fontSize: '14px', lineHeight: '1.6' }}>
            Надежный подбор автозапчастей по VIN-коду вашего автомобиля. 
            Точность, скорость и проверенные поставщики.
          </p>
        </div>

        {/* Колонка 2: Навигация */}
        <div>
          <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>Навигация</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/" className="muted" style={{ textDecoration: 'none', transition: 'color 0.3s' }}>Главная</Link>
            <Link to="/catalog" className="muted" style={{ textDecoration: 'none', transition: 'color 0.3s' }}>Каталог запчастей</Link>
            <Link to="/cart" className="muted" style={{ textDecoration: 'none', transition: 'color 0.3s' }}>Корзина</Link>
            <Link to="/login" className="muted" style={{ textDecoration: 'none', transition: 'color 0.3s' }}>Личный кабинет</Link>
          </div>
        </div>

        {/* Колонка 3: Контакты */}
        <div>
          <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>Контакты</h4>
          <p className="muted" style={{ fontSize: '14px', marginBottom: '10px' }}>📞 +7 (900) 123-45-67</p>
          <p className="muted" style={{ fontSize: '14px', marginBottom: '10px' }}>✉️ support@garage-shop.ru</p>
          <p className="muted" style={{ fontSize: '14px' }}>📍 г. Юрга, ул. Ленина, 10</p>
        </div>
      </div>

      {/* Нижняя полоса с копирайтом */}
      <div style={{ 
        borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
        paddingTop: '20px', 
        fontSize: '13px', 
        color: '#555',
        textAlign: 'center'
      }}>
        © 2026 ГАРАЖ. Все права защищены. Курсовой проект по МДК 04.03.
      </div>
    </footer>
  );
};

export default Footer;
