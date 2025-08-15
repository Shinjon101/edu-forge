ALTER TABLE "student_responses" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "student_responses" CASCADE;--> statement-breakpoint
ALTER TABLE "questions" DROP CONSTRAINT "questions_task_id_tasks_id_fk";
--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;