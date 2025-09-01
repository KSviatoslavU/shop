import {
  Card,
  Image,
  Text,
  Button,
  Group,
  Loader,
  Center,
} from "@mantine/core";
import { useState } from "react";
import CartIcon from "../../assets/cart.svg?react";
import type { Product } from "../../types";
import styles from "./ProductCard.module.scss";

type ProductCardProps = {
  product?: Product & { weight?: string };
  isLoading: boolean;
  onAddToCart?: (product: Product, quantity: number) => void;
};

export default function ProductCard({
  product,
  isLoading,
  onAddToCart,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  if (isLoading) {
    return (
      <Card padding="lg" radius="md" withBorder className={styles.card}>
        <Center style={{ height: 276 }}>
          <Loader color="gray" size="sm" type="bars" />
        </Center>
      </Card>
    );
  }

  if (!product) return null;

  const { name, price, image, weight } = product;

  return (
    <Card padding="lg" radius="md" withBorder className={styles.card}>
      <Card.Section>
        <Image src={image} height={276} width={276} alt={name} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <div className={styles.nameWeight}>
          <Text fw={600}>{name}</Text>
          <Text fw={500} className={styles.weight}>
            {weight}
          </Text>
        </div>
        <div className={styles.counter}>
          <Button
            onClick={decreaseQuantity}
            size="xs"
            variant="outline"
            className={styles.countButton}
          >
            -
          </Button>
          <Text fw={500}>{quantity}</Text>
          <Button
            onClick={increaseQuantity}
            size="xs"
            variant="outline"
            className={styles.countButton}
          >
            +
          </Button>
        </div>
      </Group>

      <div className={styles.buttonDiv}>
        <Text fw={600}>${price}</Text>
        <Button
          onClick={() => onAddToCart?.(product, quantity)}
          className={styles.myButton}
          fullWidth
          radius="md"
        >
          Add to cart
          <CartIcon className={styles.logo} width={18} height={18} />
        </Button>
      </div>
    </Card>
  );
}
