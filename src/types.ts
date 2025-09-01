export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  weight?: string;
};

export type CartItem = Product & {
  quantity: number;
};
