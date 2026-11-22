import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';

function Home() {
  const [vin, setVin] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (vin.length === 17) {
      localStorage.setItem('searchVin', vin);
      navigate('/catalog');
    } else {
      alert('VIN-код должен содержать ровно 17 символов!');
    }
  };

  return (
    <div>
      <div className="card text-center" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)', color: 'white', padding: '60px 20px', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '36px', marginBottom: '15px', color: 'white' }}>Подбор запчастей по VIN-коду</h2>
        <p style={{ marginBottom: '30px', color: '#ccc' }}>Введите 17-значный код автомобиля, чтобы найти совместимые детали</p>
        
        <div style={{ display: 'flex', gap: '10px', maxWidth: '600px', margin: '0 auto' }}>
          <input 
            type="text" 
            placeholder="Например: XW7BF4FKX0S123456" 
            value={vin} 
            onChange={(e) => setVin(e.target.value.toUpperCase())}
            style={{ marginBottom: 0, fontSize: '16px' }}
          />
          <button className="btn" onClick={handleSearch}>Найти</button>
        </div>
        <p style={{ marginTop: '15px', fontSize: '12px', color: '#888' }}>Тестовый VIN: XW7BF4FKX0S123456</p>
      </div>

      <h2 className="mb-2">Популярные товары</h2>
      <div className="grid">
        {products.slice(0, 4).map(p => (
          <div key={p.id} className="card">
            <div style={{ height: '150px', background: '#f0f0f0', borderRadius: '8px', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>⚙️</div>
            <h3>{p.name}</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>{p.brand}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{p.price} ₽</span>
              <button className="btn btn-outline" onClick={() => navigate(`/product/${p.id}`)}>Подробнее</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
