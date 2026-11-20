import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import products from '../data/products';

const Catalog = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');

  const categories = [...new Set(products.map(p => p.category))];
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null');

  let list = products.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    const matchCat = !category || p.category === category;
    return matchSearch && matchCat;
  });

  if (sort === 'asc') list = [...list].sort((a, b) => a.price - b.price);
  if (sort === 'desc') list = [...list].sort((a, b) => b.price - a.price);

  const addToCart = (product) => {
    if (!user) {
      alert('Чтобы добавить товар в корзину, нужно войти в аккаунт!');
      navigate('/login');
      return;
    }
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`"${product.name}" добавлен в корзину!`);
  };

  return (
    <div className="content">
      <h1 className="section-title">Каталог запчастей</h1>

      <div className="filters">
        <input
          placeholder="Поиск по названию или бренду..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: '200px' }}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Все категории</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Без сортировки</option>
          <option value="asc">Сначала дешёвые</option>
          <option value="desc">Сначала дорогие</option>
        </select>
      </div>

      <p className="muted" style={{ marginBottom: 14 }}>Показано: {list.length} товаров</p>

      {list.length > 0 ? (
        <div className="grid">
          {list.map(p => (
            <div key={p.id} className="card">
              <div className="card-img">{p.icon}</div>
              <h3>{p.name}</h3>
              <p className="muted">{p.brand} · {p.category}</p>
              <div className="price">{p.price.toLocaleString('ru-RU')} ₽</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link to={`/product/${p.id}`} className="card-btn ghost" style={{ flex: 1, textAlign: 'center' }}>
                  Подробнее
                </Link>
                <button className="card-btn" style={{ flex: 1 }} onClick={() => addToCart(p)}>
                  В корзину
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">Ничего не найдено</p>
      )}
    </div>
  );
};

export default Catalog;