import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserOption from "@/components/user-options";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "To-do App",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-4xl mx-auto py-10 px-4">
            <header>
              <div className="flex items-center justify-between">
                <a
                  href="/"
                  className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                  <img className="w-8 h-8 mr-2" src="/check.png" alt="logo" />
                  To-Do App
                </a>
                <ModeToggle />
                {session && (
                  <UserOption
                    name={session?.user?.name || ""}
                    email={session?.user?.email || ""}
                  />
                )}
              </div>
            </header>
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
