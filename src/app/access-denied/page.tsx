"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Mail } from "lucide-react";
import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <div className="flex max-h-[400px] justify-center p-2">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
          <CardTitle className="mt-2 text-2xl font-bold">
            Access Required
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            You don’t currently have access to this application. If you believe
            this is a mistake or need access, please contact the administrator
            for verification.
          </p>

          <div className="flex justify-center gap-3">
            <Button asChild>
              <Link href="/">Go Home</Link>
            </Button>
            <Button asChild variant="outline">
              <a href="mailto:toshinjonc2006@gmail.com?subject=Access Request - EduForge">
                <Mail className="mr-2 h-4 w-4" />
                Contact Admin
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
