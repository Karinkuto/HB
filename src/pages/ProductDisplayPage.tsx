import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import { Input } from "@/components/ui/input";
import useProductStore from "@/pages/ProductStore";
import ProductCard from "@/components/ProductCard";
import FilterButton from "@/components/FilterButton";

const ProductDisplayPage: React.FC = () => {
  const { products, searchTerm, setSearchTerm } = useProductStore();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filterOptions = [
    {
      label: "Category",
      value: "category",
      subCategories: [
        { label: "Men's", value: "mens" },
        { label: "Women's", value: "womens" },
        { label: "Kids", value: "kids" },
      ],
    },
    {
      label: "Product Type",
      value: "productType",
      subCategories: [
        { label: "Tops", value: "tops" },
        { label: "Bottoms", value: "bottoms" },
        { label: "Dresses", value: "dresses" },
        { label: "Outerwear", value: "outerwear" },
        { label: "Accessories", value: "accessories" },
      ],
    },
    {
      label: "Size",
      value: "size",
      subCategories: [
        { label: "XS", value: "xs" },
        { label: "S", value: "s" },
        { label: "M", value: "m" },
        { label: "L", value: "l" },
        { label: "XL", value: "xl" },
      ],
    },
    {
      label: "Color",
      value: "color",
      subCategories: [
        { label: "Black", value: "black" },
        { label: "White", value: "white" },
        { label: "Blue", value: "blue" },
        { label: "Red", value: "red" },
        { label: "Green", value: "green" },
      ],
    },
    {
      label: "Price Range",
      value: "priceRange",
      subCategories: [
        { label: "Under $50", value: "under-50" },
        { label: "$50 - $100", value: "50-100" },
        { label: "$100 - $200", value: "100-200" },
        { label: "Over $200", value: "over-200" },
      ],
    },
  ];

  const filteredProducts = products.filter((product) => {
    if (activeFilters.length === 0 && !searchTerm) return true;
    
    const matchesSearch = searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    
    const matchesFilters = activeFilters.length === 0 || activeFilters.some(filter => 
      product.category.toLowerCase().includes(filter) ||
      product.subcategory.toLowerCase().includes(filter) ||
      product.size.toLowerCase() === filter ||
      product.color.toLowerCase() === filter ||
      (filter === "under-50" && product.price < 50) ||
      (filter === "50-100" && product.price >= 50 && product.price <= 100) ||
      (filter === "100-200" && product.price > 100 && product.price <= 200) ||
      (filter === "over-200" && product.price > 200)
    );

    return matchesSearch && matchesFilters;
  });

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
  };

  return (
    <Container>
      <div className="mb-8 space-y-4">
        <div className="flex gap-4">
          <Input
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <FilterButton options={filterOptions} onFilterChange={handleFilterChange} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
};

export default ProductDisplayPage;