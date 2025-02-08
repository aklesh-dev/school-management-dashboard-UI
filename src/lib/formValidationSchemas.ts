import { z } from "zod";

export const subjectschema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  teachers: z.array(z.string()), // -- teacher ids
});

export type Subjectschema = z.infer<typeof subjectschema>;
