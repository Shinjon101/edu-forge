import {
  boolean,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name"),
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
});

export const classroomMembers = pgTable(
  "classroom_members",
  {
    user_id: text("user_id")
      .references(() => users.id)
      .notNull(),
    classroom_id: text("classroom_id")
      .references(() => classrooms.id)
      .notNull(),
    role: text("role", { enum: ["teacher", "student"] }).notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.user_id, t.classroom_id] }),
  })
);

export const tasks = pgTable("tasks", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  subject: text("subject").notNull(),
  classroom_id: text("classroom_id")
    .references(() => classrooms.id)
    .notNull(),
  created_by: text("created_by")
    .references(() => users.id)
    .notNull(),
  due_date: timestamp("due_date", { withTimezone: true }),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  task_id: text("task_id")
    .references(() => tasks.id)
    .notNull(),
  question_text: text("question_text").notNull(),
  subject: text("subject").notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const submissions = pgTable(
  "submissions",
  {
    id: serial("id").primaryKey(),
    question_id: serial("question_id")
      .references(() => questions.id)
      .notNull(),
    user_id: text("user_id")
      .references(() => users.id)
      .notNull(),
    classroom_id: text("classroom_id")
      .references(() => classrooms.id)
      .notNull(),
    response: text("response"),
    attempted: boolean("attempted").default(false),
    submitted_at: timestamp("submitted_at", { withTimezone: true }),
  },
  (t) => ({
    uniqueAttempt: unique().on(t.question_id, t.user_id),
  })
);
