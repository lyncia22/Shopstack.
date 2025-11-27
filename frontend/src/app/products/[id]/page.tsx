"use client";

import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState, useMemo } from "react";
import { Minus, Plus } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = useMemo(() => {
    return products.find((p) => p.id === params.id);
  }, [params.id]);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => (prev < product.stock ? prev + 1 : prev));
  };
  
  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-square bg-card rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-full object-cover"
            data-ai-hint={product.imageHint}
          />
        </div>
        <div className="flex flex-col justify-center">
          <Badge variant="secondary" className="w-fit mb-2">{product.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary mt-2 mb-4">{formatPrice(product.price)}</p>
          <Separator className="my-4" />
          <p className="text-muted-foreground leading-relaxed">{product.longDescription}</p>
          <Separator className="my-4" />

          <div className="flex items-center gap-4 mt-4">
             <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" onClick={decrementQuantity}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={incrementQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button size="lg" onClick={handleAddToCart} disabled={product.stock === 0}>
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{product.stock > 0 ? `${product.stock} in stock` : 'Currently unavailable'}</p>
        </div>
      </div>
    </div>
  );
}
