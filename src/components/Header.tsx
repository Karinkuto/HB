import { ButtonLink } from "./ui/button-link";
import { ModeToggle } from "@/components/mode-toggle";
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import useProductStore from "@/pages/ProductStore";
import useCartStore from "@/components/cartStore";
import Nav from "./Nav";
import { useEffect, useState } from "react";

interface HeaderProps {
  onLogout: () => void;
  isAdmin: boolean;
}

export default function Header({ onLogout, isAdmin }: HeaderProps) {
  const { setLoginStatus } = useProductStore();
  const navigate = useNavigate();
  const cartItems = useCartStore(state => state.items);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLoginClick = () => {
    if (isLoggedIn) {
      onLogout();
      setLoginStatus(false);
      setIsLoggedIn(false);
      localStorage.setItem('isLoggedIn', 'false'); // Change this line
      localStorage.removeItem('isAdmin');
      navigate('/');
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="flex flex-col gap-2 m-8 px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <span className="font-bold text-4xl">Hulu </span>
          <span className="text-md tracking-[0.6em] ml-[0.05em]">Brand</span>
        </div>
        <div className="flex gap-2 items-center">
          <ButtonLink 
            key={isLoggedIn ? 'logout' : 'login'}
            variant={"default"} 
            to={isLoggedIn ? "/" : "/auth"} 
            onClick={handleLoginClick}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </ButtonLink>
          <ModeToggle />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Nav isAdmin={isAdmin} />
        {!isAdmin && (
          <div className="flex items-center space-x-2">
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/cart')}
              aria-label="Cart"
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <Badge className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white min-w-[1.25rem] h-5 flex items-center justify-center text-xs rounded-full">
                  {cartItems.length}
                </Badge>
              )}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}