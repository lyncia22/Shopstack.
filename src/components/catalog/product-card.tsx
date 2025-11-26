"use client";

import Image from "next/image";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      <Link href={`/products/${product.id}`} className="flex flex-col h-full">
        <CardHeader className="p-0">
          <div className="aspect-square relative w-full overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-headline mb-1 leading-tight">
            {product.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </CardContent>
        <CardFooter className="p-4 flex justify-between items-center">
          <p className="text-lg font-semibold text-primary">
            {formatPrice(product.price)}
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" onClick={handleAddToCart} aria-label={`Add ${product.name} to cart`}>
                  <PlusCircle className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to cart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Link>
    </Card>
  );
}
