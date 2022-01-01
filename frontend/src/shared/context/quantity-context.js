import { createContext } from "react";

export const QuantityContext = createContext({
  quantity: 0,
  onQuantityChange: () => {}
});
