import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "@/components/ProductCard";
import useProductStore from "@/pages/ProductStore";

const ProductList: React.FC = () => {
  const { products, filter, sortBy, searchTerm } = useProductStore();

  const filteredProducts = products.filter((product) => {
    if (filter !== 'all' && product.status !== filter) return false;
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'price') return a.price - b.price;
    return 0;
  });

  return (
    <Grid container spacing={4}>
      {sortedProducts.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;