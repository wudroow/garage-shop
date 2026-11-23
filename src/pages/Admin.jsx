import React, { useState, useEffect } from 'react';
import { products as initialProducts, categories } from '../data/products';

function Admin() {
  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', brand: '', category: 'Двигатель', price: '', stock: '', vin: '', desc: ''
  });

  // Загружаем заказы при монтировании
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const addProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert('Заполните название и цену');
      return;
    }
    const product = {
      id: Date.now(),
      name: newProduct.name,
      brand: newProduct.brand,
      category: newProduct.category,
      price: parseInt(newProduct.price),
      stock: parseInt(newProduct.stock) || 0,
      vin: newProduct.vin.split(',').map(v => v.trim()).filter(v => v),
      desc: newProduct.desc,
      icon: '📦'
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', brand: '', category: 'Двигатель', price: '', stock: '', vin: '', desc: '' });
    setShowForm(false);
    alert('Товар добавлен!');
  };

  const removeProduct = (id) => {
    if (confirm('Удалить товар?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const updateOrderStatus = (id, status) => {
    // Создаём НОВЫЙ массив с обновлённым статусом
    const updatedOrders = orders.map(order => 
      order.id === id ? { ...order, status: status } : order
    );
    
    // Обновляем состояние
    setOrders(updatedOrders);
    
    // Сохраняем в localStorage
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    // Визуальная обратная связь
    const statusText = status === 'accepted' ? 'принят' : 'отклонён';
    alert(`Заказ #${String(id).slice(-4)} ${statusText}`);
  };

  const statusConfig = {
    new: { label: 'Новый', color: '#2563eb' },
    accepted: { label: 'Принят', color: '#10b981' },
    rejected: { label: 'Отклонён', color: '#ef4444' }
  };

  return (
    <div>
      <h1 className="section-title">Панель администратора</h1>

      <div className="admin-tabs">
        <button className={`admin-tab ${tab === 'products' ? 'active' : ''}`} onClick={() => setTab('products')}>
          Товары ({products.length})
        </button>
        <button className={`admin-tab ${tab === 'orders' ? 'active' : ''}`} onClick={() => setTab('orders')}>
          Заказы ({orders.length})
        </button>
      </div>

      {tab === 'products' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 className="section-title" style={{ marginBottom: 0 }}>Все товары</h3>
            <button className="card-btn" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Отмена' : '+ Добавить товар'}
            </button>
          </div>

          {showForm && (
            <div className="panel" style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '20px' }}>Новый товар</h3>
              <form onSubmit={addProduct} className="admin-form">
                <div className="form-row">
                  <input placeholder="Название" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
                  <input placeholder="Бренд" value={newProduct.brand} onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})} />
                </div>
                <div className="form-row">
                  <select value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}>
                    {categories.filter(c => c !== 'Все').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input placeholder="Цена" type="number" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />
                </div>
                <div className="form-row">
                  <input placeholder="Остаток (шт)" type="number" value={newProduct.stock} onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})} />
                  <input placeholder="VIN через запятую" value={newProduct.vin} onChange={(e) => setNewProduct({...newProduct, vin: e.target.value})} />
                </div>
                <input placeholder="Описание" value={newProduct.desc} onChange={(e) => setNewProduct({...newProduct, desc: e.target.value})} />
                <button type="submit" className="card-btn" style={{ width: '100%' }}>Добавить</button>
              </form>
            </div>
          )}

          <div className="panel" style={{ padding: 0 }}>
            {products.map(p => (
              <div key={p.id} className="result-item">
                <div className="result-name">
                  <strong>{p.name}</strong>
                  <div className="muted">{p.brand} | {p.category} | Остаток: {p.stock || 0} шт.</div>
                </div>
                <div className="result-price">{p.price.toLocaleString('ru-RU')} ₽</div>
                <button className="ghost" onClick={() => removeProduct(p.id)} style={{ padding: '8px 16px' }}>Удалить</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div>
          <h3 className="section-title">Все заказы</h3>
          {orders.length === 0 ? (
            <div className="panel" style={{ textAlign: 'center', padding: '40px' }}>
              <p className="muted">Заказов пока нет</p>
            </div>
          ) : (
            orders.map(order => {
              const status = statusConfig[order.status] || statusConfig.new;
              return (
                <div key={order.id + '-' + order.status} className="panel" style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <strong style={{ fontSize: '16px' }}>Заказ #{String(order.id).slice(-4)}</strong>
                      <div className="muted" style={{ fontSize: '13px', marginTop: '4px' }}>{order.date}</div>
                    </div>
                    <span 
                      className="order-status" 
                      key={order.status}
                      style={{ 
                        background: status.color,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {status.label}
                    </span>
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    {order.items.map(item => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <span>{item.name} × {item.qty}</span>
                        <span>{(item.price * item.qty).toLocaleString('ru-RU')} ₽</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <strong style={{ fontSize: '18px' }}>Итого: {order.total.toLocaleString('ru-RU')} ₽</strong>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        className="ghost" 
                        onClick={() => updateOrderStatus(order.id, 'accepted')} 
                        style={{ 
                          padding: '8px 16px', 
                          borderColor: '#10b981', 
                          color: '#10b981',
                          opacity: order.status === 'accepted' ? 0.5 : 1
                        }}
                        disabled={order.status === 'accepted'}
                      >
                        {order.status === 'accepted' ? '✓ Принят' : 'Принять'}
                      </button>
                      <button 
                        className="ghost" 
                        onClick={() => updateOrderStatus(order.id, 'rejected')} 
                        style={{ 
                          padding: '8px 16px', 
                          borderColor: '#ef4444', 
                          color: '#ef4444',
                          opacity: order.status === 'rejected' ? 0.5 : 1
                        }}
                        disabled={order.status === 'rejected'}
                      >
                        {order.status === 'rejected' ? '✗ Отклонён' : 'Отклонить'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default Admin;
