import React, {useContext} from 'react';
import {CartContext} from "../cart-context"

export const useCartContext = () => {
    const cartContext = useContext(CartContext);
    return cartContext;
}
