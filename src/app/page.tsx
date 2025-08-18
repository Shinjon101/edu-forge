"use client";

import { JoinClassModal } from "@/components/modals/JoinClassModal";
import CreateClassButton from "@/components/CreateClassButton";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <div className="flex flex-col justify-center  items-center gap-2 mb-8">
        <h1 className=" text-center inline-block text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-[1.2] pb-1">
          Welcome to EduForge
        </h1>

        <p className="text-gray-600 text-xl max-w-lg mx-auto text-center ">
          AI-powered classrooms for faster, smarter learning.
        </p>
      </div>

      <div className=" gap-6 flex flex-col justify-center items-center">
        <h1 className="animate-pulse  text-3xl font-black"> Get Started </h1>
        <div className="flex justify-between items-center gap-4">
          <JoinClassModal />
          <CreateClassButton />
        </div>
      </div>
    </main>
  );
}
