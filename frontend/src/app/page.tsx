import { products } from "@/lib/data";
import type { Product } from "@/lib/types";
import { ProductCarousel } from "@/components/catalog/product-carousel";
import { Hero } from "@/components/layout/hero";

export default function Home() {
  const allProducts = products;

  const productsByCategory = allProducts.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const categories = Object.keys(productsByCategory) as (keyof typeof productsByCategory)[];

  return (
    <>
      <Hero />
      <div className="space-y-12 my-12">
        {categories.map((category) => (
          <ProductCarousel
            key={category}
            category={category}
            products={productsByCategory[category]}
          />
        ))}
      </div>
    </>
  );
}
