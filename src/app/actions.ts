"use server";

import { db } from "@/lib/db";

export async function getFavoritesAction(userId?: string) {
  return await db.getFavorites(userId);
}

export async function addFavoriteAction(trendId: string, userId?: string) {
  return await db.addFavorite(trendId, userId);
}

export async function removeFavoriteAction(trendId: string, userId?: string) {
  return await db.removeFavorite(trendId, userId);
}

export async function checkFavoriteAction(trendId: string, userId?: string) {
  return await db.checkFavorite(trendId, userId);
}

export async function getSearchHistoryAction(userId?: string) {
  return await db.getSearchHistory(userId);
}

export async function addSearchQueryAction(query: string, userId?: string) {
  return await db.addSearchQuery(query, userId);
}
