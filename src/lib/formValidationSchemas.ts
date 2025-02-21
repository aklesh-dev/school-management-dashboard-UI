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

// --Teacher Scheam--
export const teacherschema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required" }),
  surname: z.string().min(1, { message: "Last name is required " }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required" }),
  birthdate: z.coerce.date({ message: "Birthdate is required" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required" }),
  subjects: z.array(z.string()).optional(), //--subject ids
});

export type Teacherschema = z.infer<typeof teacherschema>;

// --Student Scheam--
export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required" }),
  surname: z.string().min(1, { message: "Last name is required " }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? null : val)),
  phone: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? null : val)),
  address: z.string().optional(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required" }),
  birthdate: z.coerce.date({ message: "Birthdate is required" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required" }),
  gradeId: z.coerce.number().min(1, { message: "Grade is required" }),
  classId: z.coerce.number().min(1, { message: "Class is required" }),
  parentId: z.string().min(1, { message: "Parent Id is required" }),
});

export type StudentSchema = z.infer<typeof studentSchema>;

// Exam Schema
export const examSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title is required!" }),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  lessonId: z.coerce.number({ message: "Lesson is required!" }),
});

export type ExamSchema = z.infer<typeof examSchema>;
