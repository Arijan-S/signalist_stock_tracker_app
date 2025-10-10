"use server";

import { connectToDatabase } from "@/database/mongoose";
import { Watchlist } from "@/database/models/watchlist.model";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function getWatchlistSymbolsByEmail(
  email: string
): Promise<string[]> {
  if (!email) return [];

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error("MongoDB connection not found");

    // Better Auth stores users in the "user" collection
    const user = await db
      .collection("user")
      .findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

    if (!user) return [];

    const userId = (user.id as string) || String(user._id || "");
    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    return items.map((i) => String(i.symbol));
  } catch (err) {
    console.error("getWatchlistSymbolsByEmail error:", err);
    return [];
  }
}

export async function getUserWatchlist(): Promise<WatchlistItem[]> {
  try {
    const session = await (
      await auth
    ).api.getSession({ headers: await headers() });

    if (!session?.user?.email) return [];

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error("MongoDB connection not found");

    const user = await db
      .collection("user")
      .findOne<{ _id?: unknown; id?: string; email?: string }>({
        email: session.user.email,
      });

    if (!user) return [];

    const userId = (user.id as string) || String(user._id || "");
    if (!userId) return [];

    const items = await Watchlist.find({ userId }).sort({ addedAt: -1 }).lean();
    return items.map((item) => ({
      symbol: String(item.symbol),
      company: String(item.company),
      addedAt: item.addedAt,
    }));
  } catch (err) {
    console.error("getUserWatchlist error:", err);
    return [];
  }
}

export async function addToWatchlist(symbol: string, company: string) {
  try {
    const session = await (
      await auth
    ).api.getSession({ headers: await headers() });

    if (!session?.user?.email) {
      return { success: false, error: "Not authenticated" };
    }

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error("MongoDB connection not found");

    const user = await db
      .collection("user")
      .findOne<{ _id?: unknown; id?: string; email?: string }>({
        email: session.user.email,
      });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    const userId = (user.id as string) || String(user._id || "");
    if (!userId) {
      return { success: false, error: "Invalid user ID" };
    }

    await Watchlist.create({
      userId,
      symbol: symbol.toUpperCase(),
      company,
      addedAt: new Date(),
    });

    revalidatePath("/watchlist");
    return { success: true };
  } catch (err: unknown) {
    console.error("addToWatchlist error:", err);
    if (err && typeof err === "object" && "code" in err && err.code === 11000) {
      return { success: false, error: "Stock already in watchlist" };
    }
    return { success: false, error: "Failed to add to watchlist" };
  }
}

export async function removeFromWatchlist(symbol: string) {
  try {
    const session = await (
      await auth
    ).api.getSession({ headers: await headers() });

    if (!session?.user?.email) {
      return { success: false, error: "Not authenticated" };
    }

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error("MongoDB connection not found");

    const user = await db
      .collection("user")
      .findOne<{ _id?: unknown; id?: string; email?: string }>({
        email: session.user.email,
      });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    const userId = (user.id as string) || String(user._id || "");
    if (!userId) {
      return { success: false, error: "Invalid user ID" };
    }

    await Watchlist.deleteOne({
      userId,
      symbol: symbol.toUpperCase(),
    });

    revalidatePath("/watchlist");
    return { success: true };
  } catch (err) {
    console.error("removeFromWatchlist error:", err);
    return { success: false, error: "Failed to remove from watchlist" };
  }
}

export async function checkWatchlistStatus(symbol: string): Promise<boolean> {
  try {
    const session = await (
      await auth
    ).api.getSession({ headers: await headers() });

    if (!session?.user?.email) return false;

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error("MongoDB connection not found");

    const user = await db
      .collection("user")
      .findOne<{ _id?: unknown; id?: string; email?: string }>({
        email: session.user.email,
      });

    if (!user) return false;

    const userId = (user.id as string) || String(user._id || "");
    if (!userId) return false;

    const exists = await Watchlist.exists({
      userId,
      symbol: symbol.toUpperCase(),
    });

    return !!exists;
  } catch (err) {
    console.error("checkWatchlistStatus error:", err);
    return false;
  }
}
