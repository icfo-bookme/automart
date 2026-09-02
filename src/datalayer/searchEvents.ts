/**
 * Search events - site search tracking (GA4 `search` + `search_term`).
 */
import { GTM_EVENTS } from "./events";
import { pushToDataLayer } from "./utils";

export const pushSearch = (searchTerm: string): void => {
  const term = searchTerm.trim();
  if (!term) return;
  pushToDataLayer({ event: GTM_EVENTS.SEARCH, search_term: term });
};