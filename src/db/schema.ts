import {
  pgTable,
  text,
  varchar,
  timestamp,
  boolean,
  serial,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name"),
  role: text("role").$type<"teacher" | "student">().notNull(),
});

export const classrooms = pgTable("classrooms", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  board: text("board").notNull(),
  grade: text("grade").notNull(),
  created_by: text("created_by")
    .references(() => users.id)
    .notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  code: varchar("code", { length: 4 }).notNull().unique(),
  archived: boolean("archived").default(false),
});

export const classroomMembers = pgTable(
  "classroom_members",
  {
    classroom_id: text("classroom_id")
      .references(() => classrooms.id)
      .notNull(),
    user_id: text("user_id")
      .references(() => users.id)
      .notNull(),
    joined_at: timestamp("joined_at", { withTimezone: true }).defaultNow(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.classroom_id, t.user_id] }),
  })
);

export const tasks = pgTable("tasks", {
  id: text("id").primaryKey(),
  classroom_id: text("classroom_id")
    .references(() => classrooms.id)
    .notNull(),
  created_by: text("created_by")
    .references(() => users.id)
    .notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  deadline: timestamp("deadline", { withTimezone: true }),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  archived: boolean("archived").default(false),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  task_id: text("task_id")
    .references(() => tasks.id)
    .notNull(),
  content: text("content").notNull(),
});

export const studentResponses = pgTable(
  "student_responses",
  {
    user_id: text("user_id")
      .references(() => users.id)
      .notNull(),
    question_id: serial("question_id").notNull(),
    task_id: text("task_id")
      .references(() => tasks.id)
      .notNull(),
    attempted: boolean("attempted").default(false),
    submitted_at: timestamp("submitted_at", { withTimezone: true }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.user_id, t.question_id, t.task_id] }),
  })
);

export const usersRelations = relations(users, ({ many }) => ({
  classroomsCreated: many(classrooms),
  classroomMemberships: many(classroomMembers),
  tasksCreated: many(tasks),
  responses: many(studentResponses),
}));

export const classroomsRelations = relations(classrooms, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [classrooms.created_by],
    references: [users.id],
  }),
  members: many(classroomMembers),
  tasks: many(tasks),
}));

export const classroomMembersRelations = relations(
  classroomMembers,
  ({ one }) => ({
    classroom: one(classrooms, {
      fields: [classroomMembers.classroom_id],
      references: [classrooms.id],
    }),
    user: one(users, {
      fields: [classroomMembers.user_id],
      references: [users.id],
    }),
  })
);

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  classroom: one(classrooms, {
    fields: [tasks.classroom_id],
    references: [classrooms.id],
  }),
  createdBy: one(users, {
    fields: [tasks.created_by],
    references: [users.id],
  }),
  questions: many(questions),
  responses: many(studentResponses),
}));

export const questionsRelations = relations(questions, ({ one, many }) => ({
  task: one(tasks, {
    fields: [questions.task_id],
    references: [tasks.id],
  }),
}));

export const studentResponsesRelations = relations(
  studentResponses,
  ({ one }) => ({
    user: one(users, {
      fields: [studentResponses.user_id],
      references: [users.id],
    }),
    task: one(tasks, {
      fields: [studentResponses.task_id],
      references: [tasks.id],
    }),
  })
);
