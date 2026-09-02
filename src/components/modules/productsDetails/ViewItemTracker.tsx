"use client";

import { useEffect } from "react";
import { pushViewItem } from "@/datalayer";
import { Item } from "@/types/Item";

/**
 * Fires the `view_item` data layer event when a product detail page mounts.
 * Render this once inside the product detail page (server component is fine).
 */
export default function ViewItemTracker({ item }: { item: Item }) {
  useEffect(() => {
    pushViewItem(item);
  }, [item.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}