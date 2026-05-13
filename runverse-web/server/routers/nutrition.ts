import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getUserNutritionLogs, createNutritionLog } from "../features";

export const nutritionRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return getUserNutritionLogs(ctx.user.id);
  }),

  create: protectedProcedure
    .input(
      z.object({
        mealType: z.enum(["breakfast", "lunch", "dinner", "snack", "hydration"]),
        foodItems: z.array(z.object({ name: z.string(), quantity: z.string() })),
        calories: z.number().optional(),
        protein: z.number().optional(),
        carbs: z.number().optional(),
        fat: z.number().optional(),
        notes: z.string().optional(),
        loggedAt: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return createNutritionLog(ctx.user.id, input);
    }),
});
