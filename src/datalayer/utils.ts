/**
 * Data Layer utils - shared helpers for all event pushes.
 * `window.dataLayer.push()` must only go through `pushToDataLayer()`.
 * No component should call `window.dataLayer.push()` directly.
 */

/** GA4 Enhanced Ecommerce - `ecommerce.items[]` element (Data Layer Version 2) */
export interface EcommerceItem {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
  item_brand?: string;
  item_category?: string;
  item_category2?: string;
  item_list_name?: string;
  item_list_id?: string;
  index?: number;
}

/**
 * Trackable product shape - accepts both `Item` (product list/detail)
 * and `CartItem`/`WishlistItem`. Every key is optional so any cart-like
 * product object can be passed without friction.
 */
export interface TrackableProduct {
  id: number;
  name?: string;
  title?: string;
  quantity?: number;
  sales_price?: string | number | null;
  price?: string | number | null;
  regular_price?: string | number | null;
  category?: { name?: string } | null;
  sub_category?: { name?: string } | null;
  thumbnail?: string;
  barcode?: string | null;
}

export interface DataLayerPayload {
  event: string;
  [key: string]: unknown;
}

export interface EcommerceItemOptions {
  listName?: string;
  listId?: string;
  index?: number;
  brand?: string;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Push to `window.dataLayer` - safely skipped in SSR/Node environments */
export const pushToDataLayer = (payload: DataLayerPayload): void => {
  if (typeof window === "undefined") return;
  const layer = window.dataLayer || (window.dataLayer = []);
  layer.push(payload);
};

/** Product object to GA4 standard `EcommerceItem` */
export const toEcommerceItem = (
  product: TrackableProduct,
  quantity = 1,
  options: EcommerceItemOptions = {},
): EcommerceItem => {
  const price =
    Number(product.sales_price ?? product.price ?? product.regular_price) || 0;

  const item: EcommerceItem = {
    item_id: String(product.id),
    item_name: product.name || product.title || "Unknown product",
    price,
    quantity: quantity || product.quantity || 1,
  };

  if (options.brand) item.item_brand = options.brand;
  if (options.index !== undefined) item.index = options.index;
  if (options.listName) item.item_list_name = options.listName;
  if (options.listId) item.item_list_id = options.listId;
  if (product.category?.name) item.item_category = product.category.name;
  if (product.sub_category?.name) item.item_category2 = product.sub_category.name;

  return item;
};

/** Sum of all items value (price x quantity) */
export const sumItemsValue = (items: EcommerceItem[]): number =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);