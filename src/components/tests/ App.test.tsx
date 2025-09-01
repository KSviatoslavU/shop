import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App/App";

describe("App component", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("рендерит заголовок магазина", () => {
    expect(screen.getByText(/Vegetable/i)).toBeInTheDocument();
    expect(screen.getByText(/SHOP/i)).toBeInTheDocument();
  });

  it("корзина отображается с текстом Cart", () => {
    expect(screen.getByRole("button", { name: /Cart/i })).toBeInTheDocument();
  });

  it("изначально корзина пуста", () => {
    const cartButton = screen.getByRole("button", { name: /Cart/i });
    expect(cartButton).toBeInTheDocument();
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });
});
