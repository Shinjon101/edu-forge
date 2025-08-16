"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { MailPlus } from "lucide-react";
import { useClassroom } from "@/hooks/useClassroom";

interface Props {
  classId: string;
}

const InviteModal = ({ classId }: Props) => {
  const { isLoading, data } = useClassroom(classId);
  return (
    <Dialog>
      <Button asChild variant="outline">
        <DialogTrigger>
          <MailPlus className="mr-2 h-4 w-4" />
          Invite
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Class Invite Code</DialogTitle>
          <Card>
            <CardHeader>
              <CardTitle className="text-6xl text-center">
                {isLoading ? "Loading" : data?.code}
              </CardTitle>
            </CardHeader>
          </Card>
        </DialogHeader>
      </DialogContent>
      <DialogClose />
    </Dialog>
  );
};

export default InviteModal;
