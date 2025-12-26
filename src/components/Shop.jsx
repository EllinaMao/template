import React, { useState, useEffect } from "react";
import ShoppingCart from "./ShoppingCart";
import ProductList from "./ProductList";

export default function Shop() { 
    
  const [products, setProducts] = useState([]); 
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const responsePromise = await fetch('https://fakestoreapi.com/products');
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
    <div className="shop-container">
      <ProductList products={products} onAddToCart={handleAddToCart} />
      
      <div className="shop-sidebar">
         <ShoppingCart availableProducts={cartItems} />
      </div>
    </div>
  );
}   