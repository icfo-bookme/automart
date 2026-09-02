/**
 * Product events - product list/detail views, card clicks and wishlist adds.
 */
import { CURRENCY, GTM_EVENTS } from "./events";
import {
  pushToDataLayer,
  sumItemsValue,
  toEcommerceItem,
  type EcommerceItem,
  type TrackableProduct,
} from "./utils";

/** Builds the `ecommerce` block (Data Layer Version 2) */
const buildEcommerce = (
  items: EcommerceItem[],
  value?: number,
): { currency: string; value: number; items: EcommerceItem[] } => ({
  currency: CURRENCY,
  value: value ?? sumItemsValue(items),
  items,
});

/**
 * `view_item_list` - a product grid/list is viewed
 * (homepage sections, shop, category, infinite scroll)
 */
export const pushViewItemList = (
  items: TrackableProduct[],
  options?: { listName?: string; listId?: string },
): void => {
  if (!items.length) return;
  const mapped = items.map((item, index) =>
    toEcommerceItem(item, 1, { ...options, index }),
  );
  pushToDataLayer({
    event: GTM_EVENTS.VIEW_ITEM_LIST,
    ecommerce: buildEcommerce(mapped),
  });
};

/**
 * `view_item` - product detail page `item/[name]/[id]` is viewed
 */
export const pushViewItem = (
  item: TrackableProduct,
  options?: { listName?: string; listId?: string },
): void => {
  const mapped = [toEcommerceItem(item, 1, options)];
  pushToDataLayer({
    event: GTM_EVENTS.VIEW_ITEM,
    ecommerce: buildEcommerce(mapped),
  });
};

/**
 * `select_item` - user clicks a product card (from list to detail page)
 */
export const pushSelectItem = (
  item: TrackableProduct,
  options?: { listName?: string; listId?: string; index?: number },
): void => {
  const mapped = [toEcommerceItem(item, 1, options)];
  pushToDataLayer({
    event: GTM_EVENTS.SELECT_ITEM,
    ecommerce: buildEcommerce(mapped),
  });
};

/**
 * `add_to_wishlist` - product added to the wishlist
 */
export const pushAddToWishlist = (
  item: TrackableProduct,
  options?: { listName?: string },
): void => {
  const mapped = [toEcommerceItem(item, 1, options)];
  pushToDataLayer({
    event: GTM_EVENTS.ADD_TO_WISHLIST,
    ecommerce: buildEcommerce(mapped),
  });
};