"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createClassroomSchema,
  CreateClassroomValues,
} from "@/lib/validations/classroom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateClassroom } from "@/hooks/useCreateClassroom";

export function CreateClassroomForm() {
  const form = useForm<CreateClassroomValues>({
    resolver: zodResolver(createClassroomSchema),
    defaultValues: {
      name: "",
      grade: "",
      board: "",
    },
  });

  const mutation = useCreateClassroom();

  function onSubmit(values: CreateClassroomValues) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-sm w-full mx-auto px-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Classroom Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter classroom name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade</FormLabel>
              <FormControl>
                <Input placeholder="E.g. 6th, 7th, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="board"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Board</FormLabel>
              <FormControl>
                <Input placeholder="CBSE / ICSE / State Board" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Create Classroom"}
        </Button>
      </form>
    </Form>
  );
}
