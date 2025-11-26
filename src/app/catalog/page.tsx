import { products } from "@/lib/data";
import { CatalogClient } from "@/components/catalog/catalog-client";

export default function CatalogPage() {
  const allProducts = products;

  return <CatalogClient products={allProducts} />;
}
