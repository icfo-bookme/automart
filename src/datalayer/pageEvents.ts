/**
 * Page view events. Pushes `page_view` on every page load / route change.
 * Works for both mobile and desktop (paired with the GTM History Change trigger).
 */
import { GTM_EVENTS } from "./events";
import { pushToDataLayer } from "./utils";

export interface PageData {
  location: string;
  path: string;
  title: string;
  referrer: string;
}

export const pushPageView = (): void => {
  const page: PageData = {
    location: window.location.href,
    path: window.location.pathname + window.location.search,
    title: document.title,
    referrer: document.referrer,
  };
  pushToDataLayer({ event: GTM_EVENTS.PAGE_VIEW, page });
};