import { z } from "zod";

export const subjectschema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  teachers: z.array(z.string()), // -- teacher ids
});

export type Subjectschema = z.infer<typeof subjectschema>;

// --class schema--
export const classschema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Class name is required!" }),
  capacity: z.coerce.number().min(1, { message: "Capacity name is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Grade id is required!" }),
  supervisorId: z.coerce.string().optional(),
});

export type Classschema = z.infer<typeof classschema>;
