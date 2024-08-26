import { ButtonLink } from "./ui/button-link";
import { ModeToggle } from "@/components/mode-toggle";
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import useProductStore from "@/pages/ProductStore";
import useCartStore from "@/components/cartStore";
import Nav from "./Nav";

interface HeaderProps {
  onLogin: () => void;
  onLogout: () => void;
  isAdmin: boolean;
}

export default function Header({ onLogin, onLogout, isAdmin }: HeaderProps) {
  const { isLoggedIn, setLoginStatus } = useProductStore();
  const navigate = useNavigate();
  const cartItems = useCartStore(state => state.items);

  const handleLoginClick = () => {
    if (isLoggedIn) {
      onLogout();
      setLoginStatus(false);
    } else {
      onLogin();
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