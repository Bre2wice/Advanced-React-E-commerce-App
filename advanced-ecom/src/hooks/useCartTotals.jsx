import { useSelector } from "react-redux";

export default function useCartTotals() {
  const items = useSelector((state) => state.cart.items);
  const totalItems = items.reduce((sum, i) => sum + i.count, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.count, 0);

  return { items, totalItems, totalPrice };
}
