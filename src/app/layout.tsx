import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/providers/toast-provider";
import Navbar from "@/components/shared/Navbar";
import { AuthProvider } from "@/context/auth-context";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Alokito Bondhu Parishad",
  description: "Official Website of Alokito Bondhu Parishad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>

            <Navbar />

            <ToastProvider />

            <main className="pt-24">
              {children}
            </main>

        </AuthProvider>
      </body>
    </html>
  );
}