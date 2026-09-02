/**
 * Cart events - items added to or removed from the cart.
 */
import { CURRENCY, GTM_EVENTS } from "./events";
import {
  pushToDataLayer,
  toEcommerceItem,
  type TrackableProduct,
} from "./utils";

/**
 * `add_to_cart` - "Add to Cart" click ($quantity = how many items added)
 */
export const pushAddToCart = (
  item: TrackableProduct,
  quantity = 1,
  options?: { listName?: string },
): void => {
  const mapped = [toEcommerceItem(item, quantity, options)];
  const value = mapped[0].price * mapped[0].quantity;
  pushToDataLayer({
    event: GTM_EVENTS.ADD_TO_CART,
    ecommerce: { currency: CURRENCY, value, items: mapped },
  });
};

/**
 * `remove_from_cart` - item removed / quantity decreased in the cart
 */
export const pushRemoveFromCart = (
  item: TrackableProduct,
  quantity = 1,
): void => {
  const mapped = [toEcommerceItem(item, quantity)];
  const value = mapped[0].price * mapped[0].quantity;
  pushToDataLayer({
    event: GTM_EVENTS.REMOVE_FROM_CART,
    ecommerce: { currency: CURRENCY, value, items: mapped },
  });
};