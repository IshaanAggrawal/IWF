import { useState, useEffect } from "react";

export interface MediaItem {
  _id: string;
  key: string;
  title: string;
  category: "hero" | "causes" | "thematic" | "gallery" | "patients" | "general" | "partners";
  url: string;
  publicId?: string;
  altText?: string;
  caption?: string;
  tags?: string[];
}

interface MediaResponse {
  success: boolean;
  count: number;
  data: MediaItem[];
  keyMap: Record<string, string>;
}

// In-memory cache to prevent re-fetching across component re-renders
let cachedKeyMap: Record<string, string> | null = null;
let cachedList: MediaItem[] | null = null;
let pendingPromise: Promise<MediaResponse> | null = null;

export async function fetchAllMedia(): Promise<MediaResponse> {
  if (cachedKeyMap && cachedList) {
    return {
      success: true,
      count: cachedList.length,
      data: cachedList,
      keyMap: cachedKeyMap,
    };
  }

  if (pendingPromise) {
    return pendingPromise;
  }

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  pendingPromise = fetch(`${API_URL}/media`)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`Media fetch failed with status ${res.status}`);
      }
      const data: MediaResponse = await res.json();
      cachedKeyMap = data.keyMap || {};
      cachedList = data.data || [];
      return data;
    })
    .catch((err) => {
      console.warn("Could not fetch media from backend CMS, falling back to local assets:", err);
      return {
        success: false,
        count: 0,
        data: [],
        keyMap: {},
      };
    })
    .finally(() => {
      pendingPromise = null;
    });

  return pendingPromise;
}

/**
 * Custom React hook to seamlessly integrate Cloudinary CMS assets.
 * Returns helper `getMedia(key, fallback)` which automatically provides the Cloudinary URL
 * when populated, or smoothly falls back to the static bundled image.
 */
export function useMedia(category?: string) {
  const [mediaMap, setMediaMap] = useState<Record<string, string>>(cachedKeyMap || {});
  const [mediaList, setMediaList] = useState<MediaItem[]>(cachedList || []);
  const [loading, setLoading] = useState<boolean>(!cachedKeyMap);

  useEffect(() => {
    let isMounted = true;
    fetchAllMedia().then((res) => {
      if (!isMounted) return;
      setMediaMap(res.keyMap);
      if (category) {
        setMediaList(res.data.filter((item) => item.category === category));
      } else {
        setMediaList(res.data);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [category]);

  const getMedia = (key: string, fallback: string): string => {
    return mediaMap[key] || fallback;
  };

  return {
    mediaMap,
    mediaList,
    loading,
    getMedia,
  };
}
