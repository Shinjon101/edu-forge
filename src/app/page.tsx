"use client";

import { JoinClassModal } from "@/components/modals/JoinClassModal";
import CreateClassButton from "@/components/CreateClassButton";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-4 mt-10">
      <div className="flex gap-4">
        <JoinClassModal />
        <CreateClassButton />
      </div>
    </main>
  );
}
