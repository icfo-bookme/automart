"use client";

import { useState, useEffect } from "react";

export function useFetch<T>(url: string | null) {
  const [data, setData] = useState<T>([] as unknown as T);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  useEffect(() => {
    if (!url) return;

    setLoading(true);
    setError(null);

    fetch(`${baseUrl}${url}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((json) => setData(json.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, error, loading };
}
