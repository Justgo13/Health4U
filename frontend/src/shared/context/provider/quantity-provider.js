import React, {useState} from "react";
import { QuantityContext } from "../quantity-context";

const QuantityProvider = (props) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <QuantityContext.Provider
      value={{
        quantity,
        onQuantityChange: setQuantity,
      }}
    >
      {props.children}
    </QuantityContext.Provider>
  );
};

export default QuantityProvider;
