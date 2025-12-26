import React, { useState, useEffect } from "react";
import ShopCart from "./ShopCart";
import ProductList from "./ProductList";
import "../assets/css/Shop.css";
export default function Shop({shopName}) {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const responsePromise = await fetch(
          "https://fakestoreapi.com/products"
        );
        const response = await responsePromise.json();
        setProducts(response);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      }
    })();
  }, []);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  return (
    <>
      <header className="shop-header">{shopName}</header>
      <div className="shop-container">
        <ProductList products={products} onAdd={handleAddToCart} />

        <div className="shop-sidebar">
          <ShopCart availableProducts={cartItems} />
        </div>
      </div>
    </>
  );
}
