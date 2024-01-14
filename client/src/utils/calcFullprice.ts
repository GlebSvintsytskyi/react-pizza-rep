import { CartItem } from "../redux/slices/cartsSlice";

export const calcTotalPrice = (items: CartItem[]) => {
    return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
  };