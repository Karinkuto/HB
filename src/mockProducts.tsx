// src/mockProducts.ts

export interface Product {
    id: number;
    name: string;
    description: string;
    status: string;
    price: number;
    stock: number;
    category: string;
    subcategory: string;
    size: string;
    color: string;
    brand: string;
    variants: { sku: string; stock: number; price: number; size: string; color: string }[];
    image: string;
  }
  
  export const mockProducts: Product[] = [
    {
      id: 1,
      name: "Product 1",
      description: "Description 1",
      status: "in stock",
      price: 100,
      stock: 50,
      category: "Men's Clothing",
      subcategory: "Tops",
      size: "M",
      color: "Blue",
      brand: "Uniqlo",
      variants: [
        { sku: "GGPC-001", stock: 100, price: 99.99, size: "S", color: "Blue" },
        { sku: "GGPC-002", stock: 143, price: 109.99, size: "M", color: "Blue" },
      ],
      image: "/product.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description 2",
      status: "sold out",
      price: 200,
      stock: 30,
      category: "Women's Clothing",
      subcategory: "Tops",
      size: "L",
      color: "Black",
      brand: "Zara",
      variants: [
        { sku: "GGPC-003", stock: 32, price: 199.99, size: "L", color: "Black" },
      ],
      image: "/product.jpg",
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description 3",
      status: "archived",
      price: 300,
      stock: 20,
      category: "Footwear",
      subcategory: "Men's Footwear",
      size: "10",
      color: "White",
      brand: "Clarks",
      variants: [
        { sku: "GGPC-004", stock: 50, price: 299.99, size: "XL", color: "White" },
      ],
      image: "/product.jpg",
    },
  ];