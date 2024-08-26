import React from 'react';
import { Container } from "@mui/material";
import useCartStore from '@/components/cartStore';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity } = useCartStore();
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Container className="py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Your cart</h1>
        <Link to="/products" className="text-gray-600 hover:underline">Continue shopping</Link>
      </div>
      {items.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-12 gap-4 mb-4 text-sm text-gray-500 uppercase border-b pb-2">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-3 text-right">Total</div>
          </div>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 items-center py-4 border-b">
                <div className="col-span-2">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                </div>
                <div className="col-span-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500">Br{item.price.toFixed(2)}</p>
                  {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                  {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                  {item.variant && <p className="text-sm text-gray-500">Variant: {item.variant}</p>}
                </div>
                <div className="col-span-3 flex justify-center items-center">
                  <div className="flex border rounded-md">
                    <button 
                      className="px-3 py-1 border-r"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      -
                    </button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <button 
                      className="px-3 py-1 border-l"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                    className="ml-2"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
                <div className="col-span-3 text-right font-semibold">
                  Br{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-right">
            <div className="text-xl mb-4">
              Estimated total <span className="font-bold">Br{total.toFixed(2)} ETB</span>
            </div>
            <div className="flex justify-end gap-4">
              <Button onClick={handleProceedToCheckout}>Proceed to Checkout</Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default CartPage;