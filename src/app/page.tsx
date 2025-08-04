"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-4 mt-10">
      <div className="flex gap-4">
        <Button onClick={() => router.push("/join-classroom")}>
          Join Class
        </Button>
        <Button onClick={() => router.push("/create-classroom")}>
          Create Class
        </Button>
      </div>
    </main>
  );
}
