import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getUserShoes, createShoe, updateShoe } from "../features";

export const shoesRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return getUserShoes(ctx.user.id);
  }),

  create: protectedProcedure
    .input(
      z.object({
        brand: z.string(),
        model: z.string(),
        purchaseDate: z.date(),
        color: z.string().optional(),
        notes: z.string().optional(),
        retirementMileage: z.number().default(800),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return createShoe(ctx.user.id, {
        ...input,
        currentMileage: 0,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        currentMileage: z.number().optional(),
        notes: z.string().optional(),
        isActive: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return updateShoe(input.id, {
        currentMileage: input.currentMileage,
        notes: input.notes,
        isActive: input.isActive,
      });
    }),
});
