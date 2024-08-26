import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useCartStore from "../components/cartStore";
import { Heart } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore(state => state.addToCart);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  
  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <>
      <Card className="h-full flex flex-col cursor-pointer" onClick={() => setIsDialogOpen(true)}>
        <CardHeader className="p-3 pb-0">
          <div className="relative h-40 mb-2">
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
            />
          </div>
          <div className="flex justify-between items-center">
            <CardTitle className="line-clamp-1 text-sm">{product.name}</CardTitle>
            
          </div>
          <CardDescription className="line-clamp-2 text-xs">{product.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <p className="text-sm font-semibold text-gray-700">${product.price}</p>
        </CardContent>
        <CardFooter className="flex justify-between mt-auto p-3 pt-0">
          <Button variant="outline" size="sm" onClick={handleAddToCart}>Add to Cart</Button>
          <Button size="sm" onClick={handleBuyNow}>Buy Now</Button>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
          </DialogHeader>
          <div>
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg" />
            <p className="mt-4">{product.description}</p>
            <p className="mt-2 font-bold">${product.price}</p>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => addToCart(product)}>Add to Cart</Button>
            <Button onClick={handleBuyNow}>Buy Now</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;