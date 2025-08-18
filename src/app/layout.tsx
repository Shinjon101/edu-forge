import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header/Header";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import SideBar from "@/components/sidebar/SideBar";
import { addUser } from "../../actions/addUser";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "EduForge",
  description:
    "EduForge is a classroom platform where teachers can create and publish tasks, generate AI-powered questions and students can attempt tasks in the given deadline.",
  icons: {
    icon: "/favicon.ico",
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await addUser();
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background text-foreground">
        <ClerkProvider>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster richColors position="top-center" />
              <div className="flex flex-col min-h-screen">
                <Header />

                <div className="flex flex-1 overflow-hidden">
                  <aside className="hidden md:block bg-accent">
                    <SideBar />
                  </aside>

                  <main className="flex-1 overflow-y-auto p-5 scrollbar-hide">
                    {children}
                  </main>
                </div>
              </div>
            </ThemeProvider>
          </QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
