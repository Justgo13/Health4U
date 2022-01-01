import React, {useContext} from 'react';
import {QuantityContext} from "../quantity-context"

export const useQuantityContext = () => {
    const quantityContext = useContext(QuantityContext);
    return quantityContext;
}
