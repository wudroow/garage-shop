import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products';

const testVins = [
  { vin: "XW7BF4FKX0S123456", car: "Toyota Camry" },
  { vin: "JTDBR32E720123456", car: "Kia Rio" },
  { vin: "XTA210990Y1234567", car: "Lada Vesta" }
];

const Home = () => {
  const [vin, setVin] = useState(() => localStorage.getItem('lastVin') || '');
  const [results, setResults] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    if (vin.length === 17) {
      setResults(products.filter(p => p.vin.includes(vin)));
    }
  }, []);

  const featured = useMemo(() => {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 8);
  }, []);

  const search = () => {
    const clean = vin.trim().toUpperCase().replace(/\s/g, '');
    if (clean.length !== 17) {
      alert('VIN-код должен содержать ровно 17 символов!');
      return;
    }
    localStorage.setItem('lastVin', clean);
    setResults(products.filter(p => p.vin.includes(clean)));
    setSearchFilter('');
  };

  const fillVin = (code) => {
    setVin(code);
    localStorage.setItem('lastVin', code);
    setResults(products.filter(p => p.vin.includes(code)));
    setSearchFilter('');
  };

  const clearVin = () => {
    setVin('');
    setResults(null);
    setSearchFilter('');
    localStorage.removeItem('lastVin');
  };

  // Фильтрация результатов поиска
  const filteredResults = useMemo(() => {
    if (!results) return [];
    if (!searchFilter.trim()) return results;
    const q = searchFilter.toLowerCase();
    return results.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }, [results, searchFilter]);

  return (
    <div>
      <section className="hero">
        <h1>ГАРАЖ</h1>
        <p>Профессиональный подбор автозапчастей по VIN-коду</p>
        <div className="search-box">
          <input
            className="search-input"
            placeholder="Введите VIN (17 символов)"
            value={vin}
            maxLength={17}
            onChange={(e) => setVin(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && search()}
          />
          <button className="search-btn" onClick={search}>Подобрать</button>
          {vin && (
            <button
              className="search-btn ghost"
              onClick={clearVin}
              style={{ maxWidth: '120px' }}
            >
              Сбросить
            </button>
          )}
        </div>
      </section>

      <div className="content">
        <div className="panel">
          <h3 className="section-title" style={{ fontSize: '18px', marginBottom: '10px' }}>
            Тестовые VIN-коды для проверки
          </h3>
          <p className="muted" style={{ marginBottom: '15px' }}>
            Нажмите на код, чтобы автоматически проверить работу поиска:
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {testVins.map(t => (
              <button
                key={t.vin}
                className="card-btn ghost"
                style={{ flex: 1, minWidth: '200px', textAlign: 'left', padding: '12px 16px' }}
                onClick={() => fillVin(t.vin)}
              >
                <div style={{ fontWeight: '700', color: '#e63946', fontSize: '15px', letterSpacing: '1px' }}>
                  {t.vin}
                </div>
                <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>{t.car}</div>
              </button>
            ))}
          </div>
        </div>

        {results !== null && (
          <div className="panel" style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <p className="hint" style={{ margin: 0 }}>
                ✅ Найдено {filteredResults.length} из {results.length} совместимых товаров для VIN {vin}
              </p>
              {results.length > 5 && (
                <input
                  type="text"
                  placeholder="Поиск по названию, бренду или категории..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  style={{
                    padding: '10px 14px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    minWidth: '250px'
                  }}
                />
              )}
            </div>

            {filteredResults.length > 0 ? (
              filteredResults.map(p => (
                <div key={p.id} className="result-item">
                  <div className="result-name">
                    <strong>{p.name}</strong>
                    <div className="muted">{p.brand} · {p.category}</div>
                  </div>
                  <div className="result-price">{p.price.toLocaleString('ru-RU')} ₽</div>
                  <Link to={`/product/${p.id}`} className="card-btn ghost" style={{ width: 'auto', padding: '8px 16px', flexShrink: 0 }}>
                    Подробнее
                  </Link>
                </div>
              ))
            ) : (
              <p className="no-results">
                {searchFilter ? 'Ничего не найдено по вашему запросу' : 'По вашему VIN запчасти не найдены. Попробуйте тестовые коды выше.'}
              </p>
            )}
          </div>
        )}

        <h2 className="section-title" style={{ marginTop: '40px' }}>Популярные товары</h2>
        <div className="grid">
          {featured.map(p => (
            <div key={p.id} className="card">
              <div className="card-img">{p.icon}</div>
              <h3>{p.name}</h3>
              <p className="muted">{p.brand} · {p.category}</p>
              <div className="price">{p.price.toLocaleString('ru-RU')} ₽</div>
              <Link to={`/product/${p.id}`} className="card-btn">Подробнее</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;