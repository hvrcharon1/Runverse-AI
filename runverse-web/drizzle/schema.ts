import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean, longtext, json } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  bio: text("bio"),
  city: varchar("city", { length: 100 }),
  yearsRunning: int("yearsRunning"),
  favoriteDistance: varchar("favoriteDistance", { length: 50 }),
  personalRecords: json("personalRecords"),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Shoes table for tracking running shoes
export const shoes = mysqlTable("shoes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  brand: varchar("brand", { length: 100 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  purchaseDate: timestamp("purchaseDate").notNull(),
  currentMileage: decimal("currentMileage", { precision: 8, scale: 2 }).default("0"),
  retirementMileage: decimal("retirementMileage", { precision: 8, scale: 2 }).default("800"),
  color: varchar("color", { length: 50 }),
  notes: text("notes"),
  isActive: boolean("isActive").default(true),
  image: text("image"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Shoe = typeof shoes.$inferSelect;
export type InsertShoe = typeof shoes.$inferInsert;

// Runs table for tracking running activities
export const runs = mysqlTable("runs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  shoeId: int("shoeId"),
  distance: decimal("distance", { precision: 8, scale: 2 }).notNull(),
  duration: int("duration").notNull(),
  pace: varchar("pace", { length: 20 }),
  elevation: decimal("elevation", { precision: 8, scale: 2 }),
  cadence: int("cadence"),
  routeId: int("routeId"),
  notes: text("notes"),
  gpsData: longtext("gpsData"),
  isPublic: boolean("isPublic").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Run = typeof runs.$inferSelect;
export type InsertRun = typeof runs.$inferInsert;

// Routes table for saving and sharing running routes
export const routes = mysqlTable("routes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  distance: decimal("distance", { precision: 8, scale: 2 }).notNull(),
  elevation: decimal("elevation", { precision: 8, scale: 2 }),
  gpsData: longtext("gpsData").notNull(),
  difficulty: mysqlEnum("difficulty", ["easy", "moderate", "hard"]),
  isPublic: boolean("isPublic").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Route = typeof routes.$inferSelect;
export type InsertRoute = typeof routes.$inferInsert;

// Nutrition logs table
export const nutritionLogs = mysqlTable("nutritionLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  mealType: mysqlEnum("mealType", ["breakfast", "lunch", "dinner", "snack", "hydration"]).notNull(),
  foodItems: json("foodItems").notNull(),
  calories: int("calories"),
  protein: decimal("protein", { precision: 8, scale: 2 }),
  carbs: decimal("carbs", { precision: 8, scale: 2 }),
  fat: decimal("fat", { precision: 8, scale: 2 }),
  notes: text("notes"),
  loggedAt: timestamp("loggedAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type NutritionLog = typeof nutritionLogs.$inferSelect;
export type InsertNutritionLog = typeof nutritionLogs.$inferInsert;

// Recovery logs table
export const recoveryLogs = mysqlTable("recoveryLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  sleepHours: decimal("sleepHours", { precision: 4, scale: 2 }),
  muscleSoreness: int("muscleSoreness"),
  recoveryActivities: json("recoveryActivities"),
  isRestDay: boolean("isRestDay").default(false),
  notes: text("notes"),
  loggedAt: timestamp("loggedAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type RecoveryLog = typeof recoveryLogs.$inferSelect;
export type InsertRecoveryLog = typeof recoveryLogs.$inferInsert;

// Social posts table
export const posts = mysqlTable("posts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  runId: int("runId"),
  content: text("content").notNull(),
  image: text("image"),
  likes: int("likes").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;

// Comments table
export const comments = mysqlTable("comments", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId").notNull(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Comment = typeof comments.$inferSelect;
export type InsertComment = typeof comments.$inferInsert;

// Likes table
export const likes = mysqlTable("likes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  postId: int("postId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Like = typeof likes.$inferSelect;
export type InsertLike = typeof likes.$inferInsert;

// Follows table
export const follows = mysqlTable("follows", {
  id: int("id").autoincrement().primaryKey(),
  followerId: int("followerId").notNull(),
  followingId: int("followingId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Follow = typeof follows.$inferSelect;
export type InsertFollow = typeof follows.$inferInsert;

// Marketplace listings table
export const listings = mysqlTable("listings", {
  id: int("id").autoincrement().primaryKey(),
  sellerId: int("sellerId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: mysqlEnum("category", ["shoes", "gear", "apparel", "nutrition", "accessories"]).notNull(),
  condition: mysqlEnum("condition", ["new", "like_new", "good", "fair"]).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }),
  isFree: boolean("isFree").default(false),
  images: json("images"),
  mileage: decimal("mileage", { precision: 8, scale: 2 }),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Listing = typeof listings.$inferSelect;
export type InsertListing = typeof listings.$inferInsert;

// Offers table for negotiations
export const offers = mysqlTable("offers", {
  id: int("id").autoincrement().primaryKey(),
  listingId: int("listingId").notNull(),
  buyerId: int("buyerId").notNull(),
  offeredPrice: decimal("offeredPrice", { precision: 10, scale: 2 }),
  message: text("message"),
  status: mysqlEnum("status", ["pending", "accepted", "rejected", "withdrawn"]).default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Offer = typeof offers.$inferSelect;
export type InsertOffer = typeof offers.$inferInsert;

// Transactions table for marketplace purchases
export const transactions = mysqlTable("transactions", {
  id: int("id").autoincrement().primaryKey(),
  listingId: int("listingId").notNull(),
  buyerId: int("buyerId").notNull(),
  sellerId: int("sellerId").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  status: mysqlEnum("status", ["pending", "completed", "failed", "refunded"]).default("pending"),
  buyerRating: int("buyerRating"),
  sellerRating: int("sellerRating"),
  buyerReview: text("buyerReview"),
  sellerReview: text("sellerReview"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;

// Messages table for direct messaging
export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  senderId: int("senderId").notNull(),
  recipientId: int("recipientId").notNull(),
  content: text("content").notNull(),
  isRead: boolean("isRead").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;