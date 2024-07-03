"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Message from "@/app/components/Message";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "unauthenticated") {
    return (
      <main className="min-h-screen">
        <Message
          pesan="you must log in first"
          handleClickSuccess={() => router.push("/auth/login")}
        />
      </main>
    );
  }
  return <>{children}</>;
}
