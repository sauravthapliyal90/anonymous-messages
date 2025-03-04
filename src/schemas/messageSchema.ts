
import { z } from "zod";

export const messageSchema = z.object({
  content: z
  .string()
  .min(10, {message: 'Content must be atleast of 10 character'})
  .max(300, {message: 'Content must be np longer of 300 character'})
  
});

