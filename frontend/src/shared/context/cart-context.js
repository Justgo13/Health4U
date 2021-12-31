import { createContext } from "react";

export const CartContext = createContext({
  shoppingCartItemCount: 0,
  onAddToCart: () => {}
});
