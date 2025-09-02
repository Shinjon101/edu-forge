import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

interface Props {
  error: unknown;
}

export default function ErrorAlert({ error }: Props) {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>An Error Occurred</AlertTitle>
      <AlertDescription>
        {(error as Error)?.message || "Something went wrong"}
      </AlertDescription>
    </Alert>
  );
}
