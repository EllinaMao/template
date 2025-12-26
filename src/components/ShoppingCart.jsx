import React, { useState, useMemo, useEffect } from "react";

const ShoppingCart = ({ availableProducts }) => {
  // Состояние корзины
  const [cart, setCart] = useState(availableProducts || []);

  useEffect(() => {
    if (availableProducts) {
      setCart(availableProducts);
    }
  }, [availableProducts]);
  /////////////////////////////////////
  const [isFilterActive, setIsFilterActive] = useState(false);

  const totalCost = useMemo(() => {
    console.log("You won`t see me unless new was added or removed");
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }, [cart]);

  //need to do diffrernt var of filters, maybe even in child component? to think about it later
  const filteredProducts = useMemo(() => {
    if (!isFilterActive) {
      return cart;
    }
    return cart.filter((product) => product.price >= 100);
  }, [cart, isFilterActive]);

  const changeQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((product) =>
          product.id === id
            ? { ...product, quantity: Math.max(product.quantity + delta, 0) }
            : product
        )
        .filter((product) => product.quantity > 0)
    );
  };

  const removeProduct = (id) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  };

  const filteredCost = filteredProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  return (
    <div className="cart-container">
      <h2>Корзина</h2>

      <label
        style={{ display: "block", marginBottom: "15px", cursor: "pointer" }}
      >
        <input
          type="checkbox"
          checked={isFilterActive}
          onChange={() => setIsFilterActive(!isFilterActive)}
          style={{ marginRight: "8px" }}
        />
        Товары дороже 100
      </label>

      {filteredProducts.length === 0 ? (
        <p style={{ color: "var(--text-secondary)" }}>Корзина пуста</p>
      ) : (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {filteredProducts.map((product) => (
            <li key={product.id} className="cart-item">
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                  {product.title.length > 20
                    ? product.title.substring(0, 20) + "..."
                    : product.title}
                </div>
                <div
                  style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}
                >
                  ${product.price} x {product.quantity}
                </div>
              </div>

              <div className="cart-controls">
                <button onClick={() => changeQuantity(product.id, 1)}>+</button>
                <button onClick={() => changeQuantity(product.id, -1)}>
                  -
                </button>
                <button
                  className="btn-remove"
                  onClick={() => removeProduct(product.id)}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <hr style={{ borderColor: "var(--btn-border)", opacity: 0.3 }} />
      <h3 style={{ color: "var(--text-result)", textAlign: "right" }}>
        Всего: ${totalCost.toFixed(2)}
      </h3>
    </div>
  );
};

export default ShoppingCart;
