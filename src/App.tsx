import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setLoginStatus(loggedInStatus);
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const handleLogout = () => {
    setLoginStatus(false);
    setIsAdmin(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header onLogout={handleLogout} isAdmin={isAdmin} />
          <main className="flex-grow">
            <Routes>
              <Route 
                path="/auth" 
                element={isLoggedIn ? <Navigate to="/" replace /> : <Auth setIsAdmin={setIsAdmin} />} 
              />
              <Route 
                path="/admin/*" 
                element={isAdmin ? <AdminRoutes /> : <Navigate to="/" replace />} 
              />
              <Route path="/*" element={<CustomerRoutes />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;