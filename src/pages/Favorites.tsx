import React from "react";
import { Container, Grid } from "@mui/material";
import ProductCard from "@/components/ProductCard";
import useFavoriteStore from "@/components/favoriteStore";

const Favorites: React.FC = () => {
  const { favorites } = useFavoriteStore();

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">My Favorites</h1>
      {favorites.length === 0 ? (
        <p>You haven't added any products to your favorites yet.</p>
      ) : (
        <Grid container spacing={4}>
          {favorites.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;