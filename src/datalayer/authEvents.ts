/**
 * Auth events - login / signup / logout tracking.
 * `method` = how the user logged in / signed up (phone, email, oauth).
 */
import { GTM_EVENTS } from "./events";
import { pushToDataLayer } from "./utils";

export const pushLogin = (method = "phone"): void => {
  pushToDataLayer({ event: GTM_EVENTS.LOGIN, method });
};

export const pushSignUp = (method = "phone"): void => {
  pushToDataLayer({ event: GTM_EVENTS.SIGN_UP, method });
};

export const pushLogout = (): void => {
  pushToDataLayer({ event: GTM_EVENTS.LOGOUT });
};