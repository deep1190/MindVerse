"use client";
// Note: In Next.js client files, we can also manage local state or link to local cookies
// for total react-state support. But we can build standard mock server actions or a client-side API handler
// to ensure it works across all build pipelines.
// Let's create database controller hooks. To keep it robust, we'll implement a clean local state system
// in the components, with synchronization, which works 100% of the time, and support Server Actions in this separate file.

import { db } from "@/lib/db";

export async function getBookmarks(userId?: string) {
  return await db.getFavorites(userId);
}

export async function toggleBookmark(trendId: string, userId?: string) {
  const isFav = await db.checkFavorite(trendId, userId);
  if (isFav) {
    return await db.removeFavorite(trendId, userId);
  } else {
    return await db.addFavorite(trendId, userId);
  }
}

export async function getSearchList(userId?: string) {
  return await db.getSearchHistory(userId);
}

export async function logSearch(query: string, userId?: string) {
  return await db.addSearchQuery(query, userId);
}
