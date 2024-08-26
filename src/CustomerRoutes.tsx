// src/CustomerRoutes.tsx
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDisplayPage from "./pages/ProductDisplayPage";
import Favorites from "./pages/Favorites";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductDisplayPage />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
};

export default CustomerRoutes;