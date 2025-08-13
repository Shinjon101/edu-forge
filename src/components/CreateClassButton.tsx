"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const CreateClassButton = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.push("/create-classroom")} className="m-5">
      Create Class
    </Button>
  );
};

export default CreateClassButton;
