import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { shoesRouter } from "./routers/shoes";
import { runsRouter } from "./routers/runs";
import { nutritionRouter } from "./routers/nutrition";
import { recoveryRouter } from "./routers/recovery";
import { socialRouter } from "./routers/social";
import { marketplaceRouter } from "./routers/marketplace";
import { routesRouter } from "./routers/routes";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  shoes: shoesRouter,
  runs: runsRouter,
  nutrition: nutritionRouter,
  recovery: recoveryRouter,
  social: socialRouter,
  marketplace: marketplaceRouter,
  routes: routesRouter,
});

export type AppRouter = typeof appRouter;
