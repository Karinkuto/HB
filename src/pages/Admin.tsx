import { AdminMobileNav, AdminNav } from "@/components/AdminNav";
import Header from "@/components/Header";

const AdminPage = () => {
  return (
    <Header
      onAddToCart={() => {}}
      nav={
        <>
          <AdminNav />
          <AdminMobileNav />
        </>
      }
    />
    
  );
};

export default AdminPage;
