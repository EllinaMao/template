import ProductCard from "./ProductCard";

const ProductList = ({ products, handleAddToCart }) => {
  return (
    <div className="shop-catalog">
      <h2>Каталог</h2>
      <div className="catalog-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
