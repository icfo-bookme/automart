/**
 * Data Layer (GTM) - single entry point (barrel export).
 *
 * Import every event function from here:
 *   import { pushAddToCart, pushPurchase } from "@/datalayer";
 *
 * Files (separate file per concern):
 *   events.ts          -> event name constants
 *   utils.ts           -> push() helper + item mapper
 *   pageEvents.ts      -> page_view
 *   productEvents.ts   -> view_item_list / view_item / select_item / add_to_wishlist
 *   cartEvents.ts      -> add_to_cart / remove_from_cart
 *   checkoutEvents.ts  -> begin_checkout / add_payment_info / purchase
 *   authEvents.ts      -> login / sign_up / logout
 *   searchEvents.ts    -> search
 *   contactEvents.ts   -> contact_form_submit
 */

export { GTM_EVENTS, CURRENCY } from "./events";
export type { GtmEventName } from "./events";

export { pushToDataLayer, toEcommerceItem, sumItemsValue } from "./utils";
export type {
  EcommerceItem,
  TrackableProduct,
  EcommerceItemOptions,
  DataLayerPayload,
} from "./utils";

export { pushPageView } from "./pageEvents";
export type { PageData } from "./pageEvents";

export {
  pushViewItemList,
  pushViewItem,
  pushSelectItem,
  pushAddToWishlist,
} from "./productEvents";

export { pushAddToCart, pushRemoveFromCart } from "./cartEvents";

export { pushBeginCheckout, pushAddPaymentInfo, pushPurchase } from "./checkoutEvents";
export type { PurchaseOrderInput, OrderDetailInput } from "./checkoutEvents";

export { pushLogin, pushSignUp, pushLogout } from "./authEvents";

export { pushSearch } from "./searchEvents";

export { pushContactFormSubmit } from "./contactEvents";
export type { ContactFormInput } from "./contactEvents";