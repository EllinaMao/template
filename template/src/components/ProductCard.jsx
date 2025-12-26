import React from 'react';
import '../assets/css/ProductCard.css';

const ProductCard = ({ product, onAdd }) => {
  return (
<div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      
      <div className="product-category">{product.category}</div>
      <div className="product-title" title={product.title}>{product.title}</div>
      <div className="product-price">${product.price}</div>

      <button className="btn-primary" onClick={() => onAdd(product)}>
        Купить
      </button>
    </div>
  );
};




export default ProductCard;