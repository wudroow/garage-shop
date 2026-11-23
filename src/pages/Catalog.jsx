import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';

function Catalog() {
  const [filter, setFilter] = useState('Все');
  const [search, setSearch] = useState('');
  const [vinSearch, setVinSearch] = useState(() => localStorage.getItem('lastVin') || '');

  useEffect(() => {
    const savedVin = localStorage.getItem('lastVin');
    if (savedVin) setVinSearch(savedVin);
  }, []);

  const filtered = products.filter(p => {
    const matchCat = filter === 'Все' || p.category === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                        p.brand.toLowerCase().includes(search.toLowerCase());
    const matchVin = vinSearch ? p.vin.includes(vinSearch) : true;
    return matchCat && matchSearch && matchVin;
  });

  const clearVin = () => {
    setVinSearch('');
    localStorage.removeItem('lastVin');
  };

  return (
    <div>
      <h1 className="section-title">
        {vinSearch ? `Каталог для VIN: ${vinSearch}` : 'Каталог запчастей'}
      </h1>

      <div className="panel" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Поиск по названию или бренду..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: '250px', marginBottom: 0 }}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ width: '200px', marginBottom: 0 }}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {vinSearch && (
          <button className="ghost" onClick={clearVin} style={{ padding: '10px 16px' }}>
            Сбросить VIN
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="panel" style={{ textAlign: 'center', padding: '60px' }}>
          <h3 style={{ marginBottom: '10px' }}>Ничего не найдено</h3>
          <p className="muted">Попробуйте изменить параметры поиска или сбросить фильтр VIN.</p>
        </div>
      ) : (
        <div className="grid">
          {filtered.map(p => (
            <div key={p.id} className="card">
              <div className="card-img">
                {p.image ? <img src={p.image} alt={p.name} /> : <span style={{opacity: 0.3}}>📦</span>}
              </div>
              <h3>{p.name}</h3>
              <p className="muted">{p.brand} | {p.category}</p>
              <div className="price">{p.price.toLocaleString('ru-RU')} ₽</div>
              <Link to={`/product/${p.id}`} className="card-btn">Подробнее</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Catalog;
