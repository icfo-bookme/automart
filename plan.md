# Data Layer (GTM) Implementation Plan — Automart

> ✅ **Status:** Implementation done — `src/datalayer/` folder + `index.ts` + আলাদা আলাদা সব ফাইল তৈরি হয়ে গেছে
> (events, utils, pageEvents, productEvents, cartEvents, checkoutEvents, authEvents, searchEvents, contactEvents)।
> এখন পর্যন্ত দরকার: (১) এই ফাংশনগুলো component-এ wire করা, (২) নিচের guideline অনুযায়ী GTM-এ tag/trigger/variable বানানো।

## 1. কী / কেন দরকার

Project-এ Google Tag Manager container ইতিমধ্যে আছে (`GTM-5MHGH622` — `src/app/layout.tsx`), কিন্তু এখন শুধু page load যায়। Proper analytics / remarketing tracking-এর জন্য আমাদের একটি **central dataLayer layer** লাগবে:

- সব `window.dataLayer.push(...)` **এক জায়গা** থেকে হবে
- Event / category অনুযায়ী **আলাদা আলাদা ফাইল**
- Entry point: **`index.ts`** (barrel export) — বাকি সব ফাইল থেকে export, component এখান থেকেই import করবে
- আপনি এই documentation থেকে **GTM tag / trigger / variable** বানাবেন (section 3 ও 6)

**Rule:** কোনো component সরাসরি `window.dataLayer.push()` করবে **না** — শুধু `@/datalayer` থেকে.

## 2. Proposed Folder Structure

```
src/datalayer/
├── index.ts              → সব event function export (entry point)
├── events.ts             → event name constants (ADD_TO_CART = "add_to_cart")
├── utils.ts              → push() helper + item mapper
├── pageEvents.ts         → page_view (initial + route change)
├── productEvents.ts      → view_item_list / view_item / select_item / add_to_wishlist
├── cartEvents.ts         → add_to_cart / remove_from_cart
├── checkoutEvents.ts     → begin_checkout / add_payment_info / purchase
├── authEvents.ts         → login / sign_up / logout
├── searchEvents.ts       → search
└── contactEvents.ts      → contact_form_submit (lead)
```

**Use style (সব জায়গায়):**
```ts
import { pushPageView, pushAddToCart, pushPurchase } from "@/datalayer";
```

## 3. Event Catalog — GTM Tag / Trigger / Variable Recipe

সবচেয়ে গুরুত্বপূর্ণ টেবিল — GTM-এ configure করার সময় এটা follow করবেন।
প্রতিটা event-এ GTM-তে লাগবে: **(a)** Data Layer Variable, **(b)** Custom Event Trigger, **(c)** GA4 Event Tag।

| # | Event name | কখন push হবে | GTM Trigger | GA4 Tag | Data Layer Variable(s) |
|---|-----------|--------------|-------------|---------|------------------------|
| 1 | `page_view` | প্রতিটা page load / route change (mobile & desktop) | Page View / History Change | GA4 Page View | `page` |
| 2 | `view_item_list` | Product grid দেখা (homepage sections, shop, category, infinite scroll) | Custom Event `view_item_list` | GA4 View Item List | `ecommerce` |
| 3 | `view_item` | Product detail page `item/[name]/[id]` | Custom Event `view_item` | GA4 View Item | `ecommerce` |
| 4 | `select_item` | Product card click | Custom Event `select_item` | GA4 Select Item | `ecommerce` |
| 5 | `add_to_cart` | "Add to Cart" click | Custom Event `add_to_cart` | GA4 Add To Cart | `ecommerce` |
| 6 | `remove_from_cart` | Cart থেকে item remove / quantity decrease | Custom Event `remove_from_cart` | GA4 Remove From Cart | `ecommerce` |
| 7 | `begin_checkout` | Checkout page start | Custom Event `begin_checkout` | GA4 Begin Checkout | `ecommerce` |
| 8 | `add_payment_info` | Payment method select / COD confirm | Custom Event `add_payment_info` | GA4 Add Payment Info | `ecommerce` |
| 9 | `purchase` | Order success page (`/order/success?order=...`) | Custom Event `purchase` | GA4 Purchase | `ecommerce` |
| 10 | `add_to_wishlist` | Wishlist add click | Custom Event `add_to_wishlist` | GA4 Add To Wishlist | `ecommerce` |
| 11 | `search` | Search submit (Header desktop + mobile Search) | Custom Event `search` | GA4 Search | `search_term` |
| 12 | `login` | Login success | Custom Event `login` | GA4 Login | `method` |
| 13 | `sign_up` | Register success | Custom Event `sign_up` | GA4 Sign Up | `method` |
| 14 | `contact_form_submit` | Contact form সফল submit | Custom Event `contact_form_submit` | GA4 Lead | `form` |

> 💡 GA4 Ecommerce-এর জন্য **শুধু `ecommerce` নামে একটাই Data Layer Variable যথেষ্ট** (Data Layer Version 2)। GA4 automatically nested keys (`ecommerce.items[]`, `ecommerce.value`) পড়ে নেয় — প্রতি key-তে আলাদা variable বানাতে হবে না।

## 4. `ecommerce.items[]` Item Schema (GA4 Standard)

`ecommerce.items` এর প্রতিটা element-এ এই keys থাকবে — GA4 standard format:

```ts
type EcommerceItem = {
  item_id: string;          // product id → string (e.g. "12")
  item_name: string;        // item.name
  price: number;            // Number(item.sales_price)
  quantity: number;
  item_brand?: string;      // item.brand (যদি API থেকে পাওয়া যায়)
  item_category?: string;   // item.category?.name
  item_category2?: string;  // item.sub_category?.name
  item_list_name?: string;  // section / header title
  item_list_id?: string;
  index?: number;           // list-এ position (select_item-এর জন্য)
};
```

## 5. Payload Examples (কী push হবে)

**page_view**
```ts
pushPageView();
// window.dataLayer.push({
//   event: "page_view",
//   page: { location, title, referrer, path }
// })
```

**view_item / select_item / add_to_cart / add_to_wishlist** (একই `ecommerce` shape)
```ts
pushViewItem(item);
// window.dataLayer.push({
//   event: "view_item",
//   ecommerce: {
//     currency: "BDT",
//     value: Number(item.sales_price),
//     items: [{ item_id, item_name, price, quantity,
//               item_category, item_category2, item_list_name }]
//   }
// })
```

**purchase** (সবচেয়ে গুরুত্বপূর্ণ conversion event)
```ts
pushPurchase(order, items);
// window.dataLayer.push({
//   event: "purchase",
//   ecommerce: {
//     transaction_id: order.order_code,   // ✓ unique order code
//     value: order.total,
//     currency: "BDT",
//     tax: 0,
//     shipping: 0,
//     items: [ ... ]
//   }
// })
```

## 6. GTM Setup Steps (এগুলো apni GTM Dashboard-এ করবেন — এই doc থেকে)

প্রতিটা event-এর জন্য GTM-এ (table ৩ অনুযায়ী):

1. **Variables** → New → Data Layer Variable
   - ecommerce event-গুলো: Name `ecommerce`, Data Layer Variable Name `ecommerce`, **Data Layer Version 2**
   - page_view: Name `page`, variable name `page` (Version 2)
   - `search_term`, `method`, `form` → নিজ নিজ নামে same করে
2. **Triggers** → New → Custom Event
   - Event name = table-এর exact event name (lowercase), e.g. `add_to_cart`
3. **Tags** → New → Google Tag → GA4 Event
   - GA4 Measurement ID দিয়ে, Event Name লিখুন,
   - Ecommerce valo kore data পাঠাতে: **More Settings → Ecommerce → Data Layer variable = `ecommerce`**
   - Trigger attach করুন (step 2-এর custom event)
4. **Preview mode** এ test — প্রতিটা click/page-এ event fire হচ্ছে কিনা
5. **Publish** container

> সব event name **lowercase** রাখা হয়েছে — GTM/GA4 case-sensitivity নিয়ে ঝামেলা এড়াতে।

## 7. Implementation Order (approve-এর পরে ধাপে ধাপে)

| Phase | Files | Events |
|-------|-------|--------|
| **1 — skeleton + page_view** | `index.ts`, `events.ts`, `utils.ts`, `pageEvents.ts` | `page_view` |
| **2 — product** | `productEvents.ts` | `view_item_list`, `view_item`, `select_item`, `add_to_wishlist` |
| **3 — conversion** | `cartEvents.ts`, `checkoutEvents.ts` | `add_to_cart`, `remove_from_cart`, `begin_checkout`, `add_payment_info`, `purchase` |
| **4 — marketing/auth** | `authEvents.ts`, `searchEvents.ts`, `contactEvents.ts` | `search`, `login`, `sign_up`, `contact_form_submit` |

প্রতিটা phase-এর পরে `npm run build` দিয়ে type-check + build ঠিক আছে কিনা যাচাই করব।

## 8. Next Step

1. ✅ এই documentation-টা পড়ে দেখুন — বিশেষ করে **section 3** (event catalog) ও **section 5** (payload structure)
2. কোনো event যোগ/বদল করতে চাইলে জানান — আমি doc update করে দেব
3. **Approve করলে** — আমি `src/datalayer/` folder + `index.ts` + আলাদা আলাদা সব ফাইল implement করব
4. তারপর apni GTM-এ tag/trigger/variable তৈরি করবেন (section 6 অনুযায়ী)