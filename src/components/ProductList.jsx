import ProductCard from "./ProductCard";
import "../assets/css/ProductList.css";
const ProductList = ({ products, onAdd }) => {
  return (
    <div className="shop-catalog">
      <div className="catalog-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
