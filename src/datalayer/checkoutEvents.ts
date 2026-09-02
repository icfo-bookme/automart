/**
 * Checkout / conversion events - checkout start, payment info, purchase (order success).
 */
import { CURRENCY, GTM_EVENTS } from "./events";
import {
  pushToDataLayer,
  sumItemsValue,
  toEcommerceItem,
  type EcommerceItem,
  type TrackableProduct,
} from "./utils";

/** Order `order_details[]` element (Laravel API shape) */
export interface OrderDetailInput {
  product_id: number;
  product_name: string;
  quantity: number;
  unit_price?: number;
  price?: number;
}

/** Order object sent with the purchase event */
export interface PurchaseOrderInput {
  order_code: string;
  total?: number;
  advance_payment?: number;
  discount_amount?: number;
  order_details?: OrderDetailInput[];
}

/**
 * `begin_checkout` - checkout page starts
 */
export const pushBeginCheckout = (
  items: TrackableProduct[],
  value?: number,
): void => {
  if (!items.length) return;
  const mapped = items.map((item, index) =>
    toEcommerceItem(item, item.quantity ?? 1, { index }),
  );
  pushToDataLayer({
    event: GTM_EVENTS.BEGIN_CHECKOUT,
    ecommerce: {
      currency: CURRENCY,
      value: value ?? sumItemsValue(mapped),
      items: mapped,
    },
  });
};

/**
 * `add_payment_info` - payment method selected / COD confirmed
 */
export const pushAddPaymentInfo = (
  items: TrackableProduct[],
  options?: { value?: number; paymentType?: string },
): void => {
  if (!items.length) return;
  const mapped = items.map((item, index) =>
    toEcommerceItem(item, item.quantity ?? 1, { index }),
  );
  pushToDataLayer({
    event: GTM_EVENTS.ADD_PAYMENT_INFO,
    ecommerce: {
      currency: CURRENCY,
      value: options?.value ?? sumItemsValue(mapped),
      items: mapped,
    },
    ...(options?.paymentType ? { payment_type: options.paymentType } : {}),
  });
};

const orderDetailToItem = (
  detail: OrderDetailInput,
  index: number,
): EcommerceItem =>
  toEcommerceItem(
    {
      id: detail.product_id,
      name: detail.product_name,
      quantity: detail.quantity,
      price: detail.unit_price ?? detail.price ?? 0,
    },
    detail.quantity,
    { index },
  );

/**
 * `purchase` - order success page `/order/success?order=...` (most important conversion event).
 * Tip: if `order_details` is not supplied, pass `options.items` (e.g. the cart items) instead.
 */
export const pushPurchase = (
  order: PurchaseOrderInput,
  options?: { items?: TrackableProduct[]; currency?: string },
): void => {
  const items: EcommerceItem[] = options?.items
    ? options.items.map((item, index) =>
        toEcommerceItem(item, item.quantity ?? 1, { index }),
      )
    : (order.order_details ?? []).map(orderDetailToItem);

  pushToDataLayer({
    event: GTM_EVENTS.PURCHASE,
    ecommerce: {
      transaction_id: order.order_code,
      value: order.total ?? sumItemsValue(items),
      tax: 0,
      shipping: 0,
      currency: options?.currency ?? CURRENCY,
      items,
    },
  });
};