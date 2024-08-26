import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { Product } from "@/types";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from an API or use mock data
    const fetchProducts = async () => {
      const response = await fetch("/api/products"); // Replace with your API endpoint
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <Container>
      <ScrollArea>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.imageUrl}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    ${product.price}
                  </Typography>
                  <Button variant="contained" color="primary">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </ScrollArea>
    </Container>
  );
}
