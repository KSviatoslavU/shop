import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { useState } from "react";
import type { Product, CartItem } from "../../types";
import { Header, ProductList } from "../Index";

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  function handleAddToCart(product: Product, quantity: number) {
    setCart((prev) => {
      const inCart = prev.find((item) => item.id === product.id);
      if (inCart) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  }

  const handleChangeQuantity = (id: number, newQuantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  return (
    <>
      <MantineProvider>
        <Header cart={cart} onChangeQuantity={handleChangeQuantity} />
        <main>
          <ProductList onAddToCart={handleAddToCart} />
        </main>
      </MantineProvider>
    </>
  );
}

export default App;
