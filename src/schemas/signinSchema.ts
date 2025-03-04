
import { z } from "zod";

export const signinSchema = z.object({
  identifier: z.string(),//identifier ->username //production
  password: z.string(),
});

