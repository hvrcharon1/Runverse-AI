import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import {
  getUserListings,
  getActiveListings,
  createListing,
  getListingOffers,
  createOffer,
  updateOffer,
  createTransaction,
  getUserTransactions,
  getSellerTransactions,
  updateTransaction,
} from "../features";

export const marketplaceRouter = router({
  listings: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserListings(ctx.user.id);
    }),

    browse: publicProcedure.query(async () => {
      return getActiveListings();
    }),

    create: protectedProcedure
      .input(
        z.object({
          title: z.string(),
          description: z.string(),
          category: z.enum(["shoes", "gear", "apparel", "nutrition", "accessories"]),
          condition: z.enum(["new", "like_new", "good", "fair"]),
          price: z.number().optional(),
          isFree: z.boolean().default(false),
          images: z.array(z.string()).optional(),
          mileage: z.number().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return createListing(ctx.user.id, input);
      }),
  }),

  offers: router({
    list: publicProcedure
      .input(z.object({ listingId: z.number() }))
      .query(async ({ input }) => {
        return getListingOffers(input.listingId);
      }),

    create: protectedProcedure
      .input(
        z.object({
          listingId: z.number(),
          offeredPrice: z.number().optional(),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return createOffer(input.listingId, ctx.user.id, {
          offeredPrice: input.offeredPrice,
          message: input.message,
        });
      }),

    updateStatus: protectedProcedure
      .input(
        z.object({
          offerId: z.number(),
          status: z.enum(["pending", "accepted", "rejected", "withdrawn"]),
        })
      )
      .mutation(async ({ input }) => {
        return updateOffer(input.offerId, input.status);
      }),
  }),

  transactions: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserTransactions(ctx.user.id);
    }),

    sales: protectedProcedure.query(async ({ ctx }) => {
      return getSellerTransactions(ctx.user.id);
    }),

    create: protectedProcedure
      .input(
        z.object({
          listingId: z.number(),
          sellerId: z.number(),
          amount: z.number(),
          stripePaymentIntentId: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return createTransaction({
          listingId: input.listingId,
          buyerId: ctx.user.id,
          sellerId: input.sellerId,
          amount: input.amount,
          stripePaymentIntentId: input.stripePaymentIntentId,
          status: "pending",
        });
      }),

    updateStatus: protectedProcedure
      .input(
        z.object({
          transactionId: z.number(),
          status: z.enum(["pending", "completed", "failed", "refunded"]),
        })
      )
      .mutation(async ({ input }) => {
        return updateTransaction(input.transactionId, { status: input.status });
      }),

    addRating: protectedProcedure
      .input(
        z.object({
          transactionId: z.number(),
          rating: z.number().min(1).max(5),
          review: z.string().optional(),
          isSellerRating: z.boolean(),
        })
      )
      .mutation(async ({ input }) => {
        const updates = input.isSellerRating
          ? { sellerRating: input.rating, sellerReview: input.review }
          : { buyerRating: input.rating, buyerReview: input.review };
        return updateTransaction(input.transactionId, updates);
      }),
  }),
});
