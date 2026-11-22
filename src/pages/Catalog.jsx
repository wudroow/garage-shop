import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';

function Catalog() {
  const [filter, setFilter] = useState('Все');
  const [search, setSearch] = useState('');
  const [vinSearch, setVinSearch] = useState(localStorage.getItem('searchVin') || '');

  const filtered = products.filter(p => {
    const matchCat = filter === 'Все' || p.category === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    const matchVin = vinSearch ? p.vin.includes(vinSearch) : true;
    return matchCat && matchSearch && matchVin;
  });

  return (
    <div>
      <h1 className="mb-2">{vinSearch ? `Результаты для VIN: ${vinSearch}` : 'Каталог запчастей'}</h1>
      
      <div className="card mb-2" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
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
        {vinSearch && <button className="btn btn-outline" onClick={() => { setVinSearch(''); localStorage.removeItem('searchVin'); }}>Сбросить VIN</button>}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center" style={{ padding: '50px' }}>
          <h3>Ничего не найдено</h3>
          <p>Попробуйте изменить параметры поиска.</p>
        </div>
      ) : (
        <div className="grid">
          {filtered.map(p => (
            <div key={p.id} className="card">
              <div style={{ height: '120px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' }}>🔩</div>
              <h3 style={{ fontSize: '18px' }}>{p.name}</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>{p.brand} • {p.category}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#e63946' }}>{p.price} ₽</span>
                <Link to={`/product/${p.id}`} className="btn" style={{ padding: '8px 16px', fontSize: '14px' }}>В корзину</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Catalog;
