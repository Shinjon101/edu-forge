import { z } from "zod";

export const createClassroomSchema = z.object({
  name: z.string().min(1, { message: "Classroom name is required" }),
  grade: z.string().min(1, { message: "Grade is required" }),
  board: z.string().min(1, { message: "Board is required" }),
});

export type CreateClassroomValues = z.infer<typeof createClassroomSchema>;
