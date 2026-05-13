import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import {
  getUserPosts,
  getPublicFeed,
  createPost,
  getPostComments,
  createComment,
  likePost,
  followUser,
  getUserFollowers,
  getUserFollowing,
} from "../features";

export const socialRouter = router({
  posts: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserPosts(ctx.user.id);
    }),

    feed: publicProcedure.query(async () => {
      return getPublicFeed();
    }),

    create: protectedProcedure
      .input(
        z.object({
          content: z.string(),
          image: z.string().optional(),
          runId: z.number().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return createPost(ctx.user.id, input);
      }),

    comments: publicProcedure
      .input(z.object({ postId: z.number() }))
      .query(async ({ input }) => {
        return getPostComments(input.postId);
      }),

    addComment: protectedProcedure
      .input(
        z.object({
          postId: z.number(),
          content: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return createComment(input.postId, ctx.user.id, input.content);
      }),

    like: protectedProcedure
      .input(z.object({ postId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return likePost(input.postId, ctx.user.id);
      }),
  }),

  follows: router({
    follow: protectedProcedure
      .input(z.object({ userId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return followUser(ctx.user.id, input.userId);
      }),

    followers: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        return getUserFollowers(input.userId);
      }),

    following: publicProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ input }) => {
        return getUserFollowing(input.userId);
      }),
  }),
});
