import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';

function Home() {
  const [vin, setVin] = useState(() => localStorage.getItem('lastVin') || '');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(() => {
    const savedVin = localStorage.getItem('lastVin');
    return savedVin && savedVin.length === 17;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (vin.length === 17) {
      const found = products.filter(p => p.vin.includes(vin));
      setResults(found);
      setSearched(true);
    }
  }, []);

  const handleSearch = () => {
    if (vin.length !== 17) {
      alert('VIN должен быть ровно 17 символов!');
      return;
    }
    localStorage.setItem('lastVin', vin);
    const found = products.filter(p => p.vin.includes(vin));
    setResults(found);
    setSearched(true);
  };

  const clearSearch = () => {
    setVin('');
    setResults([]);
    setSearched(false);
    localStorage.removeItem('lastVin');
  };

  const testVins = ["XW7BF4FKX0S123456", "JTDBR32E720123456", "XTA210990Y1234567"];

  return (
    <div>
      <div className="hero">
        <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '20px', fontWeight: '500' }}>
          Профессиональный подбор автозапчастей по VIN-коду
        </p>
        <div className="search-box">
          <input
            className="search-input"
            placeholder="Введите VIN (17 символов)"
            value={vin}
            maxLength={17}
            onChange={(e) => setVin(e.target.value.toUpperCase())}
          />
          <button className="search-btn" onClick={handleSearch}>Подобрать</button>
          {searched && (
            <button className="ghost" onClick={clearSearch}>Очистить</button>
          )}
        </div>
        <p style={{ marginTop: '20px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.4)' }}>
          Тест: {testVins.map((v, i) => (
            <span key={v} onClick={() => { setVin(v); localStorage.setItem('lastVin', v); }} style={{ cursor: 'pointer', color: '#2563eb', margin: '0 5px', textDecoration: 'underline' }}>
              {v}{i < testVins.length - 1 ? ',' : ''}
            </span>
          ))}
        </p>
      </div>

      {searched && (
        <div className="panel">
          <h3 className="section-title" style={{ fontSize: '18px', marginBottom: '20px' }}>Результаты поиска: {results.length}</h3>
          {results.length === 0 && <p className="muted" style={{ textAlign: 'center', padding: '20px' }}>Ничего не найдено. Попробуйте тестовые коды выше.</p>}
          {results.map(p => (
            <div key={p.id} className="result-item">
              <div className="result-name">
                <strong>{p.name}</strong>
                <div className="muted">{p.brand} | {p.category}</div>
              </div>
              <div className="result-price">{p.price.toLocaleString('ru-RU')} ₽</div>
              <Link to={`/product/${p.id}`} className="card-btn ghost" style={{ width: 'auto', padding: '8px 16px' }}>Подробнее</Link>
            </div>
          ))}
        </div>
      )}

      <h2 className="section-title" style={{ marginTop: '40px' }}>Каталог</h2>
      <div className="grid">
        {products.slice(0, 4).map(p => (
          <div key={p.id} className="card">
            <div className="card-img">
              {p.image ? <img src={p.image} alt={p.name} /> : <span style={{opacity: 0.3}}>📦</span>}
            </div>
            <h3>{p.name}</h3>
            <p className="muted">{p.brand} | {p.category}</p>
            <div className="price">{p.price.toLocaleString('ru-RU')} ₽</div>
            <Link to={`/product/${p.id}`} className="card-btn">В корзину</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
