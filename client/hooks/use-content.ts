import { useEffect, useState } from "react";
import { fetchContent, type Locale } from "@/lib/cms";

export function useContent<T = any>(key: string, locale: Locale, initial?: T) {
  const [data, setData] = useState<T | null>(initial ?? null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchContent<T>(key, locale)
      .then((d) => {
        if (!mounted) return;
        setData((d as T) ?? (initial as T) ?? null);
      })
      .catch((e) => mounted && setError(e?.message || "error"))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [key, locale]);

  return { data, loading, error };
}
