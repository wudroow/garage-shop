import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <div className="panel" style={{ textAlign: 'center' }}><h2>Товар не найден</h2></div>;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.id === product.id);
    if (existing) existing.qty += 1;
    else cart.push({ ...product, qty: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Товар добавлен в корзину!');
  };

  const goBack = () => {
    const lastVin = localStorage.getItem('lastVin');
    if (lastVin) {
      navigate('/catalog');
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="panel" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', padding: '40px' }}>
      <div className="card-img" style={{ height: '400px', fontSize: '100px' }}>
        {product.image ? <img src={product.image} alt={product.name} /> : <span style={{opacity: 0.3}}>📦</span>}
      </div>
      <div>
        <h1 style={{ fontSize: '28px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>{product.name}</h1>
        <p className="muted" style={{ fontSize: '14px', marginBottom: '20px' }}>Бренд: {product.brand} | Категория: {product.category}</p>
        <div style={{ fontSize: '36px', fontWeight: '800', color: '#fff', marginBottom: '24px' }}>{product.price.toLocaleString('ru-RU')} ₽</div>
        <p style={{ lineHeight: 1.6, marginBottom: '24px', color: 'rgba(255,255,255,0.7)' }}>{product.desc}</p>
        
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', borderRadius: '4px', marginBottom: '24px' }}>
          <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', color: '#fff' }}>Совместимость с VIN:</h4>
          <ul style={{ paddingLeft: '20px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
            {product.vin.map((v, i) => <li key={i} style={{marginBottom: '4px', fontFamily: 'monospace'}}>{v}</li>)}
          </ul>
        </div>

        <button className="card-btn" style={{ width: '100%', padding: '14px', fontSize: '14px' }} onClick={addToCart}>
          Добавить в корзину
        </button>
        <button className="ghost" style={{ width: '100%', marginTop: '12px', padding: '14px' }} onClick={goBack}>
          Назад
        </button>
      </div>
    </div>
  );
}

export default Product;
