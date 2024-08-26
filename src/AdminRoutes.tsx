import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminProducts from "./pages/AdminProducts";
import Orders from "./pages/Orders";
import Users from "./pages/Users";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/products" element={<AdminProducts />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
};

export default AdminRoutes;