import { useState, useEffect } from "react";
import ky, { HTTPError } from "ky";
import { ProductCard } from "../Index";
import type { Product } from "../../types";
import styles from "./ProductList.module.scss";

type ProductListProps = {
  onAddToCart: (product: Product, quantity: number) => void;
};

export default function ProductList({ onAddToCart }: ProductListProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  async function getAllProduct() {
    try {
      setIsLoading(true);
      const product: Product[] = await ky
        .get(
          "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json"
        )
        .json();
      setProducts(product);
    } catch (e) {
      if (e instanceof HTTPError) {
        console.log(`Ошибка HTTP: ${e.response.status}`);
      } else if (e instanceof Error) {
        console.log("Ошибка:", e.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Catalog</h1>
      <div className={styles.grid}>
        {isLoading
          ? Array.from({ length: 30 }).map((_, i) => (
              <ProductCard key={i} isLoading={true} />
            ))
          : products.map((p) => {
              const [name, weight] = p.name.split("-");
              const productWithWeight = {
                ...p,
                name: name.trim(),
                weight: weight?.trim(),
              };

              return (
                <ProductCard
                  key={p.id}
                  product={productWithWeight}
                  isLoading={false}
                  onAddToCart={onAddToCart}
                />
              );
            })}
      </div>
    </div>
  );
}
