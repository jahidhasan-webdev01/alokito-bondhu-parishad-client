"use client";

import Sidebar from "@/components/dashboard/sidebar";
import Container from "@/components/ui/container";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !admin) {
      router.replace("/");
    }
  }, [admin, loading, router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-brand-cream">
        <Loader2 size={40} className="animate-spin text-brand-green" />
      </main>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <Container>
      <div className="flex h-[calc(100vh-96px)] overflow-hidden">
        <Sidebar />

        <main
          className="
              flex-1
              overflow-y-auto
              px-8
              py-8
            "
        >
          {children}
        </main>
      </div>
    </Container>
  );
}
