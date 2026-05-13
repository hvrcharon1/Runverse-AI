import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getUserRuns, createRun, getPublicRuns, getUserStats } from "../features";

export const runsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return getUserRuns(ctx.user.id);
  }),

  public: publicProcedure.query(async () => {
    return getPublicRuns();
  }),

  create: protectedProcedure
    .input(
      z.object({
        distance: z.number(),
        duration: z.number(),
        pace: z.string().optional(),
        elevation: z.number().optional(),
        cadence: z.number().optional(),
        shoeId: z.number().optional(),
        routeId: z.number().optional(),
        notes: z.string().optional(),
        gpsData: z.string().optional(),
        isPublic: z.boolean().default(false),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return createRun(ctx.user.id, input);
    }),

  stats: protectedProcedure.query(async ({ ctx }) => {
    return getUserStats(ctx.user.id);
  }),
});
