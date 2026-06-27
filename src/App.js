import { useState } from 'react';
import './App.css';

const PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, rating: 4.5, emoji: '🎧', category: 'Electronics' },
  { id: 2, name: 'Running Sneakers', price: 129.99, rating: 4.8, emoji: '👟', category: 'Footwear' },
  { id: 3, name: 'Leather Backpack', price: 94.99, rating: 4.3, emoji: '🎒', category: 'Bags' },
  { id: 4, name: 'Smart Watch', price: 199.99, rating: 4.7, emoji: '⌚', category: 'Electronics' },
];

function StarRating({ rating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <span key={star} className={`star ${filled ? 'filled' : half ? 'half' : 'empty'}`}>
            ★
          </span>
        );
      })}
      <span className="rating-value">({rating})</span>
    </div>
  );
}

function ProductCard({ product, cartQty, onAdd, onRemove }) {
  return (
    <div className="product-card">
      <div className="product-badge">{product.category}</div>
      <div className="product-image">{product.emoji}</div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <StarRating rating={product.rating} />
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
      <div className="product-actions">
        {cartQty === 0 ? (
          <button className="btn btn-add" onClick={onAdd}>
            Add to Cart
          </button>
        ) : (
          <div className="qty-control">
            <button className="btn btn-qty" onClick={onRemove}>−</button>
            <span className="qty-count">{cartQty}</span>
            <button className="btn btn-qty" onClick={onAdd}>+</button>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState({});

  const addToCart = (id) =>
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

  const removeFromCart = (id) =>
    setCart((prev) => {
      const qty = (prev[id] || 0) - 1;
      if (qty <= 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: qty };
    });

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = PRODUCTS.reduce(
    (sum, p) => sum + (cart[p.id] || 0) * p.price,
    0
  );

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">🛍️</span>
            <span className="logo-text">ShopLux</span>
          </div>
          <div className="cart-summary">
            <span className="cart-icon">🛒</span>
            {totalItems > 0 && (
              <>
                <span className="cart-badge">{totalItems}</span>
                <span className="cart-total">${totalPrice.toFixed(2)}</span>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="main">
        <section className="hero">
          <h1 className="hero-title">Summer Collection 2026</h1>
          <p className="hero-subtitle">Discover premium products curated just for you</p>
        </section>

        <section className="products-section">
          <h2 className="section-title">Featured Products</h2>
          <div className="products-grid">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                cartQty={cart[product.id] || 0}
                onAdd={() => addToCart(product.id)}
                onRemove={() => removeFromCart(product.id)}
              />
            ))}
          </div>
        </section>

        {totalItems > 0 && (
          <section className="cart-bar">
            <div className="cart-bar-inner">
              <span>
                <strong>{totalItems}</strong> item{totalItems !== 1 ? 's' : ''} in cart
              </span>
              <span className="cart-bar-total">${totalPrice.toFixed(2)}</span>
              <button className="btn btn-checkout">Checkout</button>
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>© 2026 ShopLux — All rights reserved</p>
      </footer>
    </div>
  );
}

export default App;
