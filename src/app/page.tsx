"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { JoinClassModal } from "@/components/JoinClassButton";
import CreateClassButton from "@/components/CreateClassButton";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-4 mt-10">
      <div className="flex gap-4">
        <JoinClassModal />
        <CreateClassButton />
      </div>
    </main>
  );
}
