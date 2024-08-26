import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import CustomerRoutes from "./CustomerRoutes";
import Auth from "./pages/Auth";
import { ThemeProvider } from "./components/theme-provider";
import { useState, useEffect } from "react";
import useProductStore from "./pages/ProductStore";
import AdminRoutes from './AdminRoutes';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { isLoggedIn, setLoginStatus } = useProductStore();

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    setIsAdmin(adminStatus === 'true');
  }, []);

  const handleLogin = () => {
    setLoginStatus(true);
  };

  const handleLogout = () => {
    setLoginStatus(false);
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Header onLogin={handleLogin} onLogout={handleLogout} isAdmin={isAdmin} />
        <Routes>
          <Route path="/auth" element={<Auth setIsAdmin={setIsAdmin} />} />
          {isAdmin ? (
            <Route path="/admin/*" element={<AdminRoutes />} />
          ) : (
            <Route path="/*" element={<CustomerRoutes />} />
          )}
          <Route path="*" element={<Navigate to={isAdmin ? "/admin" : "/"} replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;