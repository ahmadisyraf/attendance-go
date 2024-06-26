"use client";
import Link from "next/link";
import {
  CircleUser,
  History,
  Home,
  LogOut,
  Menu,
  Package2,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useSWR from "swr";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import { useCookies } from "next-client-cookies";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = useAuth();
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(userId ? "/api/user" : null, fetcher);
  const cookies = useCookies();
  const pathname = usePathname();
  const { signOut } = useClerk();
  const router = useRouter();

  console.log(pathname);

  useEffect(() => {
    if (data) {
      cookies.set("userid", data.id);
    }
  }, [data]);

  return (
    <section>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="">HadirGO</span>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Link
                  href="/dashboard/classroom"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    pathname.includes("classroom")
                      ? ""
                      : "text-muted-foreground"
                  }  transition-all hover:text-primary`}
                >
                  <Home className="h-4 w-4" />
                  Classroom
                </Link>
                <Link
                  href="/dashboard/attendance"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    pathname.includes("attendance")
                      ? ""
                      : "text-muted-foreground"
                  }  transition-all hover:text-primary`}
                >
                  <Users className="h-4 w-4" />
                  Attendance
                </Link>
                <Link
                  href="/dashboard/history"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    pathname.includes("history") ? "" : "text-muted-foreground"
                  }  transition-all hover:text-primary`}
                >
                  <History className="h-4 w-4" />
                  History
                </Link>
                <Link
                  href="/dashboard/profile"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    pathname.includes("profile") ? "" : "text-muted-foreground"
                  }  transition-all hover:text-primary`}
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 md:flex-row-reverse justify-between md:justify-normal items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Acme Inc</span>
                  </Link>
                  <Link
                    href="/dashboard/classroom"
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                      pathname.includes("classroom")
                        ? ""
                        : "text-muted-foreground"
                    } hover:text-foreground`}
                  >
                    <Home className="h-5 w-5" />
                    Classroom
                  </Link>
                  <Link
                    href="/dashboard/attendance"
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                      pathname.includes("attendance")
                        ? ""
                        : "text-muted-foreground"
                    } hover:text-foreground`}
                  >
                    <Users className="h-5 w-5" />
                    Attendance
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <SignOutButton redirectUrl="/">
              <Button variant={"outline"} size={"icon"}>
                <LogOut size={18} />
              </Button>
            </SignOutButton>
          </header>
          {children}
        </div>
      </div>
    </section>
  );
}
