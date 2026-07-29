import { PrismaClient } from "@prisma/client";

let globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prisma: PrismaClient | null = null;
let isDbConnected = false;

// Safe Database Connection Initialization
try {
  if (process.env.DATABASE_URL) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient();
    }
    prisma = globalForPrisma.prisma;
    isDbConnected = true;
    console.log("🚀 MindVerse: PostgreSQL connected via Prisma Client.");
  } else {
    console.warn("⚠️ MindVerse: DATABASE_URL not set. Falling back to local mock databases.");
  }
} catch (error) {
  console.warn("⚠️ MindVerse: Database connection failed. Falling back to local mock databases.", error);
  isDbConnected = false;
}

// In-Memory Database Fallbacks for seamless dev preview with zero config
interface MockFavorite {
  userId: string;
  trendId: string;
  createdAt: Date;
}

interface MockSearch {
  id: string;
  userId: string;
  query: string;
  createdAt: Date;
}

class MemoryDatabase {
  private favorites: MockFavorite[] = [];
  private searchHistory: MockSearch[] = [];
  private defaultUserId = "explorer-1";

  // Favorite Trends
  async getFavorites(userId = this.defaultUserId) {
    if (isDbConnected && prisma) {
      try {
        const favs = await prisma.savedTrend.findMany({
          where: { userId },
          include: { trend: true },
        });
        return favs.map(f => f.trendId);
      } catch (e) {
        console.error("DB Error getting favorites, falling back to memory:", e);
      }
    }
    return this.favorites.filter(f => f.userId === userId).map(f => f.trendId);
  }

  async addFavorite(trendId: string, userId = this.defaultUserId) {
    if (isDbConnected && prisma) {
      try {
        // First verify trend details exist in DB so foreign keys don't error
        // If not, we seed it in DB
        const trendExists = await prisma.trend.findUnique({ where: { id: trendId } });
        if (!trendExists) {
          const { SEEDED_TRENDS, searchTrend } = require("./agents/orchestrator");
          const details = SEEDED_TRENDS[trendId] || await searchTrend(trendId);
          await prisma.trend.create({
            data: {
              id: details.id,
              title: details.title,
              summary: details.summary["30s"],
              popularity: details.popularity,
              category: details.category,
              country: details.country,
              duration: details.duration,
            }
          });
        }
        await prisma.savedTrend.upsert({
          where: { userId_trendId: { userId, trendId } },
          update: {},
          create: { userId, trendId },
        });
        return true;
      } catch (e) {
        console.error("DB Error adding favorite, falling back to memory:", e);
      }
    }

    const exists = this.favorites.some(f => f.userId === userId && f.trendId === trendId);
    if (!exists) {
      this.favorites.push({ userId, trendId, createdAt: new Date() });
    }
    return true;
  }

  async removeFavorite(trendId: string, userId = this.defaultUserId) {
    if (isDbConnected && prisma) {
      try {
        await prisma.savedTrend.delete({
          where: { userId_trendId: { userId, trendId } },
        });
        return true;
      } catch (e) {
        console.error("DB Error removing favorite, falling back to memory:", e);
      }
    }

    this.favorites = this.favorites.filter(f => !(f.userId === userId && f.trendId === trendId));
    return true;
  }

  async checkFavorite(trendId: string, userId = this.defaultUserId) {
    const list = await this.getFavorites(userId);
    return list.includes(trendId);
  }

  // Search History
  async getSearchHistory(userId = this.defaultUserId) {
    if (isDbConnected && prisma) {
      try {
        const history = await prisma.searchHistory.findMany({
          where: { userId },
          orderBy: { createdAt: "desc" },
          take: 10,
        });
        return history.map(h => h.query);
      } catch (e) {
        console.error("DB Error getting search history, falling back to memory:", e);
      }
    }
    return this.searchHistory
      .filter(s => s.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10)
      .map(s => s.query);
  }

  async addSearchQuery(query: string, userId = this.defaultUserId) {
    if (!query || query.trim() === "") return;
    
    if (isDbConnected && prisma) {
      try {
        await prisma.searchHistory.create({
          data: { userId, query },
        });
        return true;
      } catch (e) {
        console.error("DB Error adding search query, falling back to memory:", e);
      }
    }

    this.searchHistory.unshift({
      id: Math.random().toString(),
      userId,
      query,
      createdAt: new Date(),
    });
    return true;
  }
}

export const db = new MemoryDatabase();
export { prisma, isDbConnected };
