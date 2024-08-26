import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, MinusCircle } from "lucide-react";
import useCartStore from "../components/cartStore";

const CartComponent: React.FC = () => {
  const { items, removeFromCart } = useCartStore();

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <div className="relative">
            <Button variant="outline" size="icon">
              <ShoppingCart className="h-4 w-4" />
            </Button>
            {items.length > 0 && (
              <Badge className="absolute top-[-1em] right-[-1em] rounded-full bg-red-500 text-white">
                {items.length}
              </Badge>
            )}
          </div>
        </SheetTrigger>
        <SheetContent side="right" className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
          </SheetHeader>
          <div className="flex justify-between items-center mt-4">
            <Button variant="default">Buy All</Button>
            <span>Total: ${totalPrice}</span>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            {items.map((item) => (
              <Card key={item.id} className="flex items-center p-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded"
                />
                <div className="ml-4 flex-grow">
                  <div className="font-bold">{item.name}</div>
                  <div>${item.price}</div>
                  <div>Quantity: {item.quantity}</div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartComponent;