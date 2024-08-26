// components/DetailDialog.jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DetailDialog({ product, open, onClose, onAddToCart }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[70%] flex flex-col sm:flex-row gap-8">
        <img
          src={product.image}
          alt="product"
          className="rounded sm:w-[50%] sm:h-[100] object-cover"
        />
        <div>
          <DialogHeader className="flex flex-col items-start h-full">
            <DialogTitle className="text-2xl font-bold">
              {product.name}
            </DialogTitle>
            <DialogDescription className="h-full flex flex-col gap-4 justify-around">
              {product.description}
              <div>
                <p className="mt-4">{product.details}</p>
                <p className="mt-4">Price: {product.price}</p>
                <p>{product.inStock ? "In Stock" : "Out of Stock"}</p>
              </div>
              <div className="flex gap-4">
                <Button onClick={() => { onClose(); onAddToCart(product); }}>
                  Add to Cart
                </Button>
                <Button variant="default" onClick={() => { onClose(); onAddToCart(product); }}>
                  Order Now
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
}