/**
 * Data Layer (GTM) event names - centralized in one place.
 * Use these exact names when creating Custom Event Triggers in GTM.
 * All names are lowercase to avoid GTM/GA4 case-sensitivity issues.
 */

export const GTM_EVENTS = {
  PAGE_VIEW: "page_view",
  VIEW_ITEM_LIST: "view_item_list",
  VIEW_ITEM: "view_item",
  SELECT_ITEM: "select_item",
  ADD_TO_CART: "add_to_cart",
  REMOVE_FROM_CART: "remove_from_cart",
  BEGIN_CHECKOUT: "begin_checkout",
  ADD_PAYMENT_INFO: "add_payment_info",
  PURCHASE: "purchase",
  ADD_TO_WISHLIST: "add_to_wishlist",
  SEARCH: "search",
  LOGIN: "login",
  SIGN_UP: "sign_up",
  LOGOUT: "logout",
  CONTACT_FORM_SUBMIT: "contact_form_submit",
} as const;

export type GtmEventName = (typeof GTM_EVENTS)[keyof typeof GTM_EVENTS];

/** Site currency - used for all ecommerce values */
export const CURRENCY = "BDT";