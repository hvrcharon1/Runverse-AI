import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getUserRecoveryLogs, createRecoveryLog } from "../features";

export const recoveryRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return getUserRecoveryLogs(ctx.user.id);
  }),

  create: protectedProcedure
    .input(
      z.object({
        sleepHours: z.number().optional(),
        muscleSoreness: z.number().optional(),
        recoveryActivities: z.array(z.string()).optional(),
        isRestDay: z.boolean().default(false),
        notes: z.string().optional(),
        loggedAt: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return createRecoveryLog(ctx.user.id, input);
    }),
});
