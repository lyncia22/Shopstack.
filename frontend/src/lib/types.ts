export type Product = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  imageUrl: string;
  imageHint: string;
  category: 'Electronics' | 'Apparel' | 'Home Goods' | 'Books';
  stock: number;
};

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
};
