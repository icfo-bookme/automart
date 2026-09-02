/**
 * Contact events - successful contact form submit (GA4 Lead event).
 */
import { GTM_EVENTS } from "./events";
import { pushToDataLayer } from "./utils";

export interface ContactFormInput {
  name?: string;
  email?: string;
  type?: string;
}

export const pushContactFormSubmit = (form: ContactFormInput = {}): void => {
  pushToDataLayer({
    event: GTM_EVENTS.CONTACT_FORM_SUBMIT,
    form: { ...form },
  });
};