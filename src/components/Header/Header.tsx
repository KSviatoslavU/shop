import { Badge, Button, Popover, Text } from "@mantine/core";
import type { CartItem } from "../../types";
import CartIcon from "../../assets/cart.svg?react";
import { useState } from "react";
import { CartDropdown } from "../Index";
import styles from "./Header.module.scss";

type HeaderProps = {
  cart: CartItem[];
  onChangeQuantity: (id: number, newQuantity: number) => void;
};

export default function Header({ cart, onChangeQuantity }: HeaderProps) {
  const [opened, setOpened] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Text fw={600}>Vegetable</Text>
        <Badge color="#54B46A" size="lg" radius="lg">
          SHOP
        </Badge>
      </div>

      <div className={styles.right}>
        <Popover
          opened={opened}
          onChange={setOpened}
          width={380}
          position="bottom-start"
          withArrow
          shadow="md"
          withinPortal={false}
        >
          <Popover.Target>
            <Button
              variant="filled"
              color="#54B46A"
              size="lg"
              radius="md"
              rightSection={<CartIcon width={18} height={18} />}
              leftSection={
                cart.length > 0 && (
                  <Badge
                    size="lg"
                    circle
                    color="#DEE2E6"
                    className={styles.badge}
                  >
                    {cart.length}
                  </Badge>
                )
              }
              onClick={() => setOpened((prev) => !prev)}
            >
              Cart
            </Button>
          </Popover.Target>

          <Popover.Dropdown>
            <CartDropdown cart={cart} onChangeQuantity={onChangeQuantity} />
          </Popover.Dropdown>
        </Popover>
      </div>
    </header>
  );
}
