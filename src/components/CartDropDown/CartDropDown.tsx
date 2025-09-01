import { Text, Button, Image, ScrollArea, Divider } from "@mantine/core";
import type { CartItem } from "../../types";
import EmptyCard from "../../assets/emptyCart.svg?react";
import styles from "./CartDropDown.module.scss";

type CartDropdownProps = {
  cart: CartItem[];
  onChangeQuantity: (id: number, newQuantity: number) => void;
};

export default function CartDropdown({
  cart,
  onChangeQuantity,
}: CartDropdownProps) {
  const isEmpty = cart.length === 0;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (isEmpty) {
    return (
      <div className={styles.emptyCart}>
        <EmptyCard />
        <Text>Your cart is empty!</Text>
      </div>
    );
  }

  return (
    <>
      <ScrollArea>
        {cart.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <div className={styles.cartItemContent}>
              <div className={styles.imageBox}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width="100%"
                  height="100%"
                  fit="cover"
                />
              </div>

              <div className={styles.itemInfo}>
                <div className={styles.itemNameWeight}>
                  <Text fw={600}>{item.name}</Text>
                  <Text size="sm" c="dimmed">
                    {item.weight}
                  </Text>
                </div>
                <Text fw={600}>${item.price * item.quantity}</Text>
              </div>

              <div className={styles.quantityControls}>
                <Button
                  size="xs"
                  variant="outline"
                  className={styles.countButton}
                  onClick={() => onChangeQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>
                <Text fw={500}>{item.quantity}</Text>
                <Button
                  size="xs"
                  variant="outline"
                  className={styles.countButton}
                  onClick={() => onChangeQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <Divider my="sm" />
          </div>
        ))}
      </ScrollArea>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text fw={600}>Total</Text>
        <Text fw={700}>${total}</Text>
      </div>
    </>
  );
}
