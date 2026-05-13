import { eq, desc, and, gte, lte } from "drizzle-orm";
import {
  shoes,
  runs,
  nutritionLogs,
  recoveryLogs,
  posts,
  comments,
  likes,
  follows,
  listings,
  offers,
  transactions,
  messages,
  routes,
} from "../drizzle/schema";
import { getDb } from "./db";

/**
 * SHOES MODULE
 */
export async function getUserShoes(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(shoes).where(eq(shoes.userId, userId));
}

export async function createShoe(userId: number, shoeData: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(shoes).values({
    userId,
    ...shoeData,
  });
  return result;
}

export async function updateShoe(shoeId: number, updates: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(shoes).set(updates).where(eq(shoes.id, shoeId));
}

/**
 * RUNS MODULE
 */
export async function getUserRuns(userId: number, limit = 20) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(runs)
    .where(eq(runs.userId, userId))
    .orderBy(desc(runs.createdAt))
    .limit(limit);
}

export async function createRun(userId: number, runData: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(runs).values({
    userId,
    ...runData,
  });
}

export async function getPublicRuns(limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(runs)
    .where(eq(runs.isPublic, true))
    .orderBy(desc(runs.createdAt))
    .limit(limit);
}

/**
 * NUTRITION MODULE
 */
export async function getUserNutritionLogs(userId: number, limit = 30) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(nutritionLogs)
    .where(eq(nutritionLogs.userId, userId))
    .orderBy(desc(nutritionLogs.loggedAt))
    .limit(limit);
}

export async function createNutritionLog(userId: number, logData: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(nutritionLogs).values({
    userId,
    ...logData,
  });
}

/**
 * RECOVERY MODULE
 */
export async function getUserRecoveryLogs(userId: number, limit = 30) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(recoveryLogs)
    .where(eq(recoveryLogs.userId, userId))
    .orderBy(desc(recoveryLogs.loggedAt))
    .limit(limit);
}

export async function createRecoveryLog(userId: number, logData: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(recoveryLogs).values({
    userId,
    ...logData,
  });
}

/**
 * SOCIAL MODULE - Posts and Comments
 */
export async function getUserPosts(userId: number, limit = 20) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(posts)
    .where(eq(posts.userId, userId))
    .orderBy(desc(posts.createdAt))
    .limit(limit);
}

export async function getPublicFeed(limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt))
    .limit(limit);
}

export async function createPost(userId: number, postData: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(posts).values({
    userId,
    ...postData,
  });
}

export async function getPostComments(postId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(comments)
    .where(eq(comments.postId, postId))
    .orderBy(desc(comments.createdAt));
}

export async function createComment(postId: number, userId: number, content: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(comments).values({
    postId,
    userId,
    content,
  });
}

export async function likePost(postId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(likes).values({
    postId,
    userId,
  });
}

/**
 * FOLLOWS MODULE
 */
export async function followUser(followerId: number, followingId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(follows).values({
    followerId,
    followingId,
  });
}

export async function getUserFollowers(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(follows).where(eq(follows.followingId, userId));
}

export async function getUserFollowing(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(follows).where(eq(follows.followerId, userId));
}

/**
 * MARKETPLACE MODULE
 */
export async function getUserListings(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(listings)
    .where(and(eq(listings.sellerId, userId), eq(listings.isActive, true)))
    .orderBy(desc(listings.createdAt));
}

export async function getActiveListings(limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(listings)
    .where(eq(listings.isActive, true))
    .orderBy(desc(listings.createdAt))
    .limit(limit);
}

export async function createListing(sellerId: number, listingData: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(listings).values({
    sellerId,
    ...listingData,
  });
}

export async function getListingOffers(listingId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(offers)
    .where(eq(offers.listingId, listingId))
    .orderBy(desc(offers.createdAt));
}

export async function createOffer(listingId: number, buyerId: number, offerData: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(offers).values({
    listingId,
    buyerId,
    ...offerData,
  });
}

export async function updateOffer(offerId: number, status: "pending" | "accepted" | "rejected" | "withdrawn") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(offers).set({ status }).where(eq(offers.id, offerId));
}

/**
 * TRANSACTIONS MODULE
 */
export async function createTransaction(transactionData: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(transactions).values(transactionData);
}

export async function getUserTransactions(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(transactions)
    .where(eq(transactions.buyerId, userId))
    .orderBy(desc(transactions.createdAt));
}

export async function getSellerTransactions(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(transactions)
    .where(eq(transactions.sellerId, userId))
    .orderBy(desc(transactions.createdAt));
}

export async function updateTransaction(transactionId: number, updates: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(transactions).set(updates).where(eq(transactions.id, transactionId));
}

/**
 * MESSAGING MODULE
 */
export async function getUserMessages(userId: number, limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(messages)
    .where(eq(messages.recipientId, userId))
    .orderBy(desc(messages.createdAt))
    .limit(limit);
}

export async function sendMessage(senderId: number, recipientId: number, content: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(messages).values({
    senderId,
    recipientId,
    content,
  });
}

/**
 * ROUTES MODULE
 */
export async function getUserRoutes(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(routes)
    .where(eq(routes.userId, userId))
    .orderBy(desc(routes.createdAt));
}

export async function getPublicRoutes(limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(routes)
    .where(eq(routes.isPublic, true))
    .orderBy(desc(routes.createdAt))
    .limit(limit);
}

export async function createRoute(userId: number, routeData: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(routes).values({
    userId,
    ...routeData,
  });
}

/**
 * STATS MODULE
 */
export async function getUserStats(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const userRuns = await db
    .select()
    .from(runs)
    .where(eq(runs.userId, userId));

  const totalDistance = userRuns.reduce((sum, run) => sum + parseFloat(run.distance as any), 0);
  const totalRuns = userRuns.length;
  const userShoes = await db
    .select()
    .from(shoes)
    .where(eq(shoes.userId, userId));

  const activeShoes = userShoes.filter((s) => s.isActive).length;

  return {
    totalDistance: Math.round(totalDistance * 100) / 100,
    totalRuns,
    activeShoes,
    lastRunDate: userRuns[0]?.createdAt || null,
  };
}
