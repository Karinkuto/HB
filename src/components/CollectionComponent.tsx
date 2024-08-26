// components/CollectionComponent.jsx
import ProductCard from "./ProductCard";

export default function CollectionComponent({ title, products, onAddToCart }) {
  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}