import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getUserRoutes, getPublicRoutes, createRoute } from "../features";

export const routesRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return getUserRoutes(ctx.user.id);
  }),

  public: publicProcedure.query(async () => {
    return getPublicRoutes();
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        distance: z.number(),
        elevation: z.number().optional(),
        gpsData: z.string(),
        difficulty: z.enum(["easy", "moderate", "hard"]).optional(),
        isPublic: z.boolean().default(false),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return createRoute(ctx.user.id, input);
    }),
});
