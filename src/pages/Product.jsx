import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <h2>Товар не найден</h2>;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Товар добавлен в корзину!');
  };

  return (
    <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#f8f9fa', borderRadius: '12px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px' }}>
        ⚙️
      </div>
      <div>
        <h1>{product.name}</h1>
        <p style={{ color: '#666', fontSize: '18px', marginBottom: '20px' }}>Бренд: {product.brand} | Категория: {product.category}</p>
        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#e63946', marginBottom: '20px' }}>{product.price} ₽</div>
        <p style={{ marginBottom: '20px' }}>{product.desc}</p>
        
        <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <h4>Совместимость с VIN:</h4>
          <ul style={{ paddingLeft: '20px', marginTop: '10px', fontSize: '14px' }}>
            {product.vin.map((v, i) => <li key={i}>{v}</li>)}
          </ul>
        </div>

        <button className="btn btn-block" onClick={addToCart}>Добавить в корзину</button>
        <button className="btn btn-outline btn-block mt-2" onClick={() => navigate(-1)}>Назад</button>
      </div>
    </div>
  );
}

export default Product;
